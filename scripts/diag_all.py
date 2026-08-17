import json, sys, math
sys.stdout.reconfigure(encoding="utf-8")
with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
doc = data["document"]
iphone_page = next(p for p in doc["children"] if "iPhone" in p["name"])
SCREEN_W = 1290
SCREEN_H = 2796

def get_overlapping_screens(x, w, total):
    screens = []
    min_px = SCREEN_W * 0.05
    for sidx in range(total):
        slot_x = sidx * SCREEN_W
        overlap = min(x + w, slot_x + SCREEN_W) - max(x, slot_x)
        if overlap >= min_px:
            screens.append(sidx)
    return screens

frames = {}
for child in iphone_page["children"]:
    if child["name"].isdigit() and 1 <= int(child["name"]) <= 27:
        frames[int(child["name"])] = child

print("=== TEMPLATE DIAGNOSTIC ===\n")
for tn in sorted(frames.keys()):
    frame = frames[tn]
    fb = frame["absoluteBoundingBox"]
    fx, fy = fb["x"], fb["y"]
    fw = fb["width"]
    slices = [c for c in frame["children"] if c["name"].startswith("Slice")]
    total_screens = max(len(slices), 8)
    
    devices_group = next((c for c in frame["children"] if c["name"] == "DEVICES"), None)
    screens_with_device = set()
    large_devices = []
    if devices_group:
        for dev in devices_group.get("children", []):
            # Find zone
            replace_rect = None
            for c in dev.get("children", []):
                if "REPLACE" in c.get("name","").upper() or "SCREENSHOT" in c.get("name","").upper():
                    replace_rect = c; break
            zone = replace_rect if replace_rect else dev
            bbox = zone.get("absoluteBoundingBox")
            if not bbox: continue
            x = bbox["x"] - fx
            w = bbox["width"]
            overlapping = get_overlapping_screens(x, w, total_screens)
            for sidx in overlapping:
                screens_with_device.add(sidx)
            if w > SCREEN_W * 1.2:
                large_devices.append((x, w, overlapping))
    
    missing = [i for i in range(total_screens) if i not in screens_with_device]
    issues = []
    if missing:
        issues.append(f"MISSING DEVICE on screens: {[m+1 for m in missing]}")
    if large_devices:
        for lx, lw, lov in large_devices:
            issues.append(f"LARGE DEVICE w={lw:.0f} spans screens {[s+1 for s in lov]}")
    
    status = "OK" if not issues else "ISSUES"
    print(f"T{tn:2d} ({total_screens} screens): {status}")
    for iss in issues:
        print(f"      -> {iss}")
