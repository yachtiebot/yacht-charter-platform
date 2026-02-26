#!/bin/bash
# Rename all catering images to proper format

cd /root/clawd/yacht-charter-platform/public/images/products/catering-complete

echo "🔧 Renaming all catering images..."
echo ""

count=0

for file in *.{png,jpg,jpeg} 2>/dev/null; do
  [ -f "$file" ] || continue
  
  # Skip if already has prefix
  if [[ $file == Miami_Yachting_Company_* ]]; then
    continue
  fi
  
  # Get extension
  ext="${file##*.}"
  
  # Convert extension to lowercase jpg
  if [ "$ext" = "png" ] || [ "$ext" = "PNG" ] || [ "$ext" = "jpeg" ] || [ "$ext" = "JPEG" ]; then
    newext="jpg"
  else
    newext="$ext"
  fi
  
  # Get base name without extension
  base="${file%.*}"
  
  # New filename
  newfile="Miami_Yachting_Company_${base}.${newext}"
  
  # Rename
  mv "$file" "$newfile"
  echo "✓ $file → $newfile"
  count=$((count + 1))
done

echo ""
echo "✅ Renamed $count files"
echo "📁 Location: $(pwd)"
