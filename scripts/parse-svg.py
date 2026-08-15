import xml.etree.ElementTree as ET
import os
import json
import sys

def parse_svgs():
    dir_path = 'fromfigma'
    files = [f for f in os.listdir(dir_path) if f.endswith('.svg') and f[:-4].isdigit()]
    
    templates = []
    
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    for file in sorted(files, key=lambda x: int(x[:-4])):
        filepath = os.path.join(dir_path, file)
        tree = ET.parse(filepath)
        root = tree.getroot()
        
        mockups = []
        rects = root.findall('.//svg:rect', ns)
        
        for rect in rects:
            w_str = rect.get('width')
            h_str = rect.get('height')
            if w_str and h_str:
                w = float(w_str)
                h = float(h_str)
                
                # Check for mockups (around 920x2000)
                if 800 < w < 1200 and 1800 < h < 2400:
                    x = float(rect.get('x', '0'))
                    y = float(rect.get('y', '0'))
                    transform = rect.get('transform')
                    fill = rect.get('fill')
                    
                    mockups.append({
                        'x': x,
                        'y': y,
                        'w': w,
                        'h': h,
                        'transform': transform,
                        'fill': fill
                    })
        
        templates.append({
            'file': file,
            'mockups': mockups
        })
        
    print(json.dumps(templates[:2], indent=2))

if __name__ == "__main__":
    parse_svgs()
