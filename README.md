# Crystal Identifier

An installable, offline-first PWA that identifies crystals and minerals using your camera — no cloud AI, no paid API, no account.

## How identification works

There's no free, pre-trained neural network that classifies mineral species out of the box, and no labeled photo dataset to train one on. So this app uses a **zero-cost, fully on-device hybrid approach** instead of a single black-box "AI":

1. **TensorFlow.js + MobileNet** (loaded from a CDN once, then cached offline by the service worker) runs locally in the browser — no server, no per-request cost.
2. It's used for what it can honestly help with: flagging when a photo clearly isn't a crystal at all (e.g. a face, a plant, a shoe), as part of the "Is this a crystal?" check.
3. Plain image processing (no ML) reads the photo's dominant color and looks for faceted, directional edges vs. organic/rounded ones.
4. You answer 2–3 quick questions (transparency, luster, color family).
5. All of that is combined into a weighted score against a 117-entry reference database (`data/crystals.js`), giving ranked, best-effort matches with a confidence percentage.

This is a **heuristic tool, not a lab-grade identification method** — the in-app "How does this work?" screen says so explicitly.

## Why there are no reference photos

Real specimen photos would improve matching accuracy, but they need to come from somewhere with a legal right to redistribute them. This build ships with **no bundled photos** — each crystal shows a representative color swatch instead. If you want to add real photos later:

- Source them from a permissively licensed collection (e.g. Wikimedia Commons, checking each image's specific license), or use your own specimen photos.
- Drop image files into an `images/` folder and add an `image` field to the matching entry in `data/crystals.js`.
- Record attribution for any CC-licensed image in a `CREDITS.md` file (required by most Commons licenses).
- Optionally extend `js/identify.js` to compare a live photo's MobileNet embedding against precomputed embeddings of your reference photos for stronger photo-based matching.

## Running locally

No build step — it's plain HTML/CSS/JS.

```
npm start        # serves the folder at http://localhost:8080 via Python's http.server
```

Camera access (`getUserMedia`) requires HTTPS or `localhost`, so serving over plain HTTP on another device's LAN IP won't allow camera use — test on `localhost` or deploy behind HTTPS.

## Installing on iPad (offline use)

1. Deploy the folder to any static HTTPS host (GitHub Pages, Netlify, Cloudflare Pages, etc.) — plain `http://` won't get camera access or a working service worker on a real device.
2. Open the URL in Safari on the iPad.
3. Tap the Share icon → **Add to Home Screen**.
4. Launch it once while online so the app shell and the TensorFlow.js/MobileNet model get cached by the service worker.
5. After that first load, it works fully offline.

## Project structure

- `index.html` — single-page app shell (home / scan / is-this-a-crystal / history / info screens)
- `css/styles.css` — styling (light/dark aware)
- `js/camera.js` — `getUserMedia` capture
- `js/edge-heuristic.js` — dominant-color + facet/edge heuristics (no ML)
- `js/identify.js` — MobileNet loading + scoring/matching engine
- `js/db.js` — IndexedDB-backed scan history
- `js/app.js` — routing and screen rendering
- `data/crystals.js` — the 117-entry crystal/mineral reference database
- `manifest.webmanifest`, `sw.js` — PWA install + offline caching
- `icons/` — generated app icons (`scripts/gen-icons.js` regenerates them; requires `npm install` first since it uses the `pngjs` dev dependency)
