# Restore Flowers & Bachelorette Products

## Problem
When we migrated to Airtable, the Flowers and Bachelorette tables were created but never populated with the original hardcoded product data. The pages are now blank.

## Solution
We need to:
1. Define the Airtable schema for both tables
2. Populate with original 7 flowers + 4 bachelorette packages
3. Ensure pages render properly

## Flowers Table Schema

### Fields Needed:
- **Product ID** (Single line text) - PRIMARY KEY
- **Product Name** (Single line text)
- **Description** (Long text)
- **Small Size** (Single line text) - e.g., "5\" Round"
- **Small Price** (Currency)
- **Medium Size** (Single line text)
- **Medium Price** (Currency)
- **Large Size** (Single line text)
- **Large Price** (Currency)
- **Show on Website** (Checkbox)
- **Supabase Image URL** (URL) - Generated from Product ID

### 7 Products to Add:

1. rose-pave | Rose Pavé | 5" Round/$89, 8" Round/$129, 10" Round/$189
2. blooming-orchid | Blooming Orchid | 5" Round/$95, 8" Round/$135, 10" Round/$195
3. tropical-paradise | Tropical Paradise | 8"/$89, 15"/$129, 20"/$189
4. dancing-roses | Dancing Roses | 6"/$99, 8"/$139, 10"/$199
5. tropical-rose | Tropical Rose | 10"/$89, 15"/$129, 20"/$189
6. tropical-orchid | Tropical Orchid | 10"/$95, 15"/$135, 20"/$195
7. floating-orchid | Floating Orchid | NO SMALL, 18" Rectangle/$135, 25" Rectangle/$195

## Bachelorette Packages Table Schema

### Fields Needed:
- **Product ID** (Single line text) - PRIMARY KEY
- **Product Name** (Single line text)
- **Subtitle** (Single line text) - e.g., "The Vibe Package"
- **Price** (Currency) - Single price, not tiered
- **Description** (Long text)
- **Includes** (Long text) - Comma or newline-separated list
- **Featured** (Checkbox)
- **Premium** (Checkbox)
- **Addon** (Checkbox)
- **Show on Website** (Checkbox)
- **Supabase Image URLs** (Long text) - Multiple images, one per line

### 4 Products to Add:

1. last-toast | Last Toast On The Coast | The Vibe Package | $199.99 | FEATURED
2. last-sail | Last Sail Before The Veil | The Fun Package | $249.99
3. something-blue | Something Blue Before I Do | The Splurge Package | $299.99 | PREMIUM
4. drone-video | Drone Keepsake Video | Memory Enhancement | $399 | ADDON

## Next Steps

1. User manually adds these fields to Airtable (or we use Airtable API to create them)
2. Populate with product data
3. Update page code to render properly with new schema
4. Upload images to Supabase

## Timeline

This is ~2 hours of work:
- 30 min: Create Airtable fields
- 30 min: Populate data
- 30 min: Update page rendering code
- 30 min: Test and fix issues
