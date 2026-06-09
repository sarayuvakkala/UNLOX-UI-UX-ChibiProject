// ============================================================
// buildAvatar.js — Composes one complete SVG from a spec object
// spec = one row from the diversity matrix JSON
// ============================================================
import { CHIBI } from "./constants.js";
import { HAIR, BODIES, ACCESSORIES } from "./components.js";
import { buildEyes, buildBlush, buildMouth } from "./buildFace.js";

const C = CHIBI;

// Random pick helper
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildAvatar(spec) {
  const {
    id,
    skinTone    = "medium",
    gender      = "female",
    disability  = "none",
    religion    = "none",
    ageGroup    = "adult",
    bodyType    = "average",
    hairStyle   = "short",
  } = spec;

  // ── Resolve colors ─────────────────────────────────────────
  const skinColor  = C.SKIN[skinTone] || C.SKIN.medium;
  const hairColor  = pick(Object.values(C.HAIR_COLORS));
  const shirtColor = pick(C.SHIRT_COLORS);
  const eyeColor   = pick(["#3D2B1F", "#1A6B3C", "#1E3A8A", "#5C3317"]);

  // ── Resolve body width based on bodyType ───────────────────
  const bodyWidths = { slim: 25, average: C.BODY_RX, plus: 42 };
  const bodyRX = bodyWidths[bodyType] || C.BODY_RX;

  // ── Resolve hair layer ─────────────────────────────────────
  // Religious head coverings override hair
  let hairLayer = "";
  if (religion === "hijab")  hairLayer = HAIR.hijab;
  else if (religion === "turban") hairLayer = HAIR.turban;
  else hairLayer = HAIR[hairStyle] || HAIR.short;

  // ── Resolve disability accessories ────────────────────────
  let disabilityLayer = ACCESSORIES[disability] || ACCESSORIES.none;

  // ── Resolve religious accessories (bindi, kippah) ─────────
  let religionLayer = "";
  if (religion === "kippah") religionLayer = ACCESSORIES.kippah;
  if (religion === "bindi")  religionLayer = ACCESSORIES.bindi;

  // ── Age adjustments ────────────────────────────────────────
  // These tweak eye/body position slightly per age
  let eyeOffset = 0;
  if (ageGroup === "child") eyeOffset = 4;   // lower eyes = younger face
  if (ageGroup === "elder") eyeOffset = -2;  // slightly higher

  // ── Build aria-label for accessibility ────────────────────
  const desc = [ageGroup, skinTone, "skin", gender,
    disability !== "none" ? `with ${disability}` : "",
    religion   !== "none" ? `wearing ${religion}` : "",
  ].filter(Boolean).join(", ");

  // ── Assemble SVG ──────────────────────────────────────────
  return `<svg
  id="${id}"
  viewBox="0 0 ${C.CANVAS_W} ${C.CANVAS_H}"
  xmlns="http://www.w3.org/2000/svg"
  style="
    --skin:${skinColor};
    --hair:${hairColor};
    --shirt:${shirtColor};
    --hijab:${C.HIJAB_COLOR};
    --turban:${C.TURBAN_COLOR};
  "
  role="img"
  aria-label="Chibi avatar: ${desc}">

  <title>${desc}</title>

  <!-- LAYER ORDER: body → head → hair → face → accessories -->
  <!-- (later layers render on top)                          -->

  <!-- 1. BODY -->
  <g id="layer-body">
    ${BODIES.casual(bodyRX)}
  </g>

  <!-- 2. HEAD -->
  <g id="layer-head">
    <ellipse
      cx="${C.HEAD_CX}" cy="${C.HEAD_CY}"
      rx="${C.HEAD_RX}" ry="${C.HEAD_RY}"
      fill="var(--skin)"
      stroke="${C.OUTLINE_COLOR}" stroke-width="${C.OUTLINE_W}"/>
  </g>

  <!-- 3. HAIR / HEAD COVERING -->
  <g id="layer-hair">
    ${hairLayer}
  </g>

  <!-- 4. FACE FEATURES -->
  <g id="layer-face">
    ${buildEyes(eyeColor)}
    ${buildBlush()}
    ${buildMouth()}
    <!-- Uncomment next line to add a nose: -->
    <!-- ${/* buildNose() */""}             -->
  </g>

  <!-- 5. RELIGIOUS ACCESSORIES (bindi, kippah) -->
  <g id="layer-religion">
    ${religionLayer}
  </g>

  <!-- 6. DISABILITY ACCESSORIES -->
  <g id="layer-disability">
    ${disabilityLayer}
  </g>

</svg>`;
}
