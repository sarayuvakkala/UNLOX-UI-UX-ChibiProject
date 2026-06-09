// ============================================================
// components.js — All SVG shapes (hair, body, accessories)
// Edit the path/shape strings to change how parts look
// ============================================================
import { CHIBI } from "./constants.js";

const C = CHIBI; // shorthand

// ── HAIR STYLES ────────────────────────────────────────────────
// Each value is a raw SVG string. "var(--hair)" uses the CSS variable
// set on the parent SVG element — auto-changes with each avatar.
export const HAIR = {

  short: `
    <ellipse cx="60" cy="56" rx="49" ry="26" fill="var(--hair)"/>
    <path d="M13,80 Q10,60 14,50 Q18,40 28,54 Z" fill="var(--hair)"/>
    <path d="M107,80 Q110,60 106,50 Q102,40 92,54 Z" fill="var(--hair)"/>`,

  long: `
    <path d="M12,88 Q12,40 60,36 Q108,40 108,88 L112,160 Q85,180 60,182 Q35,180 8,160 Z"
          fill="var(--hair)"/>`,

  bun: `
    <ellipse cx="60" cy="56" rx="40" ry="20" fill="var(--hair)"/>
    <circle cx="60" cy="38" r="16" fill="var(--hair)"/>
    <circle cx="60" cy="38" r="8" fill="var(--hair)" opacity="0.7"/>`,

  curly: `
    <ellipse cx="60" cy="55" rx="50" ry="28" fill="var(--hair)"/>
    <circle cx="22" cy="70" r="12" fill="var(--hair)"/>
    <circle cx="98" cy="70" r="12" fill="var(--hair)"/>
    <circle cx="35" cy="58" r="10" fill="var(--hair)"/>
    <circle cx="85" cy="58" r="10" fill="var(--hair)"/>`,

  // ── Religious head coverings (override hair slot) ───────────
  hijab: `
    <path d="M10,94 Q10,32 60,28 Q110,32 110,94 L116,138
             Q84,158 60,160 Q36,158 4,138 Z"
          fill="var(--hijab)"/>
    <ellipse cx="60" cy="60" rx="46" ry="34" fill="var(--skin)"/>`,

  turban: `
    <ellipse cx="60" cy="54" rx="50" ry="32" fill="var(--turban)"/>
    <rect x="10" y="68" width="100" height="18" rx="9" fill="var(--turban)"/>
    <ellipse cx="60" cy="54" rx="18" ry="6" fill="var(--turban)" opacity="0.6"/>`,
};

// ── BODY TYPES ─────────────────────────────────────────────────
export const BODIES = {

  // Shirt body — adjust RX in constants.js or override here
  casual: (rx = C.BODY_RX) => `
    <ellipse cx="60" cy="${C.BODY_CY}" rx="${rx}" ry="${C.BODY_RY}"
             fill="var(--shirt)"
             stroke="${C.OUTLINE_COLOR}" stroke-width="${C.OUTLINE_W}"/>`,

  // Collar detail for formal look
  formal: (rx = C.BODY_RX) => `
    <rect x="${60 - rx}" y="120" width="${rx * 2}" height="70" rx="8"
          fill="var(--shirt)"
          stroke="${C.OUTLINE_COLOR}" stroke-width="${C.OUTLINE_W}"/>
    <polygon points="60,120 50,142 60,140 70,142" fill="white" stroke="#ccc" stroke-width="1"/>`,
};

// ── ACCESSORIES ────────────────────────────────────────────────
export const ACCESSORIES = {

  glasses: `
    <circle cx="${C.EYE_L_CX}" cy="${C.EYE_CY}" r="14"
            fill="rgba(200,220,255,${C.GLASSES_LENS_OPACITY})"
            stroke="${C.GLASSES_COLOR}" stroke-width="1.5"/>
    <circle cx="${C.EYE_R_CX}" cy="${C.EYE_CY}" r="14"
            fill="rgba(200,220,255,${C.GLASSES_LENS_OPACITY})"
            stroke="${C.GLASSES_COLOR}" stroke-width="1.5"/>
    <line x1="${C.EYE_L_CX + 14}" y1="${C.EYE_CY}"
          x2="${C.EYE_R_CX - 14}" y2="${C.EYE_CY}"
          stroke="${C.GLASSES_COLOR}" stroke-width="1.5"/>
    <line x1="${C.EYE_L_CX - 14}" y1="${C.EYE_CY}" x2="10" y2="${C.EYE_CY - 2}"
          stroke="${C.GLASSES_COLOR}" stroke-width="1.2"/>
    <line x1="${C.EYE_R_CX + 14}" y1="${C.EYE_CY}" x2="110" y2="${C.EYE_CY - 2}"
          stroke="${C.GLASSES_COLOR}" stroke-width="1.2"/>`,

  hearingAid: `
    <path d="M16,${C.EYE_CY} Q12,${C.EYE_CY - 6} 14,${C.EYE_CY - 12}
             Q18,${C.EYE_CY - 18} 24,${C.EYE_CY - 10}"
          fill="none" stroke="${C.HEARING_AID_COLOR}"
          stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="14" cy="${C.EYE_CY + 2}" r="3" fill="${C.HEARING_AID_COLOR}"/>`,

  wheelchair: `
    <circle cx="42" cy="185" r="11" fill="none"
            stroke="${C.WHEELCHAIR_COLOR}" stroke-width="2"/>
    <circle cx="42" cy="185" r="3" fill="${C.WHEELCHAIR_COLOR}"/>
    <circle cx="78" cy="185" r="11" fill="none"
            stroke="${C.WHEELCHAIR_COLOR}" stroke-width="2"/>
    <circle cx="78" cy="185" r="3" fill="${C.WHEELCHAIR_COLOR}"/>
    <path d="M42,174 L60,172 L72,185" fill="none"
          stroke="${C.WHEELCHAIR_COLOR}" stroke-width="2" stroke-linecap="round"/>
    <path d="M60,172 L60,158 L74,150" fill="none"
          stroke="${C.WHEELCHAIR_COLOR}" stroke-width="2" stroke-linecap="round"/>
    <path d="M36,174 L56,174" fill="none"
          stroke="${C.WHEELCHAIR_COLOR}" stroke-width="2" stroke-linecap="round"/>`,

  cane: `
    <path d="M82,152 L90,192" stroke="${C.CANE_COLOR}"
          stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M86,194 Q90,198 94,193"
          fill="none" stroke="${C.CANE_COLOR}"
          stroke-width="2.5" stroke-linecap="round"/>`,

  kippah: `
    <path d="M36,58 Q48,36 60,34 Q72,36 84,58 Q72,48 60,48 Q48,48 36,58 Z"
          fill="${C.KIPPAH_COLOR}"/>`,

  bindi: `
    <circle cx="60" cy="73" r="3.5" fill="${C.BINDI_COLOR}"/>`,

  // No accessory — empty string
  none: ``,
};
