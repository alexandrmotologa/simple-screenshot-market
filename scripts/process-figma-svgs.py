import xml.etree.ElementTree as ET
import os
import json

def process_svgs():
    dir_path = 'fromfigma'
    out_dir = 'public/templates'
    ts_out = 'src/lib/figmaTemplates.ts'
    
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)
        
    files = [f for f in os.listdir(dir_path) if f.endswith('.svg') and f[:-4].isdigit()]
    
    templates = []
    
    ET.register_namespace('', 'http://www.w3.org/2000/svg')
    ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    
    for file in sorted(files, key=lambda x: int(x[:-4])):
        filepath = os.path.join(dir_path, file)
        tree = ET.parse(filepath)
        root = tree.getroot()
        
        mockups = []
        
        # We need to find the <rect> elements that match our mockup criteria
        # and remove them from their parent.
        # ElementTree doesn't easily let you get parent, so we iterate over parents.
        for parent in root.iter():
            to_remove = []
            for child in parent:
                if child.tag == '{http://www.w3.org/2000/svg}rect':
                    w_str = child.get('width')
                    h_str = child.get('height')
                    if w_str and h_str:
                        w = float(w_str)
                        h = float(h_str)
                        # The mockups are ~920x2000 and the shadow frames are ~1030x2100
                        # We should remove both! So any rect between 800-1200 x 1800-2400
                        if 800 < w < 1200 and 1800 < h < 2400:
                            # If it's the smaller one (~920x2000), it's the actual screen mockup!
                            # The shadow/frame shouldn't be added to the mockup list, but should be removed.
                            # Usually the screen mockup is the smaller one.
                            if 850 < w < 950 and 1900 < h < 2100:
                                x = float(child.get('x', '0'))
                                y = float(child.get('y', '0'))
                                transform = child.get('transform')
                                mockups.append({
                                    'x': x,
                                    'y': y,
                                    'width': w,
                                    'height': h,
                                    'transform': transform
                                })
                            to_remove.append(child)
            
            # Remove the identified rects
            for child in to_remove:
                parent.remove(child)
                
        # To further reduce file size, we COULD try to remove the <pattern> and <image> elements 
        # from <defs> that were used by these rects, but simply removing the rects already hides them 
        # visually and reduces DOM nodes, which is good enough for now. 
        
        # Save cleaned SVG
        out_file = f'figma-template-{file}'
        out_filepath = os.path.join(out_dir, out_file)
        tree.write(out_filepath, encoding='utf-8', xml_declaration=True)
        
        template_id = f"figma_{file[:-4]}"
        
        # Since we have 10 screens horizontally in a 12900x2796 canvas:
        screens_data = []
        # Sort mockups by X coordinate to assign them to screens left-to-right
        mockups.sort(key=lambda m: m['x'])
        
        for m in mockups:
            # Figure out which screen this mockup belongs to (0 to 9)
            screen_index = int((m['x'] + (m['width']/2)) // 1290)
            
            # Translate to local screen coordinates
            local_x = m['x'] - (screen_index * 1290)
            
            screens_data.append({
                'screenIndex': screen_index,
                'x': local_x,
                'y': m['y'],
                'width': m['width'],
                'height': m['height'],
                'transform': m['transform']
            })
            
        templates.append({
            'id': template_id,
            'name': f"Figma Template {file[:-4]}",
            'backgroundUrl': f"/templates/{out_file}",
            'screens': screens_data
        })
        print(f"Processed {file}: {len(screens_data)} mockups found.")
        
    # Write TS file
    ts_content = "export interface FigmaMockupData {\n  screenIndex: number;\n  x: number;\n  y: number;\n  width: number;\n  height: number;\n  transform: string | null;\n}\n\n"
    ts_content += "export interface FigmaTemplate {\n  id: string;\n  name: string;\n  backgroundUrl: string;\n  screens: FigmaMockupData[];\n}\n\n"
    ts_content += "export const FIGMA_TEMPLATES: FigmaTemplate[] = " + json.dumps(templates, indent=2) + ";\n"
    
    with open(ts_out, 'w', encoding='utf-8') as f:
        f.write(ts_content)
        
    print(f"Successfully generated {ts_out}")

if __name__ == "__main__":
    process_svgs()
