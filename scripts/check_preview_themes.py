import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('new_figma_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
preview_page = next((p for p in doc['children'] if 'preview' in p['name']), None)

def rgb_to_hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(int(r*255), int(g*255), int(b*255))

if preview_page:
    print(f"Page: {preview_page['name']}")
    for child in preview_page.get('children', []):
        print(f"\n--- {child.get('name')} ---")
        fills = child.get('fills', [])
        for f in fills:
            print(f"Fill: {f.get('type')}")
            if f.get('type') == 'GRADIENT_LINEAR':
                for s in f.get('gradientStops', []):
                    c = s.get('color', {})
                    print(f"  Stop {s.get('position')}: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))} a={c.get('a')}")
            elif f.get('type') == 'SOLID':
                c = f.get('color', {})
                print(f"  Solid: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))}")
