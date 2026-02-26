#!/bin/bash
# PURGE LOCAL PRODUCT IMAGES
# All images are now on Supabase CDN - safe to delete local copies

echo "🗑️  PURGING LOCAL PRODUCT IMAGES"
echo "=================================================="
echo ""

# Backup count
echo "📊 Current image count:"
find public/images/products/ -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) | wc -l

echo ""
echo "⚠️  WARNING: This will delete ALL local product images!"
echo "All images are safely stored on Supabase CDN."
echo ""
echo "Purging in 3 seconds... (Ctrl+C to cancel)"
sleep 3

echo ""
echo "🗑️  Deleting local product images..."

# Delete product images
rm -rf public/images/products/catering-complete/
rm -rf public/images/products/catering/
rm -rf public/images/products/flowers/
rm -rf public/images/products/bachelorette/
rm -rf public/images/products/water-toys/

# Keep the directories but empty
mkdir -p public/images/products/catering-complete
mkdir -p public/images/products/flowers
mkdir -p public/images/products/bachelorette
mkdir -p public/images/products/water-toys

# Add .gitkeep files
touch public/images/products/catering-complete/.gitkeep
touch public/images/products/flowers/.gitkeep
touch public/images/products/bachelorette/.gitkeep
touch public/images/products/water-toys/.gitkeep

echo ""
echo "✅ Local images purged!"
echo "📁 Directories kept with .gitkeep files"
echo "🌐 All images now served from Supabase CDN"
echo ""
echo "=================================================="
