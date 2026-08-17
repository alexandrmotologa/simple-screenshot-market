import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_free_community2.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data.get('document', {})

def get_texts_and_shapes(node):
    results = []
    if node.get('type') == 'TEXT':
        results.append(('TEXT', node.get('name'), node.get('characters'), node.get('style', {}), node.get('absoluteBoundingBox', {})))
    elif node.get('type') in ['RECTANGLE', 'ELLIPSE', 'VECTOR', 'FRAME', 'GROUP'] and 'Logo' in node.get('name', ''):
        results.append(('LOGO', node.get('name'), node.get('absoluteBoundingBox', {})))
    for child in node.get('children', []):
        results.extend(get_texts_and_shapes(child))
    return results

for style in ["Style 01", "Style 02"]:
    print(f"\n====================== {style} ======================")
    for page in doc.get('children', []):
        for sec in page.get('children', []):
            if sec.get('name') == style:
                for platform_frame in sec.get('children', []):
                    if 'iOS' in platform_frame.get('name', ''):
                        print(f"\nPLATFORM: {platform_frame.get('name')}")
                        for screen in platform_frame.get('children', []):
                            if 'Frame' in screen.get('name', ''):
                                bg_color = "#ffffff"
                                fills = screen.get('fills', [])
                                if fills and fills[0].get('type') == 'SOLID':
                                    c = fills[0].get('color', {})
                                    bg_color = f"#{int(c.get('r',0)*255):02x}{int(c.get('g',0)*255):02x}{int(c.get('b',0)*255):02x}"
                                print(f"\nScreen: {screen.get('name')} | BG: {bg_color}")
                                items = get_texts_and_shapes(screen)
                                for it in items:
                                    print(f"  {it}")
