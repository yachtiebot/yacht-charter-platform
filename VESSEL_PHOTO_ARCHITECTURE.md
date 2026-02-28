# 🚢 Vessel Photo Architecture

## **How It Works (Source of Truth)**

### **Photo Storage Strategy:**

```
Supabase Storage (yacht-photos bucket)
└── {Yacht-ID}/
    ├── Miami_Yachting_Company_{Yacht-ID}_hero.webp
    ├── Miami_Yachting_Company_{Yacht-ID}_01.webp
    ├── Miami_Yachting_Company_{Yacht-ID}_02.webp
    └── ...
```

**Examples:**
```
yacht-photos/27-Regal/Miami_Yachting_Company_27-Regal_hero.webp
yacht-photos/27-Regal/Miami_Yachting_Company_27-Regal_01.webp
yacht-photos/116-Pershing/Miami_Yachting_Company_116-Pershing_hero.webp
```

---

## **Data Flow:**

### **1. Airtable = Source of Truth (For Metadata)**

```javascript
{
  "Yacht ID": "27-Monterey",              // Format: {length}-{Brand}
  "Boat Name": "27 ft Monterey Black",    // Format: {length} ft {Brand} {Model/Color}
  "Brand": "Monterey",
  "Model": "Black",
  "Length in Feet": 27,
  "Sound System Type": "Bluetooth/Aux",   // ONLY this format
  "Show on Website?": true,
  // NO PHOTO URLS IN AIRTABLE
}
```

### **2. yacht-cache.ts = Photo Hardcoding**

```javascript
const photoMapping = {
  '27-Regal': 15,        // Number of photos
  '37-Axopar': 13,
  '116-Pershing': 46,
  '27-Monterey': 5       // ← Added after scraping
};
```

This generates URLs dynamically:
```javascript
enhanceWithPhotos() {
  yacht.fields['Supabase Hero URL'] = 
    `yacht-photos/${yachtId}/Miami_Yachting_Company_${yachtId}_hero.webp`;
  
  yacht.fields['Supabase Gallery URLs'] = [
    `yacht-photos/${yachtId}/Miami_Yachting_Company_${yachtId}_01.webp`,
    `yacht-photos/${yachtId}/Miami_Yachting_Company_${yachtId}_02.webp`,
    ...
  ];
}
```

### **3. Fallback System (If Airtable Down)**

```
FALLBACK_YACHTS array in yacht-cache.ts
  ↓
enhanceWithPhotos()
  ↓
Website still works with hardcoded Supabase URLs
```

---

## **Naming Convention Rules:**

### **Yacht ID Format:**
```
{length}-{Brand}

✅ CORRECT:
- 27-Monterey
- 116-Pershing
- 37-Axopar

❌ WRONG:
- 27-ft-monterey-boat-charter-in-miami-beach
- monterey-black
```

### **Boat Name Format:**
```
{length} ft {Brand} {Model/Color/Descriptor}

✅ CORRECT:
- 27 ft Monterey Black
- 116 ft Pershing
- 37 ft Axopar

❌ WRONG:
- 27 ft Monterey Boat Charter in Miami Beach
- Monterey Black 27ft
```

### **Photo File Names:**
```
Miami_Yachting_Company_{Yacht-ID}_{type}.webp

Types:
- hero  (main listing photo)
- 01, 02, 03... (gallery photos, zero-padded 2 digits)

✅ CORRECT:
- Miami_Yachting_Company_27-Monterey_hero.webp
- Miami_Yachting_Company_27-Monterey_01.webp

❌ WRONG:
- Miami_Yachting_Company_27-ft-monterey-boat-charter-in-miami-beach-hero.jpg
- monterey-gallery-1.jpg
```

---

## **Image Upload Form (Future)**

You mentioned having an upload form where you can:
1. Select vessel from dropdown (pulls from Airtable)
2. Upload photos
3. Override/add to existing photos

**How this will work:**
```
Upload Form → Sharp Optimization → Supabase (yacht-photos/{Yacht-ID}/)
  ↓
Update photoMapping in yacht-cache.ts with new count
  ↓
Website automatically shows new photos
```

**No Airtable update needed** - photos live on Supabase, hardcoded in cache layer.

---

## **Scraper Requirements:**

When scraping from Squarespace:

### ✅ **MUST DO:**
1. Extract `{length}` from page (e.g., "27 ft")
2. Extract `{Brand}` from page (e.g., "Monterey")
3. Generate `Yacht ID` = `{length}-{Brand}`
4. Download all photos
5. Optimize with Sharp (<500KB, WebP format)
6. Rename to: `Miami_Yachting_Company_{Yacht-ID}_{hero|01|02...}.webp`
7. Upload to Supabase: `yacht-photos/{Yacht-ID}/`
8. Count photos uploaded
9. Update `photoMapping` in `yacht-cache.ts`
10. Create Airtable record with metadata only (no photo URLs)

### ❌ **MUST NOT DO:**
1. Store photo URLs in Airtable
2. Use different bucket (vessel-images ❌, yacht-photos ✅)
3. Use `.jpg` format (use `.webp`)
4. Include extra words in Yacht ID
5. Exceed 500KB per image

---

## **Text Cleaning Rules:**

### **Full Description:**
```javascript
// ✅ Clean formatting
"Climb aboard this 27 ft Monterey for an unparalleled Miami boat rental in the waters of South Florida."

// ❌ Raw scraped
"Climb aboard this 27 ft Monterey for an unparalleled Miami boat rental in the waters of south Florida. Modern and comfortable, she is perfect for smaller groups..."
```

**Rules:**
- Capitalize proper nouns (South Florida, Miami Beach)
- Remove dashes used as bullets (→ •)
- No misspellings
- Consistent punctuation
- Natural sentence flow

### **Sound System Type:**
**ONLY acceptable value:** `Bluetooth/Aux`

Don't scrape "Stereo: Aux/Bluetooth" → Clean to → `Bluetooth/Aux`

---

## **Image Optimization Standards (CLS_RULES.md):**

1. **Format:** WebP (not JPG/PNG)
2. **Max size:** 500KB per image
3. **Dimensions:** 1920x1080 max (responsive fit)
4. **Quality:** Start 85, reduce if >500KB
5. **Progressive:** Yes
6. **Delete local:** After upload (save space)

---

## **After Scraping Checklist:**

1. ✅ Photos uploaded to correct Supabase path?
2. ✅ `photoMapping` in `yacht-cache.ts` updated?
3. ✅ Airtable record created with metadata only?
4. ✅ `Yacht ID` follows format `{length}-{Brand}`?
5. ✅ `Boat Name` follows format `{length} ft {Brand} {Model}`?
6. ✅ All images <500KB and WebP format?
7. ✅ Test URL: `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/{Yacht-ID}/Miami_Yachting_Company_{Yacht-ID}_hero.webp`
8. ✅ Website shows photos correctly?

---

## **Example Correct Scrape:**

**Input:** https://www.miamiyachtingcompany.com/monterey-black

**Extracted:**
- Length: 27
- Brand: Monterey
- Model/Color: Black
- Yacht ID: `27-Monterey`
- Boat Name: `27 ft Monterey Black`

**Photos uploaded to:**
```
yacht-photos/27-Monterey/Miami_Yachting_Company_27-Monterey_hero.webp
yacht-photos/27-Monterey/Miami_Yachting_Company_27-Monterey_01.webp
yacht-photos/27-Monterey/Miami_Yachting_Company_27-Monterey_02.webp
yacht-photos/27-Monterey/Miami_Yachting_Company_27-Monterey_03.webp
yacht-photos/27-Monterey/Miami_Yachting_Company_27-Monterey_04.webp
```

**yacht-cache.ts updated:**
```diff
  const photoMapping = {
    '116-Pershing': 46,
    '37-Axopar': 13,
    '27-Regal': 15,
+   '27-Monterey': 5
  };
```

**Airtable record:**
```json
{
  "Yacht ID": "27-Monterey",
  "Boat Name": "27 ft Monterey Black",
  "Brand": "Monterey",
  "Model": "Black",
  "Sound System Type": "Bluetooth/Aux",
  // NO PHOTO FIELDS
}
```

---

## **Why This Architecture?**

1. **Resilience:** If Airtable down, website still works with fallback + hardcoded Supabase URLs
2. **Performance:** Photo URLs generated in memory, not fetched from Airtable
3. **Simplicity:** One source (Supabase), one pattern (yacht-photos/{ID}/)
4. **Consistency:** All boats follow same naming convention
5. **Control:** Photo count in code, easy to update when adding photos

---

**This is the system. Scraper must follow it exactly.** ✅
