import json, sys
sys.stdout.reconfigure(encoding="utf-8")
with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
doc = data["document"]
iphone_page = next(p for p in doc["children"] if "iPhone" in p["name"])
frame1 = next(c for c in iphone_page["children"] if c["name"] == "1")
frame_box = frame1["absoluteBoundingBox"]
fx = frame_box["x"]
fy = frame_box["y"]

bg_group = next((c for c in frame1["children"] if c["name"] in ("BACKGROUND", "BACKGROUNDS")), None)
print("BACKGROUND group children detail:")
for child in bg_group.get("children", []):
    bbox = child.get("absoluteBoundingBox", {})
    radius = child.get("cornerRadius", 0)
    corner_radii = child.get("rectangleCornerRadii", None)
    opacity = child.get("opacity", 1.0)
    x = bbox.get("x", 0) - fx
    y = bbox.get("y", 0) - fy
    w = bbox.get("width", 0)
    h = bbox.get("height", 0)
    rotation = child.get("rotation", 0)
    print("  {}: x={:.0f} y={:.0f} w={:.0f} h={:.0f} radius={} cornerRadii={} rotation={} opacity={}".format(
        child["name"], x, y, w, h, radius, corner_radii, round(rotation,2), opacity))

print()
print("TEXTS group children:")
texts_group = next((c for c in frame1["children"] if c["name"] == "TEXTS"), None)
for child in texts_group.get("children", [])[:8]:
    bbox = child.get("absoluteBoundingBox", {})
    x = bbox.get("x", 0) - fx
    y = bbox.get("y", 0) - fy
    w = bbox.get("width", 0)
    h = bbox.get("height", 0)
    chars = child.get("characters", child.get("name", ""))[:30]
    print("  {} type={}: x={:.0f} y={:.0f} w={:.0f} h={:.0f}".format(
        repr(chars), child["type"], x, y, w, h))
