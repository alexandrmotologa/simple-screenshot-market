const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

async function processSVGs() {
  const dir = path.join(__dirname, '../fromfigma');
  const files = fs.readdirSync(dir).filter(f => f.match(/^\d+\.svg$/));

  const templates = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const dom = new JSDOM(content);
    const document = dom.window.document;
    
    const rects = Array.from(document.querySelectorAll('rect'));
    const mockups = [];
    
    for (const rect of rects) {
      const w = parseFloat(rect.getAttribute('width') || '0');
      const h = parseFloat(rect.getAttribute('height') || '0');
      
      // Identify mockups by aspect ratio and size
      // Typical iPhone is ~ 920x2000 (aspect ~ 0.46)
      // The shadow/frame is ~ 1030x2100 (aspect ~ 0.49)
      if (w > 800 && w < 1200 && h > 1800 && h < 2400) {
        // This is a mockup or its shadow
        const x = parseFloat(rect.getAttribute('x') || '0');
        const y = parseFloat(rect.getAttribute('y') || '0');
        const transform = rect.getAttribute('transform');
        
        mockups.push({ x, y, w, h, transform });
      }
    }
    
    templates.push({
      file,
      mockupsCount: mockups.length,
      mockups
    });
  }
  
  console.log(JSON.stringify(templates.slice(0, 2), null, 2));
}

processSVGs();
