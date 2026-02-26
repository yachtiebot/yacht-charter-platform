# Sentry Setup Instructions

## Sentry DSN Added Locally

✅ **DSN added to local .env.local**

## Add to Vercel Environment Variables

**Go to Vercel Dashboard:**
1. Visit: https://vercel.com/dashboard
2. Select project: `yacht-charter-platform`
3. Go to Settings → Environment Variables
4. Add this variable:

```
Name: NEXT_PUBLIC_SENTRY_DSN
Value: https://14791cc840cf38fefb2b2cab094bbb29@o4510951956086784.ingest.us.sentry.io/4510951958183936
Environment: Production, Preview, Development (select all)
```

5. Click "Save"
6. Redeploy the project (or next deployment will pick it up)

## Sentry SDK Integration

Will be added during shopping cart build. The SDK will:
- Capture unhandled errors (client + server)
- Track performance of checkout flow
- Monitor Stripe webhook failures
- Send alerts to yachtiebot@gmail.com

## Alert Configuration

After cart is deployed, configure in Sentry dashboard:
- Error rate threshold: 2-5% in 5 minutes
- Alert on any Stripe webhook failure
- Alert on repeated 500 errors
- Email notifications to: yachtiebot@gmail.com

---

**Status:** DSN ready, awaiting Vercel deployment variable
