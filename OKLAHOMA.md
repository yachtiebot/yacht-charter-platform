# OKLAHOMA.md - Project Restore Point & Documentation

**Date:** 2026-02-26  
**Time:** 03:07 UTC  
**Status:** ✅ STABLE CHECKPOINT - MAGAZINE EDITORIAL STYLING COMPLETE
**Commit:** 514594c

---

## 🎯 CURRENT STATE

### Working Production Website
- **Live URL:** https://yacht-charter-platform-ten.vercel.app
- **Status:** ✅ Fully functional with refined magazine editorial aesthetic
- **GitHub:** https://github.com/yachtiebot/yacht-charter-platform
- **Vercel Project:** yacht-charter-platform (production)

### Features Implemented ✅
✅ Yacht rental Miami page with fleet listing  
✅ Individual yacht detail pages (refined booking banners)  
✅ Full-screen mobile swiper for product images  
✅ Magazine editorial styling (thin borders, light typography)  
✅ Navigation synced across mobile/desktop with drop shadows  
✅ Google Review quote styled as pull-quote  
✅ Photo processing pipeline (Dropbox → Sharp → Supabase)  
✅ Airtable integration (source of truth for yacht data)  
✅ 15-minute caching with fallback  
✅ Supabase CDN for yacht photos  
✅ **NEW: ProductImageGallery with full-screen lightbox**
✅ **NEW: Refined yacht detail booking banners (1px borders, elegant)**
✅ **NEW: Editorial pull-quote styling (faded, centered, no border)**

---

## 📂 KEY FILE LOCATIONS

### Repository Root
```
/root/clawd/yacht-charter-platform/
```

### Critical Configuration Files
```
/root/clawd/yacht-charter-platform/.env.production
  - Airtable API credentials
  - Supabase connection details
  
/root/clawd/yacht-charter-platform/next.config.js
  - Next.js configuration
  
/root/clawd/yacht-charter-platform/vercel.json
  - Vercel deployment settings
```

### Core Application Code
```
/root/clawd/yacht-charter-platform/app/
  ├── page.tsx                              # Homepage
  ├── contact/page.tsx                      # Contact page
  ├── yacht-rental-miami/
  │   ├── page.tsx                          # Fleet listing
  │   └── [code]/
  │       └── page.tsx                      # Yacht detail (REFINED 2026-02-26)
  │
  ├── Miami-Yacht-Charter-Add-Ons/page.tsx # Add-ons (magazine style)
  ├── Miami-Yacht-Charter-Catering/page.tsx
  ├── Miami-Yacht-Charter-Flowers/page.tsx
  ├── Miami-Yacht-Charter-Water-Toys/page.tsx
  └── Miami-Yacht-Charter-Bachelorette-Packages/page.tsx
  
  └── api/
      ├── yachts/
      │   ├── route.ts                      # All yachts endpoint
      │   └── [code]/route.ts               # Single yacht endpoint
      └── cron/
          └── sync-vessels/route.ts         # Airtable sync cron
```

### Components (RECENTLY UPDATED)
```
/root/clawd/yacht-charter-platform/components/
  ├── Navigation.tsx                        # Synced mobile/desktop menus + cart shadow
  ├── ProductImageGallery.tsx               # ⭐ Full-screen mobile swiper (2026-02-26)
  ├── LanguageSwitcher.tsx
  └── CartIcon.tsx
```

### Caching & Data Layer
```
/root/clawd/yacht-charter-platform/lib/yacht-cache.ts
  - 15-minute cache implementation
  - Fallback handling for Airtable downtime
  - Photo URL mapping for Supabase
  - ⚠️ CRITICAL: photoMapping object (line ~154)
```

### Photo Processing Scripts
```
/root/clawd/yacht-charter-platform/scripts/
  ├── process-yacht-photos.js               # Master photo processor
  ├── upload-regal-sharp.js                 # 27-Regal workaround
  ├── setup-supabase-storage.js             # Supabase bucket setup
  └── README.md                             # Script documentation
```

### Documentation
```
/root/clawd/yacht-charter-platform/
  ├── DESIGN_STANDARDS.md                   # Typography standards
  ├── OKLAHOMA.md                           # ⭐ THIS FILE (restore point)
  ├── WRITING_RULES.md                      # Content generation guidelines
  ├── MISSING_IMAGES.md                     # Image tracking
  ├── CACHING_STRATEGY.md                   # Caching architecture
  ├── AIRTABLE_SETUP.md                     # Airtable configuration
  └── DEPLOY.md                             # Deployment instructions
```

---

## 🎨 DESIGN SYSTEM (Updated 2026-02-26)

### Magazine Editorial Aesthetic

**Philosophy:**
- Thin borders (1px with opacity) over thick borders
- Light font weights (300) for elegance
- Generous white space and breathing room
- Subtle opacity for fade-in effects
- Cormorant Garamond for editorial/quote text
- Refined hover transitions with border color changes
- Clean, minimal UI without heavy outlines

**Button Styling (Current Standard):**
```tsx
className="inline-flex items-center justify-center gap-3 
  bg-white border border-[#0f0f0f]/20 
  text-[#0f0f0f] px-8 py-4 
  text-sm uppercase tracking-[0.2em] font-medium 
  hover:bg-[#c4a265] hover:text-white hover:border-[#c4a265] 
  transition-all duration-300"
```

**Quote Styling (Pull-Quote):**
```tsx
// Container
<div className="mb-12 py-8 -ml-1">

// Stars (faded)
<div className="flex items-center gap-1 mb-6 justify-center opacity-60">

// Quote text (larger, lighter, faded)
<p className="text-center text-[#0f0f0f]/70 mb-6 italic 
   leading-relaxed text-xl md:text-2xl" 
   style={{fontFamily: 'Cormorant Garamond, serif', fontWeight: 300}}>

// Attribution (faded, small)
<p className="text-center text-[#6b6b6b] text-sm opacity-60">
```

### Typography - Page Headers
**Standard for ALL pages:**
```tsx
<h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl mb-6" 
    style={{ fontWeight: 300 }}>
```

### Navigation Drop Shadows
```tsx
// For text elements when transparent
style={isTransparent ? { 
  textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)' 
} : {}}

// For SVG/icons when transparent (wrap in div)
<div style={isTransparent ? { 
  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6)) drop-shadow(0 1px 3px rgba(0,0,0,0.5))' 
} : {}}>
  <CartIcon />
</div>
```

### Colors
- Gold accent: `#c4a265`
- Dark text: `#0f0f0f`
- Light text: `#6b6b6b`
- Background: `#faf9f7`

---

## 🖼️ PRODUCT IMAGE GALLERY

### Full-Screen Lightbox Features
1. **Click thumbnail** → Opens full-screen lightbox
2. **Black background** (`bg-black/95`)
3. **Product name** at top in white
4. **Image counter** at bottom (e.g., "7 / 15")
5. **Mobile:** Swipe gestures with "Swipe to navigate →" hint
6. **Desktop:** Large arrow buttons on sides
7. **Keyboard:** Arrow keys + Escape
8. **No page scroll** when open (app-like experience)

### Consistency
Same lightbox experience across:
- Yacht detail pages
- Add-ons store pages
- Catering store pages
- Flowers store pages
- Water toys pages

---

## 🚢 YACHT DATA STATUS

### Photos in Supabase CDN
| Yacht ID | Photos | Status | Supabase Path |
|----------|--------|--------|---------------|
| 116-Pershing | 46 | ✅ Complete | `yacht-photos/116-Pershing/` |
| 37-Axopar | 13 | ✅ Complete | `yacht-photos/37-Axopar/` |
| 27-Regal | 15 | ✅ Complete | `yacht-photos/27-Regal/` |

---

## 🚧 KNOWN ISSUES & TODO

### High Priority
- [ ] **Catering data re-scraping** - Current `products-complete.json` has hallucinated serving sizes
  - Sub-agent crashed during re-scrape (503 error)
  - Need manual scraping with rate limiting
  - Website currently works fine, just need accurate data
  - URL ready: https://www.miamiyachtingcompany.com/catering

### Medium Priority
- [ ] Apply magazine editorial styling to other yacht detail pages (if requested)
- [ ] Booking system integration (Phase 2)
- [ ] Digital waiver system

### Low Priority
- [ ] Multi-language support beyond Google Translate
- [ ] AI yacht concierge (24/7)

---

## 🔄 DEPLOYMENT WORKFLOW

### Standard Deploy
```bash
cd /root/clawd/yacht-charter-platform
git add -A
git commit -m "Description"
git push origin main
# Vercel auto-deploys from main branch
```

### Current Production
- **Domain:** yacht-charter-platform-ten.vercel.app
- **Last Deploy:** 2026-02-26 03:07 UTC
- **Commit:** 514594c
- **Status:** Magazine editorial styling complete

---

## 📦 DEPENDENCIES

### Core
- Next.js 15.1.4
- React 19.0.0
- TypeScript 5
- Tailwind CSS 3.4.1

### Photo Processing
- Sharp 0.33.5 (image optimization)
- @supabase/supabase-js 2.49.2
- Dropbox OAuth2

### Data
- Airtable API
- Supabase Storage (CDN)

---

## 💾 BACKUP & RESTORE

### Current Checkpoint (2026-02-26 03:07 UTC)
```bash
cd /root/clawd
git clone https://github.com/yachtiebot/yacht-charter-platform.git
cd yacht-charter-platform
npm install
# Copy .env.local from backup
# Environment variables already set in Vercel
```

### Critical Files to Preserve
1. `components/ProductImageGallery.tsx` - Full-screen lightbox
2. `components/Navigation.tsx` - Synced menus with shadows
3. `app/yacht-rental-miami/[code]/page.tsx` - Refined booking banner
4. `lib/yacht-cache.ts` - Photo mappings
5. `.env.production` - Credentials (NOT in git)

---

## 📊 SESSION SUMMARY (2026-02-26)

### Work Completed Tonight
1. ✅ ProductImageGallery - Full-screen mobile swiper
2. ✅ Navigation menu sync (mobile/desktop)
3. ✅ Cart icon drop shadow fix
4. ✅ Yacht detail booking banner refinement (1px borders, elegant styling)
5. ✅ Google Review quote styled as pull-quote (no border, faded, centered)
6. ✅ Footer logo path fix

### Time Investment
~3 hours of focused design refinement

### Result
Magazine editorial aesthetic successfully applied. Website feels luxurious, refined, and consistent.

---

## 🎉 PHASE STATUS

**Phase 1:** Complete - Core website + photo system ✅  
**Phase 1.5:** Complete - Magazine editorial styling ✅  
**Phase 2:** Pending - Booking system integration  
**Phase 3:** Pending - Content pages expansion  

---

## 📞 SUPPORT CONTACTS

- **Developer:** YachtieBot
- **Client:** G (Miami Yachting Company)
- **GitHub:** yachtiebot/yacht-charter-platform
- **Support:** support@miamiyachting.com

---

## 🔐 CREDENTIALS REFERENCE

### Stored in Vercel Environment Variables
- Airtable API key (service account)
- Supabase service role key
- Stripe keys (for future booking)

### NOT in Git
- `.env.local`
- `.env.production`
- `node_modules/`

---

**Last Updated:** 2026-02-26 03:07 UTC  
**Next Session:** Catering data re-scraping + continue refinements as needed  
**Status:** 💾 STABLE CHECKPOINT - Safe to resume from here
