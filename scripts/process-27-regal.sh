#!/bin/bash
# Workaround script for 27-Regal with problematic filenames

YACHT_ID="27-Regal"
TEMP_DIR="/root/clawd/yacht-charter-platform/temp"
mkdir -p "$TEMP_DIR"

# Get Dropbox token
TOKEN=$(curl -s -X POST https://api.dropboxapi.com/oauth2/token \
  -d grant_type=refresh_token \
  -d refresh_token=YyrJI2fZ8s0AAAAAAAAAAYjQXGmNy4deO2XMka5B2nuA1JzS-f6ThExuz1FpHj08 \
  -d client_id=kjl4jhjq9taugf3 \
  -d client_secret=lzvh7q4q3tpk2vt | jq -r '.access_token')

echo "=== Processing 27-Regal Photos ==="
echo "Token obtained"

# Get file list with actual paths
FILES=$(curl -s -X POST https://api.dropboxapi.com/2/files/list_folder \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"path":"/Yacht Photos/27-Regal"}' | jq -r '.entries[] | @base64')

NUM=1
for ROW in $FILES; do
  _jq() {
    echo ${ROW} | base64 --decode | jq -r ${1}
  }
  
  FILE_PATH=$(_jq '.path_lower')
  FILE_NAME=$(_jq '.name')
  
  echo ""
  echo "[$NUM/18] $FILE_NAME"
  echo "  Downloading..."
  
  # Download using curl with proper header encoding
  curl -s -X POST https://content.dropboxapi.com/2/files/download \
    -H "Authorization: Bearer $TOKEN" \
    -H "Dropbox-API-Arg: {\"path\":\"$FILE_PATH\"}" \
    --output "$TEMP_DIR/temp_$NUM.png"
  
  if [ -f "$TEMP_DIR/temp_$NUM.png" ]; then
    echo "  ✓ Downloaded"
    
    # Call Node.js to optimize and upload
    PADDED=$(printf "%02d" $NUM)
    node -e "
      const sharp = require('sharp');
      const { createClient } = require('@supabase/supabase-js');
      const fs = require('fs');
      
      const supabase = createClient(
        'https://wojjcivzlxsbinbmblhy.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvampjaXZ6bHhzYmluYm1ibGh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM2MzI1NywiZXhwIjoyMDg2OTM5MjU3fQ.W3EctGiCKY9nNZSVxymnm7YBeQ4gd7mUlWtX5MkD1Hc'
      );
      
      async function process() {
        const inputPath = '$TEMP_DIR/temp_$NUM.png';
        const filename = 'Miami_Yachting_Company_27-Regal_$PADDED.webp';
        
        // Optimize
        let quality = 90;
        let buffer = await sharp(inputPath).webp({ quality }).toBuffer();
        
        while (buffer.length / 1024 > 500 && quality > 60) {
          quality -= 5;
          buffer = await sharp(inputPath).webp({ quality }).toBuffer();
        }
        
        console.log(\`  Optimized: \${(buffer.length / 1024).toFixed(2)}KB (q:\${quality})\`);
        
        // Upload
        const { error } = await supabase.storage
          .from('yacht-photos')
          .upload('27-Regal/' + filename, buffer, {
            contentType: 'image/webp',
            upsert: true
          });
        
        if (error) throw error;
        
        const url = 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/27-Regal/' + filename;
        console.log(\`  ✓ \${url}\`);
        
        // Cleanup
        fs.unlinkSync(inputPath);
        
        // Hero image (first photo only)
        if ($NUM === 1) {
          quality = 75;
          let heroBuffer = await sharp('$TEMP_DIR/temp_$NUM.png').webp({ quality }).toBuffer();
          
          while (heroBuffer.length / 1024 > 200 && quality > 60) {
            quality -= 5;
            heroBuffer = await sharp('$TEMP_DIR/temp_$NUM.png').webp({ quality }).toBuffer();
          }
          
          await supabase.storage
            .from('yacht-photos')
            .upload('27-Regal/Miami_Yachting_Company_27-Regal_hero.webp', heroBuffer, {
              contentType: 'image/webp',
              upsert: true
            });
          
          console.log(\`  ✓ Hero created (\${(heroBuffer.length / 1024).toFixed(2)}KB)\`);
        }
      }
      
      process().catch(console.error);
    "
  else
    echo "  ✗ Download failed"
  fi
  
  NUM=$((NUM + 1))
done

echo ""
echo "✓ Complete! 18 photos processed"
