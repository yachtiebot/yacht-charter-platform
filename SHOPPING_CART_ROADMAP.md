# Shopping Cart & E-Commerce Roadmap

## 🎯 Project Overview

Build a complete e-commerce system for yacht charters with:
- Shopping cart for yachts + add-ons
- Stripe payment integration (3DS mandatory)
- Admin dashboard for order management
- Metadata system for QuickBooks export
- Digital waiver system
- Monitoring & error tracking

---

## 📋 Phase 1: Cart Foundation (Week 1)

**Goal:** Basic cart functionality working locally

### 1.1 Cart State Management
- [ ] Set up Zustand store for cart state
- [ ] Cart actions: add, remove, update quantity
- [ ] Persist cart to localStorage
- [ ] Cart item interface with metadata fields

### 1.2 Cart UI Components
- [ ] Cart sidebar (slide-in panel)
- [ ] Cart item card component
- [ ] Empty cart state
- [ ] Cart totals calculator
- [ ] Remove/update quantity controls

### 1.3 Add to Cart Integration
- [ ] "Book Now" button on yacht detail pages
- [ ] Add-ons selection interface
- [ ] Duration/date picker integration
- [ ] Guest count selector
- [ ] Price calculation with add-ons

**Deliverable:** Working cart that adds yachts + add-ons, persists across sessions

---

## 📋 Phase 2: Checkout Flow (Week 1-2)

**Goal:** Complete checkout process without payment

### 2.1 Checkout Page Structure
- [ ] Multi-step checkout layout
- [ ] Step 1: Contact information form
- [ ] Step 2: Trip details (date, time, guests)
- [ ] Step 3: Add-ons selection
- [ ] Step 4: Review & payment
- [ ] Progress indicator

### 2.2 Form Validation
- [ ] Zod schema for all forms
- [ ] React Hook Form integration
- [ ] Field-level validation
- [ ] Error messaging
- [ ] Required field indicators

### 2.3 Order Summary Component
- [ ] Line items breakdown
- [ ] Subtotal calculation
- [ ] Tax calculation (if applicable)
- [ ] Total with formatting
- [ ] Editable from checkout

**Deliverable:** Complete checkout flow with validation, ready for payment integration

---

## 📋 Phase 3: Stripe Integration (Week 2)

**Goal:** Secure payment processing with 3DS

### 3.1 Stripe Setup
- [ ] Install @stripe/stripe-js and @stripe/react-stripe-js
- [ ] Create Stripe account (or use existing)
- [ ] Get API keys (test + production)
- [ ] Add to Vercel environment variables
- [ ] Webhook endpoint setup

### 3.2 Payment Intent API
- [ ] `/api/stripe/create-payment-intent` endpoint
- [ ] Calculate amount server-side (security)
- [ ] Attach metadata (customer, yacht, add-ons)
- [ ] Return client secret
- [ ] Handle errors gracefully

### 3.3 Payment Form
- [ ] Stripe Elements integration
- [ ] Card input component
- [ ] 3DS authentication flow (MANDATORY)
- [ ] Loading states during payment
- [ ] Success/error handling
- [ ] Payment confirmation screen

### 3.4 Metadata Structure
```javascript
{
  customer_name: string,
  customer_email: string,
  customer_phone: string,
  yacht_code: string,
  yacht_name: string,
  charter_date: string,
  charter_duration: number,
  guest_count: number,
  add_ons: JSON.stringify([...]),
  category: 'yacht_charter' | 'add_on' | 'experience',
  quickbooks_category: string,
  booking_source: 'website',
  order_id: string // unique ID
}
```

### 3.5 Webhook Handler
- [ ] `/api/stripe/webhook` endpoint
- [ ] Verify webhook signature
- [ ] Handle `payment_intent.succeeded`
- [ ] Handle `payment_intent.payment_failed`
- [ ] Log all events to Sentry
- [ ] Send confirmation email (future phase)

**Deliverable:** Fully functional payment system with 3DS, metadata tracking

---

## 📋 Phase 4: Order Database (Week 2-3)

**Goal:** Store and retrieve orders

### 4.1 Database Schema (Airtable)
**Table: Orders**
```
- Order ID (text, primary)
- Created At (datetime)
- Customer Name (text)
- Customer Email (email)
- Customer Phone (phone)
- Yacht Code (text)
- Yacht Name (text)
- Charter Date (date)
- Charter Duration (number)
- Guest Count (number)
- Add-ons (JSON text)
- Subtotal (currency)
- Total Paid (currency)
- Payment Status (select: pending/succeeded/failed)
- Stripe Payment ID (text)
- QuickBooks Category (text)
- Waiver Signed (checkbox)
- Waiver URL (URL)
- Notes (long text)
```

### 4.2 API Routes
- [ ] `/api/orders/create` - Create order after payment
- [ ] `/api/orders/[id]` - Get order by ID
- [ ] `/api/orders/list` - List all orders (admin)
- [ ] `/api/orders/update` - Update order status
- [ ] Error handling with Sentry

### 4.3 Order Confirmation
- [ ] Order confirmation page
- [ ] Order details display
- [ ] Print-friendly receipt
- [ ] Email confirmation (future)

**Deliverable:** Orders stored in Airtable, retrievable via API

---

## 📋 Phase 5: Admin Dashboard (Week 3)

**Goal:** Manage orders and inventory

### 5.1 Authentication
- [ ] Simple password-protected admin route
- [ ] `/admin/login` page
- [ ] Session management (NextAuth or simple JWT)
- [ ] Protected admin routes

### 5.2 Orders Management
- [ ] `/admin/orders` - Order list view
- [ ] Sortable/filterable table
- [ ] Search by customer name/email
- [ ] Filter by date range
- [ ] Filter by payment status
- [ ] Order detail modal/page

### 5.3 Order Actions
- [ ] Mark as fulfilled
- [ ] Add internal notes
- [ ] Resend confirmation email
- [ ] Refund order (Stripe API)
- [ ] Export to CSV
- [ ] QuickBooks export format

### 5.4 Dashboard Stats
- [ ] Total revenue (daily/weekly/monthly)
- [ ] Orders count
- [ ] Most popular yachts
- [ ] Most popular add-ons
- [ ] Average order value

**Deliverable:** Functional admin dashboard for order management

---

## 📋 Phase 6: Digital Waiver System (Week 4)

**Goal:** Collect signed waivers for each booking

### 6.1 Waiver Document
- [ ] Create legal waiver text (G to provide)
- [ ] Waiver page component
- [ ] Print-friendly styling
- [ ] Include booking details

### 6.2 E-Signature Integration
- [ ] Use react-signature-canvas or similar
- [ ] Signature pad component
- [ ] Save signature as base64/image
- [ ] "I agree" checkbox
- [ ] Date/time stamp

### 6.3 Waiver Storage
- [ ] Upload signed waiver to Supabase Storage
- [ ] Generate unique filename (order_id_waiver.pdf)
- [ ] Store URL in Airtable order record
- [ ] Link in confirmation email

### 6.4 Waiver Flow
- [ ] Send waiver link after payment
- [ ] Track waiver status (signed/pending)
- [ ] Admin can resend waiver link
- [ ] Admin can view signed waivers

**Deliverable:** Digital waiver system integrated with orders

---

## 📋 Phase 7: Monitoring & Analytics (Week 4)

**Goal:** Track errors and performance

### 7.1 Sentry Integration
- [ ] Install @sentry/nextjs
- [ ] Initialize Sentry client + server
- [ ] Capture payment errors
- [ ] Capture webhook failures
- [ ] Capture API errors
- [ ] Configure alert thresholds

### 7.2 UptimeRobot Monitors
- [ ] Homepage monitor (200 OK)
- [ ] Stripe webhook endpoint monitor
- [ ] Cart API endpoints monitor
- [ ] Alert via Telegram bot
- [ ] Alert to yachtiebot@gmail.com

### 7.3 Stripe Dashboard Monitoring
- [ ] Failed payment alerts
- [ ] Dispute alerts
- [ ] Webhook failure alerts

### 7.4 Performance Tracking
- [ ] Track checkout funnel drop-off
- [ ] Track payment success rate
- [ ] Track average cart value
- [ ] Track most abandoned step

**Deliverable:** Comprehensive monitoring setup

---

## 📋 Phase 8: Email Notifications (Week 5)

**Goal:** Automated customer + admin emails

### 8.1 Email Service Setup
- [ ] Choose provider (Resend, SendGrid, etc.)
- [ ] Set up domain authentication (SPF/DKIM)
- [ ] Create email templates
- [ ] Test deliverability

### 8.2 Customer Emails
- [ ] Order confirmation email
- [ ] Payment receipt
- [ ] Waiver signing request
- [ ] Booking reminder (day before)
- [ ] Post-trip follow-up

### 8.3 Admin Emails
- [ ] New order notification
- [ ] Payment failure alert
- [ ] Waiver signed notification
- [ ] Daily order summary

**Deliverable:** Complete email notification system

---

## 📋 Phase 9: Testing & QA (Week 5-6)

**Goal:** Bulletproof the system

### 9.1 Unit Tests
- [ ] Cart state management tests
- [ ] Price calculation tests
- [ ] Form validation tests
- [ ] API endpoint tests

### 9.2 Integration Tests
- [ ] Complete checkout flow
- [ ] Payment processing (test mode)
- [ ] Webhook handling
- [ ] Order creation

### 9.3 E2E Tests (Playwright)
- [ ] Add to cart → checkout → payment
- [ ] Admin login → view orders
- [ ] Waiver signing flow

### 9.4 Manual Testing Checklist
- [ ] Test all payment card scenarios (success/decline/3DS)
- [ ] Test on mobile devices
- [ ] Test with slow network
- [ ] Test cart persistence
- [ ] Test admin dashboard on all browsers

**Deliverable:** Fully tested, production-ready system

---

## 📋 Phase 10: Launch & Optimization (Week 6)

**Goal:** Go live and iterate

### 10.1 Pre-Launch
- [ ] Switch Stripe to production mode
- [ ] Final security review
- [ ] Load testing
- [ ] Backup plan documented

### 10.2 Soft Launch
- [ ] Enable for limited users
- [ ] Monitor errors closely
- [ ] Collect feedback
- [ ] Fix critical issues

### 10.3 Full Launch
- [ ] Announce to all users
- [ ] Monitor performance
- [ ] Track conversion rate
- [ ] Optimize based on data

### 10.4 Post-Launch Optimization
- [ ] A/B test checkout flow
- [ ] Optimize load times
- [ ] Add upsells/cross-sells
- [ ] Improve mobile UX

**Deliverable:** Live, optimized e-commerce system

---

## 🔧 Technology Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Hook Form + Zod (validation)

**Payment:**
- Stripe (@stripe/stripe-js, @stripe/react-stripe-js)
- 3D Secure mandatory

**Backend:**
- Next.js API routes
- Airtable (database)
- Supabase (file storage only)

**Monitoring:**
- Sentry (error tracking)
- UptimeRobot (uptime monitoring)
- Stripe Dashboard (payment monitoring)

**Email:**
- TBD (Resend, SendGrid, or similar)

---

## 📊 Success Metrics

- **Payment Success Rate:** >95%
- **Checkout Completion Rate:** >60%
- **Cart Abandonment Rate:** <40%
- **Page Load Time:** <2s
- **Error Rate:** <1%
- **Uptime:** >99.9%

---

## 🚨 Critical Requirements

1. **3D Secure MANDATORY** - All payments must use 3DS
2. **Metadata on every transaction** - For QuickBooks export
3. **Error monitoring** - Sentry must catch all failures
4. **Legal compliance** - Digital waivers for all bookings
5. **No photo attachments in Airtable** - Photos stay in Supabase

---

## 📝 Notes

- This is a 6-week project with daily commits
- Each phase has testable deliverables
- We'll review and adjust as needed
- Security is paramount (no shortcuts on payment)
- Mobile-first design (50%+ of traffic)

---

**Created:** 2026-02-26  
**Last Updated:** 2026-02-26  
**Status:** Planning Complete, Ready to Build
