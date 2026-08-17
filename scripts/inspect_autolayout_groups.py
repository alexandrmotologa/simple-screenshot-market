import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_autolayout_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
page = doc['children'][0]

def rgb_to_hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(int(r*255), int(g*255), int(b*255))

for child in page['children'][0]['children']:
    if child['name'].startswith('Group'):
        print(f"\n==================== {child['name']} id:{child['id']} ====================")
        bbox = child.get('absoluteBoundingBox', {})
        print(f"BBox: ({bbox.get('x')}, {bbox.get('y')}, {bbox.get('width')}x{bbox.get('height')})")
        
        for sub in child.get('children', []):
            sbox = sub.get('absoluteBoundingBox', {})
            print(f"\n  --- [{sub.get('type')}] '{sub.get('name')}' id:{sub.get('id')} bbox:({sbox.get('x')},{sbox.get('y')},{sbox.get('width')}x{sbox.get('height')})")
            if sub.get('type') == 'TEXT':
                print(f"      Characters: {sub.get('characters')!r}")
                print(f"      Style: {sub.get('style')}")
            if sub.get('type') == 'FRAME':
                fills = sub.get('fills', [])
                for f in fills:
                    print(f"      Fill: {f.get('type')}")
                    if f.get('type') == 'GRADIENT_LINEAR':
                        for s in f.get('gradientStops', []):
                            c = s.get('color', {})
                            print(f"        Stop {s.get('position')}: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))}")
            if 'children' in sub:
                for c in sub['children']:
                    cbox = c.get('absoluteBoundingBox', {})
                    print(f"      - [{c.get('type')}] '{c.get('name')}' bbox:({cbox.get('width')}x{cbox.get('height')})")
                    if c.get('type') == 'TEXT':
                        print(f"        Characters: {c.get('characters')!r}")
