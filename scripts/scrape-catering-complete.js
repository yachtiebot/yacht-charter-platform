#!/usr/bin/env node

/**
 * Complete Catering Product Scraper
 * 
 * STRICT RULES:
 * - NO hallucinations or made-up data
 * - NO guessing at pricing
 * - NO invented product names
 * - Only use data EXACTLY as shown on live site
 * - Download highest resolution images available
 * - Verify every field before saving
 */

const https = require('https');
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const { URL } = require('url');

const BASE_URL = 'https://www.miamiyachtingcompany.com';
const OUTPUT_DIR = path.join(__dirname, '../scraped-data/catering-complete');
const IMAGES_DIR = path.join(__dirname, '../public/images/products/catering-new');

// Product URLs from the catering page
const PRODUCT_URLS = [
  '/catering/gourmetspirals',
  '/catering/gourmet-wraps',
  '/catering/slider-trio',
  '/catering/cubanplatter',
  '/catering/shrimp-platter',
  '/catering/shrimp-surimi',
  '/catering/chilledtenders',
  '/catering/chickentenders',
  '/catering/chicken-wings',
  '/catering/popcornchicken',
  '/catering/customcharcuteriebox',
  '/catering/med-charcuterie-box',
  '/catering/large-charcuterie-platter',
  '/catering/prosciuttoskewers',
  '/catering/bread-bowl-platter',
  '/catering/wildsalmonsalad',
  '/catering/caesarsaladplatter',
  '/catering/chickenlettucewraps',
  '/catering/lettucewraps',
  '/catering/chefsalad',
  '/catering/turkeysaladplatter',
  '/catering/lettucewraps-bf5d7',
  '/catering/greeksalad',
  '/catering/garden-vegetable-platter-7m7gt',
  '/catering/briefruitplatter',
  '/catering/fresh-fruit-platter-np56z',
  '/catering/classicvarietydip',
  '/catering/pretzel-bagel-bite-platter',
  '/catering/gourmet-meat-and-cheese-platter',
  '/catering/gourmetmeatandcheesecubeplatter',
  '/catering/cheese-taster-platter-j3ld4',
  '/catering/antipasti-platter',
  '/catering/savorynaan',
  '/catering/mednaan',
  '/catering/greekstylehummusplatter',
  '/catering/deli-egg-platter',
  '/catering/med-style-platter',
  '/catering/mini-croissant-platter',
  '/catering/caesarpasta',
  '/catering/taboulisalad',
  '/catering/italiancapresepasta',
  '/catering/greek-style-pasta-salad-etjrx',
  '/catering/grilled-chicken-pasta-bowl-5cg2c',
  '/catering/chocolatehummusplatter',
  '/catering/largebrunchplatter',
  '/catering/croissantplatter',
  '/catering/gourmetbrowniesplatter-tnst9',
  '/catering/strawberryandmacaron',
  '/catering/muffinplatter',
  '/catering/gourmetcookieplatter',
  '/catering/desert-tart-platter-9hdg4',
  '/catering/desert-tart-6mpcy',
  '/catering/gourmettartplatter',
  '/catering/macaronchocolatestrawberry',
  '/catering/chocstraw',
  '/catering/decadent-desert-platter',
  '/catering/delightful-desert-platter',
  '/catering/gourmetbrowniesplatter',
  '/catering/bachelorettecupcakes',
  '/catering/customizable-cookies-and-cream-cake-6n3m8',
  '/catering/customizable-floral-cake',
  '/catering/customizable-party-balloon-cake-aar5e',
  '/catering/choc-red-velvet',
  '/catering/straw-almond-cream-cake',
  '/catering/german-choc-cake',
  '/catering/pudding-cake',
  '/catering/straw-leche-cake'
];

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const fullUrl = `${BASE_URL}${url}`;
    console.log(`Fetching: ${fullUrl}`);
    
    https.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CateringBot/1.0)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url: fullUrl, html: data, status: res.statusCode }));
    }).on('error', reject);
  });
}

async function downloadImage(imageUrl, filename) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(imageUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    // Request highest resolution by removing size params
    const cleanUrl = imageUrl.split('?')[0];
    
    console.log(`  Downloading image: ${cleanUrl}`);
    
    protocol.get(cleanUrl, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        // Follow redirect
        return downloadImage(res.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }
      
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          const filepath = path.join(IMAGES_DIR, filename);
          await fs.writeFile(filepath, buffer);
          console.log(`  Saved: ${filename}`);
          resolve(filepath);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

function extractProductData(html, url) {
  const product = {
    url,
    slug: url.split('/').pop(),
    name: null,
    price: null,
    description: null,
    images: [],
    options: [],
    warnings: []
  };

  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    product.name = titleMatch[1]
      .replace(/—.*$/, '')
      .replace(/\|.*$/, '')
      .trim();
  }

  // Extract price (look for common patterns)
  const pricePatterns = [
    /\$(\d+(?:\.\d{2})?)/g,
    /Price[:\s]+\$(\d+(?:\.\d{2})?)/gi,
    /"price"[:\s]+(\d+(?:\.\d{2})?)/gi
  ];

  for (const pattern of pricePatterns) {
    const matches = [...html.matchAll(pattern)];
    if (matches.length > 0) {
      product.price = matches.map(m => parseFloat(m[1]));
      break;
    }
  }

  // Extract images (Squarespace specific)
  const imgPatterns = [
    /data-src="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/gi,
    /src="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/gi,
    /"image"[:\s]+"([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/gi
  ];

  const imageUrls = new Set();
  for (const pattern of imgPatterns) {
    const matches = [...html.matchAll(pattern)];
    matches.forEach(m => {
      let imgUrl = m[1];
      if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
      if (imgUrl.startsWith('/')) imgUrl = BASE_URL + imgUrl;
      // Only include product images (not icons/logos)
      if (!imgUrl.includes('logo') && !imgUrl.includes('icon')) {
        imageUrls.add(imgUrl);
      }
    });
  }

  product.images = Array.from(imageUrls);

  // Extract description
  const descPatterns = [
    /<meta name="description" content="([^"]+)"/i,
    /<p class="[^"]*description[^"]*">([^<]+)</gi,
    /"description"[:\s]+"([^"]+)"/gi
  ];

  for (const pattern of descPatterns) {
    const match = html.match(pattern);
    if (match) {
      product.description = match[1].trim();
      break;
    }
  }

  // Check for customization requirements
  if (html.includes('customize') || html.includes('select') || html.includes('choose')) {
    product.warnings.push('MAY_REQUIRE_CUSTOMIZATION');
  }

  return product;
}

async function scrapeProduct(url) {
  try {
    const { html } = await fetchPage(url);
    const product = extractProductData(html, url);
    
    // Download images
    if (product.images.length > 0) {
      const downloadedImages = [];
      for (let i = 0; i < Math.min(product.images.length, 5); i++) {
        const imgUrl = product.images[i];
        const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
        const filename = `${product.slug}_${i}${ext}`;
        
        try {
          await downloadImage(imgUrl, filename);
          downloadedImages.push(`/images/products/catering-new/${filename}`);
        } catch (err) {
          console.error(`  Failed to download image: ${err.message}`);
        }
      }
      product.downloadedImages = downloadedImages;
    }

    return product;
  } catch (err) {
    console.error(`Error scraping ${url}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('Starting catering product scrape...\n');
  console.log('STRICT MODE: No hallucinations, only real data\n');
  
  // Create directories
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  const products = [];
  
  for (const url of PRODUCT_URLS) {
    const product = await scrapeProduct(url);
    if (product) {
      products.push(product);
      console.log(`✓ ${product.name || product.slug}\n`);
    }
    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Save results
  const outputPath = path.join(OUTPUT_DIR, 'products.json');
  await fs.writeFile(outputPath, JSON.stringify(products, null, 2));
  
  console.log(`\n✅ Scraped ${products.length} products`);
  console.log(`📄 Data saved to: ${outputPath}`);
  console.log(`🖼️  Images saved to: ${IMAGES_DIR}`);
  
  // Summary
  const withPrices = products.filter(p => p.price).length;
  const withImages = products.filter(p => p.downloadedImages?.length > 0).length;
  
  console.log(`\n📊 Summary:`);
  console.log(`  - Total products: ${products.length}`);
  console.log(`  - With prices: ${withPrices}`);
  console.log(`  - With images: ${withImages}`);
  console.log(`  - Missing data: ${products.length - withPrices} need manual review`);
}

main().catch(console.error);
