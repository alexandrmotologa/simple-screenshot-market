const fs = require('fs');
const path = require('path');
const srcDir = 'C:\\Users\\alexander\\.gemini\\antigravity-ide\\brain\\964ca168-a3a4-4b56-b55f-93188c79da66\\.tempmediaStorage';
const destDir = 'b:\\workgit\\simple-screenshot-market\\public\\devices';

const files = fs.readdirSync(srcDir)
  .filter(f => f.endsWith('.png'))
  .map(f => ({ 
    name: f, 
    time: fs.statSync(path.join(srcDir, f)).mtime.getTime() 
  }))
  .sort((a,b) => b.time - a.time)
  .slice(0, 5);

files.forEach((f, i) => {
  fs.copyFileSync(path.join(srcDir, f.name), path.join(destDir, "device-" + (i+1) + ".png"));
});
console.log('Copied 5 recent mockups');
