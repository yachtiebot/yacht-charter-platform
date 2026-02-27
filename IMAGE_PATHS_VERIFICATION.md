# Image Paths Verification - SEO Naming

## ✅ VERIFIED CORRECT

### Upload Flow (All Categories):
```
User uploads → Backend adds SEO naming → Saves to Supabase → Updates Airtable (if applicable) → Page displays
```

### Product Images (Catering, Water Toys, Flowers, Bachelorette):
**Upload Format:**
- Input: `gourmet-wraps` (product ID)
- Supabase: `catering/Miami_Yachting_Company_gourmet_wraps.webp`
- Airtable: URL saved to "Image URL" field
- API: Returns Airtable "Image URL"
- Page: Uses `product.image` from API

**Status:** ✅ Correct - Dynamic, pulls from Airtable

---

### Hero Thumbnails (Fleet, Experiences, Departures, Add-Ons, Premium):
**Upload Format:**
- Input: `addons-catering-thumb`
- Supabase: `hero-images/Miami_Yachting_Company_addons_catering_thumb.webp`
- No Airtable (standalone images)

**Hardcoded URLs (Updated):**
- `app/miami-yacht-charter-add-ons/page.tsx` - ✅ Uses SEO format

**List:**
- ✅ addons-catering-thumb
- ✅ addons-water-toys-thumb
- ✅ addons-flowers-thumb
- ✅ addons-bachelorette-thumb
- ✅ premium-alcohol
- ✅ premium-transport
- ✅ premium-hero
- ✅ premium-watersports

**Status:** ✅ Correct - Hardcoded with SEO naming

---

### Banners (Homepage, Contact):
**Upload Format:**
- Input: `hero-main`
- Supabase: `banners/Miami_Yachting_Company_hero_main.webp`
- No Airtable (standalone images)

**Hardcoded URLs:**
- `app/page.tsx` (homepage) - 🔴 NEEDS UPDATE
- `app/contact/page.tsx` - 🔴 NEEDS UPDATE

**List:**
- hero-main
- cta-background
- philosophy-yacht
- contact-hero

**Status:** 🔴 TODO - Need to update hardcoded paths

---

## 🔧 Actions Needed:

### 1. Update Homepage Banner Paths
File: `app/page.tsx`
```typescript
// OLD:
src="/images/Miami_Yachting_Company_header-yacht-image.jpg"

// NEW:
src="https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/banners/Miami_Yachting_Company_hero_main.webp"
```

### 2. Update Contact Page Banner
File: `app/contact/page.tsx`
```typescript
// OLD:
src="/images/Miami_Yachting_Company_contact.jpeg"

// NEW:
src="https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/banners/Miami_Yachting_Company_contact_hero.webp"
```

### 3. Update Fleet/Experience Cards on Homepage
File: `app/page.tsx` - All fleet and experience card images

---

## Summary:

✅ **Product Images** - Fully dynamic via Airtable API  
✅ **Add-Ons Thumbnails** - Hardcoded, SEO format applied  
✅ **Premium Add-Ons** - Hardcoded, SEO format applied  
🔴 **Banners** - Need to update hardcoded paths  
🔴 **Fleet/Experience Cards** - Need to update hardcoded paths  

**Next Step:** Update remaining hardcoded image paths in homepage and contact page.
