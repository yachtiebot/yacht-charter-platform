# Hybrid Vessel Scraper

**Best of both worlds:** Scrape website data + use high-quality PDF images

## Why Hybrid?

✅ **Website scraping** - Get all text data (pricing, descriptions, specs, quotes)  
✅ **PDF images** - Use unwatermarked, high-quality photos from your PDFs  
✅ **Fully automated** - One command does everything  
✅ **Smart fallback** - Uses website images if PDF not found

## Usage

### Basic: Scrape website images (original behavior)
```bash
npx tsx scripts/scrape-vessel-hybrid.ts https://www.miamiyachtingcompany.com/100-skipperliner
```

### Hybrid: Use PDF images
```bash
npx tsx scripts/scrape-vessel-hybrid.ts https://www.miamiyachtingcompany.com/100-skipperliner --pdf
```

## Workflow

### 1. Prepare PDF
Drop your PDF into Dropbox:
```
/PDF/100-Skipperliner.pdf
```

**PDF naming:** Must match the Yacht ID from the URL
- URL: `miamiyachtingcompany.com/100-skipperliner`  
- PDF name: `100-Skipperliner.pdf` ✅

**PDF structure:**
- Page 1: Skip (usually has text overlay)
- Pages 2-N-1: Extract as images
- Last page: Skip (usually specs table)

### 2. Run hybrid scraper
```bash
npx tsx scripts/scrape-vessel-hybrid.ts https://www.miamiyachtingcompany.com/100-skipperliner --pdf
```

### 3. What happens:
1. ✅ Scrapes website for all data (pricing, description, specs, quotes)
2. ✅ Checks Dropbox `/PDF/100-Skipperliner.pdf`
3. ✅ If found: Extracts images from PDF
4. ✅ If not found: Falls back to website images
5. ✅ Optimizes to WebP (<500KB)
6. ✅ Uploads to Supabase
7. ✅ Creates/updates Airtable record
8. ✅ Updates yacht-cache.ts

## Output

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
   Length: 100ft
   Capacity: 50 passengers

📸 Processing 15 images from PDF...
  1/15 Miami_Yachting_Company_100-Skipperliner_hero.webp
     ✅ 490KB (q:80)
     ☁️  Uploaded!
  ...

✅ Uploaded 15 images from PDF to yacht-photos/100-Skipperliner/

📝 Creating/updating Airtable record...
✅ Created Airtable record: recXXXXXXXXXX

📝 Updating yacht-cache.ts...
✅ Added '100-Skipperliner': 14 to photoMapping
```

## Benefits

### vs Website Scraping Only:
✅ No watermarks on images  
✅ Higher quality (not re-compressed by Squarespace)  
✅ Professional edits/filters preserved  
✅ Perfect for white-labeled broker PDFs

### vs Manual PDF Upload:
✅ Fully automated (no manual image upload)  
✅ One command instead of multiple steps  
✅ Consistent naming and optimization  
✅ Still gets all website data automatically

## Fallback Behavior

**If PDF is missing:**
- Scraper automatically uses website images
- No error, seamless fallback
- Still completes successfully

**Best practice:**
- Always drop PDF before scraping (if you have it)
- Scraper will find it automatically

## File Locations

**Dropbox:**
```
/PDF/
  ├─ 100-Skipperliner.pdf
  ├─ 116-Pershing.pdf
  └─ 29-Sea-Ray.pdf
```

**Supabase:**
```
yacht-photos/
  └─ 100-Skipperliner/
      ├─ Miami_Yachting_Company_100-Skipperliner_hero.webp
      ├─ Miami_Yachting_Company_100-Skipperliner_01.webp
      ├─ Miami_Yachting_Company_100-Skipperliner_02.webp
      └─ ...
```

## Troubleshooting

### PDF not found
- Check filename matches Yacht ID exactly
- Check it's in `/PDF/` folder in Dropbox
- Verify Dropbox credentials are set

### Images look wrong
- First page has text? → Normal, scraper skips it
- Last page extracted? → Check PDF page count, might need manual adjustment

### Want only website images?
- Don't use `--pdf` flag
- Or remove PDF from Dropbox temporarily

## Comparison Table

| Feature | Website Only | PDF Only | Hybrid (Recommended) |
|---------|-------------|----------|---------------------|
| Data scraping | ✅ | ❌ | ✅ |
| Image quality | 🟡 Medium | ✅ High | ✅ High |
| Watermarks | ⚠️ Maybe | ✅ None | ✅ None |
| Automation | ✅ Full | 🟡 Manual | ✅ Full |
| Fallback | ❌ | ❌ | ✅ |

## Future Enhancements

- [ ] Auto-detect first/last pages (ML-based)
- [ ] Support multiple PDFs per boat (different angles)
- [ ] Extract specs from PDF last page
- [ ] Batch processing (multiple boats at once)
