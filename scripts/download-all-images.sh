#!/bin/bash
# Download all 370 product images in high resolution

echo "📸 DOWNLOADING ALL PRODUCT IMAGES (370 total)"
echo "This will take approximately 5-10 minutes..."
echo ""

# Extract unique image URLs from ALL-PRODUCTS.json
cat /root/clawd/yacht-charter-platform/scraped-data/ALL-PRODUCTS.json | \
  grep -o 'https://images\.squarespace-cdn\.com/[^"]*' | \
  sort -u > /root/clawd/yacht-charter-platform/scraped-data/image-urls.txt

TOTAL=$(wc -l < /root/clawd/yacht-charter-platform/scraped-data/image-urls.txt)
echo "Found $TOTAL unique images to download"
echo ""

COUNT=0
while IFS= read -r url; do
  COUNT=$((COUNT + 1))
  
  # Get filename from URL
  FILENAME=$(echo "$url" | sed 's/.*\///g' | sed 's/?.*//g')
  
  # Determine category from URL context (simplified)
  if [[ "$url" == *"rose"* ]] || [[ "$url" == *"orchid"* ]] || [[ "$url" == *"flower"* ]] || [[ "$url" == *"tropical"* ]]; then
    CATEGORY="flowers"
  elif [[ "$url" == *"bride"* ]] || [[ "$url" == *"bachelor"* ]] || [[ "$url" == *"veil"* ]] || [[ "$url" == *"toast"* ]]; then
    CATEGORY="bachelorette"
  elif [[ "$url" == *"food"* ]] || [[ "$url" == *"platter"* ]] || [[ "$url" == *"catering"* ]]; then
    CATEGORY="catering"
  else
    CATEGORY="general"
  fi
  
  # Add ?format=2500w for highest quality
  HIGH_RES_URL="${url}?format=2500w"
  
  # Download
  OUTPUT="/root/clawd/yacht-charter-platform/public/images/products/${CATEGORY}/${FILENAME}"
  curl -s "$HIGH_RES_URL" -o "$OUTPUT" 2>/dev/null
  
  if [ $((COUNT % 10)) -eq 0 ]; then
    echo "  [$COUNT/$TOTAL] Downloaded..."
  fi
done < /root/clawd/yacht-charter-platform/scraped-data/image-urls.txt

echo ""
echo "✅ Download complete!"
echo "Checking sizes..."
du -sh /root/clawd/yacht-charter-platform/public/images/products/*
