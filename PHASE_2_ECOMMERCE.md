# Phase 2: E-Commerce Store

## Overview
Building add-ons e-commerce store with shopping cart, custom forms, and Stripe integration (placeholder for now).

## URL Structure
- `/add-ons` - Main landing page with 4 category tiles
- `/add-ons/catering` - Catering menu
- `/add-ons/water-toys` - Water sports rentals
- `/add-ons/flowers` - Flower arrangements
- `/add-ons/bachelorette-packages` - Bachelorette party packages

## Features Required

### Shopping Cart
- Global state management (Context API or Zustand)
- Persistent cart (localStorage)
- Add/remove/update quantity
- Cart icon in navigation with item count
- Cart sidebar/modal

### Product Pages
- High-res product images (from Squarespace scrape or manual upload)
- Pricing
- Description
- Add to cart button
- Min quantity restrictions (catering: 2, floating chair: 2)
- Max quantity restrictions (Jet Ski: 2, SeaBob: 2, Flight Scooter: 1)

### Custom Forms

#### 1. Catering Customization Form
- Dish-specific customization options
- Special dietary requirements
- Delivery time preferences

#### 2. Water Sports Liability Waiver
- Required for Jet Ski, SeaBob, Flight Scooter
- Legal waiver text
- Signature capture or checkbox agreement
- Must complete before adding to cart

#### 3. Charter Details Form (Checkout)
- Yacht charter booking date
- Booking reference number
- Validates against existing reservations
- Required at checkout

### Inventory Rules
- **Infinite:** All catering, flowers, bachelorette packages
- **Limited per charter:**
  - Jet Ski: max 2
  - SeaBob: max 2
  - Flight Scooter: max 1
- **Minimum orders:**
  - Catering platters: min 2
  - Floating lounge chair: min 2

### Design Standards
- Follow `DESIGN_STANDARDS.md`
- Minimalist, modern, editorial
- Ultra-modern luxury vibe
- Light colors (#faf9f7 background, #c4a265 accents)
- Cormorant Garamond + Inter fonts
- Consistent with yacht charter pages

## Data Sources
- [ ] Scrape Squarespace stores (blocked - need manual export)
- [ ] Get highest resolution images
- [ ] Extract product data:
  - Name
  - Description
  - Price
  - Images
  - Customization options
  - Min/max quantities

## Implementation Steps

### Phase 2.1: Structure
1. Create page routes
2. Set up shopping cart context
3. Build main add-ons landing page
4. Create product listing components

### Phase 2.2: Products
1. Import product data
2. Optimize images
3. Build product detail views
4. Implement add-to-cart logic

### Phase 2.3: Forms
1. Catering customization form
2. Water sports waiver
3. Charter details form
4. Form validation

### Phase 2.4: Cart & Checkout
1. Cart UI (sidebar/modal)
2. Checkout flow
3. Stripe integration (placeholder)
4. Order confirmation

## Next Actions
1. Get product data from Squarespace (manual export or screenshots)
2. Download high-res product images
3. Begin building page structure
