#!/bin/bash
# Complete comprehensive scrape of all store data

echo "🔍 COMPLETE STORE SCRAPE - Starting comprehensive data extraction"
echo "=================================================="
echo ""

# Create directories
mkdir -p /root/clawd/yacht-charter-platform/scraped-data/{water-toys,catering,flowers,bachelorette,images}
mkdir -p /root/clawd/yacht-charter-platform/public/images/products/{water-toys,catering,flowers,bachelorette}

# Extract all product URLs
echo "📋 STEP 1: Extracting all product URLs..."

# Water Toys URLs
curl -s "https://www.miamiyachtingcompany.com/miami-yacht-charter-add-ons" | \
  grep -o 'href="/miami-yacht-charter-add-ons/[^"]*"' | \
  sed 's/href="//g' | sed 's/"//g' | \
  sort -u > /root/clawd/yacht-charter-platform/scraped-data/water-toys-urls.txt

# Catering URLs  
curl -s "https://www.miamiyachtingcompany.com/catering" | \
  grep -o 'href="/catering/[^"]*"' | \
  sed 's/href="//g' | sed 's/"//g' | \
  sort -u > /root/clawd/yacht-charter-platform/scraped-data/catering-urls.txt

# Flower URLs
curl -s "https://www.miamiyachtingcompany.com/flower-add-ons" | \
  grep -o 'href="/flower-add-ons/[^"]*"' | \
  sed 's/href="//g' | sed 's/"//g' | \
  sort -u > /root/clawd/yacht-charter-platform/scraped-data/flowers-urls.txt

# Bachelorette URLs
curl -s "https://www.miamiyachtingcompany.com/bachelorette-packages" | \
  grep -o 'href="/bachelorette-packages/[^"]*"' | \
  sed 's/href="//g' | sed 's/"//g' | \
  sort -u > /root/clawd/yacht-charter-platform/scraped-data/bachelorette-urls.txt

echo "✓ Water Toys: $(wc -l < /root/clawd/yacht-charter-platform/scraped-data/water-toys-urls.txt) products"
echo "✓ Catering: $(wc -l < /root/clawd/yacht-charter-platform/scraped-data/catering-urls.txt) products"
echo "✓ Flowers: $(wc -l < /root/clawd/yacht-charter-platform/scraped-data/flowers-urls.txt) products"
echo "✓ Bachelorette: $(wc -l < /root/clawd/yacht-charter-platform/scraped-data/bachelorette-urls.txt) products"
echo ""

echo "📸 STEP 2: Extracting all image URLs (high-res)..."

# Extract all Squarespace CDN image URLs
for category in "miami-yacht-charter-add-ons" "catering" "flower-add-ons" "bachelorette-packages"; do
  curl -s "https://www.miamiyachtingcompany.com/$category" | \
    grep -o 'https://images\.squarespace-cdn\.com/[^"]*' | \
    sed 's/?format=.*//g' | \
    sort -u >> /root/clawd/yacht-charter-platform/scraped-data/all-images.txt
done

# Deduplicate
sort -u /root/clawd/yacht-charter-platform/scraped-data/all-images.txt > /root/clawd/yacht-charter-platform/scraped-data/all-images-unique.txt
mv /root/clawd/yacht-charter-platform/scraped-data/all-images-unique.txt /root/clawd/yacht-charter-platform/scraped-data/all-images.txt

echo "✓ Found $(wc -l < /root/clawd/yacht-charter-platform/scraped-data/all-images.txt) unique images"
echo ""

echo "✅ URL extraction complete!"
echo "Next: Run complete-store-scrape.js to fetch all product data"
