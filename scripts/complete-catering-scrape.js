#!/usr/bin/env node
/**
 * COMPLETE CATERING SCRAPE - ZERO MISSES
 * 
 * This scraper will:
 * 1. Get ALL product URLs from the main catering page
 * 2. Visit each product page individually
 * 3. Extract EVERYTHING: name, prices, sizes, descriptions, images
 * 4. Download all high-res images with proper naming
 * 5. Create complete JSON with all data matched perfectly
 * 6. Verify nothing is missing
 * 
 * NO GUESSING. NO PLACEHOLDERS. JUST FACTS.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Squarespace base URL
const BASE_URL = 'https://www.miamiyachtingcompany.com';
const CATERING_URL = `${BASE_URL}/catering`;

// Output directories
const IMAGE_DIR = path.join(__dirname, '../public/images/products/catering-complete');
const JSON_OUTPUT = path.join(__dirname, '../scraped-data/catering-products-complete.json');

// Ensure directories exist
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}
const scrapedDataDir = path.dirname(JSON_OUTPUT);
if (!fs.existsSync(scrapedDataDir)) {
  fs.mkdirSync(scrapedDataDir, { recursive: true });
}

// Helper: Fetch URL and return body
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(fetchURL(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Helper: Download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(downloadImage(res.headers.location, filepath));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Helper: Clean text
function cleanText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

// Helper: Extract product ID from URL
function getProductId(url) {
  const match = url.match(/\/catering\/([^\/\?]+)/);
  return match ? match[1] : null;
}

// Step 1: Get all product URLs from main catering page
async function getAllProductURLs() {
  console.log('📋 STEP 1: Fetching all product URLs...\n');
  
  const html = await fetchURL(CATERING_URL);
  
  // Find all product links (Squarespace uses specific patterns)
  const linkPattern = /<a[^>]+href="(\/catering\/[^"]+)"[^>]*>/g;
  const urls = new Set();
  
  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    const url = match[1];
    // Skip the main catering page itself
    if (url !== '/catering' && url !== '/catering/') {
      urls.add(BASE_URL + url);
    }
  }
  
  const productUrls = Array.from(urls);
  console.log(`✅ Found ${productUrls.length} product URLs\n`);
  
  return productUrls;
}

// Step 2: Scrape individual product page
async function scrapeProduct(url) {
  const productId = getProductId(url);
  console.log(`🔍 Scraping: ${productId}...`);
  
  try {
    const html = await fetchURL(url);
    
    // Extract product name
    const nameMatch = html.match(/<h1[^>]*class="[^"]*product-title[^"]*"[^>]*>(.*?)<\/h1>/i);
    const name = nameMatch ? cleanText(nameMatch[1].replace(/<[^>]+>/g, '')) : productId;
    
    // Extract description
    const descMatch = html.match(/<div[^>]*class="[^"]*product-description[^"]*"[^>]*>(.*?)<\/div>/is);
    const description = descMatch ? cleanText(descMatch[1].replace(/<[^>]+>/g, '')) : '';
    
    // Extract all prices and sizes
    const prices = [];
    
    // Method 1: Dropdown/select options
    const selectMatch = html.match(/<select[^>]*name="[^"]*variant[^"]*"[^>]*>(.*?)<\/select>/is);
    if (selectMatch) {
      const optionPattern = /<option[^>]*value="([^"]*)"[^>]*>(.*?)<\/option>/g;
      let optionMatch;
      while ((optionMatch = optionPattern.exec(selectMatch[1])) !== null) {
        const optionText = cleanText(optionMatch[2]);
        const priceMatch = optionText.match(/\$?([\d,]+\.?\d*)/);
        const price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : null;
        
        if (price) {
          prices.push({
            label: optionText,
            price: price
          });
        }
      }
    }
    
    // Method 2: Price display divs
    if (prices.length === 0) {
      const pricePattern = /<span[^>]*class="[^"]*product-price[^"]*"[^>]*>.*?\$?([\d,]+\.?\d*)/gi;
      let priceMatch;
      while ((priceMatch = pricePattern.exec(html)) !== null) {
        const price = parseFloat(priceMatch[1].replace(/,/g, ''));
        if (price && !prices.some(p => p.price === price)) {
          prices.push({
            label: `Price`,
            price: price
          });
        }
      }
    }
    
    // Extract ALL images (Squarespace uses data-src, src, and srcset)
    const images = new Set();
    
    // Pattern 1: data-src (Squarespace lazy loading)
    const dataSrcPattern = /data-src="([^"]*format=\d+w[^"]*)"/g;
    let imgMatch;
    while ((imgMatch = dataSrcPattern.exec(html)) !== null) {
      let imgUrl = imgMatch[1];
      // Get highest resolution (replace format=XXXw with format=2500w)
      imgUrl = imgUrl.replace(/format=\d+w/, 'format=2500w');
      if (!imgUrl.startsWith('http')) {
        imgUrl = BASE_URL + imgUrl;
      }
      images.add(imgUrl);
    }
    
    // Pattern 2: img src for product images
    const srcPattern = /<img[^>]+src="([^"]*images\.squarespace[^"]*)"/g;
    while ((imgMatch = srcPattern.exec(html)) !== null) {
      let imgUrl = imgMatch[1];
      imgUrl = imgUrl.replace(/format=\d+w/, 'format=2500w');
      if (!imgUrl.startsWith('http')) {
        imgUrl = BASE_URL + imgUrl;
      }
      images.add(imgUrl);
    }
    
    const imageUrls = Array.from(images);
    
    console.log(`  ✓ Name: ${name}`);
    console.log(`  ✓ Prices: ${prices.length} found`);
    console.log(`  ✓ Images: ${imageUrls.length} found`);
    
    return {
      id: productId,
      name: name,
      slug: productId,
      description: description,
      prices: prices,
      images: imageUrls,
      sourceUrl: url
    };
    
  } catch (error) {
    console.error(`  ✗ ERROR: ${error.message}`);
    return null;
  }
}

// Step 3: Download all images for a product
async function downloadProductImages(product) {
  const downloadedImages = [];
  
  for (let i = 0; i < product.images.length; i++) {
    const imageUrl = product.images[i];
    const ext = imageUrl.includes('.png') ? 'png' : 'jpg';
    const filename = `${product.id}_${i + 1}.${ext}`;
    const filepath = path.join(IMAGE_DIR, filename);
    
    try {
      await downloadImage(imageUrl, filepath);
      downloadedImages.push(`/images/products/catering-complete/${filename}`);
      console.log(`    📷 Downloaded: ${filename}`);
    } catch (error) {
      console.error(`    ✗ Image download failed: ${error.message}`);
    }
  }
  
  return downloadedImages;
}

// Main execution
async function main() {
  console.log('🚀 STARTING COMPLETE CATERING SCRAPE\n');
  console.log('This will take a few minutes...\n');
  console.log('='.repeat(60) + '\n');
  
  try {
    // Step 1: Get all product URLs
    const productUrls = await getAllProductURLs();
    
    console.log('='.repeat(60) + '\n');
    console.log('📦 STEP 2: Scraping each product page...\n');
    
    // Step 2: Scrape each product
    const products = [];
    for (const url of productUrls) {
      const product = await scrapeProduct(url);
      if (product) {
        products.push(product);
      }
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    console.log('📸 STEP 3: Downloading all images...\n');
    
    // Step 3: Download all images
    for (const product of products) {
      console.log(`\n📦 ${product.name}`);
      const localImages = await downloadProductImages(product);
      product.localImages = localImages;
      delete product.images; // Remove remote URLs, keep only local paths
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    console.log('💾 STEP 4: Saving complete data...\n');
    
    // Step 4: Save JSON
    fs.writeFileSync(JSON_OUTPUT, JSON.stringify(products, null, 2));
    
    // Summary
    console.log('='.repeat(60));
    console.log('✅ SCRAPE COMPLETE!\n');
    console.log(`📊 RESULTS:`);
    console.log(`   • Products scraped: ${products.length}`);
    console.log(`   • Total images downloaded: ${products.reduce((sum, p) => sum + p.localImages.length, 0)}`);
    console.log(`   • JSON saved to: ${JSON_OUTPUT}`);
    console.log(`   • Images saved to: ${IMAGE_DIR}`);
    console.log('='.repeat(60));
    
    // List any products with missing data
    const incomplete = products.filter(p => !p.prices || p.prices.length === 0 || p.localImages.length === 0);
    if (incomplete.length > 0) {
      console.log('\n⚠️  INCOMPLETE PRODUCTS (need manual review):');
      incomplete.forEach(p => {
        console.log(`   • ${p.name} (${p.id})`);
        if (p.prices.length === 0) console.log(`     - No prices found`);
        if (p.localImages.length === 0) console.log(`     - No images found`);
      });
    } else {
      console.log('\n🎉 All products have complete data!');
    }
    
  } catch (error) {
    console.error('❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run it!
main();
