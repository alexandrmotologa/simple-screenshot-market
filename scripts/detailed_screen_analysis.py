import json
import sys
import math

sys.stdout.reconfigure(encoding='utf-8')

with open('new_figma_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
screenshots_page = next((p for p in doc['children'] if 'screenshots' in p['name']), None)

def rgb_to_hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(int(r*255), int(g*255), int(b*255))

for child in screenshots_page.get('children', []):
    if child.get('name') in [str(i) for i in range(1, 11)]:
        print(f"\n=================== SCREEN {child.get('name')} ===================")
        bbox = child.get('absoluteBoundingBox', {})
        print(f"BBox: ({bbox.get('x')}, {bbox.get('y')}, {bbox.get('width')}x{bbox.get('height')})")
        fills = child.get('fills', [])
        for f_idx, fill in enumerate(fills):
            print(f"Fill {f_idx}: type={fill.get('type')}")
            if fill.get('type') == 'GRADIENT_LINEAR':
                print("  Gradient handles:", fill.get('gradientHandlePositions'))
                for s in fill.get('gradientStops', []):
                    c = s.get('color', {})
                    print(f"  Stop {s.get('position')}: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))} a={c.get('a')}")
            elif fill.get('type') == 'SOLID':
                c = fill.get('color', {})
                print(f"  Solid: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))} a={c.get('a')}")

        def print_elements(n, prefix=""):
            ntype = n.get('type')
            nname = n.get('name')
            nbox = n.get('absoluteBoundingBox')
            fills = n.get('fills', [])
            if ntype == 'TEXT':
                print(f"{prefix}TEXT '{nname}': {n.get('characters')!r} | font={n.get('style',{}).get('fontFamily')} size={n.get('style',{}).get('fontSize')} color={[rgb_to_hex(f['color']['r'], f['color']['g'], f['color']['b']) for f in fills if f.get('type')=='SOLID']}")
                if nbox:
                    print(f"{prefix}  pos: (x={nbox['x'] - bbox['x']}, y={nbox['y'] - bbox['y']}, w={nbox['width']}, h={nbox['height']})")
            elif 'iphone' in nname.lower() or 'android' in nname.lower() or 'zoom' in nname.lower() or 'flag' in nname.lower():
                print(f"{prefix}ELEMENT [{ntype}] '{nname}'")
                if nbox:
                    print(f"{prefix}  pos: (x={nbox['x'] - bbox['x']}, y={nbox['y'] - bbox['y']}, w={nbox['width']}, h={nbox['height']})")
            if 'children' in n and 'iphone' not in nname.lower() and 'android' not in nname.lower():
                for c in n['children']:
                    print_elements(c, prefix + "  ")

        print_elements(child)
