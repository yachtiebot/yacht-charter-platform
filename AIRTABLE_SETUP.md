# 🤖 Automated Airtable Setup

## What This Does:
- Sales team adds yachts to Airtable (drag & drop photos, fill form)
- **Every hour, automatically syncs to your website**
- Zero manual work after setup
- Images hosted by Airtable CDN (fast, reliable)

---

## One-Time Setup (10 minutes):

### 1. Create Airtable Account
- Go to: https://airtable.com/signup
- Free account is fine (up to 1,200 records)

### 2. Create Base
I'll send you a pre-configured base template with:
- **Vessels** table (all fields set up)
- **Active** view (shows only active boats)
- **Form view** (for easy yacht adding)

### 3. Get API Credentials
1. Go to: https://airtable.com/create/tokens
2. Click "Create new token"
3. Name it: `yacht-sync`
4. Add scopes: `data.records:read`
5. Add access to your base
6. Copy the token (starts with `pat...`)

### 4. Get Base ID
1. Go to your Airtable base
2. Click "Help" → "API documentation"
3. Find the Base ID (starts with `app...`)

### 5. Add to Vercel
Go to: https://vercel.com/yachtiebots-projects/yacht-charter-platform/settings/environment-variables

Add these:
```
AIRTABLE_API_KEY=pat_xxxxxxxxxxxxxxxx
AIRTABLE_BASE_ID=appxxxxxxxxxxxxxxx
CRON_SECRET=generate_random_secret_here
```

### 6. Redeploy
In Vercel dashboard, click "Redeploy" → Done!

---

## How Your Team Uses It:

### Option A: Airtable Form (Easiest)
Share this link with your team:
`https://airtable.com/shrXXXXXX` (I'll generate after setup)

They:
1. Fill out yacht details
2. Upload 5-10 photos (drag & drop)
3. Submit
4. **Website updates within 1 hour automatically**

### Option B: Direct in Airtable
1. Open Airtable base
2. Click "+ Add record"
3. Fill fields, drag photos
4. Set Status = "Active"
5. **Auto-syncs within 1 hour**

---

## Manual Sync (If Needed):

Visit: `https://yacht-charter-platform-mu.vercel.app/api/cron/sync-vessels`

Add header: `Authorization: Bearer YOUR_CRON_SECRET`

Or just message me: "sync vessels" and I'll trigger it.

---

## Airtable Fields:

| Field Name | Type | Required | Notes |
|------------|------|----------|-------|
| Vessel Name (internal) | Text | ✓ | Never shown publicly |
| Make | Single Select | ✓ | Sunseeker, Azimut, etc. |
| Model | Text | | Optional |
| Length (ft) | Number | ✓ | Auto-calculates bucket |
| Category | Single Select | ✓ | Day boat, Luxury yacht, etc. |
| Location | Single Select | ✓ | Miami Beach, Key Biscayne, etc. |
| Max Guests | Number | ✓ | |
| Min Hours | Number | ✓ | Default: 4 |
| Max Hours | Number | ✓ | Default: 8 |
| Duration Options | Multiple Select | ✓ | 3hr, 4hr, 6hr, 8hr, 24hr |
| Photos | Attachments | ✓ | Drag & drop 5-10 images |
| Description | Long Text | ✓ | Public marketing copy |
| Toys | Multiple Select | | Jet ski, Seabob, etc. |
| Amenities | Multiple Select | | AC, sound system, etc. |
| Status | Single Select | ✓ | Active / Inactive |
| Marina (internal) | Text | | Never shown publicly |
| Public Code | Formula | Auto | Auto-generated URL slug |

---

## Want Me to Set This Up?

Give me:
1. Your Airtable API token
2. Your Base ID

I'll:
- Configure the sync
- Test it
- Give you the form link for your team
- Set up the hourly cron job

**Then it's fully automated forever!** 🎉
