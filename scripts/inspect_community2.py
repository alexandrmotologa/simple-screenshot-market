import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_free_community2.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

document = data.get('document', {})

def explore_node(node, depth=0):
    indent = "  " * depth
    n_type = node.get('type')
    n_name = node.get('name')
    n_id = node.get('id')
    
    children = node.get('children', [])
    print(f"{indent}[{n_type}] {n_name} (id: {n_id}, children: {len(children)})")
    
    if depth < 3:
        for ch in children:
            explore_node(ch, depth + 1)

print("Document structure:")
for canvas in document.get('children', []):
    print(f"PAGE: {canvas.get('name')} (id: {canvas.get('id')})")
    for child in canvas.get('children', []):
        explore_node(child, depth=1)
