# OKLAHOMA.md - Project Restore Point & Documentation

**Date:** 2026-02-25  
**Time:** 22:46 UTC  
**Status:** ✅ STABLE RESTORE POINT (PHASE 1 COMPLETE)
**Commit:** 4e148d4

---

## 🎯 CURRENT STATE

### Working Production Website
- **Live URL:** https://yacht-charter-platform-ten.vercel.app
- **Status:** ✅ Fully functional with ALL 3 yachts showing photos
- **GitHub:** https://github.com/yachtiebot/yacht-charter-platform
- **Vercel Project:** yacht-charter-platform (production)

### Features Implemented ✅
✅ Yacht rental Miami page with fleet listing  
✅ Individual yacht detail pages (photo grid + lightbox)  
✅ Minimalist lightbox design (white text/icons, no boxes)  
✅ Photo processing pipeline (Dropbox → Sharp → Supabase)  
✅ Airtable integration (source of truth for yacht data)  
✅ 15-minute caching with fallback (handles 500-700 daily visitors)  
✅ Supabase CDN for yacht photos  
✅ **NEW: Drop shadow navigation when transparent**
✅ **NEW: Standardized typography across all pages**
✅ **NEW: 3-column yacht grid on desktop**
✅ **NEW: Automatic size-based yacht sorting**

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
  ├── page.tsx                              # Homepage (3.5rem hero)
  ├── contact/page.tsx                      # Contact page (standardized header)
  ├── yacht-rental-miami/
  │   ├── page.tsx                          # Fleet listing (3-col grid, size sort)
  │   └── [code]/
  │       └── page.tsx                      # Dynamic yacht detail pages
  │
  └── api/
      ├── yachts/
      │   ├── route.ts                      # All yachts endpoint
      │   └── [code]/route.ts               # Single yacht endpoint
      └── cron/
          └── sync-vessels/route.ts         # Airtable sync cron
```

### Caching & Data Layer
```
/root/clawd/yacht-charter-platform/lib/yacht-cache.ts
  - 15-minute cache implementation
  - Fallback handling for Airtable downtime
  - Photo URL mapping for Supabase
  - ⚠️ CRITICAL: photoMapping object (line ~154)
```

### Components
```
/root/clawd/yacht-charter-platform/components/
  ├── Navigation.tsx                        # Nav with drop shadows
  └── LanguageSwitcher.tsx                  # Language switcher with shadow
```

### Photo Processing Scripts
```
/root/clawd/yacht-charter-platform/scripts/
  ├── process-yacht-photos.js               # Master photo processor
  ├── upload-regal-sharp.js                 # 27-Regal workaround (SUCCESSFUL)
  ├── setup-supabase-storage.js             # Supabase bucket setup
  └── README.md                             # Script documentation
```

### Documentation
```
/root/clawd/yacht-charter-platform/
  ├── DESIGN_STANDARDS.md                   # ⭐ Typography standards
  ├── CACHING_STRATEGY.md                   # Caching architecture docs
  ├── SAVE_POINT_2026-02-25.md              # ⭐ Detailed restore point
  ├── AIRTABLE_SETUP.md                     # Airtable configuration
  ├── DEPLOY.md                             # Deployment instructions
  └── CLS_RULES.md                          # Cumulative Layout Shift rules
```

---

## 🚢 YACHT DATA STATUS

### Photos in Supabase CDN
| Yacht ID | Photos | Status | Supabase Path |
|----------|--------|--------|---------------|
| 116-Pershing | 46 | ✅ Complete | `yacht-photos/116-Pershing/` |
| 37-Axopar | 13 | ✅ Complete | `yacht-photos/37-Axopar/` |
| 27-Regal | 15 | ✅ Complete | `yacht-photos/27-Regal/` |

### Photo Processing Complete! 🎉
All three yachts now have full photo galleries with hero images.

### Airtable Integration
- **Base ID:** appl6AD4Ej23efTIO
- **Table:** Yacht Brain (tblbnJKFeq5g57X9x)
- **Hero Images:** Stored in "Photo Attachments" field
- **Gallery URLs:** Generated from Supabase via yacht-cache.ts

---

## 🔧 PHOTO PROCESSING PIPELINE

### Standard Operating Procedure
```bash
# From yacht-charter-platform directory:
node scripts/process-yacht-photos.js "/Yacht Photos/[folder]" "[yacht-id]"

# Example:
node scripts/process-yacht-photos.js "/Yacht Photos/116-Pershing" "116-Pershing"
```

### 27-Regal Workaround (if needed)
```bash
# Used Sharp-based script due to header encoding issues:
node scripts/upload-regal-sharp.js
```

### What It Does
1. Downloads photos from Dropbox (using refresh token)
2. Optimizes to 500KB max (Sharp + WebP)
3. Creates 200KB hero for Airtable
4. Auto-names: `Miami_Yachting_Company_[yacht-id]_##.webp`
5. Uploads to Supabase Storage
6. Cleans up temp files

### After Processing NEW YACHT PHOTOS
1. **CRITICAL:** Update `lib/yacht-cache.ts` photoMapping with photo count
2. Update Airtable "Photo Attachments" field with hero URL
3. Build and deploy to production
4. Wait up to 15 minutes for cache refresh

---

## 🎨 DESIGN STANDARDS (Feb 25, 2026)

### Typography - Page Headers
**Standard for ALL pages:**
```tsx
<h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl mb-6" 
    style={{ fontWeight: 300 }}>
  Your Title Here
</h1>
```
- Mobile: 48px → Tablet: 60px → Desktop: 72px
- Font: Cormorant Garamond (editorial-display)
- Weight: 300 (light)

**Exception - Homepage Hero:**
```tsx
<h1 className="editorial-display text-white mb-6" 
    style={{fontSize: '3.5rem'}}>
```
- Fixed at 56px for visual balance

### Navigation Drop Shadows
All transparent nav elements get drop shadow:
```tsx
style={isTransparent ? { 
  textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)' 
} : {}}
```
Applies to:
- Menu links
- Language switcher
- Phone number
- WhatsApp icon (use `filter: drop-shadow()` for SVG)

### Yacht Grid Layout
- **Desktop:** 3 columns (`md:grid-cols-3`)
- **Mobile:** 1 column
- **Sorting:** Always smallest to largest by "Length in Feet"

### Colors
- Gold accent: `#c4a265`
- Dark text: `#0f0f0f`
- Light text: `#6b6b6b`
- Background: `#faf9f7`

---

## 🔄 DEPLOYMENT WORKFLOW

### Standard Deploy
```bash
cd /root/clawd/yacht-charter-platform
npm run build
vercel --prod --token "$VERCEL_TOKEN" --yes
```
Note: Vercel token stored securely outside of git

### Environment Variables (Vercel)
```
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
AIRTABLE_TABLE_ID
SUPABASE_URL (public)
SUPABASE_KEY (service role)
```

### Current Production
- **Domain:** yacht-charter-platform-ten.vercel.app
- **Last Deploy:** 2026-02-25 22:35 UTC
- **Status:** All 3 yachts with photos

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

## 🚨 TODO & FUTURE PHASES

### Phase 2 - Booking System (Next)
- [ ] Email inquiry API endpoint
- [ ] Booking confirmation flow
- [ ] Stripe payment integration
- [ ] Digital waiver system

### Phase 3 - Content Pages
- [ ] Add-ons page
- [ ] Offers page
- [ ] Large groups page
- [ ] Testimonials page
- [ ] About Us page

### Phase 4 - Advanced Features
- [ ] Real-time availability checking
- [ ] AI yacht concierge (24/7)
- [ ] Multi-language support (beyond Google Translate)
- [ ] Central yacht/crew database (Notion integration)

---

## 💾 BACKUP & RESTORE

### Create Backup (DO THIS NOW)
```bash
cd /root/clawd/yacht-charter-platform
git add -A
git commit -m "Save Point: Phase 1 Complete - All 3 yachts with photos, design standards"
git push origin main
```

### Restore from This Point
```bash
cd /root/clawd
rm -rf yacht-charter-platform
git clone https://github.com/yachtiebot/yacht-charter-platform.git
cd yacht-charter-platform
npm install
# Copy .env.local from backup
# Set up environment variables in Vercel
vercel --prod
```

### Critical Files to Preserve
1. `lib/yacht-cache.ts` - Photo mappings (photoMapping object)
2. `app/yacht-rental-miami/[code]/page.tsx` - Detail page design
3. `components/Navigation.tsx` - Nav with drop shadows
4. `scripts/upload-regal-sharp.js` - Workaround for problem photos
5. `.env.production` - Credentials (NOT in git, backup separately)

---

## 📊 PERFORMANCE METRICS

### Caching Efficiency
- **API calls/day:** ~96 (vs 500-700 without caching)
- **Reduction:** 85-90%
- **Cache duration:** 15 minutes
- **Stale-while-revalidate:** 30 minutes

### Page Speed
- **LCP:** <2.5s (target)
- **FID:** <100ms
- **CLS:** <0.1 (critical - see CLS_RULES.md)

---

## 🔐 CREDENTIALS REFERENCE

### Stored in Vercel Environment Variables
- Airtable API key (service account)
- Supabase service role key
- Stripe keys (for future booking)

### Stored in Scripts
- Dropbox refresh token (in process-yacht-photos.js)
- Dropbox client ID/secret (in process-yacht-photos.js)
- Vercel token (in deploy commands)

### NOT in Git
- `.env.local`
- `.env.production` (regenerate from .env.example)
- `node_modules/`

---

## 📞 SUPPORT CONTACTS

- **Developer:** YachtieBot
- **Client:** G (Miami Yachting Company)
- **GitHub:** yachtiebot/yacht-charter-platform
- **Support:** support@miamiyachting.com

---

## 🎉 PHASE 1 COMPLETE

All core website features, photo system, and design standards are complete and documented.
Ready to commit to GitHub as a restore point before Phase 2 begins.

**Last Updated:** 2026-02-25 22:46 UTC  
**Next Phase:** Booking system integration
