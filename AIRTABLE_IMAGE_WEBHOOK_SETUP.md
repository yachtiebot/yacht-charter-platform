# Airtable Image Processing Webhook Setup

**Purpose:** Automatically optimize and upload catering hero images to Supabase when added to Airtable.

---

## What This Does

1. Sales team drops image into "Hero Image" field in Airtable
2. Webhook triggers automatically
3. Image is downloaded, optimized (WebP, compressed), uploaded to Supabase
4. Airtable record updated with Supabase URL
5. **Original attachment deleted from Airtable** (no storage waste)
6. Temp files cleaned from server

**Result:** Only optimized WebP images stored on Supabase CDN. No heavy files in Airtable or GitHub.

---

## Setup Instructions

### Step 1: Add Airtable Fields (If Not Exist)

In your **Catering** table, ensure these fields exist:

| Field Name | Type | Purpose |
|------------|------|---------|
| **Hero Image** | Attachment | Sales team drops image here |
| **Image URL** | URL | Auto-populated with Supabase link |
| **Product ID** | Text | Used for filename (e.g., `gourmet-wraps`) |

### Step 2: Create Airtable Automation

1. Go to your Airtable base → **Automations** tab
2. Click **Create automation**
3. Name it: `Process Hero Images`

**Trigger:**
- Trigger type: **When record matches conditions**
- Table: **Catering**
- Conditions:
  - `Hero Image` → `is not empty`
  - AND `Image URL` → `is empty` (prevents re-processing)

**Action:**
- Action type: **Send webhook**
- Method: **POST**
- URL: `https://yacht-charter-platform-ten.vercel.app/api/webhooks/airtable-image-process`
- Headers:
  ```
  Authorization: Bearer <YOUR_WEBHOOK_SECRET>
  Content-Type: application/json
  ```
- Body (JSON):
  ```json
  {
    "recordId": "{recordId}",
    "baseId": "{baseId}",
    "tableId": "{tableId}"
  }
  ```

**Note:** Replace `<YOUR_WEBHOOK_SECRET>` with the value from Vercel env vars.

### Step 3: Set Environment Variable

In Vercel dashboard, add (if not already set):

```
AIRTABLE_WEBHOOK_SECRET=<generate_random_secret_here>
```

Use the same secret in the Airtable automation header.

---

## How Sales Team Uses It

### Adding New Product with Image:

1. Open Airtable Catering table
2. Add new record:
   - Fill in Name, Description, Prices, etc.
   - **Important:** Add `Product ID` (e.g., `caesar-salad`)
3. **Drag image into "Hero Image" field**
4. **Done!** Wait ~10-30 seconds

### What Happens Automatically:

- Image optimized to WebP (85% quality, max 1200px)
- Uploaded to: `https://...supabase.co/.../catering/caesar-salad.webp`
- "Image URL" field filled automatically
- "Hero Image" attachment **deleted** (no storage waste)

---

## Troubleshooting

### Image didn't process:

1. Check Airtable automation history (click automation → Activity log)
2. Check webhook response:
   - ✅ Success: You'll see `"success": true` in response
   - ❌ Error: Check error message

3. Common issues:
   - **"Unauthorized"** → Webhook secret doesn't match
   - **"No Product ID"** → Add Product ID field to record
   - **"Failed to fetch record"** → Check AIRTABLE_API_KEY in Vercel

### How to test manually:

Use this curl command:

```bash
curl -X POST https://yacht-charter-platform-ten.vercel.app/api/webhooks/airtable-image-process \
  -H "Authorization: Bearer YOUR_WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "recordId": "recXXXXXXXXXXXXXX"
  }'
```

Replace `recXXXXXXXXXXXXXX` with actual Airtable record ID.

---

## Image Optimization Settings

Current settings (adjustable in `route.ts`):

- **Max dimensions:** 1200x1200px (maintains aspect ratio)
- **Format:** WebP
- **Quality:** 85% (good balance of quality/size)
- **Typical savings:** 70-90% file size reduction

### Example:

- Original JPEG: 2.4 MB
- Optimized WebP: 180 KB
- **Savings: 92.5%**

---

## Storage Locations

### ✅ Permanent Storage:
- **Supabase CDN:** `yacht-photos/catering/{product-id}.webp`

### ❌ No Storage Here (Auto-Deleted):
- ~~Airtable attachments~~ (deleted after processing)
- ~~Temp server files~~ (deleted immediately)
- ~~GitHub repo~~ (images never committed)

---

## Webhook Endpoint

**URL:** `/api/webhooks/airtable-image-process`  
**Method:** POST  
**Auth:** Bearer token (AIRTABLE_WEBHOOK_SECRET)

**Payload:**
```json
{
  "recordId": "rec123...",
  "baseId": "app123...",
  "tableId": "tbl123..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "productId": "gourmet-wraps",
  "supabaseUrl": "https://.../catering/gourmet-wraps.webp",
  "originalSize": 2450000,
  "optimizedSize": 185000,
  "savings": "92.4%"
}
```

---

## Extending to Other Products

This system works for any Airtable table! To add:

**Flowers, Water Toys, Bachelorette Packages:**

1. Create similar automation in those tables
2. Change Supabase path in webhook:
   - Flowers: `flowers/{product-id}.webp`
   - Water Toys: `water-toys/{product-id}.webp`
   - Bachelorette: `bachelorette/{product-id}.webp`

Or create separate webhook endpoints for each category.

---

**Status:** Ready to deploy and configure  
**Next:** Deploy to Vercel → Set up Airtable automation → Test with sample product
