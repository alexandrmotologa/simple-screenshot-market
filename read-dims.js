const fs = require('fs');
const path = require('path');
const destDir = 'b:\\workgit\\simple-screenshot-market\\public\\devices';

for(let i=1; i<=5; i++) {
  const file = path.join(destDir, `device-${i}.png`);
  if (!fs.existsSync(file)) continue;
  const fd = fs.openSync(file, 'r');
  const buffer = Buffer.alloc(24);
  fs.readSync(fd, buffer, 0, 24, 0);
  fs.closeSync(fd);
  
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  console.log(`device-${i}.png: ${width}x${height}`);
}
