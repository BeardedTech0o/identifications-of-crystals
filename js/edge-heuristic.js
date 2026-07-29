/*
 * Plain-JS (no ML) image heuristics used to help judge "does this look like
 * a crystal/mineral" and to read the dominant color of a photo.
 */
const EdgeHeuristic = (() => {

  function toGrayscale(imageData) {
    const { data, width, height } = imageData;
    const gray = new Float32Array(width * height);
    for (let i = 0; i < width * height; i++) {
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
      gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
    }
    return gray;
  }

  // Sobel gradient magnitude + orientation histogram peakiness.
  // Crystals/gems tend to have a few dominant straight facet edges,
  // producing a "peaky" orientation histogram vs. organic/random objects.
  function facetScore(imageData) {
    const { width, height } = imageData;
    const gray = toGrayscale(imageData);
    const gx = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const gy = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    const bins = new Array(18).fill(0); // 10-degree bins over 0-180
    let edgeCount = 0;
    let strongEdgeCount = 0;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let sx = 0, sy = 0, k = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const v = gray[(y + dy) * width + (x + dx)];
            sx += v * gx[k]; sy += v * gy[k]; k++;
          }
        }
        const mag = Math.sqrt(sx * sx + sy * sy);
        if (mag > 40) {
          edgeCount++;
          if (mag > 90) strongEdgeCount++;
          let angle = Math.atan2(sy, sx) * (180 / Math.PI);
          if (angle < 0) angle += 180;
          bins[Math.min(17, Math.floor(angle / 10))]++;
        }
      }
    }

    const total = bins.reduce((a, b) => a + b, 0);
    if (total < 50) {
      return { peakiness: 0, edgeDensity: 0, strongEdgeRatio: 0 };
    }
    const sorted = [...bins].sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3).reduce((a, b) => a + b, 0);
    const peakiness = top3 / total; // 0..1, higher = more directional/faceted
    const edgeDensity = edgeCount / (width * height);
    const strongEdgeRatio = strongEdgeCount / Math.max(1, edgeCount);
    return { peakiness, edgeDensity, strongEdgeRatio };
  }

  const COLOR_FAMILIES = {
    clear: [0, 0], white: [0, 0], gray: [0, 0], black: [0, 0],
    red: [350, 10], orange: [15, 40], yellow: [45, 65], green: [70, 160],
    blue: [165, 250], purple: [251, 320], pink: [321, 349], brown: [20, 45],
    multicolor: null, metallic: null
  };

  function dominantColor(imageData) {
    const { data, width, height } = imageData;
    // Sample the center 60% of the image to avoid background.
    const x0 = Math.floor(width * 0.2), x1 = Math.floor(width * 0.8);
    const y0 = Math.floor(height * 0.2), y1 = Math.floor(height * 0.8);
    let rSum = 0, gSum = 0, bSum = 0, n = 0;
    let satSum = 0, lightSum = 0;
    for (let y = y0; y < y1; y += 2) {
      for (let x = x0; x < x1; x += 2) {
        const i = (y * width + x) * 4;
        rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2];
        n++;
      }
    }
    const r = rSum / n, g = gSum / n, b = bSum / n;
    const { h, s, l } = rgbToHsl(r, g, b);
    return classifyHsl(h, s, l, [r, g, b]);
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0; const l = (max + min) / 2;
    const d = max - min;
    if (d !== 0) {
      s = d / (1 - Math.abs(2 * l - 1));
      switch (max) {
        case r: h = 60 * (((g - b) / d) % 6); break;
        case g: h = 60 * ((b - r) / d + 2); break;
        case b: h = 60 * ((r - g) / d + 4); break;
      }
      if (h < 0) h += 360;
    }
    return { h, s, l };
  }

  function classifyHsl(h, s, l, rgb) {
    if (l > 0.88 && s < 0.15) return { family: 'white', hex: rgbToHex(rgb) };
    if (l < 0.15) return { family: 'black', hex: rgbToHex(rgb) };
    if (s < 0.12) return { family: l > 0.5 ? 'gray' : 'black', hex: rgbToHex(rgb) };
    if (h >= 350 || h < 10) return { family: 'red', hex: rgbToHex(rgb) };
    if (h < 20) return { family: l < 0.4 ? 'brown' : 'orange', hex: rgbToHex(rgb) };
    if (h < 45) return { family: 'yellow', hex: rgbToHex(rgb) };
    if (h < 165) return { family: 'green', hex: rgbToHex(rgb) };
    if (h < 251) return { family: 'blue', hex: rgbToHex(rgb) };
    if (h < 321) return { family: 'purple', hex: rgbToHex(rgb) };
    return { family: 'pink', hex: rgbToHex(rgb) };
  }

  function rgbToHex([r, g, b]) {
    const c = v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');
    return `#${c(r)}${c(g)}${c(b)}`;
  }

  return { facetScore, dominantColor };
})();
