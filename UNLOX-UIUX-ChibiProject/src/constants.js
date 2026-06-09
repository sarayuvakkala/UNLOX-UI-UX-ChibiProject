// ============================================================
// constants.js — THE SINGLE FILE TO CUSTOMIZE YOUR AVATARS
// Change any number, run: node generate.js
// ============================================================

export const CHIBI = {

  // ── CANVAS ─────────────────────────────────────────────────
  // The SVG viewBox size. Don't change unless you redesign all coordinates.
  CANVAS_W: 120,
  CANVAS_H: 200,

  // ── HEAD ───────────────────────────────────────────────────
  HEAD_RX: 40,          // horizontal radius — bigger = wider face
  HEAD_RY: 46,          // vertical radius   — bigger = taller face
  HEAD_CX: 60,          // horizontal center (keep at 60 = centered)
  HEAD_CY: 85,          // vertical center   — lower = more body shows

  // ── BODY ───────────────────────────────────────────────────
  BODY_RX: 33,          // width  — 25=slim, 33=average, 42=plus-size
  BODY_RY: 42,          // height — increase for taller torso
  BODY_CY: 155,         // vertical center — leave 20-30px gap from head bottom

  // ── EYES ───────────────────────────────────────────────────
  EYE_RX:   11,         // eye width   — 8=small, 11=default, 15=anime-large
  EYE_RY:   12,         // eye height  — 6=squint, 12=default, 18=round
  EYE_L_CX: 44,         // LEFT eye x  — move left/right
  EYE_R_CX: 76,         // RIGHT eye x — keep as (120 - EYE_L_CX) for symmetry
  EYE_CY:   84,         // both eyes y — 80=higher(mature), 90=lower(baby)
  PUPIL_R:  5,          // pupil size  — 3=small, 5=default, 7=dramatic
  SHINE_R:  2.5,        // sparkle dot — 0=remove, 2.5=default, 4=anime
  SHINE_OX: 3,          // sparkle x offset from pupil center
  SHINE_OY: -2,         // sparkle y offset — negative = up (keep negative)

  // ── MOUTH ──────────────────────────────────────────────────
  MOUTH_X1: 52,         // left end x of smile curve
  MOUTH_X2: 68,         // right end x of smile curve
  MOUTH_Y:  106,        // y of both ends (start/end height)
  MOUTH_QX: 60,         // control point x (keep centered)
  MOUTH_QY: 114,        // control point y — 106=flat, 114=smile, 120=big grin
  MOUTH_STROKE_W: 1.8,  // mouth line thickness

  // ── BLUSH ──────────────────────────────────────────────────
  BLUSH_RX:      9,     // blush width  — 6=subtle, 9=default, 14=chunky
  BLUSH_RY:      5.5,   // blush height
  BLUSH_Y:       97,    // y position   — keep a few px below EYE_CY
  BLUSH_OFFSET:  28,    // distance from face center — bigger = wider apart
  BLUSH_COLOR:  "#FF9999",  // blush color hex
  BLUSH_OPACITY: 0.55,  // 0=invisible, 0.3=subtle, 0.55=default, 0.8=heavy

  // ── OUTLINES ───────────────────────────────────────────────
  OUTLINE_W:     2,     // 1=thin/clean, 2=default, 3=bold cartoon
  OUTLINE_COLOR: "#333333", // try "#000000" (jet black) or "#2D1B69" (purple-ink)

  // ── SKIN TONES ─────────────────────────────────────────────
  // Add more keys here and use them in diversity matrix
  SKIN: {
    light:     "#FFDBBD",
    medium:    "#F1C27D",
    tan:       "#E0AC69",
    brown:     "#C68642",
    deep:      "#8D5524",
  },

  // ── HAIR COLORS ────────────────────────────────────────────
  // Add any hex color — black, fantasy colors, anything works
  HAIR_COLORS: {
    black:     "#2C1810",
    dark_brown:"#6B3A2A",
    auburn:    "#8B2500",
    golden:    "#D4A017",
    platinum:  "#E8E8E8",
    grey:      "#888888",
    // Fantasy extras — uncomment to enable:
    // blue:   "#1C3A8A",
    // pink:   "#E75480",
    // purple: "#6B21A8",
  },

  // ── CLOTHING COLORS ────────────────────────────────────────
  // Shuffled randomly per avatar. Add/remove as you like.
  SHIRT_COLORS: [
    "#FFB347", // orange
    "#6B8CDA", // blue
    "#5CB85C", // green
    "#D9534F", // red
    "#9B59B6", // purple
    "#1ABC9C", // teal
    "#F39C12", // yellow
    "#E91E8C", // pink
  ],

  // ── ACCESSORY + RELIGIOUS MARKER COLORS ────────────────────
  HIJAB_COLOR:       "#4A90D9",
  TURBAN_COLOR:      "#E8B84B",
  GLASSES_COLOR:     "#555555",
  GLASSES_LENS_OPACITY: 0.1,
  HEARING_AID_COLOR: "#C4873A",
  CANE_COLOR:        "#8B6914",
  WHEELCHAIR_COLOR:  "#666666",
  BINDI_COLOR:       "#C41E3A",
  KIPPAH_COLOR:      "#1A3A6B",
};

// ── IDENTITY DIMENSIONS ────────────────────────────────────────
// These drive the diversity matrix. Add/remove options freely.
export const DIMENSIONS = {
  skinTone:   ["light", "medium", "tan", "brown", "deep"],
  gender:     ["female", "male", "nonbinary", "agender"],
  disability: ["none", "none", "none", "wheelchair", "hearingAid", "glasses", "cane"],
  // "none" appears 3x so it's more common — adjust frequency by repeating
  religion:   ["none", "none", "none", "hijab", "turban", "kippah", "bindi"],
  ageGroup:   ["child", "teen", "adult", "adult", "elder"],
  bodyType:   ["slim", "average", "average", "plus"],
  hairStyle:  ["short", "long", "bun", "curly"],
};
