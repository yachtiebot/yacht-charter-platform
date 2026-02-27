# Water Toys Airtable Sync

## What This Does

Uploads all 7 water toys from the website (`/miami-yacht-charter-water-toys`) to your Airtable "Water Toys" table.

This creates/updates records with all the information currently displayed on the website, so you can edit water toys in Airtable and they'll sync back to the website.

## Products Synced

1. **Seabob** - $499 ($99 deposit)
2. **Flitescooter** - $499 ($99 deposit)
3. **Water Sports Boat** - Multiple pricing options
4. **Floating Cabana** - $349
5. **Floating Lounge Chair** - $199 ($99/chair)
6. **Jet Ski** - Multiple pricing options
7. **Flyboard Experience** - Multiple pricing options

## Fields Synced to Airtable

- `Product ID` - Unique identifier (e.g., 'seabob', 'flitescooter')
- `Name` - Display name
- `Description` - Main product description
- `Details` - Additional details/requirements
- `Price` - Base price (or null if variable)
- `Deposit Price` - Deposit amount (if applicable)
- `Price Per Chair` - For floating lounge chairs
- `Max Quantity` - Maximum allowed per charter
- `Min Quantity` - Minimum required (e.g., 2 chairs)
- `Features` - Array of features (stored as newline-separated text)
- `Requires Waiver` - Boolean flag
- `License Link` - URL for license requirements (jet ski)
- `Sizes` - JSON string of size/price options (for products with multiple options)

## How to Run

### Option 1: Run Locally (if you have Airtable credentials)

```bash
export AIRTABLE_API_KEY="your_api_key_here"
export AIRTABLE_BASE_ID="your_base_id_here"
cd /root/yacht-charter-platform
node scripts/sync-water-toys-to-airtable.js
```

### Option 2: Run on Vercel (recommended)

1. Add environment variables in Vercel dashboard:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID`

2. Create a Vercel API route to trigger the sync:
   - Visit: `https://your-domain.vercel.app/api/admin/sync-water-toys`
   - Or add a button in the admin interface

### Option 3: Copy/paste directly into Airtable

If you prefer manual entry, here's the data structure for each product. You can copy this information into your Airtable "Water Toys" table.

## What Was Changed on Website

1. **Advance notice text:** Changed from "All water toys require 48 hours" to "Some water toys may require 48 hours"

2. **Deposit pricing:** Changed from "$99 + $400 at pickup" to "$99 + $400 due to vendor" (for SeaBob and FliteScooter)

## Next Steps

Once this data is in Airtable:

1. Update the water toys page to fetch from Airtable instead of hardcoded data
2. Any edits in Airtable will automatically appear on the website
3. You can manage prices, descriptions, features all from Airtable

## Notes

- The script checks if each record exists (by Product ID) and updates it, or creates a new one if it doesn't exist
- Rate limited to 5 requests/second to respect Airtable API limits
- Sizes/options for products like Jet Ski and Water Sports Boat are stored as JSON strings in the "Sizes" field
