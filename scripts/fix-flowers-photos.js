#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');

const fixes = [
  ['public/images/products/flowers/blooming-orchid.png', 'public/images/products/flowers/Miami_Yachting_Company_blooming_orchid.jpg'],
  ['public/images/products/flowers/bloomingorchid.png', 'public/images/products/flowers/Miami_Yachting_Company_blooming_orchid_2.jpg'],
  ['public/images/products/flowers/dancing-roses.png', 'public/images/products/flowers/Miami_Yachting_Company_dancing_roses.jpg'],
  ['public/images/products/flowers/dancingroses.png', 'public/images/products/flowers/Miami_Yachting_Company_dancing_roses_2.jpg'],
  ['public/images/products/flowers/floatingorchid.png', 'public/images/products/flowers/Miami_Yachting_Company_floating_orchid.jpg'],
  ['public/images/products/flowers/rose+pave.png', 'public/images/products/flowers/Miami_Yachting_Company_rose_pave_2.jpg'],
  ['public/images/products/flowers/tropical+Orchid.png', 'public/images/products/flowers/Miami_Yachting_Company_tropical_orchid.jpg'],
  ['public/images/products/flowers/tropical+paradise.png', 'public/images/products/flowers/Miami_Yachting_Company_tropical_paradise.jpg'],
  ['public/images/products/flowers/tropical+roses.png', 'public/images/products/flowers/Miami_Yachting_Company_tropical_roses.jpg'],
  ['public/images/products/flowers/tropical-paradise.png', 'public/images/products/flowers/Miami_Yachting_Company_tropical_paradise_2.jpg']
];

async function fixAll() {
  for (const [from, to] of fixes) {
    if (!fs.existsSync(from)) {
      console.log(`⚠️  Skip: ${from}`);
      continue;
    }
    const orig = fs.statSync(from).size / 1024;
    await sharp(from)
      .resize(1920, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(to);
    const newSize = fs.statSync(to).size / 1024;
    fs.unlinkSync(from);
    console.log(`✅ ${from.split('/').pop()} (${orig.toFixed(0)}KB → ${newSize.toFixed(0)}KB)`);
  }
  console.log('\n✨ All flowers photos fixed!');
}

fixAll().catch(console.error);
