# Hybrid Scraper - Quick Start Example

## Example: Adding 100 ft Skipperliner

### Step 1: Drop PDF in Dropbox
Place your PDF in Dropbox:
```
/PDF/100-Skipperliner.pdf
```

### Step 2: Run hybrid scraper
```bash
cd /root/yacht-charter-platform
npx tsx scripts/scrape-vessel-hybrid.ts https://www.miamiyachtingcompany.com/100-skipperliner --pdf
```

### Step 3: Watch it work
```
🚢 Miami Yachting Company - Hybrid Vessel Scraper

📄 PDF Mode: Will extract images from Dropbox PDF if available
═══════════════════════════════════════════════════════════

📄 Checking for PDF in Dropbox: /PDF/100-Skipperliner.pdf
   ✅ PDF found! Downloading...
   ✅ Downloaded PDF
   📄 PDF has 17 pages
   🖼️  Extracting images (skipping page 1 and last page)...
   ✅ Extracted 15 images from PDF

✅ Scraped vessel data:
   Yacht ID: 100-Skipperliner
   Boat Name: 100 ft Skipperliner
   Brand: Skipperliner
   Model: Stella Maris
   Length: 100ft
   Capacity: 50 passengers
   Images found: 16

📸 Processing 15 images from PDF...
  1/15 Miami_Yachting_Company_100-Skipperliner_hero.webp
     ✅ 490KB (q:80)
     ☁️  Uploaded!
  2/15 Miami_Yachting_Company_100-Skipperliner_01.webp
     ✅ 499KB (q:85)
     ☁️  Uploaded!
  ... (13 more) ...

✅ Uploaded 15 images from PDF to yacht-photos/100-Skipperliner/

📝 Creating/updating Airtable record...
✅ Updated Airtable record: recXXXXXXXXXX

📝 Updating yacht-cache.ts...
✅ Added '100-Skipperliner': 14 to photoMapping

═══════════════════════════════════════════════════════════
✅ COMPLETE!
```

### Step 4: Commit and deploy
```bash
git add lib/yacht-cache.ts
git commit -m "Add 100-Skipperliner to yacht photo mapping"
git push origin main
```

## What You Get

✅ **Airtable Record:**
- All data from website (pricing, specs, description)
- Customer quote extracted
- Record created or updated

✅ **Supabase Images:**
- 15 high-quality unwatermarked images
- Optimized to WebP (<500KB)
- Professional edits preserved

✅ **Website Ready:**
- Photos mapped in yacht-cache.ts
- Will appear on website after deploy

## Without PDF (Fallback)

If you DON'T have a PDF:

```bash
npx tsx scripts/scrape-vessel-hybrid.ts https://www.miamiyachtingcompany.com/29-sea-ray
```

Output:
```
📄 Checking for PDF in Dropbox: /PDF/29-Sea-Ray.pdf
   ❌ PDF not found in Dropbox
   ⚠️  No PDF found, falling back to website images...

📸 Processing 16 images from website...
  📥 Downloading image 1...
  🔧 Optimizing to Miami_Yachting_Company_29-Sea-Ray_hero.webp...
  ...
```

Works perfectly! Uses website images automatically.

## Real-World Usage

### Scenario 1: New boat with PDF
```bash
# Drop PDF first
# Then run:
npx tsx scripts/scrape-vessel-hybrid.ts <url> --pdf
```

### Scenario 2: New boat without PDF
```bash
# Just run without --pdf
npx tsx scripts/scrape-vessel-hybrid.ts <url>
```

### Scenario 3: Update existing boat with PDF
```bash
# Drop updated PDF
# Run with --pdf to replace images
npx tsx scripts/scrape-vessel-hybrid.ts <url> --pdf
```

## Next Steps

Ready to scrape more boats? Just follow the same pattern:
1. Drop PDF in `/PDF/{Yacht-ID}.pdf` (if you have it)
2. Run: `npx tsx scripts/scrape-vessel-hybrid.ts <url> --pdf`
3. Commit and deploy

That's it! 🚤
