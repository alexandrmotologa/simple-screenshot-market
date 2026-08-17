import json
import math

SCREEN_W = 1290.0
SCREEN_H = 2796.0

def rgb_to_hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(int(r*255), int(g*255), int(b*255))

def figma_gradient_to_direction(handles):
    if not handles or len(handles) < 2:
        return "to-b"
    dx = handles[1]["x"] - handles[0]["x"]
    dy = handles[1]["y"] - handles[0]["y"]
    angle = math.degrees(math.atan2(dy, dx))
    if   -22.5 <= angle < 22.5:    return "to-r"
    elif  22.5 <= angle < 67.5:    return "to-br"
    elif  67.5 <= angle < 112.5:   return "to-b"
    elif  112.5 <= angle < 157.5:  return "to-bl"
    elif  abs(angle) >= 157.5:     return "to-r"
    elif -157.5 <= angle < -112.5: return "to-tl"
    elif -112.5 <= angle < -67.5:  return "to-b"
    elif  -67.5 <= angle < -22.5:  return "to-tr"
    return "to-b"

def extract_frame_background(frame):
    fills = frame.get("fills", [])
    for fill in fills:
        ftype = fill.get("type")
        if ftype == "SOLID":
            c = fill.get("color", {})
            if c.get("a", 1.0) > 0.01:
                return {"type": "solid", "color": rgb_to_hex(c.get("r",0), c.get("g",0), c.get("b",0))}
        elif ftype == "GRADIENT_LINEAR":
            handles = fill.get("gradientHandlePositions", [])
            stops   = fill.get("gradientStops", [])
            if stops:
                direction = figma_gradient_to_direction(handles)
                gradient_stops = []
                for s in stops:
                    c = s.get("color", {})
                    gradient_stops.append({
                        "color": rgb_to_hex(c.get("r",0), c.get("g",0), c.get("b",0)),
                        "position": round(s.get("position", 0) * 100)
                    })
                return {"type": "gradient", "gradient": {"direction": direction, "stops": gradient_stops}}
    if "backgroundColor" in frame:
        c = frame["backgroundColor"]
        if c.get("a", 0) > 0.01:
            return {"type": "solid", "color": rgb_to_hex(c.get("r",0), c.get("g",0), c.get("b",0))}
    return {"type": "solid", "color": "#1a1a2e"}

def get_overlapping_screens(x, y, w, h, total_screens=10):
    """Return all screen indices that this shape (in frame-local coords) overlaps."""
    overlapping = []
    for idx in range(total_screens):
        slot_x = idx * SCREEN_W
        overlap_x_start = max(x, slot_x)
        overlap_x_end   = min(x + w, slot_x + SCREEN_W)
        if overlap_x_end > overlap_x_start:  # positive overlap
            overlapping.append(idx)
    return overlapping

def is_exact_screen_bg(x, y, w, h, screen_idx):
    """
    True only when the shape exactly covers one screen slot.
    Position must be at (0,0) of the slot and size ~= SCREEN_W x SCREEN_H.
    """
    slot_x = screen_idx * SCREEN_W
    local_x = x - slot_x
    pos_ok   = abs(local_x) < 30 and abs(y) < 100
    size_ok  = abs(w - SCREEN_W) < 60 and abs(h - SCREEN_H) < 200
    return pos_ok and size_ok

def get_fill_info(fills):
    for fill in fills:
        ftype = fill.get("type")
        if ftype == "SOLID":
            c = fill.get("color", {})
            if c.get("a", 1.0) > 0.01:
                return "solid", rgb_to_hex(c["r"], c["g"], c["b"]), None
        elif ftype == "GRADIENT_LINEAR":
            handles = fill.get("gradientHandlePositions", [])
            stops   = fill.get("gradientStops", [])
            if stops:
                direction = figma_gradient_to_direction(handles)
                gradient_stops = [{"color": rgb_to_hex(s["color"].get("r",0), s["color"].get("g",0), s["color"].get("b",0)), "position": round(s.get("position",0)*100)} for s in stops]
                return "gradient", None, {"direction": direction, "stops": gradient_stops}
    return None, None, None

def extract_bg_shapes_and_screen_colors(frame, frame_box, template_num, base_bg, total_screens):
    """
    Processes BACKGROUND/BACKGROUNDS group.
    ONLY detects per-screen background colors (solid or gradient).
    Does NOT generate shape layers — shapes in BACKGROUND are either
    full-screen background fills or Figma's own phone-frame graphics.
    """
    screen_backgrounds = {}

    bg_group = next((c for c in frame["children"] if c["name"] in ("BACKGROUND", "BACKGROUNDS")), None)
    if not bg_group:
        return screen_backgrounds, {}

    fx = frame_box["x"]
    fy = frame_box["y"]

    def process_node(node, depth=0):
        if depth > 4:
            return
        ntype = node.get("type", "")
        bbox  = node.get("absoluteBoundingBox")
        fills = node.get("fills", [])

        if bbox and fills and ntype in ("RECTANGLE", "VECTOR", "ELLIPSE", "FRAME", "BOOLEAN_OPERATION"):
            fill_type, fill_color, fill_gradient = get_fill_info(fills)
            if fill_type:
                x = bbox["x"] - fx
                y = bbox["y"] - fy
                w = bbox["width"]
                h = bbox["height"]

                # Check overlap with each screen slot
                for sidx in range(total_screens):
                    slot_x = sidx * SCREEN_W
                    overlap_x = min(x + w, slot_x + SCREEN_W) - max(x, slot_x)
                    overlap_y = min(y + h, SCREEN_H) - max(y, 0)
                    if overlap_x <= 0 or overlap_y <= 0:
                        continue
                    coverage = (overlap_x * overlap_y) / (SCREEN_W * SCREEN_H)
                    # Only treat as per-screen background if covers ≥75% of the screen area
                    if coverage >= 0.75:
                        if fill_type == "solid":
                            screen_backgrounds[sidx] = {"type": "solid", "color": fill_color}
                        elif fill_type == "gradient":
                            screen_backgrounds[sidx] = {"type": "gradient", "gradient": fill_gradient}

        if ntype in ("GROUP", "FRAME", "BOOLEAN_OPERATION"):
            for child in node.get("children", []):
                process_node(child, depth + 1)

    for child in bg_group.get("children", []):
        process_node(child)

    return screen_backgrounds, {}


def extract_logo(frame, frame_box, template_num, total_screens):
    fx = frame_box["x"]
    fy = frame_box["y"]
    logo_node = None
    for child in frame["children"]:
        name = child.get("name", "").upper()
        if "LOGO" in name:
            logo_node = child
            break
    if not logo_node:
        return None
    bbox = logo_node.get("absoluteBoundingBox")
    if not bbox:
        return None
    x = bbox["x"] - fx
    y = bbox["y"] - fy
    w = bbox["width"]
    h = bbox["height"]
    cx = x + w / 2
    sidx = int(max(0, min(total_screens - 1, cx // SCREEN_W)))
    lx = x - sidx * SCREEN_W
    return {
        "screenIndex": sidx,
        "layer": {
            "id": "logo_{}".format(template_num),
            "type": "image",
            "x": round(lx, 2),
            "y": round(y, 2),
            "width": round(w, 2),
            "height": round(h, 2),
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": int(min(round(w * 0.22), 54)),
        }
    }

def extract_texts(frame, frame_box, template_num, total_screens):
    results = []
    fx = frame_box["x"]
    fy = frame_box["y"]
    texts_group = next((c for c in frame["children"] if c["name"] == "TEXTS"), None)
    if not texts_group:
        return results

    def process_text_node(node):
        if node["type"] in ("FRAME", "GROUP"):
            wrapper_bbox = node.get("absoluteBoundingBox")
            fills = node.get("fills", [])
            if wrapper_bbox and fills:
                shape_color = None
                for fill in fills:
                    if fill.get("type") == "SOLID":
                        c = fill.get("color", {})
                        if c.get("a", 1.0) > 0.01:
                            shape_color = rgb_to_hex(c["r"], c["g"], c["b"])
                            break
                if shape_color:
                    wx = wrapper_bbox["x"] - fx
                    wy = wrapper_bbox["y"] - fy
                    ww = wrapper_bbox["width"]
                    wh = wrapper_bbox["height"]
                    cx = wx + ww / 2
                    sidx = int(max(0, min(total_screens-1, cx // SCREEN_W)))
                    lx = wx - sidx * SCREEN_W
                    radius = node.get("cornerRadius", 0) or 0
                    results.append({
                        "screenIndex": sidx,
                        "layer": {
                            "id": "badge_{}_{}".format(template_num, node["id"].replace(":", "_")),
                            "type": "shape",
                            "shape": "rectangle",
                            "x": round(lx, 2),
                            "y": round(wy, 2),
                            "width": round(ww, 2),
                            "height": round(wh, 2),
                            "fill": shape_color,
                            "cornerRadius": round(radius, 1),
                            "rotation": 0,
                            "opacity": 1,
                        }
                    })
            for child in node.get("children", []):
                if child["type"] in ("TEXT", "FRAME", "GROUP"):
                    process_text_node(child)
            return
        if node["type"] != "TEXT":
            return
        bbox = node.get("absoluteBoundingBox")
        if not bbox:
            return
        x = bbox["x"] - fx
        y = bbox["y"] - fy
        w = bbox["width"]
        h = bbox["height"]
        cx = x + w / 2
        sidx = int(max(0, min(total_screens-1, cx // SCREEN_W)))
        lx = x - sidx * SCREEN_W
        style = node.get("style", {})
        font_size = style.get("fontSize", 80)
        font_family = style.get("fontFamily", "Inter")
        font_weight = style.get("fontWeight", 700)
        align_h = style.get("textAlignHorizontal", "CENTER").lower()
        if align_h == "justified":
            align_h = "left"
        letter_spacing = style.get("letterSpacing", -1.5)
        line_height_px = style.get("lineHeightPx", 0)
        line_height = (line_height_px / font_size) if line_height_px and font_size else 1.2
        text_content = node.get("characters", "")
        color_hex = "#ffffff"
        fills = node.get("fills", [])
        for fill in fills:
            if fill.get("type") == "SOLID":
                c = fill.get("color", {})
                color_hex = rgb_to_hex(c.get("r", 1), c.get("g", 1), c.get("b", 1))
                break
        layer_id = "text_{}_{}".format(template_num, node["id"].replace(":", "_").replace(";", "_").replace(",", "_"))
        results.append({
            "screenIndex": sidx,
            "layer": {
                "id": layer_id,
                "type": "text",
                "x": round(lx, 2),
                "y": round(y, 2),
                "width": round(w, 2),
                "height": round(h, 2),
                "content": text_content,
                "fontSize": round(font_size, 1),
                "fontFamily": font_family,
                "fontWeight": font_weight,
                "color": color_hex,
                "align": align_h,
                "lineHeight": round(max(1.0, line_height), 3),
                "letterSpacing": round(letter_spacing, 2),
                "rotation": 0,
                "opacity": 1,
            }
        })

    for child in texts_group.get("children", []):
        process_text_node(child)
    return results

def extract_devices(frame, frame_box, template_num, total_screens):
    fx = frame_box["x"]
    fy = frame_box["y"]
    devices_group = next((c for c in frame["children"] if c["name"] == "DEVICES"), None)
    if not devices_group:
        return []
    results = []
    for dev_node in devices_group.get("children", []):
        replace_rect = None
        for c in dev_node.get("children", []):
            name = c.get("name", "").upper()
            if "REPLACE" in name or "SCREENSHOT" in name:
                replace_rect = c
                break
        zone_node = replace_rect if replace_rect else dev_node
        zone_bbox = zone_node.get("absoluteBoundingBox")
        if not zone_bbox:
            continue
        x = zone_bbox["x"] - fx
        y = zone_bbox["y"] - fy
        w = zone_bbox["width"]
        h = zone_bbox["height"]
        transform = None
        rt = dev_node.get("relativeTransform")
        if rt:
            angle = math.degrees(math.atan2(rt[1][0], rt[0][0]))
            if abs(angle) > 0.5:
                transform = "rotate({}deg)".format(round(angle, 2))

        # Add mockup to ALL screens it meaningfully overlaps (>5% of screen width)
        min_overlap_px = SCREEN_W * 0.05
        for sidx in range(total_screens):
            slot_x = sidx * SCREEN_W
            overlap_x = min(x + w, slot_x + SCREEN_W) - max(x, slot_x)
            if overlap_x < min_overlap_px:
                continue
            local_x = x - sidx * SCREEN_W
            results.append({
                "screenIndex": sidx,
                "mockup": {
                    "x": round(local_x, 2),
                    "y": round(y, 2),
                    "width": round(w, 2),
                    "height": round(h, 2),
                    "transform": transform,
                }
            })
    return results


# ── Main ───────────────────────────────────────────────────────────────────────

with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

doc = data["document"]
iphone_page = next(p for p in doc["children"] if "iPhone" in p["name"])

frames = {}
for child in iphone_page["children"]:
    if child["name"].isdigit() and 1 <= int(child["name"]) <= 27:
        frames[int(child["name"])] = child

templates = []

for template_num in sorted(frames.keys()):
    frame = frames[template_num]
    frame_box = frame["absoluteBoundingBox"]

    # Count screens via Slice nodes
    slices = [c for c in frame["children"] if c["name"].startswith("Slice")]
    total_screens = max(len(slices), 8)

    base_bg = extract_frame_background(frame)
    screen_backgrounds, shape_layers_by_screen = extract_bg_shapes_and_screen_colors(
        frame, frame_box, template_num, base_bg, total_screens)
    text_layers  = extract_texts(frame, frame_box, template_num, total_screens)
    logo_layer   = extract_logo(frame, frame_box, template_num, total_screens)
    device_data  = extract_devices(frame, frame_box, template_num, total_screens)

    # Aggregate per screen
    screen_items = {}
    def get_screen(idx):
        if idx not in screen_items:
            screen_items[idx] = {"mockups": [], "bg_shapes": [], "text_shapes": [], "texts": [], "logos": []}
        return screen_items[idx]

    for d in device_data:
        get_screen(d["screenIndex"])["mockups"].append(d["mockup"])
    for sidx, shapes in shape_layers_by_screen.items():
        for shape in shapes:
            get_screen(sidx)["bg_shapes"].append(shape)
    for t in text_layers:
        if t["layer"]["type"] == "shape":
            get_screen(t["screenIndex"])["text_shapes"].append(t["layer"])
        else:
            get_screen(t["screenIndex"])["texts"].append(t["layer"])
    if logo_layer:
        get_screen(logo_layer["screenIndex"])["logos"].append(logo_layer["layer"])

    screens_data = []
    for idx in sorted(screen_items.keys()):
        item = screen_items[idx]
        if not item["mockups"] and not item["texts"] and not item["logos"]:
            continue
        layers = item["bg_shapes"] + item["text_shapes"] + item["texts"] + item["logos"]
        screen_bg = screen_backgrounds.get(idx, base_bg)
        screens_data.append({
            "screenIndex": idx,
            "mockups": item["mockups"],
            "layers": layers,
            "background": screen_bg,
        })

    n_bg_shapes = sum(len(v) for v in shape_layers_by_screen.values())
    templates.append({
        "id": "figma_{}".format(template_num),
        "name": "Template {}".format(template_num),
        "background": base_bg,
        "screens": screens_data,
    })
    print("T{}: bg={} screenBgs={} screens={} devices={} texts={} bgShapes={}".format(
        template_num, base_bg["type"], len(screen_backgrounds), len(screens_data),
        len(device_data), len(text_layers), n_bg_shapes))

ts_header = """import { Layer } from "./types";

export interface FigmaMockupData {
  x: number;
  y: number;
  width: number;
  height: number;
  transform: string | null;
}

export interface FigmaGradientStop {
  color: string;
  position: number;
}

export interface FigmaBackground {
  type: "solid" | "gradient";
  color?: string;
  gradient?: {
    direction: string;
    stops: FigmaGradientStop[];
  };
}

export interface FigmaScreenData {
  screenIndex: number;
  mockups: FigmaMockupData[];
  layers: Layer[];
  background: FigmaBackground;
}

export interface FigmaTemplate {
  id: string;
  name: string;
  background: FigmaBackground;
  screens: FigmaScreenData[];
}

"""

ts_content = ts_header + "export const FIGMA_TEMPLATES: FigmaTemplate[] = " + json.dumps(templates, indent=2, ensure_ascii=False) + ";\n"
with open("src/lib/figmaTemplates.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("\nDone! {} templates written.".format(len(templates)))
