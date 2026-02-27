# Airtable Sync Fix Plan

**Date:** 2026-02-27  
**Issue:** Yacht data changes in Airtable not reflecting on website  
**Root Cause:** Cache duration set to 0 instead of 15 minutes, unclear if Airtable is being fetched correctly

---

## Current System Architecture

### How It Should Work (15-Minute Cache Design)
1. **First request:** Fetch from Airtable → Cache in memory for 15 minutes
2. **Subsequent requests:** Serve from memory cache (fast, no API calls)
3. **After 15 minutes:** Cache expires → Fetch fresh data from Airtable
4. **If Airtable down:** Serve stale cache or static fallback data

**Benefits:**
- Website stays fast (no API calls on every page load)
- Website stays up even if Airtable goes down
- Airtable API rate limits respected
- Changes appear within 15 minutes

### Current State (Broken)
- `CACHE_DURATION = 0` in `lib/yacht-cache.ts` (line 105)
- `next: { revalidate: 0 }` in fetch call (line 117)
- This means **every page load** tries to fetch from Airtable (slow, unreliable)
- Changes **should** appear instantly, but something is blocking it

---

## Diagnostic Steps

### Step 1: Test Airtable Connection
```bash
# Deploy the debug endpoint
cd /root/yacht-charter-platform
git add app/api/debug-sync/route.ts
git commit -m "Add Airtable sync diagnostic endpoint"
git push origin main

# Wait for Vercel deploy (~2 minutes)
# Then visit: https://yacht-charter-platform-ten.vercel.app/api/debug-sync
```

**What to look for:**
- `airtableConfigured: true` ✅
- `airtableTest.ok: true` ✅
- `airtableTest.recordCount: 1` ✅
- `airtableTest.yachtId: "116-Pershing"` (or similar) ✅
- Any error messages ❌

### Step 2: Check Vercel Environment Variables
1. Go to Vercel Dashboard → yacht-charter-platform project
2. Settings → Environment Variables
3. Verify these exist:
   - `AIRTABLE_API_KEY` (starts with "pat...")
   - `AIRTABLE_BASE_ID` (starts with "app...")
   - `AIRTABLE_TABLE_ID` (the table name, e.g., "Vessels" or "tblXXXXXX")

### Step 3: Check Airtable Field Names
The code expects these exact field names:
- `Yacht ID` (e.g., "116-Pershing")
- `Show on Website?` (checkbox)
- `Boat Name`
- `Boat Type`
- `Brand`
- `Model`
- `Length in Feet`
- `Maximum Passengers`
- `Main Departure Location`
- `2-Hour Price`, `3-Hour Price`, etc.

**If field names don't match exactly**, the data won't sync.

---

## The Fix

### Option A: Restore 15-Minute Cache (RECOMMENDED)
This is the original design - fast, resilient, changes appear within 15 minutes.

**Edit `lib/yacht-cache.ts`:**
```typescript
// Line 105: Change from 0 to 900000 (15 minutes in milliseconds)
const CACHE_DURATION = 900000; // 15-minute cache

// Line 117: Change revalidate from 0 to 900 (15 minutes in seconds)
next: { revalidate: 900 }
```

**Pros:**
- Fast website (no API calls on every load)
- Resilient to Airtable downtime
- Respects API rate limits

**Cons:**
- Changes take up to 15 minutes to appear
- Can't see updates instantly during testing

### Option B: Keep Instant Updates (0 Cache)
Good for development/testing, but risky for production.

**Keep current settings** but fix whatever is blocking Airtable:
- Check environment variables
- Check Airtable field names
- Check network/firewall issues

**Pros:**
- Changes appear instantly
- Easy to test

**Cons:**
- Slow (API call on every page load)
- Vulnerable if Airtable goes down
- May hit API rate limits

### Option C: Hybrid (5-Minute Cache)
Middle ground for active development.

```typescript
const CACHE_DURATION = 300000; // 5-minute cache
next: { revalidate: 300 } // 5 minutes
```

---

## Testing the Fix

### After deploying changes:

1. **Clear Vercel cache:**
   ```bash
   # In Vercel dashboard, trigger a new deployment
   # OR force-push a small change
   ```

2. **Make a test change in Airtable:**
   - Change a yacht's name or price
   - Note the time

3. **Check the website:**
   - If 15-min cache: Wait 15 minutes, then refresh
   - If 0 cache: Refresh immediately
   - Verify the change appears

4. **Monitor for errors:**
   - Check Vercel logs for any Airtable errors
   - Check browser console for any issues

---

## Emergency Fallback Data

If Airtable is completely unreachable, the system falls back to hardcoded data in `yacht-cache.ts` (lines 26-88).

**Current fallback yachts:**
- 37-Axopar
- 27-Regal
- 116-Pershing

These will display if Airtable API fails AND cache is empty.

---

## Next Steps

1. ✅ **Deployed diagnostic endpoint** (`/api/debug-sync`)
2. ⏳ **Test it** after Vercel deploys
3. ⏳ **Review diagnostics** to find the root cause
4. ⏳ **Apply fix** (restore 15-min cache or fix Airtable connection)
5. ⏳ **Test sync** with real Airtable changes

---

## Questions to Answer

- [ ] Are Airtable credentials correctly set in Vercel?
- [ ] Do Airtable field names match the code exactly?
- [ ] Is the correct table/view being queried?
- [ ] Should we use 15-minute cache or instant updates?
- [ ] Are there any Vercel deployment errors?

---

**Status:** Ready for diagnostic testing  
**Next Action:** Visit `/api/debug-sync` after deployment completes
