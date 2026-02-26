# Miami Yachting Company - Yacht Charter Platform

A luxury yacht charter booking platform built with Next.js, Supabase (PostgreSQL), and Stripe.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Database**: PostgreSQL (via Supabase)
- **Payments**: Stripe Checkout + Webhooks
- **Hosting**: Vercel
- **Calendar Sync**: Google Calendar API (Phase 4)

### Security Model
- **Public/Internal Schema Separation**: Prevents accidental data leakage
- **Database Roles**: `public_reader` (read-only) vs `admin` (full access)
- **Response Allowlists**: Explicit field whitelisting on all public endpoints
- **Never Expose**: Vessel names, marina names, provider details

## 📁 Project Structure

```
/app
  /api
    /public               # Public API (uses public_reader role)
      /vessels            # List/search vessels
      /reservations       # Hold and checkout
    /admin                # Admin API (uses admin role) - TODO
    /webhooks
      /stripe             # Stripe webhook handler
  /fleet                  # Public vessel browsing
  /admin                  # Admin dashboard - TODO
  
/lib
  supabase.ts             # Supabase client (public & admin)
  stripe.ts               # Stripe client
  types.ts                # TypeScript types
  utils.ts                # Utility functions

DATABASE_SCHEMA.sql       # Complete database schema with triggers
```

## 🚀 Setup Instructions

### 1. Clone and Install
```bash
cd yacht-charter-platform
npm install
```

### 2. Set Up Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. In SQL Editor, run `DATABASE_SCHEMA.sql`
4. Get your connection details:
   - Project URL
   - Anon key
   - Service role key

### 3. Set Up Stripe
1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → Developers → API keys
3. Set up webhook endpoint (after Vercel deployment):
   - URL: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

### 4. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_random_secret_here

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

### 6. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Update NEXT_PUBLIC_APP_URL and NEXTAUTH_URL to production URLs
```

## 📊 Database Schema Summary

### Public Tables (Safe for Public API)
- `public_vessels` - Vessel listings (no names/marinas)
- `public_pricing_rules` - Pricing by duration
- `public_schedule_rules` - Operating hours
- `public_availability_blocks` - Busy time blocks

### Internal Tables (Admin Only)
- `internal_vessels` - Vessel names, marinas, provider info
- `internal_customers` - Customer records
- `internal_reservations` - Bookings and holds
- `internal_payments` - Stripe payment tracking
- `internal_documents` - Waivers and contracts
- `internal_add_ons` - Add-on products
- `internal_reservation_add_ons` - Add-ons per booking
- `internal_external_calendar_events` - Google Calendar sync

## 🔑 API Endpoints

### Public API
- `GET /api/public/vessels` - List all active vessels
- `GET /api/public/vessels?location_tag=Miami` - Filter vessels
- `GET /api/public/vessels/:code` - Get vessel details
- `GET /api/public/vessels/:code/availability?date=2025-03-15&duration_hours=4` - Check availability
- `POST /api/public/reservations/hold` - Create 15-min hold
- `POST /api/public/reservations/checkout` - Create Stripe checkout session

### Webhooks
- `POST /api/webhooks/stripe` - Stripe events

## 🎯 Build Phases

### ✅ Phase 1: Foundation (Complete)
- Next.js app structure
- Supabase connection
- Public/internal schema separation
- Stripe integration skeleton
- Public API (vessels, availability, hold, checkout)
- Stripe webhook handler
- Basic homepage and fleet browsing

### 🚧 Phase 2: Booking Flow (In Progress)
- [ ] Vessel detail page with availability calendar
- [ ] Add-ons selection UI
- [ ] Digital waiver form
- [ ] Booking confirmation page
- [ ] Payment success/cancel pages

### 📋 Phase 3: Admin Dashboard (Next)
- [ ] NextAuth authentication
- [ ] Calendar view (FullCalendar)
- [ ] Reservation management
- [ ] Vessel management (CRUD)
- [ ] Add-on management
- [ ] Customer records
- [ ] Reports and analytics

### 🔄 Phase 4: Google Calendar Sync
- [ ] Google Calendar API integration
- [ ] Sync service (cron job)
- [ ] External blocks in admin dashboard
- [ ] Manual resync button

### 🤖 Phase 5: AI Concierge
- [ ] Chatbot widget
- [ ] OpenAI/Claude integration
- [ ] Real-time availability queries
- [ ] Booking link generation
- [ ] After-hours mode

## 🛡️ Security Features

1. **Schema Separation**: Public API can only read public_* tables
2. **Response Allowlisting**: No implicit object spreading
3. **Conflict Prevention**: Database triggers prevent double-bookings
4. **Hold Expiration**: 15-minute holds with automatic cleanup
5. **Stripe Webhook Verification**: Signature validation
6. **Automated Tests**: (TODO) Verify no internal data leakage

## 📝 Add-On Payment Models

1. **Split Payment**: Customer pays upfront (e.g., $99), vendor balance due separately
2. **Full Collection**: Customer pays full amount, we remit to vendor
3. **Flat Fee**: Internal service, fully collected
4. **Vendor Direct**: Customer pays vendor directly, $0 via Stripe

## 🧪 Testing Locally

### Test Booking Flow
1. Browse to `/fleet`
2. Click on a vessel
3. Select date and duration
4. Add add-ons (optional)
5. Fill waiver
6. Proceed to checkout
7. Use Stripe test card: `4242 4242 4242 4242`

### Test Webhooks Locally
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## 📞 Support

Built by YachtieBot ⚓ for Miami Yachting Company
# Trigger redeploy with Supabase
# Trigger deployment for Supabase image URLs
# Deploy with correct Supabase anon key
# Final deployment with correct service role key
# Force clean deployment
# Trigger Vercel rebuild
