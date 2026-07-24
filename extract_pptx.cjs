const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const pptxPath = path.resolve('./kedoclaw(3)(2).pptx');
const extractDir = path.resolve('./_ppt_extract');

if (fs.existsSync(extractDir)) {
  fs.rmSync(extractDir, { recursive: true, force: true });
}

const zip = new AdmZip(pptxPath);
zip.extractAllTo(extractDir, true);

// Check slide content more deeply
const slidesDir = path.join(extractDir, 'ppt', 'slides');
const files = fs.readdirSync(slidesDir).filter(f => f.startsWith('slide') && f.endsWith('.xml')).sort();

files.forEach((file, idx) => {
  const content = fs.readFileSync(path.join(slidesDir, file), 'utf-8');
  
  // Look for image references and other content
  const imgBlips = content.match(/r:embed="([^"]+)"/g);
  const names = content.match(/<p:cNvPr[^>]*name="([^"]*)"/g);
  
  console.log(`\n=== SLIDE ${idx + 1} ===`);
  if (names) {
    const nameList = names.map(n => { const m = n.match(/name="([^"]*)"/); return m ? m[1] : ''; }).filter(Boolean);
    console.log('Shapes:', JSON.stringify(nameList));
  }
  if (imgBlips) {
    const blips = imgBlips.map(b => { const m = b.match(/r:embed="([^"]*)"/); return m ? m[1] : ''; });
    console.log('Image refs:', blips);
  }

  // Show a small sample of the raw XML
  console.log('XML sample:', content.substring(0, 500).replace(/\s+/g, ' '));
});

// Check media file sizes
console.log('\n=== IMAGE SIZES ===');
const mediaDir = path.join(extractDir, 'ppt', 'media');
if (fs.existsSync(mediaDir)) {
  fs.readdirSync(mediaDir).sort().forEach(f => {
    const stat = fs.statSync(path.join(mediaDir, f));
    console.log(`${f}: ${(stat.size / 1024).toFixed(1)} KB`);
  });
}

fs.rmSync(extractDir, { recursive: true, force: true });
