# Chibi Avatar Inclusive Design System

A scalable SVG avatar library built for the FC ecosystem — 60+ auto-generated characters spanning 6 identity dimensions, composed by a modular JavaScript engine and validated through emotional design testing.

---

## Live demo

> Open `preview/index.html` in your browser after running the generator — searchable gallery with all avatars and identity tags.

---

## What it does

One command builds an entire avatar library from scratch:

```bash
node generate.js
```

It reads the diversity matrix, assembles each avatar from interchangeable SVG components (head, hair, body, accessories), writes 60+ individual `.svg` files, and rebuilds the browser gallery — all automatically.

---

## Project structure

```
UNLOX-UIUX-ChibiProject/
├── src/
│   ├── constants.js        ← all visual parameters (edit here to customize)
│   ├── components.js       ← SVG shapes: hair, body, accessories
│   ├── buildFace.js        ← eyes, blush, mouth functions
│   ├── buildAvatar.js      ← avatar composer
│   └── generateMatrix.js   ← diversity matrix logic
├── output/                 ← generated SVG files (auto-created)
├── preview/                ← browser gallery (auto-updated)
│   └── index.html
├── data/
│   └── diversity_matrix.json
└── generate.js             ← entry point — run this
```

---

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/sarayuvakkala/UNLOX-UIUX-ChibiProject.git
cd UNLOX-UIUX-ChibiProject/

# 2. Install preview server (one-time)
npm install -g live-server

# 3. Generate all avatars
node generate.js

# 4. Open the gallery
live-server preview/
```

---

## Core modules

### 1. Intersectional Diversity Matrix

Before any drawing, a combinatory framework maps every identity dimension and generates guaranteed-coverage combinations — ensuring rare intersections (e.g. non-binary + wheelchair + hijab) are as intentional as common ones.

| Dimension | Options |
|---|---|
| Skin tone | light, medium, tan, brown, deep |
| Gender expression | female, male, non-binary, agender |
| Disability | none, wheelchair, hearing aid, glasses, cane |
| Religion / culture | none, hijab, turban, kippah, bindi |
| Age group | child, teen, adult, elder |
| Body type | slim, average, plus-size |

### 2. Chibi Style Standardization

All avatars follow mathematical proportion rules defined in `src/constants.js`:

- **2-head-height body** — total height = 2× head height
- **Eyes at 55% of head height** — lower than realism, encodes "cute"
- **Mandatory blush circles** — trigger warmth response
- **Shine highlight on every eye** — offset white dot makes eyes feel alive

### 3. Scalable Vector Architecture

Avatars are clean SVG code, not rasterized images. Each file uses CSS custom properties for theming:

```svg
<svg style="--skin:#F1C27D; --hair:#2C1810; --shirt:#FFB347;">
```

This means any avatar can be restyled from outside with a single CSS rule — no SVG editing required.

### 4. Modular Asset System

Every avatar is assembled from independent component groups:

```
layer-body → layer-head → layer-hair → layer-face → layer-accessories
```

Components are interchangeable SVG strings. Swapping a hair style or adding a wheelchair is one line of JavaScript — no redrawing.

### 5. Emotional Design Validation

A testing protocol measures the "8 out of 10 joy" metric. Participants rate each avatar on three axes (Cuteness, Comfort, Relatability). A weighted joy score is calculated:

```
Joy = (Cuteness × 0.40) + (Comfort × 0.35) + (Relatability × 0.25)
```

Designs scoring below 8.0 are iterated before release.

---

## Customization

All visual parameters live in one file: `src/constants.js`

| Property | What changes | Example values |
|---|---|---|
| `EYE_RX` / `EYE_RY` | Eye width and height | `11, 12` → `15, 18` for anime |
| `MOUTH_QY` | Smile size | `114` default · `120` big grin · `106` flat |
| `BLUSH_OPACITY` | Blush intensity | `0` none · `0.55` default · `0.8` heavy |
| `OUTLINE_W` | Line thickness | `1` clean · `2` default · `3.5` bold cartoon |
| `HEAD_RX` / `HEAD_RY` | Face shape | `52, 50` round · `44, 44` narrow |
| `BODY_RX` | Body width | `25` slim · `33` average · `42` plus-size |
| `SKIN` | Skin tone palette | Add any hex colour as a new key |
| `HAIR_COLORS` | Hair colour options | Add fantasy colours freely |

Edit → save → `node generate.js` → all 60 avatars update instantly.

---

## Deliverables

| # | Deliverable | File |
|---|---|---|
| 1 | SVG Library | `output/avatar_001.svg` … `avatar_060.svg` |
| 2 | Diversity Matrix | `data/diversity_matrix.json` |
| 3 | Style Guide | `src/constants.js` + this README |
| 4 | UX Report | Survey template in `data/` |

---

## Tech stack

`SVG` · `JavaScript (ES Modules)` · `Node.js` · `CSS Custom Properties` · `Git`

---

## Project objective

To create a scalable, emotionally positive, and radically inclusive visual identity system that uses the technical benefits of vector graphics to ensure every user feels authentically represented in the digital product.

---

*Built as a major UI/UX project for the FC ecosystem · Unilox Academy*