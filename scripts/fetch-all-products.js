const https = require('https');
const fs = require('fs');

const BASE_URL = 'https://www.miamiyachtingcompany.com';

// Read URL lists
const waterToysUrls = fs.readFileSync('/root/clawd/yacht-charter-platform/scraped-data/water-toys-urls.txt', 'utf8').split('\n').filter(Boolean);
const cateringUrls = fs.readFileSync('/root/clawd/yacht-charter-platform/scraped-data/catering-urls.txt', 'utf8').split('\n').filter(Boolean);
const flowersUrls = fs.readFileSync('/root/clawd/yacht-charter-platform/scraped-data/flowers-urls.txt', 'utf8').split('\n').filter(Boolean);
const bacheloretteUrls = fs.readFileSync('/root/clawd/yacht-charter-platform/scraped-data/bachelorette-urls.txt', 'utf8').split('\n').filter(Boolean);

async function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractProductData(html, url) {
  const product = { url, html: html.substring(0, 10000) };
  
  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) product.title = titleMatch[1].split('—')[0].trim();
  
  // Extract prices (multiple formats)
  const prices = html.match(/(?:\$|from \$|price[": ]+)\d+(?:,\d{3})*(?:\.\d{2})?/gi) || [];
  product.prices = [...new Set(prices)];
  
  // Extract images (high-res)
  const images = [];
  const imgMatches = html.match(/https:\/\/images\.squarespace-cdn\.com\/[^"'\s)]+/g) || [];
  imgMatches.forEach(img => {
    const highRes = img.replace(/\?format=\d+w/g, '?format=2500w')
                       .replace(/\/\d+w\//g, '/2500w/');
    if (!images.includes(highRes) && !highRes.includes('favicon')) {
      images.push(highRes);
    }
  });
  product.images = images;
  
  // Extract description (common patterns)
  const descMatch = html.match(/<p[^>]*class="[^"]*sqsrte-large[^"]*"[^>]*>([^<]+)<\/p>/) ||
                    html.match(/<div[^>]*class="[^"]*sqs-block-content[^"]*"[^>]*><p>([^<]+)<\/p>/) ||
                    html.match(/<p>([^<]{100,500})<\/p>/);
  if (descMatch) product.description = descMatch[1].trim();
  
  // Extract options/variants
  const optionMatches = html.match(/option["\s>]+value="([^"]+)"/gi) || [];
  product.options = optionMatches.map(m => m.match(/value="([^"]+)"/)[1]);
  
  // Extract "Add to Cart" form data
  const formMatch = html.match(/<form[^>]*data-commerce-product[^>]*>([\s\S]{0,2000})<\/form>/);
  if (formMatch) {
    product.hasAddToCart = true;
    product.formData = formMatch[1].substring(0, 1000);
  }
  
  return product;
}

async function scrapeCategory(urls, category) {
  console.log(`\n📦 Scraping ${category} (${urls.length} products)...`);
  const products = [];
  
  for (let i = 0; i < urls.length; i++) {
    const url = BASE_URL + urls[i];
    try {
      console.log(`  [${i+1}/${urls.length}] ${urls[i].split('/').pop()}`);
      const html = await fetchHTML(url);
      const product = extractProductData(html, url);
      product.category = category;
      product.slug = urls[i].split('/').pop();
      products.push(product);
      
      // Save individual HTML for reference
      const filename = urls[i].replace(/\//g, '_') + '.html';
      fs.writeFileSync(`/root/clawd/yacht-charter-platform/scraped-data/${category}/${filename}`, html);
      
      await new Promise(resolve => setTimeout(resolve, 300)); // Be nice
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
    }
  }
  
  return products;
}

async function main() {
  console.log('🔍 FETCHING ALL PRODUCT DATA...\n');
  console.log(`Total products to scrape: ${waterToysUrls.length + cateringUrls.length + flowersUrls.length + bacheloretteUrls.length}`);
  
  const allProducts = {
    waterToys: await scrapeCategory(waterToysUrls, 'water-toys'),
    catering: await scrapeCategory(cateringUrls, 'catering'),
    flowers: await scrapeCategory(flowersUrls, 'flowers'),
    bachelorette: await scrapeCategory(bacheloretteUrls, 'bachelorette'),
    scrapedAt: new Date().toISOString(),
    summary: {
      totalProducts: 0,
      totalImages: 0
    }
  };
  
  // Calculate totals
  Object.keys(allProducts).forEach(cat => {
    if (Array.isArray(allProducts[cat])) {
      allProducts.summary.totalProducts += allProducts[cat].length;
      allProducts[cat].forEach(p => {
        allProducts.summary.totalImages += (p.images?.length || 0);
      });
    }
  });
  
  // Save complete data
  fs.writeFileSync(
    '/root/clawd/yacht-charter-platform/scraped-data/ALL-PRODUCTS.json',
    JSON.stringify(allProducts, null, 2)
  );
  
  console.log('\n✅ SCRAPING COMPLETE!');
  console.log(`📦 Total products: ${allProducts.summary.totalProducts}`);
  console.log(`📸 Total images found: ${allProducts.summary.totalImages}`);
  console.log(`💾 Saved to: scraped-data/ALL-PRODUCTS.json`);
}

main().catch(console.error);
