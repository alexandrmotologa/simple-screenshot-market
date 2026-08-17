import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_free_template_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
page1 = doc['children'][1]
top_templates = next(c for c in page1['children'] if c['name'] == 'Templates')
iphone_group = next(c for c in top_templates['children'] if c['name'] == 'iPhone')

def rgb_to_hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(int(r*255), int(g*255), int(b*255))

for t in iphone_group['children']:
    tname = t['name']
    tbox = t['absoluteBoundingBox']
    print(f"\n================================== {tname} ==================================")
    
    # Sort frames 1 to 5 (Frame 1 is left, Frame 5 is right)
    frames = [c for c in t['children'] if c['name'].startswith('Frame ')]
    frames.sort(key=lambda f: f['absoluteBoundingBox']['x'])
    
    for f_idx, fr in enumerate(frames):
        fr_box = fr['absoluteBoundingBox']
        print(f"\n--- Screen {f_idx+1} ({fr['name']}) bbox:({fr_box['x']-tbox['x']:.0f},{fr_box['y']-tbox['y']:.0f}) ---")
        
        # Fills of frame
        for fill in fr.get('fills', []):
            print(f"  Frame Fill: {fill.get('type')}")
            if fill.get('type') == 'GRADIENT_LINEAR':
                for s in fill.get('gradientStops', []):
                    c = s.get('color', {})
                    print(f"    Stop {s.get('position')}: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))}")
            elif fill.get('type') == 'SOLID':
                c = fill.get('color', {})
                print(f"    Solid: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))}")
                
        def scan(node):
            nbox = node.get('absoluteBoundingBox')
            ntype = node.get('type')
            nname = node.get('name')
            if ntype == 'TEXT':
                fills = [rgb_to_hex(f['color']['r'], f['color']['g'], f['color']['b']) for f in node.get('fills', []) if f.get('type')=='SOLID']
                print(f"  TEXT '{nname}': {node.get('characters')!r} font={node.get('style',{}).get('fontFamily')} size={node.get('style',{}).get('fontSize')} weight={node.get('style',{}).get('fontWeight')} align={node.get('style',{}).get('textAlignHorizontal')} pos=({nbox['x']-fr_box['x']:.0f},{nbox['y']-fr_box['y']:.0f},{nbox['width']:.0f}x{nbox['height']:.0f}) color={fills}")
            elif 'mockup' in nname.lower() or 'device' in nname.lower() or 'iphone' in nname.lower():
                print(f"  MOCKUP: pos=({nbox['x']-fr_box['x']:.0f},{nbox['y']-fr_box['y']:.0f},{nbox['width']:.0f}x{nbox['height']:.0f})")
            if 'children' in node and 'iphone' not in nname.lower() and 'device' not in nname.lower() and 'mockup' not in nname.lower():
                for c in node['children']:
                    scan(c)
                    
        for c in fr.get('children', []):
            scan(c)
