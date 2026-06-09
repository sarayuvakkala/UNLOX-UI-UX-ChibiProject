// ============================================================
// generate.js — THE MAIN SCRIPT
// Run:  node generate.js
// Output: /output/avatar_001.svg ... avatar_060.svg
//         /data/diversity_matrix.json
//         /preview/index.html (updated gallery)
// ============================================================
import fs from "fs";
import path from "path";
import { generateMatrix } from "./src/generateMatrix.js";
import { buildAvatar } from "./src/buildAvatar.js";

// ── CONFIG ────────────────────────────────────────────────────
const AVATAR_COUNT = 60;          // how many avatars to generate
const OUTPUT_DIR   = "./output";  // where SVG files go
const DATA_DIR     = "./data";    // where JSON goes
const PREVIEW_DIR  = "./preview"; // where HTML gallery goes

// ── SETUP ─────────────────────────────────────────────────────
[OUTPUT_DIR, DATA_DIR, PREVIEW_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

console.log("🎨 Chibi Avatar Generator\n");

// ── STEP 1: Generate diversity matrix ─────────────────────────
console.log(`📊 Generating ${AVATAR_COUNT}-avatar diversity matrix...`);
const matrix = generateMatrix(AVATAR_COUNT);
fs.writeFileSync(
  path.join(DATA_DIR, "diversity_matrix.json"),
  JSON.stringify(matrix, null, 2)
);
console.log(`   ✓ Saved data/diversity_matrix.json\n`);

// ── STEP 2: Build SVG files ────────────────────────────────────
console.log(`🖌  Building SVG files...`);
matrix.forEach((spec, i) => {
  const svg = buildAvatar(spec);
  const filename = `${spec.id}.svg`;
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), svg);
  process.stdout.write(`\r   ✓ ${i + 1}/${matrix.length} avatars generated`);
});
console.log("\n");

// ── STEP 3: Build preview gallery HTML ────────────────────────
console.log(`🌐 Building preview gallery...`);
const galleryHTML = buildGallery(matrix);
fs.writeFileSync(path.join(PREVIEW_DIR, "index.html"), galleryHTML);
console.log(`   ✓ Saved preview/index.html\n`);

console.log("✅ Done! Run:  npm run preview");
console.log("   to open the avatar gallery in your browser.\n");

// ── GALLERY BUILDER ────────────────────────────────────────────
function buildGallery(matrix) {
  const cards = matrix.map(spec => {
    const svgContent = buildAvatar(spec);
    const tags = [
      spec.skinTone,
      spec.gender,
      spec.disability !== "none" ? spec.disability : null,
      spec.religion   !== "none" ? spec.religion   : null,
      spec.ageGroup,
    ].filter(Boolean);

    return `
      <div class="card" data-tags="${tags.join(" ")}">
        <div class="avatar-wrap">${svgContent}</div>
        <div class="id">${spec.id}</div>
        <div class="tags">
          ${tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chibi Avatar Library — ${matrix.length} avatars</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #f8f8f6;
    color: #333;
    padding: 2rem;
  }
  h1 { font-size: 1.8rem; font-weight: 600; margin-bottom: 0.4rem; }
  .subtitle { color: #666; font-size: 0.95rem; margin-bottom: 1.5rem; }
  .controls {
    display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;
    align-items: center;
  }
  input[type="text"] {
    padding: 8px 14px; border-radius: 8px;
    border: 1px solid #ddd; font-size: 14px;
    width: 280px; background: white;
  }
  .count { font-size: 13px; color: #888; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }
  .card {
    background: white; border-radius: 12px;
    padding: 16px; text-align: center;
    border: 1px solid #eee;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .card:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
  .avatar-wrap svg { width: 80px; height: 133px; }
  .id { font-size: 11px; font-family: monospace; color: #aaa; margin: 8px 0 4px; }
  .tags { display: flex; gap: 4px; flex-wrap: wrap; justify-content: center; }
  .tag {
    font-size: 10px; padding: 2px 7px; border-radius: 99px;
    background: #f0f0f0; color: #555;
  }
  .hidden { display: none; }
  .stats {
    display: flex; gap: 2rem; margin-bottom: 1.5rem;
    padding: 1rem 1.2rem; background: white;
    border-radius: 10px; border: 1px solid #eee;
    font-size: 13px;
  }
  .stat-val { font-size: 1.4rem; font-weight: 600; display: block; color: #7C3AED; }
</style>
</head>
<body>
  <h1>Chibi Avatar Library</h1>
  <p class="subtitle">
    ${matrix.length} inclusive avatars · 6 identity dimensions · Generated with Node.js
  </p>
  <div class="stats">
    <div><span class="stat-val">${matrix.length}</span>Total avatars</div>
    <div><span class="stat-val">${[...new Set(matrix.map(a=>a.skinTone))].length}</span>Skin tones</div>
    <div><span class="stat-val">${[...new Set(matrix.map(a=>a.gender))].length}</span>Gender expressions</div>
    <div><span class="stat-val">${[...new Set(matrix.map(a=>a.disability).filter(d=>d!=="none"))].length}</span>Disability types</div>
    <div><span class="stat-val">${[...new Set(matrix.map(a=>a.religion).filter(r=>r!=="none"))].length}</span>Religious markers</div>
  </div>
  <div class="controls">
    <input type="text" id="search"
           placeholder="Filter: wheelchair, hijab, elder, brown..."
           oninput="filterCards(this.value)">
    <span class="count" id="count">${matrix.length} shown</span>
  </div>
  <div class="grid" id="grid">
    ${cards}
  </div>

<script>
function filterCards(query) {
  const q = query.toLowerCase().trim();
  const cards = document.querySelectorAll('.card');
  let visible = 0;
  cards.forEach(card => {
    const tags = card.dataset.tags.toLowerCase();
    const show = !q || tags.includes(q);
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  document.getElementById('count').textContent = visible + ' shown';
}
</script>
</body>
</html>`;
}
