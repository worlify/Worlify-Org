const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\DELL\\Downloads\\Plantation';
const destDir = path.join(__dirname, '..', 'public', 'images', 'gallery', 'environment');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
console.log('Found plantation files:', files.length);

files.forEach((file, index) => {
  const srcPath = path.join(srcDir, file);
  const destName = `plantation_${index + 1}.jpg`;
  const destPath = path.join(destDir, destName);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied ${file} -> ${destName}`);
});
