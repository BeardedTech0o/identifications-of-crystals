/* App shell: routing + screen rendering, wiring camera/identify/db together. */
(() => {
  const COLOR_OPTIONS = [
    ['clear', '#f0f0f0'], ['white', '#f5f5f0'], ['gray', '#9a9a9a'], ['black', '#1a1a1a'],
    ['brown', '#7a5230'], ['red', '#b3261e'], ['pink', '#e07a9e'], ['orange', '#e08a3c'],
    ['yellow', '#e8d020'], ['green', '#3f9e5c'], ['blue', '#3060b0'], ['purple', '#7c3aed'],
    ['multicolor', 'conic-gradient(red,orange,yellow,green,blue,purple,red)'], ['metallic', '#b8b8b8']
  ];
  const TRANSPARENCY_OPTIONS = [
    ['transparent', 'See clearly through it'], ['translucent', 'Light passes but blurry'], ['opaque', "Can't see through it"]
  ];
  const LUSTER_OPTIONS = [
    ['glassy', 'Glassy / vitreous'], ['metallic', 'Metallic / shiny like metal'],
    ['dull', 'Dull / earthy'], ['pearly', 'Pearly / silky sheen']
  ];

  let navStack = ['home'];

  function showScreen(name, { push = true } = {}) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + name);
    el.classList.add('active');
    if (push) navStack.push(name);
    window.scrollTo(0, 0);
  }

  function goBack() {
    Camera.stop();
    navStack.pop();
    const prev = navStack.pop() || 'home';
    showScreen(prev);
  }

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { t.hidden = true; }, 2600);
  }

  function crystalById(id) { return CRYSTAL_DB.find(c => c.id === id); }

  function swatchStyle(crystal) {
    const [a, b] = crystal.swatch;
    return `background: linear-gradient(135deg, ${a}, ${b || a});`;
  }

  // ---------- SCAN FLOW ----------
  async function renderScanFlow() {
    const el = document.getElementById('scan-flow');
    el.innerHTML = `
      <div class="camera-wrap">
        <video id="scan-video" autoplay playsinline muted></video>
        <div class="camera-hint">Center the crystal in frame</div>
      </div>
      <div class="btn-row">
        <button class="btn" id="scan-capture-btn">📸 Capture</button>
      </div>
      <div class="status-line" id="scan-cam-status"></div>
    `;
    const video = document.getElementById('scan-video');
    try {
      await Camera.start(video);
    } catch (e) {
      document.getElementById('scan-cam-status').textContent =
        'Could not access camera (' + e.message + '). Check camera permissions in Settings.';
    }
    document.getElementById('scan-capture-btn').onclick = () => onScanCapture(video);
  }

  async function onScanCapture(video) {
    const canvas = document.createElement('canvas');
    Camera.captureToCanvas(video, canvas);
    Camera.stop();
    renderScanQuestions(canvas);
  }

  function renderScanQuestions(canvas) {
    const el = document.getElementById('scan-flow');
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    el.innerHTML = `
      <canvas class="captured"></canvas>
      <div class="question-block">
        <h3>Transparency</h3>
        <div class="option-grid" id="q-transparency"></div>
      </div>
      <div class="question-block">
        <h3>Luster</h3>
        <div class="option-grid" id="q-luster"></div>
      </div>
      <div class="question-block">
        <h3>Color family</h3>
        <div class="option-grid" id="q-color"></div>
      </div>
      <div class="btn-row">
        <button class="btn secondary" id="scan-retake-btn">Retake</button>
        <button class="btn" id="scan-identify-btn">Identify</button>
      </div>
      <div class="status-line" id="scan-status" hidden><span class="spinner"></span><span>Analyzing…</span></div>
    `;
    const shownCanvas = el.querySelector('canvas.captured');
    shownCanvas.width = canvas.width; shownCanvas.height = canvas.height;
    shownCanvas.getContext('2d').drawImage(canvas, 0, 0);

    const answers = { transparency: null, luster: null, colorFamily: null };
    renderChips('q-transparency', TRANSPARENCY_OPTIONS, v => { answers.transparency = v; });
    renderChips('q-luster', LUSTER_OPTIONS, v => { answers.luster = v; });
    renderColorChips('q-color', v => { answers.colorFamily = v; });

    document.getElementById('scan-retake-btn').onclick = () => renderScanFlow();
    document.getElementById('scan-identify-btn').onclick = () => runScanIdentify(canvas, dataUrl, answers);
  }

  function renderChips(containerId, options, onSelect) {
    const container = document.getElementById(containerId);
    container.innerHTML = options.map(([val, label]) =>
      `<div class="option-chip" data-val="${val}">${label}</div>`).join('');
    container.querySelectorAll('.option-chip').forEach(chip => {
      chip.onclick = () => {
        container.querySelectorAll('.option-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        onSelect(chip.dataset.val);
      };
    });
  }

  function renderColorChips(containerId, onSelect) {
    const container = document.getElementById(containerId);
    container.innerHTML = COLOR_OPTIONS.map(([val, color]) => `
      <div class="option-chip" data-val="${val}">
        <span class="swatch-dot" style="background:${color}"></span>${val}
      </div>`).join('');
    container.querySelectorAll('.option-chip').forEach(chip => {
      chip.onclick = () => {
        container.querySelectorAll('.option-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        onSelect(chip.dataset.val);
      };
    });
  }

  async function runScanIdentify(canvas, dataUrl, answers) {
    const statusEl = document.getElementById('scan-status');
    statusEl.hidden = false;
    try {
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const autoColor = EdgeHeuristic.dominantColor(imageData);
      const matches = Identify.rankMatches(answers, autoColor, 5);

      await HistoryDB.add({
        mode: 'scan',
        photo: dataUrl,
        answers,
        autoColor,
        matches: matches.map(m => ({ id: m.crystal.id, confidence: m.confidence }))
      });

      renderResults(matches, { title: 'Likely matches', backTo: 'scan' });
    } catch (e) {
      toast('Something went wrong analyzing the photo.');
      console.error(e);
    } finally {
      statusEl.hidden = true;
    }
  }

  function renderResults(matches, { title, extraHtml = '' } = {}) {
    const el = document.getElementById('scan-flow');
    el.innerHTML = `
      ${extraHtml}
      <h3>${title}</h3>
      <div id="results-list"></div>
      <button class="link-btn" data-nav="home">Done</button>
    `;
    const list = document.getElementById('results-list');
    matches.forEach(m => {
      const card = document.createElement('button');
      card.className = 'result-card';
      card.innerHTML = `
        <div class="result-swatch" style="${swatchStyle(m.crystal)}"></div>
        <div class="result-main">
          <div class="result-name">${m.crystal.name}</div>
          <div class="result-conf">${m.confidence}% match</div>
          <div class="confidence-bar"><div class="confidence-bar-fill" style="width:${m.confidence}%"></div></div>
        </div>
      `;
      card.onclick = () => renderInfo(m.crystal.id);
      list.appendChild(card);
    });
    wireHomeLinks(el);
  }

  // ---------- IS THIS A CRYSTAL FLOW ----------
  async function renderIsThisFlow() {
    const el = document.getElementById('is-this-flow');
    el.innerHTML = `
      <div class="camera-wrap">
        <video id="isthis-video" autoplay playsinline muted></video>
        <div class="camera-hint">Center the object in frame</div>
      </div>
      <div class="btn-row">
        <button class="btn" id="isthis-capture-btn">📸 Capture &amp; Check</button>
      </div>
      <div class="status-line" id="isthis-cam-status"></div>
    `;
    const video = document.getElementById('isthis-video');
    try {
      await Camera.start(video);
    } catch (e) {
      document.getElementById('isthis-cam-status').textContent =
        'Could not access camera (' + e.message + '). Check camera permissions in Settings.';
    }
    document.getElementById('isthis-capture-btn').onclick = () => onIsThisCapture(video);
  }

  async function onIsThisCapture(video) {
    const canvas = document.createElement('canvas');
    Camera.captureToCanvas(video, canvas);
    Camera.stop();

    const el = document.getElementById('is-this-flow');
    el.innerHTML = `
      <canvas class="captured"></canvas>
      <div class="status-line"><span class="spinner"></span><span>Analyzing with on-device AI…</span></div>
    `;
    const shownCanvas = el.querySelector('canvas.captured');
    shownCanvas.width = canvas.width; shownCanvas.height = canvas.height;
    shownCanvas.getContext('2d').drawImage(canvas, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const autoColor = EdgeHeuristic.dominantColor(imageData);

    const imgForModel = new Image();
    imgForModel.src = dataUrl;
    await imgForModel.decode().catch(() => {});

    const verdict = await Identify.isCrystalVerdict(imgForModel, imageData);
    const matches = Identify.rankMatches({ colorFamily: autoColor.family }, autoColor, 5);

    await HistoryDB.add({
      mode: 'is-this', photo: dataUrl, verdict, autoColor,
      matches: matches.map(m => ({ id: m.crystal.id, confidence: m.confidence }))
    });

    const verdictHtml = `
      <div class="verdict-banner ${verdict.likely ? 'likely' : 'unlikely'}">
        ${verdict.likely ? '✔ Likely a crystal or mineral' : '✘ Probably not a crystal or mineral'}
        <span class="verdict-sub">${verdict.confidence}% confidence${verdict.reasons.length ? ' — ' + verdict.reasons.join('; ') : ''}</span>
      </div>
    `;
    document.getElementById('is-this-flow').innerHTML = '';
    renderIsThisResults(matches, verdictHtml);
  }

  function renderIsThisResults(matches, verdictHtml) {
    const el = document.getElementById('is-this-flow');
    el.innerHTML = `
      ${verdictHtml}
      <h3>If it is one, closest matches</h3>
      <div id="isthis-results-list"></div>
      <button class="link-btn" data-nav="home">Done</button>
    `;
    const list = document.getElementById('isthis-results-list');
    matches.forEach(m => {
      const card = document.createElement('button');
      card.className = 'result-card';
      card.innerHTML = `
        <div class="result-swatch" style="${swatchStyle(m.crystal)}"></div>
        <div class="result-main">
          <div class="result-name">${m.crystal.name}</div>
          <div class="result-conf">${m.confidence}% match</div>
          <div class="confidence-bar"><div class="confidence-bar-fill" style="width:${m.confidence}%"></div></div>
        </div>
      `;
      card.onclick = () => renderInfo(m.crystal.id);
      list.appendChild(card);
    });
    wireHomeLinks(el);
  }

  // ---------- HISTORY ----------
  async function renderHistory() {
    const el = document.getElementById('history-list');
    el.innerHTML = '<div class="status-line"><span class="spinner"></span><span>Loading…</span></div>';
    const records = await HistoryDB.all();
    if (!records.length) {
      el.innerHTML = '<div class="empty-state">No scans yet.<br>Try "Scan a Crystal" from the home screen.</div>';
      return;
    }
    el.innerHTML = '';
    records.forEach(rec => {
      const topMatch = rec.matches && rec.matches[0] ? crystalById(rec.matches[0].id) : null;
      const item = document.createElement('button');
      item.className = 'history-item';
      const date = new Date(rec.createdAt).toLocaleString();
      item.innerHTML = `
        <img class="history-thumb" src="${rec.photo}" alt="">
        <div class="history-meta">
          <div class="history-name">${topMatch ? topMatch.name : 'Unknown'} ${rec.mode === 'is-this' ? (rec.verdict.likely ? '(likely crystal)' : '(probably not)') : ''}</div>
          <div class="history-date">${date}</div>
        </div>
      `;
      item.onclick = () => renderHistoryDetail(rec);
      el.appendChild(item);
    });
  }

  function renderHistoryDetail(rec) {
    showScreen('info');
    const titleEl = document.getElementById('info-title');
    const contentEl = document.getElementById('info-content');
    titleEl.textContent = new Date(rec.createdAt).toLocaleString();
    const matchesHtml = (rec.matches || []).map(m => {
      const c = crystalById(m.id);
      if (!c) return '';
      return `<button class="result-card" data-crystal="${c.id}">
        <div class="result-swatch" style="${swatchStyle(c)}"></div>
        <div class="result-main">
          <div class="result-name">${c.name}</div>
          <div class="result-conf">${m.confidence}% match</div>
        </div>
      </button>`;
    }).join('');
    contentEl.innerHTML = `
      <img src="${rec.photo}" style="width:100%;border-radius:16px;margin-bottom:1rem;" alt="">
      ${rec.mode === 'is-this' ? `<div class="verdict-banner ${rec.verdict.likely ? 'likely' : 'unlikely'}">${rec.verdict.likely ? '✔ Likely a crystal or mineral' : '✘ Probably not a crystal or mineral'}<span class="verdict-sub">${rec.verdict.confidence}% confidence</span></div>` : ''}
      <h3>Matches</h3>
      ${matchesHtml}
    `;
    contentEl.querySelectorAll('[data-crystal]').forEach(btn => {
      btn.onclick = () => renderInfo(btn.dataset.crystal);
    });
  }

  // ---------- CRYSTAL INFO ----------
  function renderInfo(id) {
    const c = crystalById(id);
    if (!c) return;
    showScreen('info');
    document.getElementById('info-title').textContent = c.name;
    const folklore = c.folklore && c.folklore.length
      ? `<div class="info-section">
           <h3>Traditional / metaphysical lore</h3>
           <ul>${c.folklore.map(f => `<li>${f}</li>`).join('')}</ul>
           <div class="folklore-note">Folklore/traditional belief, not a scientific claim.</div>
         </div>`
      : '';
    document.getElementById('info-content').innerHTML = `
      <div class="info-swatch-lg" style="${swatchStyle(c)}"></div>
      <div class="info-section">
        <h3>Properties</h3>
        <table class="props-table">
          <tr><td>Formula</td><td>${c.formula}</td></tr>
          <tr><td>Crystal system</td><td>${c.system}</td></tr>
          <tr><td>Hardness (Mohs)</td><td>${c.hardness}</td></tr>
          <tr><td>Luster</td><td>${c.luster}</td></tr>
          <tr><td>Transparency</td><td>${c.transparency}</td></tr>
          <tr><td>Streak</td><td>${c.streak}</td></tr>
          <tr><td>Habit</td><td>${c.habit}</td></tr>
        </table>
      </div>
      <div class="info-section">
        <h3>Formation</h3>
        <p>${c.formation}</p>
      </div>
      <div class="info-section">
        <h3>Facts</h3>
        <ul>${(c.scienceFacts || []).map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
      ${folklore}
    `;
  }

  // ---------- NAV WIRING ----------
  function wireHomeLinks(scopeEl) {
    scopeEl.querySelectorAll('[data-nav]').forEach(btn => {
      btn.onclick = () => navigateTo(btn.dataset.nav);
    });
  }

  function navigateTo(name) {
    if (name === 'scan') { showScreen('scan'); renderScanFlow(); }
    else if (name === 'is-this') { showScreen('is-this'); renderIsThisFlow(); }
    else if (name === 'history') { showScreen('history'); renderHistory(); }
    else if (name === 'about') { showScreen('about'); }
    else { showScreen('home'); }
  }

  function init() {
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.nav));
    });
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.addEventListener('click', goBack);
    });

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => console.warn('SW registration failed', err));
      });
    }

    // Warm up the ML model in the background so it's ready by the time
    // the user taps Scan/Is-This (and gets cached for offline use).
    Identify.loadModel().catch(() => {});
  }

  document.addEventListener('DOMContentLoaded', init);
})();
