# Full Reservation System + CRM Roadmap
## (FareHarbor Replacement with Customer Loyalty)

**Status:** Future project (after standalone e-commerce complete)  
**Timeline:** 6 weeks  
**Priority:** Phase 2

---

## 🎯 Project Goals

Replace FareHarbor with custom reservation system that includes:
- Everything FareHarbor does
- Customer relationship management (CRM)
- Membership tiers (Gold, Platinum, VIP)
- Loyalty points system
- Purchase history tracking
- Smart conditional add-on upsells
- Better team dashboard

---

## 📊 Airtable Structure (6 Tables)

### **Table 1: Customers** (CRM)
```
- Customer ID (auto-number)
- Name
- Email
- Phone
- Member Since (date)
- Membership Tier (select: None, Gold, Platinum, VIP)
- Membership Number (auto-generated: MYC-00001)
- Points Balance (number)
- Total Lifetime Spend (currency, formula)
- Total Bookings (number, rollup)
- Last Booking Date (date, rollup)
- Tags (multi-select: Repeat Customer, VIP, Corporate, Influencer)
- Internal Notes (long text)
- Marketing Opt-in (checkbox)
- Created Date
- Updated Date
```

### **Table 2: Bookings**
```
- Booking ID (auto-number: #333445242 format)
- Customer ID (link to Customers)
- Yacht Code (link to Yachts)
- Booking Created (datetime)
- Charter Date (date)
- Charter Time (time)
- Duration (number, hours)
- Guest Count (number)
- Base Yacht Price (currency)
- Add-ons Selected (link to Add-ons, multiple)
- Add-ons Total (currency, rollup)
- Crew Gratuity Amount (currency)
- Crew Gratuity % (select: 15%, 18%, 20%, Custom)
- Subtotal (currency, formula)
- Taxes (currency, formula)
- Grand Total (currency, formula)
- Amount Paid (currency)
- Amount Due (currency, formula)
- Payment Status (select: Pending, Partial, Paid, Refunded)
- Payment Method (select: Stripe, Cash, Check, Wire)
- Stripe Payment ID (text)
- Booking Source (select: Website, Phone, Email, Walk-in, Affiliate)
- Check-in Status (select: Not Checked In, Checked In, No Show)
- Waiver Signed (checkbox)
- Waiver Signature URL (URL)
- Order Notes (long text)
- Internal Notes (long text)
- Captain Name (text)
- Mate Name (text)
- Crew Wages (currency)
- Affiliate Name (text)
- Promo Code (text)
- Discount Amount (currency)
- Status (select: Pending, Confirmed, Completed, Cancelled, Refunded)
- Confirmation Email Sent (checkbox)
- Reminder Email Sent (checkbox)
- Created By (text: online customer, admin name, etc.)
```

### **Table 3: Yachts**
```
- Yacht Code (text, primary)
- Name
- Length (number, ft)
- Guest Capacity (number)
- Base Hourly Rate (currency)
- Yacht Charter Add-ons (multi-select)
  - Options: Jet Ski, FlyBoard, SeaBob, Catering, Water Toys, 
             Bachelorette, Flowers, Bespoke Services
- Photos (text: comma-separated Supabase URLs)
- Description (long text)
- Amenities (long text)
- Location (select: Miami Beach, Fort Lauderdale, etc.)
- Status (select: Available, Maintenance, Retired)
- Blackout Dates (JSON or linked table)
- Holiday Pricing Rules (JSON)
```

### **Table 4: Add-ons**
```
- Add-on ID (text, primary)
- Name
- Category (select: Jet Ski, Catering, Water Toys, Flowers, Bachelorette, Bespoke)
- Price (currency)
- Description (long text)
- Photo URL (URL)
- Active (checkbox)
- Sort Order (number)
```

### **Table 5: Membership Tiers**
```
- Tier Name (text: None, Gold, Platinum, VIP)
- Minimum Lifetime Spend (currency)
- Points Multiplier (number: 1, 1.5, 2)
- Discount Percentage (number: 0, 5, 10, 15)
- Perks (long text)
- Badge Color (text: #c4a265, #e5e5e5, etc.)
```

### **Table 6: Points Transactions**
```
- Transaction ID (auto-number)
- Customer ID (link to Customers)
- Booking ID (link to Bookings)
- Points Change (number, can be negative)
- Transaction Type (select: Earned, Redeemed, Adjusted, Bonus)
- Date (datetime)
- Notes (text)
- Created By (text)
```

---

## 💎 Membership & Loyalty System

### **Automatic Tier Assignment:**
Based on lifetime spend:
- **None:** $0 - $4,999
- **Gold:** $5,000 - $14,999
- **Platinum:** $15,000 - $49,999
- **VIP:** $50,000+

### **Points System:**
- **Earn:** $1 spent = 1 point
  - Gold: 1x multiplier
  - Platinum: 1.5x multiplier
  - VIP: 2x multiplier
- **Redeem:** 1000 points = $100 discount on next booking

### **Tier Benefits:**

**Gold:**
- 5% discount on all bookings
- Priority booking (24hr early access to new yachts)
- Birthday bonus: 500 points

**Platinum:**
- 10% discount on all bookings
- Free upgrade when available
- Complimentary champagne bottle
- Dedicated booking specialist
- Birthday bonus: 1000 points

**VIP:**
- 15% discount on all bookings
- Guaranteed free upgrade
- Complimentary premium bar package
- 24/7 concierge service
- Early access to exclusive events
- Private yacht previews
- Birthday bonus: 2000 points

---

## 🚀 Development Roadmap (6 Weeks)

### **Week 1: Customer Portal & Booking Flow**
- [ ] Customer signup/login (NextAuth)
- [ ] Browse yachts (filtered, sorted)
- [ ] Yacht detail pages with calendar
- [ ] Date/time/duration picker
- [ ] Guest count selector
- [ ] Dynamic pricing display
- [ ] Contact information form
- [ ] Customer profile creation

### **Week 2: Smart Add-on Upsells & Payment**
- [ ] Read yacht eligibility from Airtable
- [ ] Show conditional add-ons during booking
- [ ] Add-on selection interface
- [ ] Crew gratuity calculator (15%, 18%, 20%, custom)
- [ ] Promo code system
- [ ] Membership discount auto-apply
- [ ] Stripe payment integration (3DS)
- [ ] Payment confirmation page

### **Week 3: Admin Dashboard (FareHarbor Replacement)**
- [ ] Admin authentication
- [ ] Booking list view (sortable, filterable)
- [ ] Customer list view
- [ ] Booking detail page (like FareHarbor screenshot)
- [ ] Edit booking
- [ ] Add payment
- [ ] Process refund
- [ ] Check-in system
- [ ] Waiver management
- [ ] Order notes
- [ ] Email/text notifications

### **Week 4: CRM Features**
- [ ] Customer profile page
- [ ] Booking history per customer
- [ ] Lifetime value tracking
- [ ] Automatic tier assignment
- [ ] Points balance display
- [ ] Points transaction history
- [ ] Membership badge/status display
- [ ] VIP flagging
- [ ] Customer tags
- [ ] Internal notes

### **Week 5: Advanced Features**
- [ ] Calendar with blackout dates
- [ ] Holiday pricing engine
- [ ] Future rate increases
- [ ] Crew management dashboard
- [ ] Gratuity tracking & reporting
- [ ] Affiliate tracking
- [ ] Revenue reports
- [ ] Booking analytics
- [ ] Customer retention metrics

### **Week 6: Migration & Polish**
- [ ] Import FareHarbor customer data
- [ ] Import FareHarbor booking history
- [ ] Calculate lifetime values for existing customers
- [ ] Assign tiers to existing customers
- [ ] Team training documentation
- [ ] Video tutorials
- [ ] Soft launch (limited users)
- [ ] Bug fixes
- [ ] Full migration
- [ ] Deactivate FareHarbor

---

## 🔧 Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

**Backend:**
- Next.js API routes
- Airtable (database)
- Supabase (file storage)

**Auth:**
- NextAuth.js (customer + admin)

**Payment:**
- Stripe (3DS mandatory)

**Calendar:**
- react-day-picker or FullCalendar

**Notifications:**
- Resend or SendGrid (email)
- Twilio (SMS)

---

## 🎨 Design Principles

**Customer-Facing:**
- Editorial high-end luxury aesthetic
- Minimalist, clean interfaces
- Mobile-first responsive
- Fast load times
- Smooth animations

**Admin Dashboard:**
- Functional, efficient
- Information-dense but organized
- Quick actions (like FareHarbor)
- Keyboard shortcuts
- Bulk operations

---

## 📈 Success Metrics

- **Booking Completion Rate:** >70%
- **Average Booking Value:** Increase 20% (via add-on upsells)
- **Repeat Customer Rate:** >40%
- **VIP Tier Customers:** 10% of total
- **Admin Time per Booking:** <5 minutes

---

## 🚨 Critical Features (Must Have)

1. **Conditional add-on logic** - Only show eligible add-ons per yacht
2. **Customer history** - Full lifetime purchase tracking
3. **Automatic tier assignment** - Based on spend thresholds
4. **Digital waivers** - E-signature with storage
5. **Check-in system** - Track no-shows
6. **Refund handling** - Stripe refunds with audit trail

---

## 💰 FareHarbor Cost Savings

**FareHarbor Monthly:** ~$199/mo + 5.5% per transaction  
**Custom System:** $0/mo + 2.9% (Stripe only)

**At $50k/mo revenue:**
- FareHarbor: $199 + $2,750 = **$2,949/mo**
- Custom: $1,450/mo (Stripe only)
- **Savings: $1,499/mo = $17,988/year**

**ROI:** System pays for itself in ~4 months

---

## 🔄 Integration with E-commerce

**Standalone Add-ons Store (Phase 1):**
- Customers buy add-ons WITHOUT booking yacht
- Separate checkout
- Stripe payment
- Order confirmation

**Reservation System (Phase 2):**
- Customers book yacht THEN see add-on upsells
- Conditional based on yacht eligibility
- Combined checkout (yacht + add-ons)
- Single payment

**Post-Launch Integration:**
- Shared customer database
- Points earned on both platforms
- Unified membership status
- Combined purchase history

---

**Created:** 2026-02-26  
**Status:** Planning Complete - Ready When Phase 1 Complete  
**Priority:** Build standalone e-commerce FIRST, then this
