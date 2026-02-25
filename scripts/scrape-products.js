const https = require('https');
const fs = require('fs');

const products = [
  // Water Toys
  { category: 'water-toys', url: 'https://www.miamiyachtingcompany.com/miami-yacht-charter-add-ons/watersports-boat-rental-miami', name: 'Water Sports Boat' },
  { category: 'water-toys', url: 'https://www.miamiyachtingcompany.com/miami-yacht-charter-add-ons/flyboard-rental-in-miami', name: 'Flyboard' },
  { category: 'water-toys', url: 'https://www.miamiyachtingcompany.com/miami-yacht-charter-add-ons/seabob', name: 'Seabob' },
  { category: 'water-toys', url: 'https://www.miamiyachtingcompany.com/miami-yacht-charter-add-ons/flitescooter', name: 'Flitescooter' },
  { category: 'water-toys', url: 'https://www.miamiyachtingcompany.com/miami-yacht-charter-add-ons/floating-cabana', name: 'Floating Cabana' },
  { category: 'water-toys', url: 'https://www.miamiyachtingcompany.com/miami-yacht-charter-add-ons/lounge-chairs', name: 'Lounge Chairs' },
  // Catering
  { category: 'catering', url: 'https://www.miamiyachtingcompany.com/catering', name: 'Catering Menu' },
  // Flowers
  { category: 'flowers', url: 'https://www.miamiyachtingcompany.com/flower-add-ons', name: 'Flowers' },
  // Bachelorette
  { category: 'bachelorette', url: 'https://www.miamiyachtingcompany.com/bachelorette-packages', name: 'Bachelorette' }
];

async function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeProduct(product) {
  console.log(`\n📦 Scraping ${product.name}...`);
  try {
    const html = await fetchHTML(product.url);
    
    // Save raw HTML
    const filename = product.url.split('/').pop() || product.category;
    fs.writeFileSync(`/root/clawd/yacht-charter-platform/scraped-data/${product.category}-${filename}.html`, html);
    
    // Extract images (high res)
    const images = [];
    const imgMatches = html.match(/https:\/\/images\.squarespace-cdn\.com\/[^"'\s]+/g) || [];
    imgMatches.forEach(img => {
      // Get highest res version
      const highRes = img.replace(/\/\d+w\//g, '/2500w/');
      if (!images.includes(highRes)) {
        images.push(highRes);
      }
    });
    
    // Extract prices
    const prices = html.match(/\$\d+(?:,\d{3})*(?:\.\d{2})?/g) || [];
    
    // Extract product name
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].split('—')[0].trim() : product.name;
    
    console.log(`  ✓ Found ${images.length} images, ${prices.length} prices`);
    
    return {
      name: product.name,
      category: product.category,
      url: product.url,
      title,
      images: images.slice(0, 10),
      prices,
      html: html.substring(0, 5000) // First 5000 chars for reference
    };
    
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🔍 Scraping Squarespace products...\n');
  
  const results = [];
  for (const product of products) {
    const data = await scrapeProduct(product);
    if (data) results.push(data);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Save combined results
  fs.writeFileSync(
    '/root/clawd/yacht-charter-platform/scraped-data/products.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log(`\n✅ Complete! Saved ${results.length} products to products.json`);
}

main();
