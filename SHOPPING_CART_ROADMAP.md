# Shopping Cart & E-Commerce Roadmap

## 🎯 Project Overview

Build standalone e-commerce for add-ons (catering, water toys, flowers, bachelorette packages):
- Shopping cart with product customizations
- Stripe payment integration (3DS mandatory)
- Digital waiver system (jet ski)
- Email notifications to support@miamiyachting.com
- Order management
- Florida boating license compliance

**Note:** Yacht reservation system is separate (see: RESERVATION_SYSTEM_ROADMAP.md)

---

## 📅 **Timeline: 1 Week (7 Days)**

**Status:** Phase 1 (Cart Foundation) ✅ COMPLETE  
**Current:** Ready to build Phase 1A (Customization Modals)

| Phase | Days | Status | Description |
|-------|------|--------|-------------|
| Phase 1 | Done | ✅ | Cart foundation (Zustand, UI, icon) |
| Phase 1A | 1-2 | 🔜 | Product customization modals |
| Phase 1B | 2-3 | ⬜ | Jet ski waiver system |
| Phase 1C | 3 | ⬜ | Add to cart buttons on all pages |
| Phase 1D | 3-4 | ⬜ | Checkout page & validation |
| Phase 1E | 4 | ⬜ | Email notifications |
| Phase 1F | 4 | ⬜ | Order confirmation page |
| Phase 2 | 5-6 | ⬜ | Stripe integration (test → production) |
| Phase 3 | 6-7 | ⬜ | Airtable order storage |
| Testing | 7 | ⬜ | End-to-end testing & polish |

**Launch Target:** Day 7 (soft launch with test mode)  
**Production:** Day 8+ (after testing with real transactions)

---

## 📋 Phase 1: Cart Foundation ✅ COMPLETE

**Goal:** Basic cart functionality working locally

### 1.1 Cart State Management ✅
- [x] Set up Zustand store for cart state (yacht bookings)
- [x] Existing React Context for add-ons
- [x] Cart actions: add, remove, update quantity
- [x] Persist cart to localStorage
- [x] Cart item interface with metadata fields

### 1.2 Cart UI Components ✅
- [x] Cart sidebar (slide-in panel)
- [x] Cart item card component
- [x] Empty cart state
- [x] Cart totals calculator
- [x] Remove/update quantity controls

### 1.3 Cart Icon Integration ✅
- [x] Cart icon shows combined count (yachts + add-ons)
- [x] Opens appropriate cart based on contents
- [x] Integrated in navigation

**Deliverable:** ✅ Working cart foundation complete

---

## 📋 Phase 1A: Product Customization Modals (Days 1-2)

**Goal:** Allow customers to customize products before adding to cart

### 1A.1 Cake Customization Modal
- [ ] Modal component with clean luxury design
- [ ] Cake flavor selection (radio: Vanilla, Chocolate)
- [ ] Custom message input (textarea, 50 char limit)
- [ ] Allergy/special requests (textarea, optional)
- [ ] Form validation
- [ ] "Add to Cart" button in modal
- [ ] Store customization data with cart item
- [ ] Display customizations in cart sidebar

### 1A.2 Custom Charcuterie Box Builder
- [ ] Modal with multi-section form
- [ ] Charcuterie Meat #1 & #2 (dropdowns, required)
- [ ] Artisan Cheese #1 & #2 (dropdowns, required)
- [ ] Fruit #1 & #2 (dropdowns, required)
- [ ] Accompaniment #1 & #2 (dropdowns, required)
- [ ] Visual builder interface (optional: show selections)
- [ ] Form validation (all fields required)
- [ ] Store selections with cart item

### 1A.3 Meat Dipping Sauces Selector
- [ ] Simple dropdown modal
- [ ] Sauce options: Sweet Sriracha, Spicy Gold, BBQ, Blue Cheese, Ranch, Honey Mustard
- [ ] Applied to applicable meat items (wings, tenders, etc.)
- [ ] Store selection with cart item

### 1A.4 Deli Sandwich Builder
- [ ] Multi-section form modal
- [ ] Meat selection (checkboxes, 2-3 based on serving size)
  - Options: Turkey, Roast Beef, Ham, Ultimate, Italian, Veggie Only
- [ ] Bread selection (checkboxes, max 2)
  - Options: White, 5 Grain Italian
- [ ] Cheese selection (checkboxes, 2-3 based on serving size)
  - Options: American Yellow/White, Swiss, Cheddar, Provolone, Muenster, No cheese
- [ ] Dynamic validation based on serving size
- [ ] Store selections with cart item

### 1A.5 Cart Integration
- [ ] Update cart context to store `customization` field
- [ ] Display customizations clearly in cart
- [ ] Allow editing customizations from cart
- [ ] Format customizations for checkout display

**Deliverable:** All products can be customized before adding to cart

---

## 📋 Phase 1B: Jet Ski Waiver System (Days 2-3)

**Goal:** Legal waiver with e-signature required BEFORE adding jet ski to cart

### 1B.1 Waiver Modal Component
- [ ] Full-screen or large modal (important legal content)
- [ ] Clean, professional design
- [ ] Scrollable content area
- [ ] 7 checkbox acknowledgements (all required):
  1. Florida jet ski laws acknowledgement
  2. Damage security deposit understanding
  3. Vessel damage responsibility
  4. Maximum quantity (2 jet skis max)
  5. Appointment scheduling understanding
  6. Credit card and ID acknowledgement
  7. Third party vendor liability release

### 1B.2 Electronic Signature
- [ ] First Name input (required)
- [ ] Last Name input (required)
- [ ] Timestamp capture
- [ ] "I Agree & Add to Cart" button (disabled until all complete)
- [ ] Validation: all boxes checked + name entered

### 1B.3 Florida Boating License Requirement
- [ ] Display info in waiver: "Born after Jan 1, 1988 = license required"
- [ ] Link to https://checkinmyc.com/PWCLicense
- [ ] Store waiver acceptance with cart item
- [ ] Flag item as requiring license notification

### 1B.4 Cart Integration
- [ ] Waiver modal opens BEFORE adding jet ski to cart
- [ ] Block add to cart until waiver signed
- [ ] Store waiver data with cart item:
  ```json
  {
    "waiver_signed": true,
    "waiver_date": "2026-02-26T13:39:00Z",
    "signature_name": "John Smith",
    "acknowledgements": { all 7 checkboxes }
  }
  ```
- [ ] Display "Waiver Signed" badge in cart

**Deliverable:** Legally compliant jet ski waiver system

---

## 📋 Phase 1C: Product Pages & Add to Cart (Day 3)

**Goal:** Add "Add to Cart" buttons to all product pages

### 1C.1 Catering Page Updates
- [ ] Add "Add to Cart" buttons to all catering items
- [ ] Trigger appropriate customization modal:
  - Cakes → Cake customization
  - Charcuterie → Charcuterie builder
  - Wings/Tenders → Dipping sauce selector
  - Sandwiches → Sandwich builder
  - Simple items → Direct add to cart
- [ ] Quantity selector integration
- [ ] Price display

### 1C.2 Water Toys Page Updates
- [ ] Add "Add to Cart" buttons
- [ ] Jet skis → Trigger waiver modal first
- [ ] Other water toys → Direct add to cart
- [ ] Quantity selectors

### 1C.3 Flowers Page Updates
- [ ] Add "Add to Cart" buttons
- [ ] Direct add to cart (no customization)
- [ ] Quantity selectors

### 1C.4 Bachelorette Page Updates
- [ ] Add "Add to Cart" buttons
- [ ] Package selection
- [ ] Direct add to cart
- [ ] Quantity selectors

**Deliverable:** All 4 stores fully functional with add to cart

---

## 📋 Phase 1D: Checkout Flow (Days 3-4)

**Goal:** Complete checkout process with mock payment

### 1D.1 Checkout Page Structure
- [ ] Clean, luxury checkout design
- [ ] Single-page checkout (not multi-step)
- [ ] Contact information form:
  - Full Name (required)
  - Email (required, validated)
  - Phone (required, formatted)
  - Special instructions (optional textarea)

### 1D.2 Order Review Section
- [ ] Display all cart items with:
  - Product name, quantity, price
  - Customizations (formatted nicely)
  - Waiver status (if jet ski)
- [ ] Subtotal calculation
- [ ] Tax calculation (if applicable)
- [ ] Grand total
- [ ] Edit cart link
### 1D.3 Form Validation
- [ ] Zod schema for checkout form
- [ ] React Hook Form integration
- [ ] Field-level validation
- [ ] Error messaging (inline)
- [ ] Required field indicators
- [ ] Email format validation
- [ ] Phone number formatting

### 1D.4 Mock Payment Section
- [ ] Mock credit card form (for testing)
- [ ] "Place Order" button
- [ ] Loading state
- [ ] Mock successful payment
- [ ] Redirect to confirmation

**Deliverable:** Complete checkout flow ready for Stripe integration

---

## 📋 Phase 1E: Email Notifications (Day 4)

**Goal:** Send order details to support@miamiyachting.com

### 1E.1 Email Service Setup
- [ ] Choose email provider (Resend recommended)
- [ ] Set up API key
- [ ] Add to Vercel environment variables
- [ ] Test email delivery

### 1E.2 Order Confirmation Email Template
- [ ] HTML email template (clean, professional)
- [ ] Order summary section:
  - Order ID, date/time
  - Customer name, email, phone
  - Total amount
- [ ] Items section:
  - Each product with customizations
  - Formatted clearly for fulfillment team
- [ ] Waiver data section (if jet ski):
  - All acknowledgements
  - Signature name & timestamp
- [ ] Jet ski license reminder (if applicable):
  - Born after Jan 1, 1988 warning
  - Link to https://checkinmyc.com/PWCLicense
- [ ] Special instructions section

### 1E.3 Email Trigger
- [ ] Send email after successful payment
- [ ] To: support@miamiyachting.com
- [ ] Subject: "New Order #[ID] - [Customer Name]"
- [ ] Error handling (log failures to Sentry)
- [ ] Retry logic (3 attempts)

**Deliverable:** Automated email notifications working

---

## 📋 Phase 1F: Order Confirmation Page (Day 4)

**Goal:** Beautiful confirmation page after purchase

### 1F.1 Confirmation Page Design
- [ ] Clean, celebratory design
- [ ] "Order Confirmed!" headline
- [ ] Order number prominently displayed
- [ ] Order summary with all details
- [ ] Confirmation email sent message

### 1F.2 Jet Ski License Reminder (if applicable)
- [ ] Prominent warning box:
  - "⚠️ IMPORTANT: Born after Jan 1, 1988?"
  - "You need a Florida boating license!"
  - Link to https://checkinmyc.com/PWCLicense
  - "Must complete BEFORE rental date"
- [ ] Only show if jet ski in order

### 1F.3 Next Steps Section
- [ ] What happens next
- [ ] Timeline expectations
- [ ] Contact information
- [ ] Link to return to homepage

**Deliverable:** Professional order confirmation experience

---

## 📋 Phase 2: Stripe Integration (Days 5-6)

**Goal:** Real payment processing with 3DS

### 2.1 Stripe Setup (Test Mode First)
- [ ] Install @stripe/stripe-js and @stripe/react-stripe-js
- [ ] Create Stripe account (or use existing)
- [ ] Get API keys (test + production)
- [ ] Add to Vercel environment variables
- [ ] Webhook endpoint setup

### 2.2 Payment Intent API
- [ ] `/api/stripe/create-payment-intent` endpoint
- [ ] Calculate amount server-side (security)
- [ ] Attach metadata (customer, yacht, add-ons)
- [ ] Return client secret
- [ ] Handle errors gracefully

### 2.3 Payment Form
- [ ] Stripe Elements integration
- [ ] Card input component
- [ ] 3DS authentication flow (MANDATORY)
- [ ] Loading states during payment
- [ ] Success/error handling
- [ ] Payment confirmation screen

### 2.4 Metadata Structure
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

### 2.5 Webhook Handler
- [ ] `/api/stripe/webhook` endpoint
- [ ] Verify webhook signature
- [ ] Handle `payment_intent.succeeded`
- [ ] Handle `payment_intent.payment_failed`
- [ ] Log all events to Sentry
- [ ] Send confirmation email (future phase)

**Deliverable:** Fully functional payment system with 3DS, metadata tracking

---

## 📋 Phase 3: Order Database & Storage (Day 6-7)

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
