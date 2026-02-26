#!/bin/bash
# Fetch remaining 17 product prices quickly

echo "🚀 Fetching remaining prices..."
echo ""

# Array of remaining URLs
urls=(
  "choc-red-velvet"
  "croissantplatter"
  "customizable-cookies-and-cream-cake-6n3m8"
  "customizable-floral-cake"
  "customizable-party-balloon-cake-aar5e"
  "desert-tart-6mpcy"
  "german-choc-cake"
  "greek-style-pasta-salad-etjrx"
  "grilled-chicken-pasta-bowl-5cg2c"
  "large-charcuterie-platter"
  "largebrunchplatter"
  "macaronchocolatestrawberry"
  "pudding-cake"
  "straw-almond-cream-cake"
  "straw-leche-cake"
  "taboulisalad"
)

> /tmp/remaining-prices.txt

for id in "${urls[@]}"; do
  echo "[$id]"
  html=$(curl -s "https://www.miamiyachtingcompany.com/catering/$id")
  
  # Extract price
  price=$(echo "$html" | grep -o '\$[0-9]*\.[0-9]*' | head -1 | sed 's/\$//')
  
  # Check for "from" price
  from_price=$(echo "$html" | grep -o 'from \$[0-9]*\.[0-9]*' | head -1 | sed 's/from \$//')
  
  if [ ! -z "$from_price" ]; then
    price=$from_price
  fi
  
  # Extract sizes
  sizes=$(echo "$html" | grep -o 'Serves [0-9]*' | sort -u | tr '\n' ',' | sed 's/,$//')
  
  if [ -z "$price" ]; then
    echo "  ⚠️  No price found"
  else
    echo "  ✓ Price: \$$price"
    [ ! -z "$sizes" ] && echo "  ✓ Sizes: $sizes"
  fi
  
  echo "$id|$price|$sizes" >> /tmp/remaining-prices.txt
  sleep 0.3
done

echo ""
echo "✅ Done! Saved to /tmp/remaining-prices.txt"
cat /tmp/remaining-prices.txt
