# Save Point: February 25, 2026

## ✅ COMPLETED FEATURES

### Photo Processing & Upload System
- **116-Pershing**: 46 photos uploaded to Supabase
- **37-Axopar**: 13 photos uploaded to Supabase  
- **27-Regal**: 15 photos uploaded to Supabase
- All photos optimized to WebP format (<500KB)
- Hero images created for all yachts (<200KB for Airtable)

### Design & Typography Improvements
1. **Navigation Bar**
   - Drop shadow on all menu text when transparent (before scroll)
   - Drop shadow on language switcher, WhatsApp icon, phone number
   - Thin dark border on "Book Now" button
   
2. **Font Sizing Standardized**
   - Homepage hero: `3.5rem` (56px)
   - All page headers: `text-5xl md:text-6xl lg:text-7xl` (responsive 60-72px)
   - Standard documented in `DESIGN_STANDARDS.md`

3. **Yacht Grid Layout**
   - Changed from 2 columns to 3 columns on desktop
   - Natural sorting: smallest to largest by yacht size
   - Always maintains size order with or without filters

### Infrastructure
- Supabase storage bucket: `yacht-photos`
- Photo URL pattern: `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/{yacht-id}/Miami_Yachting_Company_{yacht-id}_{number}.webp`
- 15-minute cache with stale-while-revalidate fallback

## 📁 KEY FILES & LOCATIONS

### Photo Processing Scripts
```
/root/clawd/yacht-charter-platform/scripts/
  ├── process-yacht-photos.js          # Main photo processing script
  ├── process-27-regal.sh              # Workaround for 27-Regal
  ├── upload-regal-sharp.js            # Sharp-based upload (SUCCESSFUL)
  └── upload-regal-photos.js           # ImageMagick attempt (unused)
```

### Core Application Files
```
/root/clawd/yacht-charter-platform/
  ├── app/
  │   ├── page.tsx                     # Homepage (hero sizing)
  │   ├── yacht-rental-miami/
  │   │   ├── page.tsx                 # Fleet listing (3-col grid, size sorting)
  │   │   └── [code]/page.tsx          # Yacht detail pages
  │   ├── contact/page.tsx             # Contact page (standardized header)
  │   └── api/
  │       └── yachts/
  │           ├── route.ts             # Fleet API endpoint
  │           └── [code]/route.ts      # Single yacht API
  ├── components/
  │   ├── Navigation.tsx               # Nav with drop shadows
  │   └── LanguageSwitcher.tsx         # Language switcher with shadow
  ├── lib/
  │   └── yacht-cache.ts               # Photo mapping & caching logic
  └── app/globals.css                  # Typography classes
```

### Documentation Files
```
/root/clawd/yacht-charter-platform/
  ├── DESIGN_STANDARDS.md              # Typography & design standards
  ├── CACHING_STRATEGY.md              # Cache implementation docs
  ├── OKLAHOMA.md                      # Project status tracking
  └── SAVE_POINT_2026-02-25.md         # This file
```

### Configuration
```
/root/clawd/yacht-charter-platform/
  ├── package.json                     # Dependencies (Sharp, Supabase client)
  ├── .env.local                       # Airtable + Supabase credentials
  └── next.config.js                   # Next.js config
```

## 🔧 CRITICAL CODE SECTIONS

### Photo Mapping (yacht-cache.ts, line ~154)
```typescript
const photoMapping: { [key: string]: number } = {
  '116-Pershing': 46,
  '37-Axopar': 13,
  '27-Regal': 15
};
```

### Enhanced Photos Function (yacht-cache.ts)
Automatically generates gallery URLs for each yacht based on photo count.

### Navigation Drop Shadows (Navigation.tsx, ~lines 60-130)
```tsx
style={isTransparent ? { 
  textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)' 
} : {}}
```

### Fleet Sorting (yacht-rental-miami/page.tsx, ~line 180)
```typescript
const sortedYachts = [...filteredYachts].sort((a, b) => {
  const sizeA = a.fields['Length in Feet'] || 0;
  const sizeB = b.fields['Length in Feet'] || 0;
  return sizeA - sizeB;
});
```

## 📊 SUPABASE STORAGE STRUCTURE

```
yacht-photos/
  ├── 116-Pershing/
  │   ├── Miami_Yachting_Company_116-Pershing_hero.webp
  │   ├── Miami_Yachting_Company_116-Pershing_01.webp
  │   ├── Miami_Yachting_Company_116-Pershing_02.webp
  │   └── ... (up to 46)
  ├── 37-Axopar/
  │   ├── Miami_Yachting_Company_37-Axopar_hero.webp
  │   ├── Miami_Yachting_Company_37-Axopar_01.webp
  │   └── ... (up to 13)
  └── 27-Regal/
      ├── Miami_Yachting_Company_27-Regal_hero.webp
      ├── Miami_Yachting_Company_27-Regal_01.webp
      └── ... (up to 15)
```

## 🚀 DEPLOYMENT

- **Platform**: Vercel
- **Production URL**: https://yacht-charter-platform-ten.vercel.app
- **Vercel Token**: Stored in scripts (vcp_8dww...)
- **Build Command**: `npm run build`
- **Deploy Command**: `vercel --prod --yes`

## 🔄 HOW TO RESTORE THIS POINT

1. **Clone repository**:
   ```bash
   cd /root/clawd
   git pull origin main
   ```

2. **Checkout this commit**:
   ```bash
   git checkout <commit-hash-from-feb-25>
   ```

3. **Reinstall dependencies**:
   ```bash
   cd yacht-charter-platform
   npm install
   ```

4. **Verify environment**:
   - Check `.env.local` has Airtable & Supabase credentials
   - Supabase storage bucket `yacht-photos` exists
   - Photos uploaded to Supabase

5. **Build & Deploy**:
   ```bash
   npm run build
   vercel --prod --yes
   ```

## 📝 NOTES FOR FUTURE

- **Photo count mapping** must be updated in `lib/yacht-cache.ts` when adding new yacht photos
- **Cache TTL** is 15 minutes - changes may take time to appear
- **Typography standard** documented in `DESIGN_STANDARDS.md` - use for all new pages
- **Drop shadow pattern** applies to all transparent nav elements
- **3-column grid** is the standard for yacht listing pages

## 🐛 KNOWN ISSUES RESOLVED

1. ✅ 27-Regal photos not showing → Fixed by updating photoMapping count
2. ✅ Menu text disappearing into images → Fixed with drop shadows
3. ✅ Inconsistent header sizes → Standardized across all pages
4. ✅ Yacht ordering inconsistent → Fixed with size-based sorting

## 📦 PACKAGE VERSIONS (Key Dependencies)

- Next.js: 15.1.4
- React: 19.0.0
- Sharp: 0.33.5
- @supabase/supabase-js: 2.49.2
- Tailwind CSS: 3.4.1

---

**Save Point Created**: February 25, 2026 22:46 UTC
**Status**: ✅ All systems operational
**Ready for**: Next phase of development
