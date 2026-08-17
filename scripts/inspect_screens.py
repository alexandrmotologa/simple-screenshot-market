import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('new_figma_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
screenshots_page = next((p for p in doc['children'] if 'screenshots' in p['name']), None)

if not screenshots_page:
    print("Screenshots page not found!")
    sys.exit(1)

print(f"Page name: {screenshots_page['name']}")

def dump_node(node, indent=0):
    ntype = node.get('type')
    name = node.get('name')
    nid = node.get('id')
    bbox = node.get('absoluteBoundingBox')
    bbox_str = f"({bbox['x']:.0f}, {bbox['y']:.0f}, {bbox['width']:.0f}x{bbox['height']:.0f})" if bbox else "no-bbox"
    print(" " * indent + f"- [{ntype}] '{name}' id:{nid} bbox:{bbox_str}")
    if ntype == 'TEXT':
        print(" " * (indent + 2) + f"Text: {node.get('characters', '')!r}")
        print(" " * (indent + 2) + f"Style: {node.get('style', {})}")
    if 'children' in node:
        for c in node['children']:
            dump_node(c, indent + 2)

for child in screenshots_page.get('children', []):
    if child.get('name') in [str(i) for i in range(1, 11)]:
        print(f"\n================ Screen {child.get('name')} ================")
        dump_node(child, 0)
