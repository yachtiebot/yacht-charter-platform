# Photo Rules Violations Report

## 🚨 VIOLATIONS FOUND

### **Rule Violations:**
1. ❌ Images NOT following Miami_Yachting_Company_ naming convention
2. ❌ Images NOT optimized with Sharp (no size limit enforcement)
3. ❌ No CLS prevention (width/height not enforced)
4. ❌ Original files NOT deleted from inbound folder

---

## 📋 **Violating Files:**

### **1. Catering Thumbnail** (Today's violation)
- `public/images/catering-thumbnail.jpg`
- **Should be:** `Miami_Yachting_Company_catering_platter.jpg`
- **Status:** Awaiting Sharp optimization

### **2. Water Toys Images** (Today's violation)
All water toys images copied without optimization:
- `floating-cabana.jpg` → Should be `Miami_Yachting_Company_floating_cabana.jpg`
- `flitescooter.jpg` → Should be `Miami_Yachting_Company_flitescooter.jpg`
- `lounge-chair.jpg` → Should be `Miami_Yachting_Company_floating_lounge_chair.jpg`
- `jet-ski.jpg` → Should be `Miami_Yachting_Company_jet_ski.jpg`
- `watersports-boat.jpg` → Should be `Miami_Yachting_Company_watersports_boat.jpg`
- `seabob.jpg` → Should be `Miami_Yachting_Company_seabob.jpg`
- `hero.jpg` → Should be `Miami_Yachting_Company_water_toys_hero.jpg`

### **3. Catering-New Folder** (Scraper violations - 38 files)
**All scraped images violate naming:**
- `cubanplatter_1.jpg` → Should be `Miami_Yachting_Company_cuban_platter_1.jpg`
- `chickentenders_0.png` → Should be `Miami_Yachting_Company_chicken_tenders_1.jpg` (and converted to JPG)
- `gourmet-wraps_2.png` → Should be `Miami_Yachting_Company_gourmet_wraps_2.jpg`
- ... (35 more files)

### **4. Existing Product Images** (Pre-existing violations)
**Bachelorette images:**
- `bride+cups.jpg` → Has `+` characters (should be `_`)
- `lasttoastonthecoast.jpg` → No prefix

**Catering images:**
- `chef+salad+platter1.jpg` → Has `+` characters
- `MYC+platter.jpg` → Has `+` characters
- `cubesplatter.jpg` → No prefix

**Flowers images:**
- `blooming-orchid.png` → Should be JPG with proper naming
- `rose+pave.png` → Has `+` characters

---

## ✅ **Correct Examples:**
- `Miami_Yachting_Company_contact_hero_yacht.jpg` ✅
- `Miami_Yachting_Company_muffin_platter.jpg` ✅

---

## 📐 **The Rules (For Reference):**

### **MANDATORY Photo Processing:**
1. **Rename:** `Miami_Yachting_Company_[descriptive_name].jpg`
2. **Optimize:** Sharp with max 500KB, quality 85, progressive JPEG
3. **Format:** Convert PNG → JPG (unless transparency needed)
4. **Cleanup:** Delete originals after optimization
5. **CLS Prevention:** Specify width/height in Image components

### **Sharp Optimization Code:**
```javascript
await sharp(input)
  .resize(1920, null, { 
    fit: 'inside',
    withoutEnlargement: true 
  })
  .jpeg({ 
    quality: 85,
    progressive: true 
  })
  .toFile(output);
```

---

## 🔧 **Action Required:**

### **Immediate (Critical):**
1. Install Sharp: `npm install sharp`
2. Optimize catering-thumbnail.jpg
3. Optimize 7 water toys images
4. Rename all to proper convention

### **Short-term (Important):**
5. Bulk rename/optimize 38 catering-new images
6. Create automated photo processing script for future uploads

### **Long-term (Maintenance):**
7. Fix pre-existing bachelorette images
8. Fix pre-existing catering images  
9. Fix pre-existing flowers images
10. Add pre-commit hook to enforce rules

---

## 📊 **Summary:**
- **Total violations:** ~60+ images
- **Today's violations:** 46 images (1 thumbnail + 7 water toys + 38 catering-new)
- **Pre-existing violations:** ~14 images (bachelorette, catering, flowers)

---

**Status:** Sharp is installing... will fix violations once complete.

**Last Updated:** Feb 26, 2026 - 19:57 UTC
