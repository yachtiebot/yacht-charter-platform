# Original Hardcoded Product Data (Before Airtable Migration)

## Flowers (7 products)

Each flower has:
- `id`: unique identifier
- `name`: product name
- `description`: full description
- `image`: path to image
- `sizes`: object with small/medium/large options
  - Each size has: `size` (dimension string) and `price` (number)

Products:
1. **Rose Pavé** - $89/$129/$189 (5"/8"/10" Round)
2. **Blooming Orchid** - $95/$135/$195 (5"/8"/10" Round)
3. **Tropical Paradise** - $89/$129/$189 (8"/15"/20")
4. **Dancing Roses** - $99/$139/$199 (6"/8"/10")
5. **Tropical Rose** - $89/$129/$189 (10"/15"/20")
6. **Tropical Orchid** - $95/$135/$195 (10"/15"/20")
7. **Floating Orchid** - $135/$195 (18"/25" Rectangle) - NO SMALL SIZE

## Bachelorette Packages (4 products)

Each package has:
- `id`: unique identifier
- `name`: package name
- `subtitle`: tagline
- `price`: single price (not tiered)
- `description`: full description
- `includes`: array of included items
- `images`: array of image paths
- Optional flags: `featured`, `premium`, `addon`

Products:
1. **Last Toast On The Coast** - $199.99 (The Vibe Package) - FEATURED
   - 6 included items
   - 5 images
   
2. **Last Sail Before The Veil** - $249.99 (The Fun Package)
   - 8 included items
   - 3 images
   
3. **Something Blue Before I Do** - $299.99 (The Splurge Package) - PREMIUM
   - 6 included items
   - 3 images
   
4. **Drone Keepsake Video** - $399 (Memory Enhancement) - ADDON
   - 6 included items
   - 2 images

## Key Differences from Current Airtable Structure:

### Flowers:
- OLD: Sizes stored as nested object (`sizes: { small: { size, price }, medium: {...}, large: {...} }`)
- CURRENT AIRTABLE: Probably separate fields or single price?

### Bachelorette:
- OLD: `includes` array with detailed item list
- OLD: Multiple images per product
- OLD: Flags for featured/premium/addon
- CURRENT AIRTABLE: May not have these fields?

## Action Plan:

1. Check current Airtable structure for both tables
2. Add missing fields to match old structure
3. Populate with original product data
4. Restore the page code to render these properly
