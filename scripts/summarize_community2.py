import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_free_community2.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def find_node_by_name_or_id(node, target_id):
    if node.get('id') == target_id:
        return node
    for child in node.get('children', []):
        res = find_node_by_name_or_id(child, target_id)
        if res:
            return res
    return None

def summarize_frame(frame, depth=0):
    indent = "  " * depth
    name = frame.get('name')
    f_type = frame.get('type')
    bbox = frame.get('absoluteBoundingBox', {})
    w = bbox.get('width', 0)
    h = bbox.get('height', 0)
    
    fills = frame.get('fills', [])
    fill_desc = []
    for fill in fills:
        if fill.get('type') == 'SOLID':
            c = fill.get('color', {})
            r = int(c.get('r', 0) * 255)
            g = int(c.get('g', 0) * 255)
            b = int(c.get('b', 0) * 255)
            a = fill.get('opacity', c.get('a', 1))
            fill_desc.append(f"#{r:02x}{g:02x}{b:02x} (a:{a})")
        elif 'GRADIENT' in fill.get('type', ''):
            fill_desc.append(f"{fill.get('type')}")
            
    chars = frame.get('characters', '')
    if chars:
        print(f"{indent}TEXT '{chars}' [style: {frame.get('style', {}).get('fontFamily')} {frame.get('style', {}).get('fontSize')}px {frame.get('style', {}).get('fontWeight')}]")
    else:
        print(f"{indent}[{f_type}] {name} ({w}x{h}) fills: {fill_desc}")
        
    for ch in frame.get('children', []):
        summarize_frame(ch, depth + 1)

doc = data.get('document', {})

for style_section in ["Style 01", "Style 02"]:
    print(f"\n==================== {style_section} ====================")
    # Search for iOS frame
    for canvas in doc.get('children', []):
        for sec in canvas.get('children', []):
            if sec.get('name') == style_section:
                for target_frame in sec.get('children', []):
                    if 'iOS' in target_frame.get('name', ''):
                        print(f"\n--- {target_frame.get('name')} ---")
                        for screen_frame in target_frame.get('children', []):
                            if 'Frame' in screen_frame.get('name', ''):
                                print(f"\nSCREEN: {screen_frame.get('name')}")
                                summarize_frame(screen_frame, depth=1)
