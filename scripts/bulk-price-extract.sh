#!/bin/bash
# Bulk fetch prices from all catering products

cd /root/clawd/yacht-charter-platform

echo "🚀 Bulk Price Extraction Starting..."
echo ""

# Read URLs from JSON
urls=$(cat scraped-data/urls-to-fetch.json | jq -r '.[].url')

count=0
total=$(cat scraped-data/urls-to-fetch.json | jq '. | length')

for url in $urls; do
  count=$((count + 1))
  product_id=$(echo "$url" | sed 's|.*/||')
  
  echo "[$count/$total] Fetching: $product_id"
  
  # Fetch page and extract price
  html=$(curl -s "$url")
  price=$(echo "$html" | grep -o 'from \$[0-9.]*' | head -1 | sed 's/from \$//')
  sizes=$(echo "$html" | grep -o 'Serves [0-9]*' | sort -u | tr '\n' ', ')
  
  if [ -z "$price" ]; then
    echo "  ⚠️  No price found"
  else
    echo "  ✓ Price: \$$price"
    echo "  ✓ Sizes: $sizes"
  fi
  
  echo "$product_id|$price|$sizes" >> /tmp/catering-prices.txt
  
  # Small delay to be respectful
  sleep 0.5
done

echo ""
echo "✅ Extraction complete!"
echo "📊 Results saved to: /tmp/catering-prices.txt"
