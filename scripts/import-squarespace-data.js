#!/usr/bin/env node
/**
 * IMPORT SQUARESPACE DATA
 * Parse the official Squarespace export CSV and build accurate catalog
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_PATH = '/root/.clawdbot/media/inbound/eb6023d9-6166-4f52-8331-5c5cdcc1850c.csv';
const OUTPUT_PATH = path.join(__dirname, '../lib/store/catering-catalog-new.json');

console.log('📊 IMPORTING SQUARESPACE DATA\n');
console.log('Source:', CSV_PATH);
console.log('Output:', OUTPUT_PATH);
console.log('\n' + '='.repeat(60) + '\n');

const products = {};
const rows = [];

// Read CSV
fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on('data', (row) => {
    rows.push(row);
  })
  .on('end', () => {
    console.log(`✓ Loaded ${rows.length} rows\n`);
    
    // Process rows into products
    rows.forEach((row, idx) => {
      const productId = row['Product ID [Non Editable]'];
      const productUrl = row['Product URL'];
      const title = row['Title'];
      const description = row['Description'];
      const price = parseFloat(row['Price']);
      const imageUrls = row['Hosted Image URLs'];
      const optionName = row['Option Name 1'];
      const optionValue = row['Option Value 1'];
      const visible = row['Visible'];
      
      // Skip hidden products
      if (visible === 'No') {
        return;
      }
      
      // Skip rows without product ID (these are variant rows)
      if (!productId) {
        // This is a variant row - add to parent product
        const lastProduct = Object.values(products).pop();
        if (lastProduct && optionValue && price) {
          if (!lastProduct.options) {
            lastProduct.options = [];
          }
          lastProduct.options.push({
            label: optionValue,
            value: optionValue,
            price: price
          });
        }
        return;
      }
      
      // New product
      const product = {
        id: productUrl || productId,
        name: title,
        slug: productUrl || productId,
        description: description ? description.replace(/<[^>]*>/g, '').trim() : '',
        images: imageUrls ? imageUrls.split(' ').filter(u => u.trim()) : [],
        price: price,
        squarespaceUrl: productUrl ? `https://www.miamiyachtingcompany.com/catering/${productUrl}` : null,
        sourceId: productId
      };
      
      // Add first option if present
      if (optionValue && optionName) {
        product.options = [{
          label: optionValue,
          value: optionValue,
          price: price
        }];
      }
      
      products[productId] = product;
    });
    
    const catalog = Object.values(products);
    
    console.log('📦 PROCESSED PRODUCTS:\n');
    catalog.forEach((p, i) => {
      console.log(`[${i + 1}/${catalog.length}] ${p.name}`);
      console.log(`   Price: $${p.price}`);
      if (p.options && p.options.length > 1) {
        console.log(`   Options: ${p.options.length}`);
        p.options.forEach(opt => console.log(`      ${opt.label}: $${opt.price}`));
      }
      console.log(`   Images: ${p.images.length}`);
      console.log('');
    });
    
    // Save catalog
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(catalog, null, 2));
    
    console.log('='.repeat(60));
    console.log(`\n✅ IMPORT COMPLETE!\n`);
    console.log(`📊 Results:`);
    console.log(`   • Products: ${catalog.length}`);
    console.log(`   • Saved to: ${OUTPUT_PATH}`);
    console.log(`\n🔍 Next steps:`);
    console.log(`   1. Review the catalog`);
    console.log(`   2. Download images from Squarespace URLs`);
    console.log(`   3. Upload images to Supabase`);
    console.log(`   4. Replace old catalog`);
    console.log('\n' + '='.repeat(60));
  });
