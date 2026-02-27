# Dropbox Catering Image Setup (Fully Automatic)

**Zero manual steps after setup - just drag and drop!**

---

## What This Does

1. Sales team drops image into Dropbox folder
2. Dropbox webhook triggers automatically
3. Image downloaded, optimized, uploaded to Supabase
4. Airtable updated with Supabase URL
5. **Original file DELETED from Dropbox** (no storage waste)
6. Temp files cleaned from server

**Result:** Only optimized WebP on Supabase CDN. Nothing left in Dropbox or server.

---

## Sales Team Workflow

### Step 1: Name the File

File must be named **exactly** like the Product ID in Airtable:

**Examples:**
- Product ID: `gourmet-wraps` → File: `gourmet-wraps.jpg`
- Product ID: `caesar-salad` → File: `caesar-salad.jpg`
- Product ID: `large-charcuterie` → File: `large-charcuterie.jpg`

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.webp`

### Step 2: Drop in Dropbox

Drop the file into: `Dropbox/Apps/YachtPhotos/catering-images/`

(Or whatever your Dropbox app folder is called - same one used for yacht photos)

### Step 3: Wait

**That's it!** In 10-30 seconds:
- ✅ Image appears on website
- ✅ Airtable "Image URL" field filled
- ✅ Original deleted from Dropbox

---

## One-Time Setup (15 minutes)

### Step 1: Create Dropbox Folder

In your Dropbox app folder, create:
```
/Apps/YachtPhotos/catering-images/
```

### Step 2: Set Up Dropbox Webhook

1. Go to Dropbox App Console: https://www.dropbox.com/developers/apps
2. Select your app (same one used for yacht photos)
3. Click **OAuth 2** tab
4. Scroll to **Webhooks** section
5. Click **Add webhook**

**Webhook URL:**
```
https://yacht-charter-platform-ten.vercel.app/api/webhooks/dropbox-catering-images
```

6. Click **Add**
7. Dropbox will send a verification request (should succeed automatically)

### Step 3: Verify Environment Variables

These should already exist from yacht photo setup:

In Vercel → Settings → Environment Variables:
```
DROPBOX_ACCESS_TOKEN=<your_dropbox_token>
DROPBOX_APP_SECRET=<your_app_secret>
```

If missing, add them.

---

## Testing

### Test with Sample Image:

1. Download any image, rename it: `test-delete-me.jpg`
2. Create Airtable record:
   - Name: `Test Item`
   - Product ID: `test-delete-me`
   - Category: `desserts`
   - Leave "Image URL" empty
3. Drop `test-delete-me.jpg` into Dropbox `catering-images/` folder
4. Wait 30 seconds
5. Check:
   - ✅ "Image URL" field populated
   - ✅ File gone from Dropbox
   - ✅ Image at: `https://...supabase.co/.../catering/test-delete-me.webp`

### View Logs:

**Vercel Function Logs:**
1. Vercel dashboard → Deployments
2. Latest deployment → Functions
3. Find `/api/webhooks/dropbox-catering-images`
4. View real-time processing logs

---

## Important Rules

### File Naming:

✅ **Good:**
- `gourmet-wraps.jpg`
- `caesar-salad.png`
- `large-charcuterie.jpeg`

❌ **Bad:**
- `Gourmet Wraps.jpg` (spaces)
- `gourmet_wraps.jpg` (underscore instead of dash)
- `IMG_1234.jpg` (random name)

**Must match Product ID in Airtable exactly!**

### Product ID Must Exist:

If you drop `caesar-salad.jpg` but there's no Airtable record with Product ID = `caesar-salad`:
- ✅ Image still processes and uploads to Supabase
- ⚠️ Airtable won't update (no matching record)
- ✅ File still deleted from Dropbox

**Solution:** Always create Airtable record first, then drop image.

---

## What Gets Deleted

✅ **Deleted automatically:**
- Original file from Dropbox (after Supabase upload)
- Temp files on server

❌ **NOT deleted:**
- Supabase image (permanent CDN storage)
- Airtable record

---

## Performance

**Typical processing time:** 10-30 seconds

**Breakdown:**
- Dropbox webhook trigger: 1-5s
- Download from Dropbox: 1-3s
- Optimize: 1-2s
- Upload to Supabase: 1-3s
- Update Airtable: 1-2s
- Delete from Dropbox: 1s
- Cleanup: <1s

**File size reduction:** Usually 70-90%

---

## Troubleshooting

### Image not processing:

1. **Check Dropbox webhook:**
   - Go to Dropbox App Console → your app
   - Check webhook is listed and enabled
   - Look at webhook activity log

2. **Check Vercel logs:**
   - Look for errors in function logs
   - Common issues:
     - File name doesn't match Product ID
     - Dropbox token expired
     - No matching Airtable record

3. **Check file name:**
   - Must be lowercase with dashes
   - Must match Airtable Product ID exactly
   - Check for typos

### File not deleted from Dropbox:

- Usually means something failed during processing
- Check Vercel logs for errors
- File will remain if processing failed (safe fallback)

---

## Extending to Other Products

Want to use same system for flowers, water toys, etc?

**Option A:** Same folder, different prefixes
- `flowers-roses.jpg`
- `watertoys-seabob.jpg`
- Update script to route based on prefix

**Option B:** Separate folders + webhooks
- `/flowers-images/`
- `/water-toys-images/`
- Create separate webhook endpoints

---

## Comparison to Yacht Photos

**Same:**
- Dropbox workflow
- File naming requirement
- Automatic processing

**Different:**
- Yacht photos: Manual script run
- Catering: Fully automatic webhook
- Catering: Deletes from Dropbox after processing

---

**Status:** Ready to deploy and test  
**Next:** Deploy code → Set up Dropbox webhook → Test with sample image
