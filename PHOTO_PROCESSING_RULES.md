# PHOTO PROCESSING RULES

**Mandatory workflow for ALL product photos. No exceptions.**

---

## 📸 **Upload Process (Automated)**

### **1. Source Photos**
- Accept any format: JPG, PNG, HEIC, WebP
- Accept any size (we'll optimize)
- Place in temporary staging folder

### **2. Optimization (Sharp)**
```javascript
// Auto-optimize with Sharp
await sharp(inputPath)
  .resize(1920, null, {
    fit: 'inside',
    withoutEnlargement: true
  })
  .jpeg({
    quality: 85,
    progressive: true,
    mozjpeg: true
  })
  .toFile(outputPath);
```

**Targets:**
- Max width: 1920px (maintains aspect ratio)
- Format: JPG (always)
- Quality: 85% (optimal balance)
- Max size: 500KB per image
- Progressive: Yes

### **3. Naming Convention**
```
Miami_Yachting_Company_[product-slug]_[number].jpg
```

**Examples:**
- `Miami_Yachting_Company_rose_pave_1.jpg`
- `Miami_Yachting_Company_caesar_salad_platter_2.jpg`

**Rules:**
- Prefix: ALWAYS `Miami_Yachting_Company_`
- Product slug: lowercase, underscores only (no dashes!)
- Number: Sequential starting at 1
- Extension: `.jpg` (always lowercase)

### **4. Upload to Supabase**
```javascript
// Upload to Supabase Storage
const { data, error } = await supabase.storage
  .from('product-images')
  .upload(`category/${filename}`, fileBuffer, {
    contentType: 'image/jpeg',
    upsert: true
  });

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('product-images')
  .getPublicUrl(filePath);
```

**Storage structure:**
```
product-images/
  ├── catering-complete/
  ├── flowers/
  ├── bachelorette/
  └── water-toys/
```

### **5. Update Catalog**
- Add Supabase URL to product catalog
- Verify image loads correctly
- Update any size/price metadata

### **6. PURGE ORIGINALS (CRITICAL!)**
```bash
# Delete ALL staging/original files
rm -rf /path/to/originals/*
rm -rf /path/to/staging/*

# Delete unoptimized versions
find . -type f -size +500k -name "*.jpg" -delete
find . -type f -name "*.png" -delete
find . -type f -name "*.heic" -delete
```

**⚠️  NO EXCEPTIONS:**
- Delete originals IMMEDIATELY after Supabase upload succeeds
- Delete any unoptimized files
- Keep ZERO local product images
- Supabase is single source of truth

---

## 🤖 **Automated Script Template**

Create this as `scripts/process-new-photos.js`:

```javascript
#!/usr/bin/env node
/**
 * AUTOMATED PHOTO PROCESSOR
 * 
 * 1. Optimize with Sharp
 * 2. Rename properly
 * 3. Upload to Supabase
 * 4. Update catalog
 * 5. PURGE originals
 */

const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Config
const STAGING_DIR = './staging/photos';
const CATEGORY = process.argv[2]; // catering-complete, flowers, etc
const SUPABASE_URL = 'https://wojjcivzlxsbinbmblhy.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function processPhoto(inputPath, productSlug, imageNumber) {
  const filename = `Miami_Yachting_Company_${productSlug}_${imageNumber}.jpg`;
  const tempPath = `/tmp/${filename}`;
  
  // 1. Optimize
  await sharp(inputPath)
    .resize(1920, null, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(tempPath);
  
  const stats = fs.statSync(tempPath);
  const sizeKB = (stats.size / 1024).toFixed(0);
  
  if (stats.size > 512000) { // > 500KB
    console.warn(`⚠️  ${filename} is ${sizeKB}KB (over 500KB limit)`);
  }
  
  // 2. Upload to Supabase
  const fileBuffer = fs.readFileSync(tempPath);
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(`${CATEGORY}/${filename}`, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    });
  
  if (error) throw error;
  
  // 3. Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(`${CATEGORY}/${filename}`);
  
  // 4. Clean up temp
  fs.unlinkSync(tempPath);
  
  console.log(`✅ ${filename} (${sizeKB}KB) → ${publicUrl}`);
  
  return publicUrl;
}

async function main() {
  const files = fs.readdirSync(STAGING_DIR);
  const urls = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(STAGING_DIR, file);
    const productSlug = process.argv[3]; // From command line
    
    const url = await processPhoto(inputPath, productSlug, i + 1);
    urls.push(url);
  }
  
  // 5. PURGE ORIGINALS
  console.log('\n🗑️  Purging originals...');
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  fs.mkdirSync(STAGING_DIR, { recursive: true });
  
  console.log('✅ Originals purged!\n');
  console.log('📋 Add these URLs to your catalog:');
  urls.forEach(url => console.log(`  "${url}",`));
}

main().catch(console.error);
```

**Usage:**
```bash
# 1. Place photos in staging/photos/
# 2. Run processor
node scripts/process-new-photos.js catering-complete "caesar_salad_platter"

# Photos are optimized, uploaded, and originals DELETED automatically!
```

---

## 📋 **Checklist (Every Upload)**

- [ ] Photos optimized with Sharp
- [ ] Named: `Miami_Yachting_Company_[slug]_[num].jpg`
- [ ] Uploaded to Supabase
- [ ] Catalog updated with Supabase URLs
- [ ] **ORIGINALS PURGED** ← CRITICAL!
- [ ] No files > 500KB
- [ ] No local product images remain

---

## 🚫 **What NOT To Do**

❌ Don't keep original files  
❌ Don't store product images in git  
❌ Don't use local paths in catalogs  
❌ Don't skip optimization  
❌ Don't use PNG (always convert to JPG)  
❌ Don't use dashes in filenames (underscores only!)  

---

## ✅ **What Success Looks Like**

- All product images on Supabase CDN
- `/public/images/products/` folders are empty (except .gitkeep)
- All catalog URLs start with `https://wojjcivzlxsbinbmblhy.supabase.co/`
- No unoptimized files anywhere
- Fast page loads (images served from CDN)
- Clean git repo (no large files)

---

**This is the new standard. Every photo upload follows this flow. No manual work. No junk files. Professional CDN delivery every time.** 🚀
