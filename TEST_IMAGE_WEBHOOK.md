# Test Airtable Image Webhook

## Quick Test Steps

### 1. Prepare Test Record in Airtable

1. Open Catering table in Airtable
2. Find or create a test record:
   - **Name:** Test Item (Delete After)
   - **Product ID:** `test-item-delete-me`
   - **Category:** desserts (or any)
   - Leave **Image URL** empty
   - Leave **Hero Image** empty (for now)

### 2. Add Test Image

1. Download a test image (any JPEG/PNG)
2. Drag it into the **Hero Image** field
3. Watch the magic happen! ✨

### 3. Expected Result (within 30 seconds):

- ✅ **Image URL** field populates with Supabase link
- ✅ **Hero Image** attachment disappears
- ✅ Image visible at: `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos/catering/test-item-delete-me.webp`

---

## Manual Testing (Without Airtable Automation)

If you want to test the endpoint directly:

```bash
# Replace with actual record ID from Airtable
RECORD_ID="recXXXXXXXXXXXXXX"
WEBHOOK_SECRET="<from_vercel_env_vars>"

curl -X POST https://yacht-charter-platform-ten.vercel.app/api/webhooks/airtable-image-process \
  -H "Authorization: Bearer $WEBHOOK_SECRET" \
  -H "Content-Type: application/json" \
  -d "{\"recordId\": \"$RECORD_ID\"}"
```

Expected response:
```json
{
  "success": true,
  "productId": "test-item-delete-me",
  "supabaseUrl": "https://...catering/test-item-delete-me.webp",
  "originalSize": 2450000,
  "optimizedSize": 185000,
  "savings": "92.4%"
}
```

---

## Troubleshooting

### Webhook not triggering:

**Check Airtable Automation:**
1. Go to Automations tab
2. Click your automation
3. Check "Activity" log for runs
4. Look for errors

**Common fixes:**
- Make sure "Hero Image" has an image AND "Image URL" is empty
- Check automation is turned ON (toggle in top right)

### Webhook returns error:

**401 Unauthorized:**
- Webhook secret doesn't match
- Check Vercel env vars: `AIRTABLE_WEBHOOK_SECRET`
- Make sure Airtable automation uses same secret

**400 No record ID:**
- Check Airtable automation payload
- Should include `{recordId}` placeholder

**500 Processing failed:**
- Check Vercel logs (Vercel dashboard → Deployments → Latest → Functions)
- Look for specific error message

---

## Viewing Logs

### Vercel Function Logs:
1. Go to Vercel dashboard
2. Click project → Deployments
3. Click latest deployment → Functions tab
4. Find `/api/webhooks/airtable-image-process`
5. Click to view real-time logs

### Airtable Automation Logs:
1. Open automation
2. Click "Activity" tab
3. See all webhook calls + responses

---

## What Gets Deleted

✅ **Deleted automatically:**
- Airtable attachment (after Supabase upload)
- Temp files on server (`/tmp/airtable-image-processing/`)

❌ **NOT deleted:**
- Supabase image (permanent CDN storage)
- Airtable record itself
- Other fields in record

---

## Performance

**Typical processing time:** 5-15 seconds

**Breakdown:**
- Download from Airtable: 1-3s
- Optimize with Sharp: 1-2s
- Upload to Supabase: 1-3s
- Update Airtable: 1-2s
- Cleanup: <1s

**Optimized file size:** Usually 70-90% smaller than original

---

## Production Checklist

Before rolling out to full team:

- [ ] Test with 3-5 sample products
- [ ] Verify images appear on website
- [ ] Confirm Airtable attachments deleted
- [ ] Check Supabase storage quota
- [ ] Train sales team (literally just "drag and drop")
- [ ] Set up monitoring/alerts (optional)

---

**Status:** Ready to test!  
**Next:** Add test image to Airtable → Watch it process → Verify on website
