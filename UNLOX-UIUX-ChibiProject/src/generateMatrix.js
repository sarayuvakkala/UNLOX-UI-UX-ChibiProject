// ============================================================
// generateMatrix.js — Creates the diversity_matrix.json
// ============================================================
import { DIMENSIONS } from "./constants.js";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMatrix(count = 60) {
  const keys = Object.keys(DIMENSIONS);
  const avatars = [];
  const seen = new Set();

  // Pass 1: guarantee every value appears at least once
  keys.forEach(key => {
    DIMENSIONS[key].forEach(val => {
      const spec = {};
      keys.forEach(k => spec[k] = pick(DIMENSIONS[k]));
      spec[key] = val; // force this value
      avatars.push(spec);
    });
  });

  // Pass 2: fill remaining with random combos
  let attempts = 0;
  while (avatars.length < count && attempts < count * 10) {
    attempts++;
    const spec = {};
    keys.forEach(k => spec[k] = pick(DIMENSIONS[k]));
    const key = JSON.stringify(spec);
    if (!seen.has(key)) {
      seen.add(key);
      avatars.push(spec);
    }
  }

  // Add unique IDs
  return avatars.slice(0, count).map((spec, i) => ({
    id: `avatar_${String(i + 1).padStart(3, "0")}`,
    ...spec,
  }));
}
