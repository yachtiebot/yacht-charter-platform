# 📸 Image Setup Guide

## Current Status: Using Unsplash Placeholders

The site currently uses high-quality yacht photos from Unsplash as placeholders. To add your real yacht photos:

## Option 1: Replace URLs in Database (Easiest)

1. **Run the database setup:**
   ```sql
   -- In Supabase SQL Editor
   -- First run DATABASE_SCHEMA.sql
   -- Then run SAMPLE_DATA.sql
   ```

2. **Replace image URLs:**
   - Go to Supabase Table Editor
   - Find `public_vessels` table
   - Click on a vessel row
   - Update `hero_image_url` with your Squarespace CDN URL
   - Update `gallery_image_urls` array with additional photos

## Option 2: Scrape from Current Site

**Send me:**
- Direct URLs to yacht photos on miamiyachtingcompany.com
- Or give me access to your Squarespace export

**I'll:**
- Download all images
- Optimize them (WebP, multiple sizes, lazy loading)
- Add proper alt text
- No CLS (Cumulative Layout Shift) issues

## Option 3: Google Drive Sync (Future)

For ongoing image management:
1. Create shared Google Drive folder
2. Sales team drops images with naming convention: `make-length-001.jpg`
3. I sync them automatically
4. Images appear on site within minutes

---

## Image Specifications

### Recommended Sizes:
- **Hero images:** 1920×1080px minimum (16:9 ratio)
- **Gallery images:** 1200×800px (3:2 ratio)
- **Fleet cards:** 1200×1600px (3:4 portrait ratio)

### Format:
- Save as JPG or PNG
- I'll convert to WebP for performance
- Target: <200KB per image after optimization

### Naming Convention:
```
sunseeker-68-hero.jpg
sunseeker-68-deck.jpg
sunseeker-68-cabin.jpg
azimut-55-hero.jpg
```

---

## To Get Started with Real Images:

**Option A (5 minutes):**
Send me 3-5 direct Squarespace CDN URLs like:
```
https://images.squarespace-cdn.com/content/v1/xxxxx/yacht-image.jpg
```

**Option B (I do everything):**
Give me admin access to your Squarespace and I'll export everything.

**Option C (Quick start):**
Just run `SAMPLE_DATA.sql` now to see the site live with placeholder images, replace URLs later.

---

## Current Placeholder Images

Using professional yacht photography from Unsplash:
- High resolution
- Properly sized
- Fast loading
- No licensing issues (Unsplash free license)

Replace with your actual fleet when ready!
