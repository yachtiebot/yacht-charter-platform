# Caching Strategy

## Overview

The website uses a multi-layer caching strategy to handle 500-700 daily visitors while minimizing API calls to Airtable and ensuring 100% uptime even if Airtable goes down.

## Architecture

### Layer 1: Next.js ISR (Incremental Static Regeneration)
- **Revalidation:** 15 minutes (900 seconds)
- **Scope:** All yacht pages and API routes
- **Benefit:** Pre-rendered static HTML served from CDN edge

### Layer 2: In-Memory Cache
- **Location:** `/lib/yacht-cache.ts`
- **Duration:** 15 minutes
- **Scope:** Server-side process memory
- **Benefit:** Reduces Airtable API calls even within same deployment

### Layer 3: CDN Cache (Vercel Edge)
- **Header:** `Cache-Control: public, s-maxage=900, stale-while-revalidate=1800`
- **Duration:** 15 minutes fresh, 30 minutes stale
- **Benefit:** Global edge caching reduces origin requests

### Layer 4: Static Fallback Data
- **Location:** `FALLBACK_YACHTS` in `/lib/yacht-cache.ts`
- **Trigger:** Airtable API failure + no cache available
- **Benefit:** Website never goes down

## Traffic Handling

**Expected Load:** 500-700 visitors/day (~21-29/hour, ~0.5/minute)

**Airtable API Calls:**
- Without caching: ~500-700 calls/day
- With caching: ~96 calls/day (every 15 min × 24 hours ÷ revalidation)
- **Reduction: 85-90%**

## Failure Scenarios

### Scenario 1: Airtable Slow Response
- ✅ In-memory cache serves stale data instantly
- ✅ Background revalidation continues

### Scenario 2: Airtable Down (<15 min)
- ✅ Stale cache serves existing data
- ✅ Users see last known good state

### Scenario 3: Airtable Down (>15 min)
- ✅ Static fallback data activates
- ✅ Website continues functioning
- ⚠️  Data may be outdated until Airtable recovers

### Scenario 4: Vercel Deployment (Cold Start)
- ✅ Static pages pre-rendered during build
- ✅ First request triggers cache warm-up
- ✅ Fallback data prevents errors

## Cache Invalidation

### Automatic
- Every 15 minutes via ISR revalidation
- On Vercel deployment (new build)

### Manual (Future Enhancement)
- Airtable webhook to trigger on-demand revalidation
- Admin dashboard button to force cache clear

## Monitoring

**Key Metrics to Watch:**
1. Cache hit rate (in-memory + CDN)
2. Airtable API error rate
3. Fallback data activation frequency
4. Page load times (should be <1s from cache)

**Logging:**
- ✓ Serving from memory cache
- → Fetching fresh data from Airtable
- ✗ Airtable fetch failed
- ⚠  Serving stale cache data
- ⚠  Serving static fallback data

## Configuration

**Environment Variables:**
- `AIRTABLE_API_KEY` - Airtable personal access token
- `AIRTABLE_BASE_ID` - appl6AD4Ej23efTIO
- `AIRTABLE_TABLE_ID` - tblbnJKFeq5g57X9x

**Files:**
- `/lib/yacht-cache.ts` - Core caching logic
- `/app/api/yachts/route.ts` - API endpoint with caching
- `/app/yacht-rental-miami/[code]/page.tsx` - Detail pages with ISR

## Future Enhancements

1. **Redis Cache** - Add Redis for shared cache across serverless functions
2. **Webhook Invalidation** - Airtable → Vercel on-demand revalidation
3. **Cache Warming** - Cron job to keep cache hot
4. **Stale Data Indicators** - Show banner if serving >1 hour old data
5. **Admin Dashboard** - View cache status and force refresh
