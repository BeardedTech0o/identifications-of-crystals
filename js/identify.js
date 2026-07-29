/*
 * Matching engine: combines (a) on-device MobileNet visual analysis,
 * (b) classical-CV facet/color heuristics, and (c) the user's quick
 * answers into a ranked list of likely crystals from CRYSTAL_DB.
 *
 * There is no bundled reference photo library (see README/about screen),
 * so this is trait-based matching rather than photo-similarity matching.
 * MobileNet's role is limited to what it can honestly help with:
 * flagging obvious non-crystal objects and giving a general visual
 * embedding used to compare a scan against the user's own past scans.
 */
const Identify = (() => {
  let model = null;
  let modelLoadPromise = null;

  // A short list of common ImageNet labels that are clearly not
  // crystals/minerals, used only to pull down the "is this a crystal?"
  // confidence when MobileNet is very sure the photo is one of these.
  const NON_CRYSTAL_LABELS = [
    'person', 'face', 'dog', 'cat', 'bird', 'car', 'truck', 'plant', 'flower',
    'food', 'fruit', 'vegetable', 'keyboard', 'screen', 'phone', 'shoe',
    'book', 'paper', 'furniture', 'chair', 'table', 'fabric', 'clothing',
    'insect', 'fish', 'tree', 'leaf', 'hand', 'building', 'street'
  ];

  const COLOR_ADJACENCY = {
    clear: ['white'], white: ['clear', 'gray'], gray: ['white', 'black', 'metallic'],
    black: ['gray', 'brown'], brown: ['black', 'orange', 'red'], red: ['pink', 'orange'],
    orange: ['red', 'yellow', 'brown'], yellow: ['orange', 'green'], green: ['yellow', 'blue'],
    blue: ['green', 'purple'], purple: ['blue', 'pink'], pink: ['red', 'purple'],
    multicolor: [], metallic: ['gray', 'black', 'yellow']
  };

  const LUSTER_ADJACENCY = {
    glassy: ['pearly'], metallic: [], dull: ['pearly'], pearly: ['glassy', 'dull']
  };

  const TRANSPARENCY_ADJACENCY = {
    transparent: ['translucent'], translucent: ['transparent', 'opaque'], opaque: ['translucent']
  };

  async function loadModel(onStatus) {
    if (model) return model;
    if (modelLoadPromise) return modelLoadPromise;
    modelLoadPromise = (async () => {
      onStatus && onStatus('Loading on-device AI model…');
      // tf + mobilenet are loaded globally via <script> tags in index.html.
      model = await mobilenet.load({ version: 2, alpha: 1.0 });
      return model;
    })();
    return modelLoadPromise;
  }

  async function classify(imgEl) {
    const m = await loadModel();
    return m.classify(imgEl, 5);
  }

  async function embed(imgEl) {
    const m = await loadModel();
    const activation = m.infer(imgEl, true); // embedding tensor
    const arr = await activation.data();
    activation.dispose();
    return Array.from(arr);
  }

  function cosineSimilarity(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
    if (na === 0 || nb === 0) return 0;
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  }

  function scoreOne(crystal, answers, autoColor) {
    let score = 0, max = 0;

    // Color family: 40 pts
    max += 40;
    const userColor = answers.colorFamily;
    if (userColor) {
      if (crystal.colorFamily.includes(userColor)) score += 40;
      else if (crystal.colorFamily.some(c => (COLOR_ADJACENCY[userColor] || []).includes(c))) score += 16;
    }

    // Transparency: 25 pts
    max += 25;
    if (answers.transparency) {
      if (crystal.transparency === answers.transparency) score += 25;
      else if ((TRANSPARENCY_ADJACENCY[answers.transparency] || []).includes(crystal.transparency)) score += 10;
    }

    // Luster: 25 pts
    max += 25;
    if (answers.luster) {
      if (crystal.luster === answers.luster) score += 25;
      else if ((LUSTER_ADJACENCY[answers.luster] || []).includes(crystal.luster)) score += 8;
    }

    // Auto-detected dominant color from the photo: 10 pts bonus
    max += 10;
    if (autoColor && autoColor.family) {
      if (crystal.colorFamily.includes(autoColor.family)) score += 10;
      else if (crystal.colorFamily.some(c => (COLOR_ADJACENCY[autoColor.family] || []).includes(c))) score += 4;
    }

    return Math.round((score / max) * 100);
  }

  function rankMatches(answers, autoColor, topN = 5) {
    const scored = CRYSTAL_DB.map(c => ({ crystal: c, confidence: scoreOne(c, answers, autoColor) }));
    scored.sort((a, b) => b.confidence - a.confidence);
    return scored.slice(0, topN);
  }

  async function isCrystalVerdict(imgEl, imageData) {
    const { peakiness, edgeDensity } = EdgeHeuristic.facetScore(imageData);
    let confidence = 35; // baseline uncertainty
    const reasons = [];

    // Faceted / structured edges push confidence up.
    if (peakiness > 0.42) { confidence += 25; reasons.push('sharp, directional facet-like edges detected'); }
    else if (peakiness > 0.3) { confidence += 10; }
    else { reasons.push('edges look more irregular/organic than faceted'); }

    if (edgeDensity > 0.02 && edgeDensity < 0.35) { confidence += 10; }

    try {
      const predictions = await classify(imgEl);
      const top = predictions[0];
      const lowered = top.className.toLowerCase();
      const isExcluded = NON_CRYSTAL_LABELS.some(l => lowered.includes(l));
      if (isExcluded && top.probability > 0.4) {
        confidence -= 40;
        reasons.push(`on-device AI thinks this looks like "${top.className}"`);
      }
    } catch (e) {
      // Model unavailable (e.g. fully offline before first cache) - continue with CV-only heuristic.
    }

    confidence = Math.max(2, Math.min(96, confidence));
    return {
      likely: confidence >= 50,
      confidence,
      reasons
    };
  }

  return { loadModel, classify, embed, cosineSimilarity, rankMatches, isCrystalVerdict };
})();
