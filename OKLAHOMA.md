# OKLAHOMA.md - Project Restore Point & Documentation

**Date:** 2026-02-25  
**Time:** 21:57 UTC  
**Status:** ✅ STABLE RESTORE POINT  
**Commit:** Ready for GitHub backup

---

## 🎯 CURRENT STATE

### Working Production Website
- **Live URL:** https://yacht-charter-platform-ten.vercel.app
- **Status:** Fully functional with 2 yachts showing photos
- **GitHub:** https://github.com/yachtiebot/yacht-charter-platform
- **Vercel Project:** yacht-charter-platform (production)

### Features Implemented
✅ Yacht rental Miami page with fleet listing  
✅ Individual yacht detail pages (photo grid + lightbox)  
✅ Minimalist lightbox design (white text/icons, no boxes)  
✅ Photo processing pipeline (Dropbox → Sharp → Supabase)  
✅ Airtable integration (source of truth for yacht data)  
✅ 15-minute caching with fallback (handles 500-700 daily visitors)  
✅ Supabase CDN for yacht photos  

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
  │   ├── page.tsx                          # Fleet listing page
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
```

### Photo Processing Scripts
```
/root/clawd/yacht-charter-platform/scripts/
  ├── process-yacht-photos.js               # Master photo processor
  ├── setup-supabase-storage.js             # Supabase bucket setup
  └── README.md                             # Script documentation
```

### Documentation
```
/root/clawd/yacht-charter-platform/
  ├── CACHING_STRATEGY.md                   # Caching architecture docs
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
| 27-Regal | 0 | ❌ Pending | Not processed yet |

### Airtable Integration
- **Base ID:** appl6AD4Ej23efTIO
- **Table:** Yacht Brain (tblbnJKFeq5g57X9x)
- **Hero Images:** Stored in "Photo Attachments" field
- **Gallery URLs:** Generated from Supabase, added via yacht-cache.ts

---

## 🔧 PHOTO PROCESSING PIPELINE

### Standard Operating Procedure
```bash
# From yacht-charter-platform directory:
node scripts/process-yacht-photos.js "/Yacht Photos/[folder]" "[yacht-id]"

# Example:
node scripts/process-yacht-photos.js "/Yacht Photos/116-Pershing" "116-Pershing"
```

### What It Does
1. Downloads photos from Dropbox (using refresh token)
2. Optimizes to 500KB max (Sharp + WebP)
3. Creates 200KB hero for Airtable
4. Auto-names: `Miami_Yachting_Company_[yacht-id]_##.webp`
5. Uploads to Supabase Storage
6. Cleans up temp files

### After Processing
1. Update `lib/yacht-cache.ts` photoMapping with photo count
2. Update Airtable "Photo Attachments" field with hero URL
3. Deploy to production

---

## 🎨 DESIGN IMPLEMENTATION

### Yacht Detail Page Features
- 4×2 photo grid (desktop) / 3-column (mobile)
- Full-screen lightbox with swipe navigation
- Minimalist controls (white text/icons, no boxes)
- Specifications, pricing, amenities sections
- WhatsApp + Email + Phone CTAs
- Booking inquiry modal
- Google review snippets

### Typography & Colors
- **Background:** #faf9f7 (light cream)
- **Primary:** #0f0f0f (near black)
- **Accent:** #c4a265 (gold)
- **Secondary:** #6b6b6b (gray)
- **Fonts:** Cormorant Garamond (serif) + Inter (sans-serif)

---

## 🔄 DEPLOYMENT WORKFLOW

### Standard Deploy
```bash
cd /root/clawd/yacht-charter-platform
npm run build
vercel --prod --token "vcp_..." --yes
```

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
- **Last Deploy:** 2026-02-25 21:56 UTC
- **Commit:** jipc8wvox

---

## 📦 DEPENDENCIES

### Core
- Next.js 16.1.6
- React 19
- TypeScript 5
- Tailwind CSS 4

### Photo Processing
- Sharp (image optimization)
- Supabase JS client
- Dropbox OAuth2

### Data
- Airtable API
- Supabase Storage (CDN)

---

## 🚨 KNOWN ISSUES & TODO

### Pending Work
- [ ] Process 27-Regal photos (18 photos in Dropbox)
- [ ] Add remaining yachts from Airtable
- [ ] Set up booking inquiry email API
- [ ] Add FAQ page
- [ ] Implement instant booking flow
- [ ] Add testimonials page

### Known Limitations
- 27-Regal has no photos yet
- Email inquiry endpoint not connected
- WhatsApp links go to generic number
- No real-time availability checking

---

## 💾 BACKUP & RESTORE

### Create Backup
```bash
cd /root/clawd/yacht-charter-platform
git add -A
git commit -m "Restore point: [description]"
git push origin main
```

### Restore from This Point
```bash
cd /root/clawd
rm -rf yacht-charter-platform
git clone https://github.com/yachtiebot/yacht-charter-platform.git
cd yacht-charter-platform
npm install
# Set up environment variables in Vercel
vercel --prod
```

### Critical Files to Preserve
1. `lib/yacht-cache.ts` - Photo mappings
2. `app/yacht-rental-miami/[code]/page.tsx` - Detail page design
3. `scripts/process-yacht-photos.js` - Photo processor
4. `.env.production` - Credentials (NOT in git)

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

**Last Updated:** 2026-02-25 21:57 UTC  
**Next Review:** After 27-Regal photo processing
