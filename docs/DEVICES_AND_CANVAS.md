# 📱 Devices, Tablets & Canvas Engine

This document details the supported device catalog, vector mockup bezel rendering, and tablet layout adaptations.

---

## 1. Supported Device Matrix

SnapFrame provides pre-configured, pixel-perfect device models for both Apple and Android ecosystems.

### Apple Devices (iOS & iPadOS):
| Device Model | Canvas Resolution | Aspect Ratio | Screen Type | Available Colors |
| :--- | :--- | :--- | :--- | :--- |
| **iPhone 17 Pro** | 1320 × 2868 px | 19.5:9 | Dynamic Island | Black, White, Natural, Desert Titanium |
| **iPhone 16 Pro** | 1320 × 2868 px | 19.5:9 | Dynamic Island | Black, White, Natural, Desert Titanium |
| **iPhone 16** | 1290 × 2796 px | 19.5:9 | Dynamic Island | Black, White, Pink, Teal, Ultramarine |
| **iPhone 15 Pro** | 1290 × 2796 px | 19.5:9 | Dynamic Island | Black, White, Natural, Blue Titanium |
| **iPhone 14** | 1170 × 2532 px | 19.5:9 | Notch | Midnight, Starlight, Blue, Purple, Red |
| **iPad Pro 13"** | 2048 × 2732 px | 4:3 | Slim Bezel / Tablet | Space Black, Silver |

### Android Devices (Phones & Tablets):
| Device Model | Canvas Resolution | Aspect Ratio | Screen Type | Available Colors |
| :--- | :--- | :--- | :--- | :--- |
| **Google Pixel 10 Pro** | 1080 × 2424 px | 20:9 | Center Hole-Punch | Obsidian, Porcelain, Hazel, Rose Quartz |
| **Google Pixel 9 Pro** | 1080 × 2424 px | 20:9 | Center Hole-Punch | Obsidian, Porcelain, Hazel, Rose Quartz |
| **Samsung Galaxy S25 Ultra** | 1440 × 3120 px | 19.5:9 | Center Hole-Punch | Titanium Black, Gray, Silverblue, Whitesilver |
| **Samsung Galaxy S24 Ultra** | 1440 × 3120 px | 19.5:9 | Center Hole-Punch | Titanium Black, Gray, Violet, Yellow |
| **Samsung Galaxy Tab S9 Ultra** | 1848 × 2960 px | 16:10 | Mini Notch / Tablet | Graphite, Beige |
| **Samsung Galaxy Tab S7 / S8** | 1600 × 2560 px | 16:10 | Slim Bezel / Tablet | Mystic Black, Mystic Silver |
| **Samsung Galaxy Tab A** | 1200 × 1920 px | 16:10 | Slim Bezel / Tablet | Dark Gray, Silver |

---

## 2. Vector Bezel & Frame Rendering

Device frames in SnapFrame are rendered via **mathematical 2D Canvas vector paths** rather than static raster bitmapped images:

1. **Bezel Ratio Scaling:** Calculated as `physicalW * bezelRatio` for authentic physical frame proportions.
2. **Squircle & Corner Radiuses:** Matches the exact iOS and Android hardware squircle radius.
3. **Hardware Buttons:** Renders metallic titanium gradients for volume rockers, power buttons, and action buttons.
4. **Notch & Dynamic Island:**
   - *Dynamic Island:* Pill-shaped cutout with camera aperture and ambient light sensors.
   - *Hole-Punch:* Centered circular camera cutout with sub-pixel anti-aliasing.
   - *Tablet Mini-Notch:* Proportional top-edge cutout for ultra-thin tablet bezels.

---

## 3. Official Color Mapping (`COLOR_HEX_MAP`)

All devices use curated, manufacturer-accurate color tokens in [devices.ts](file:///b:/workgit/simple-screenshot-market/src/lib/devices.ts):

```typescript
export const COLOR_HEX_MAP: Record<string, string> = {
  // Apple Titanium
  "black titanium": "#1c1b1f",
  "white titanium": "#e3e4e6",
  "natural titanium": "#9f9a94",
  "desert titanium": "#cbb29e",
  "blue titanium": "#3b4454",
  
  // Apple iPhone 16
  "ultramarine": "#4459b7",
  "teal": "#8cb5b5",
  "pink": "#e8a7ba",

  // Google Pixel
  "obsidian": "#28292c",
  "porcelain": "#f1eee9",
  "hazel": "#828679",
  "rose quartz": "#e8d2cb",

  // Samsung Galaxy
  "titanium black": "#1f1f21",
  "titanium gray": "#7b7b7f",
  "titanium silverblue": "#5b6d82",
  "graphite": "#262626",
};
```

---

## 4. Multi-Set Proportional Adaptation

When switching between phone and tablet sets or adding new platforms:
- **Phone Sets (9:16 / 19.5:9):** Optimized for single-handed mobile scanning with centered or top typography.
- **Tablet Sets (4:3 / 16:10):** Expands horizontal canvas real estate, balances typography margins, and scales screenshot frames to eliminate awkward letterboxing.
