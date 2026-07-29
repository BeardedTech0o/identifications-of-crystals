// One-off icon generator (not shipped) - creates simple crystal-themed PNG icons.
const { PNG } = require('pngjs');
const fs = require('fs');
const zlib = require('zlib');

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function drawIcon(size) {
  const png = new PNG({ width: size, height: size });
  const bg1 = hexToRgb('#4c1d95'); // deep violet
  const bg2 = hexToRgb('#7c3aed'); // violet
  const gem = hexToRgb('#e9d5ff'); // pale lilac
  const gemEdge = hexToRgb('#f5f3ff');

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      const t = y / size;
      png.data[idx] = bg1[0] + (bg2[0] - bg1[0]) * t;
      png.data[idx + 1] = bg1[1] + (bg2[1] - bg1[1]) * t;
      png.data[idx + 2] = bg1[2] + (bg2[2] - bg1[2]) * t;
      png.data[idx + 3] = 255;
    }
  }

  // Draw a simple faceted crystal (hexagon-ish diamond) shape in the center.
  const cx = size / 2, cy = size / 2;
  const w = size * 0.42, h = size * 0.5;
  // Polygon points for a crystal/gem silhouette (top point, shoulders, bottom point)
  const pts = [
    [cx, cy - h / 2],
    [cx + w / 2, cy - h * 0.12],
    [cx + w * 0.32, cy + h / 2],
    [cx - w * 0.32, cy + h / 2],
    [cx - w / 2, cy - h * 0.12],
  ];

  function pointInPoly(px, py, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];
      const intersect = (yi > py) !== (yj > py) &&
        px < (xj - xi) * (py - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (pointInPoly(x, y, pts)) {
        const idx = (size * y + x) << 2;
        const nearEdge = !pointInPoly(x, y, pts.map(p => {
          const dx = p[0] - cx, dy = p[1] - cy;
          return [cx + dx * 0.9, cy + dy * 0.9];
        }));
        const c = nearEdge ? gemEdge : gem;
        png.data[idx] = c[0];
        png.data[idx + 1] = c[1];
        png.data[idx + 2] = c[2];
        png.data[idx + 3] = 255;
      }
    }
  }

  // Facet lines from center point to shoulders (simple darker diagonal lines)
  function drawLine(x0, y0, x1, y1, color) {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2;
    for (let i = 0; i <= steps; i++) {
      const x = Math.round(x0 + (x1 - x0) * (i / steps));
      const y = Math.round(y0 + (y1 - y0) * (i / steps));
      for (let ox = -Math.max(1, size / 200); ox <= Math.max(1, size / 200); ox++) {
        const xx = x + Math.round(ox);
        if (xx < 0 || xx >= size || y < 0 || y >= size) continue;
        const idx = (size * y + xx) << 2;
        png.data[idx] = color[0];
        png.data[idx + 1] = color[1];
        png.data[idx + 2] = color[2];
        png.data[idx + 3] = 255;
      }
    }
  }
  const darker = [gem[0] * 0.7, gem[1] * 0.7, gem[2] * 0.9];
  drawLine(cx, cy - h / 2, cx, cy + h * 0.15, darker);
  drawLine(cx, cy - h / 2, cx + w / 2, cy - h * 0.12, darker);
  drawLine(cx, cy - h / 2, cx - w / 2, cy - h * 0.12, darker);
  drawLine(cx, cy + h * 0.15, cx + w * 0.32, cy + h / 2, darker);
  drawLine(cx, cy + h * 0.15, cx - w * 0.32, cy + h / 2, darker);

  return png;
}

const sizes = [16, 32, 180, 192, 512];
if (!fs.existsSync('icons')) fs.mkdirSync('icons');
for (const size of sizes) {
  const png = drawIcon(size);
  const buf = PNG.sync.write(png);
  const name = size === 180 ? 'icons/apple-touch-icon.png' : `icons/icon-${size}.png`;
  fs.writeFileSync(name, buf);
  console.log('wrote', name, buf.length, 'bytes');
}
