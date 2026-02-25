const https = require('https');
const fs = require('fs');

const stores = [
  { name: 'catering', url: 'https://www.miamiyachtingcompany.com/catering' },
  { name: 'water-toys', url: 'https://www.miamiyachtingcompany.com/water-sports' },
  { name: 'flowers', url: 'https://www.miamiyachtingcompany.com/flowers' },
  { name: 'bachelorette', url: 'https://www.miamiyachtingcompany.com/bachelorette-party' }
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

async function scrapeStore(store) {
  console.log(`\n📦 Scraping ${store.name}...`);
  try {
    const html = await fetchHTML(store.url);
    
    // Save raw HTML for manual inspection
    fs.writeFileSync(`/root/clawd/yacht-charter-platform/scraped-data/${store.name}.html`, html);
    console.log(`✓ Saved HTML for ${store.name}`);
    
    // Extract product info (basic patterns)
    const products = [];
    
    // Look for Squarespace product blocks
    const productMatches = html.match(/data-product-id="([^"]+)"/g) || [];
    console.log(`  Found ${productMatches.length} product IDs`);
    
    // Look for images
    const imageMatches = html.match(/https:\/\/images\.squarespace-cdn\.com\/[^"]+/g) || [];
    console.log(`  Found ${imageMatches.length} images`);
    
    // Look for prices
    const priceMatches = html.match(/\$\d+(\.\d{2})?/g) || [];
    console.log(`  Found ${priceMatches.length} prices`);
    
    fs.writeFileSync(
      `/root/clawd/yacht-charter-platform/scraped-data/${store.name}-summary.json`,
      JSON.stringify({
        url: store.url,
        productCount: productMatches.length,
        imageCount: imageMatches.length,
        priceCount: priceMatches.length,
        images: imageMatches.slice(0, 20) // Sample
      }, null, 2)
    );
    
  } catch (error) {
    console.error(`✗ Error scraping ${store.name}:`, error.message);
  }
}

async function main() {
  // Create output directory
  if (!fs.existsSync('/root/clawd/yacht-charter-platform/scraped-data')) {
    fs.mkdirSync('/root/clawd/yacht-charter-platform/scraped-data');
  }
  
  console.log('🔍 Starting Squarespace store scrape...\n');
  
  for (const store of stores) {
    await scrapeStore(store);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Be nice
  }
  
  console.log('\n✓ Scraping complete! Check scraped-data/ folder');
}

main();
