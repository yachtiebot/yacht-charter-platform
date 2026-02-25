# Scripts

Automation scripts for the Miami Yachting Company platform.

## Photo Processing

### process-dropbox-photos.js

Downloads photos from Dropbox, optimizes them with Sharp, and applies SEO naming rules.

**Usage:**
```bash
node scripts/process-dropbox-photos.js "/dropbox-folder-path"
```

**Example:**
```bash
node scripts/process-dropbox-photos.js "/web content photos"
```

**What it does:**
1. Authenticates with Dropbox using refresh token
2. Lists all files in the specified folder
3. Downloads each photo
4. Optimizes with Sharp:
   - Compresses to max 500KB
   - Adjusts quality (90 → 60)
   - Resizes if needed to meet size target
   - Converts PNG to JPEG for better compression
5. Renames according to SEO rules: `Miami_Yachting_Company_[descriptive-name].jpg`
6. Saves to `public/images/`
7. Deletes temp files

**Requirements:**
- Node.js
- Sharp package (`npm install sharp`)
- Valid Dropbox refresh token (configured in script)

**Output:**
- Optimized images in `public/images/`
- Console log with processing details
- Summary of successful/failed conversions

**SEO Naming Rules:**
All images are automatically renamed to:
```
Miami_Yachting_Company_[descriptive-name].[ext]
```

Example:
- `boat photo.jpg` → `Miami_Yachting_Company_boat-photo.jpg`
- `68ft Yacht Front.png` → `Miami_Yachting_Company_68ft-yacht-front.jpg`

This ensures all images follow SEO best practices with brand name inclusion.

## Other Scripts

### optimize-images.js
Batch image optimization for existing photos.

### scrape-images.js
Web scraping utility for image collection.

### sync-airtable.js
Syncs vessel data from Airtable to local database.
