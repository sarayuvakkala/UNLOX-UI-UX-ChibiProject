// ============================================================
// buildFace.js — Eye, blush, mouth drawing functions
// Tweak constants.js values to change how these look
// ============================================================
import { CHIBI } from "./constants.js";

const C = CHIBI;

// ── BUILD ONE EYE ──────────────────────────────────────────────
// cx, cy = center position. eyeColor = hex string for iris
export function buildEye(cx, cy, eyeColor = "#3D2B1F") {
  const shineX = cx + C.SHINE_OX;
  const shineY = cy + C.SHINE_OY;
  return `
    <ellipse cx="${cx}" cy="${cy}"
             rx="${C.EYE_RX}" ry="${C.EYE_RY}"
             fill="white"
             stroke="${C.OUTLINE_COLOR}" stroke-width="1.2"/>
    <ellipse cx="${cx}" cy="${cy + 2}"
             rx="${C.PUPIL_R}" ry="${C.PUPIL_R * 1.1}"
             fill="${eyeColor}"/>
    <ellipse cx="${shineX}" cy="${shineY}"
             rx="${C.SHINE_R}" ry="${C.SHINE_R}"
             fill="white" opacity="0.9"/>`;
  // To make WINKING eye: replace top ellipse with:
  // <path d="M${cx-RX},${cy} Q${cx},${cy-4} ${cx+RX},${cy}"
  //       fill="none" stroke="${C.OUTLINE_COLOR}" stroke-width="1.5"
  //       stroke-linecap="round"/>
}

// ── BUILD BOTH EYES ────────────────────────────────────────────
export function buildEyes(eyeColor = "#3D2B1F") {
  return `
    <g id="eyes">
      ${buildEye(C.EYE_L_CX, C.EYE_CY, eyeColor)}
      ${buildEye(C.EYE_R_CX, C.EYE_CY, eyeColor)}
    </g>`;
}

// ── BUILD BLUSH ────────────────────────────────────────────────
export function buildBlush() {
  const lx = C.HEAD_CX - C.BLUSH_OFFSET;
  const rx = C.HEAD_CX + C.BLUSH_OFFSET;
  return `
    <g id="blush">
      <ellipse cx="${lx}" cy="${C.BLUSH_Y}"
               rx="${C.BLUSH_RX}" ry="${C.BLUSH_RY}"
               fill="${C.BLUSH_COLOR}" opacity="${C.BLUSH_OPACITY}"/>
      <ellipse cx="${rx}" cy="${C.BLUSH_Y}"
               rx="${C.BLUSH_RX}" ry="${C.BLUSH_RY}"
               fill="${C.BLUSH_COLOR}" opacity="${C.BLUSH_OPACITY}"/>
    </g>`;
}

// ── BUILD MOUTH ────────────────────────────────────────────────
export function buildMouth() {
  // Quadratic bezier smile:
  // M = start point, Q = control point (curves it), end point
  // Change MOUTH_QY in constants.js to adjust smile size
  return `
    <path id="mouth"
          d="M${C.MOUTH_X1},${C.MOUTH_Y}
             Q${C.MOUTH_QX},${C.MOUTH_QY}
             ${C.MOUTH_X2},${C.MOUTH_Y}"
          fill="none"
          stroke="${C.OUTLINE_COLOR}"
          stroke-width="${C.MOUTH_STROKE_W}"
          stroke-linecap="round"/>`;
}

// ── BUILD NOSE (optional — off by default) ─────────────────────
export function buildNose() {
  // Uncomment in buildAvatar.js to add a simple nose dot
  const nx = C.HEAD_CX;
  const ny = (C.EYE_CY + C.MOUTH_Y) / 2;
  return `
    <ellipse cx="${nx}" cy="${ny}" rx="2.5" ry="2"
             fill="${C.OUTLINE_COLOR}" opacity="0.3"/>`;
}
