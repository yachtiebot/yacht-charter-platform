# Hero Images Inventory

**These are site-wide hero/marketing images NOT controlled by Airtable products.**  
Use the **Hero Images upload zone** in `/admin/upload-images` to replace these.

---

## Homepage (`/`)

- `hero-main` → Header yacht image
- `fleet-dayboats` → VanDutch 40 fleet image
- `fleet-luxury` → Azimut 55 fleet image  
- `fleet-superyacht` → Superyacht fleet image
- `fleet-complete` → Complete fleet overview
- `reviews-yelp` → Yelp 5-star badge
- `reviews-tripadvisor` → TripAdvisor badge
- `reviews-google` → Google Reviews badge
- `reviews-iyba` → IYBA badge
- `reviews-best-of-miami` → Best of Miami 2025 badge
- `experiences-sightseeing` → Sightseeing card
- `experiences-celebrations` → Celebrations card
- `experiences-corporate` → Corporate events card
- `experiences-sandbars` → Sandbars & Beyond card
- `experiences-bachelorette` → Bachelorette card
- `experiences-large-groups` → Large groups card
- `departures-miami` → Miami departure location
- `departures-miami-beach` → Miami Beach departure location

---

## Contact Page (`/contact`)

- `contact-hero` → Contact page header image

---

## Add-Ons Page (`/miami-yacht-charter-add-ons`)

### Category Thumbnails:
- `addons-catering-thumb` → Catering category card
- `addons-water-toys-thumb` → Water toys category card
- `addons-flowers-thumb` → Flowers category card
- `addons-bachelorette-thumb` → Bachelorette category card

### Premium Add-Ons:
- `premium-alcohol` → Premium alcohol package
- `premium-transport` → Luxury transport
- `premium-hero` → Premium services hero (used multiple times)
- `premium-watersports` → Premium watersports

---

## Catering Page (`/miami-yacht-charter-catering`)

**Hero/Header:**
- `catering-hero` → Main catering page header

**Fallback Images** (used when products don't have Airtable images):
- Already using hardcoded array - these will be phased out as products get uploaded via admin panel

---

## Water Toys Page (`/miami-yacht-charter-water-toys`)

**Hero/Header:**
- `water-toys-hero` → Main water toys page header

**Product Fallbacks:**
- Seabob, Flitescooter, Watersports Boat, Floating Cabana, Floating Lounge Chair
- *(These should move to Airtable + upload via admin panel)*

---

## Flowers Page (`/miami-yacht-charter-flowers`)

**Hero/Header:**
- `flowers-hero` → Main flowers page header

**Product Images:**
- Rose Pavé, Blooming Orchid, Tropical Paradise, Dancing Roses, Tropical Roses
- *(These should be in Airtable + uploadable via admin)*

---

## Bachelorette Packages Page (`/miami-yacht-charter-bachelorette-packages`)

**Hero/Header:**
- `bachelorette-hero` → Main bachelorette page header

**Product Images:**
- Last Toast on the Coast, Bride Cups, Bride Straws, Bride Crown & Veil
- *(These should be in Airtable + uploadable via admin)*

---

## Upload Format:

When uploading via admin interface, use these IDs exactly:
- Format: `hero-main`, `fleet-dayboats`, `catering-hero`, etc.
- They'll be stored as: `hero-images/{id}.webp` on Supabase
- Automatically optimized to WebP

---

## Priority Hero Images to Replace First:

1. **Homepage hero** (`hero-main`) - Most visible
2. **Catering page hero** (`catering-hero`)
3. **Water Toys page hero** (`water-toys-hero`)
4. **Flowers page hero** (`flowers-hero`)
5. **Bachelorette page hero** (`bachelorette-hero`)
