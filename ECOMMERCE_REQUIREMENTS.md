# E-commerce Customization & Waiver Requirements

**Status:** Ready to implement  
**Priority:** Phase 1 (Standalone e-commerce)  
**Email notifications:** support@miamiyachting.com

---

## 🎨 **Customization Forms Required**

### **1. Cake Customization**
**Product:** Celebration cakes

**Fields:**
- **Cake flavor** (radio buttons, required)
  - Vanilla
  - Chocolate
  
- **Custom cake message** (textarea, optional)
  - Max 50 characters
  - Placeholder: "e.g. 'Happy Birthday!'"
  
- **Special allergy requests or omissions** (textarea, optional)
  - Placeholder: "Input any allergy concerns for your order or items"

**Trigger:** Modal opens when "Add to Cart" clicked

---

### **2. Custom Charcuterie Box**
**Product:** Build-your-own charcuterie

**Fields (all required, dropdowns):**
- **Charcuterie Meat #1**
  - Prosciutto
  - Salami
  - Chorizo
  - Etc.
  
- **Charcuterie Meat #2**
  - (Same options)
  
- **Artisan Cheese #1**
  - Brie
  - Gouda
  - Mozzarella
  - Cheddar
  - Etc.
  
- **Artisan Cheese #2**
  - (Same options)
  
- **Fruit #1**
  - Grapes
  - Strawberries
  - Figs
  - Etc.
  
- **Fruit #2**
  - (Same options)
  
- **Accompaniment #1**
  - Crackers
  - Nuts
  - Honey
  - Etc.
  
- **Accompaniment #2**
  - (Same options)

**Trigger:** Modal opens when "Add to Cart" clicked

---

### **3. Meat Dipping Sauces**
**Products:** Wings, tenders, any meat items

**Fields:**
- **Select your dipping sauce** (dropdown, required)
  - Sweet Sriracha
  - Spicy Gold
  - BBQ
  - Blue Cheese
  - Ranch
  - Honey Mustard

**Trigger:** Modal opens when "Add to Cart" clicked for applicable items

---

### **4. Deli Sandwich Options**
**Product:** Deli sandwich platters

**Fields:**

- **Meat** (checkboxes, required)
  - Instructions: "Select up to 2 meats for serving sizes up to 10. Select up to 3 meats for serving sizes over 10."
  - Options:
    - Turkey
    - Roast Beef
    - Ham
    - Ultimate (Ham, Turkey and Roast Beef)
    - Italian
    - Veggie Only

- **Bread** (checkboxes, required)
  - Instructions: "Select up to 2 breads."
  - Options:
    - White
    - 5 Grain Italian

- **Cheese** (checkboxes, required)
  - Instructions: "Select up to 2 cheeses for serving sizes up to 10. Select up to 3 cheeses for serving sizes over 10."
  - Options:
    - American yellow
    - American white
    - Swiss
    - Cheddar
    - Provolone
    - Muenster
    - No cheese

**Trigger:** Modal opens when "Add to Cart" clicked

---

## 🛒 **UPDATED FLOW: Customizations BEFORE cart, Waivers BEFORE payment**

**DECISION: Keep friction minimal but collect info when needed**

### **Customization Forms (BEFORE adding to cart):**
- Modal appears when clicking "Add to Cart" on customizable items
- Customer fills out customization
- THEN item + customization added to cart
- Clean, editorial luxury modal design

### **Waiver Forms (BEFORE payment, during checkout):**
- Customer proceeds to checkout
- Sees order summary
- **IF order contains waiver items** → Waiver section appears inline on checkout page
- Complete waiver acknowledgements
- THEN proceed to payment
- **Exception: Jet ski license check happens AFTER payment** (to reduce friction)

---

## 📝 **Waiver Forms Required**

---

### **1. Water Sports Toy Acknowledgement**
**Products:** SeaBob, Flitescooter (only these two)

**When:** AFTER payment is processed

**Fields:**

**Name (required):**
- First Name (text input)
- Last Name (text input)

**All checkboxes (required):**

1. **Cancellation Policy**
   - "I understand this item is special ordered and delivered to my rental yacht, because of the custom nature of this delivery, 48 hours cancellation notice prior to my rental date is required for a refund. If I cancel less than 48 hours from my rental date, the rental vendor may charge a $100.00 cancelation fee per item."

2. **Damage Deposit**
   - "I understand this rental item is provided by a 3rd party independent vendor who may charge a damage security deposit to rent this item. Damage security deposits are refunded at the end of the rental if myself or my guests do not damage the rental item. Normal wear and minor scratches do not constitute damage. Refusal to pay the vendor's required damage security deposit prior to usage may result in forfeiture of rental time and cancellation of the rental without refund."

3. **Experience Acknowledgement**
   - "I understand that the usage of this item requires some limited knowledge. I understand there may be a level of physicality required on my part when using this rental item. Not being able to 'stay on' the rental item does not constitute grounds for a refund."

4. **Liability Acknowledgement**
   - "I understand that if myself or one of my guests cause damage to the charter vessel with the rental item, I will be charged for the repairs to the charter vessel. Furthermore, I understand that the yacht crew is not responsible for the safekeeping of this item or for the instructions on how to use the item. I am renting this item from a 3rd party vendor that is unrelated to my charter vessel or its crew."

5. **Card and Charge Authorization**
   - "I authorize Miami Yachting Group LLC to charge my credit/debit card in the amount shown for this booking. I will bring this card with me in person the day of my rental for verification as well as my matching ID. I understand that if I do not bring this card with me in person and my matching ID for verification purposes, my rental may be canceled by the vendor."

6. **Rental Price**
   - "I understand the price of the rental is $499.99 per item and that my initial payment of $99.00 per item will be deducted from my final balance, leaving me with a total due of $400.00 per item which is payable directly to the water toy vendor."

**Flow:**
1. Customer adds SeaBob or Flitescooter to cart
2. Brief disclaimer shown: "This item requires waiver signature after checkout"
3. Proceed through checkout → Payment
4. **AFTER payment successful** → Waiver screen appears
5. Customer checks all 6 boxes
6. Customer types full name (electronic signature)
7. Click "Complete Booking"
8. Waiver data emailed to support@miamiyachting.com
9. Show final confirmation: "Congratulations! Your booking has been processed."

---

### **2. 3rd Party Vendor Toy Add-On**
**Products:** Floating Cabana, Floating Lounge Chairs (only these two)

**When:** AFTER payment is processed

**Fields:**

**No name fields required** - Checkboxes only

**All checkboxes (required):**

1. **Cancellation Policy**
   - "I understand this item is special ordered and delivered to my rental yacht, because of the custom nature of this delivery, 48 hours cancellation notice prior to my rental date is required for a refund. If I cancel less than 48 hours from my rental date, the rental vendor may charge a $100.00 cancelation fee per item."

2. **Damage Deposit**
   - "I understand this rental item is provided by a 3rd party independent vendor who may charge a damage security deposit to rent this item. Damage security deposits are refunded at the end of the rental if myself or my guests do not damage the rental item. Normal wear and minor scratches do not constitute damage. Refusal to pay the vendor's required damage security deposit prior to usage may result in forfeiture of rental time and cancellation of the rental without refund."

3. **Liability Acknowledgement**
   - "I understand that if myself or one of my guests cause damage to the rental item, I will be charged for the repairs to the item. Furthermore, I understand that the yacht crew is not responsible for the safekeeping of this item or for the instructions on how to use the item. I am renting this item from a 3rd party vendor that is unrelated to my charter vessel or its crew."

4. **Card and Charge Authorization**
   - "I authorize Miami Yachting Group LLC to charge my credit/debit card in the amount shown for this booking. I will bring this card with me in person the day of my rental for verification as well as my matching ID. I understand that if I do not bring this card with me in person and my matching ID for verification purposes, my rental may be canceled by the vendor. I authorize Miami Yachting Group LLC to charge my credit/debit card in the amount shown for this booking. I will bring this card with me in person the day of my rental for verification as well as my matching ID. I understand that if I do not bring this card with me in person and my matching ID for verification purposes, my rental may be canceled by the vendor."

**Flow:**
1. Customer adds Floating Cabana or Floating Lounge Chairs to cart
2. Brief disclaimer shown: "This item requires waiver signature after checkout"
3. Proceed through checkout → Payment
4. **AFTER payment successful** → Waiver screen appears
5. Customer checks all 4 boxes (NO name required)
6. Click "Complete Booking"
7. Waiver data emailed to support@miamiyachting.com
8. Show final confirmation: "Congratulations! Your booking has been processed."

---

### **3. Jet Ski Acknowledgements**
**Products:** All jet ski rentals

**When:** AFTER payment is processed

**Florida Boating License Requirement (Critical):**
- Anyone born AFTER January 1, 1988 MUST complete boating license to operate jet ski
- Quick 10-minute online course: https://checkinmyc.com/PWCLicense
- **State law:** Anyone else in group who drives jet ski MUST also meet birthday requirement or have license
- Booking NOT complete until license requirement addressed

**Fields (all checkboxes, all required):**

1. **Florida jet ski laws acknowledgement**
   - "I confirm that I have reviewed Florida jet ski laws and minimum age requirements for operating a jet ski in Miami Dade County using the links provided. If I do not meet the requirements to operate without a boating license, I agree to complete the required course before my rental. I am responsible for ensuring that all members of my group who operate the jet skis meet these requirements. Miami Yachting Group LLC is not responsible for any lost rental time if these requirements are not satisfied."

2. **Damage security deposit**
   - "I understand that jet skis are provided by an independent third party vendor who requires a damage security deposit at the time of delivery. The jet ski vendor will refund the deposit at the end of the rental if no damage occurs. Failure or refusal to pay the vendor's required deposit, as determined by the jet ski vendor, may result in cancellation of jet ski usage and forfeiture of rental time without refund."

3. **Damage to the vessel by jet skis**
   - "I understand that I am responsible for any damage caused by myself or my guests to the charter vessel or any related equipment or accessories resulting from jet ski use, and I agree to cover the cost of repairs."

4. **Maximum quantity of jet skis allowed**
   - "I understand that a maximum of two jet skis are permitted at any vessel at any time."

5. **Jet ski appointments**
   - "I understand that jet skis are scheduled through an independent third party vendor on an appointment only basis. If I or any member of my group arrives late to the charter vessel's scheduled departure time, jet ski usage time may be reduced or forfeited. Jet ski time cannot be rescheduled and any lost time due to late arrival will not be refunded."

6. **Credit card and ID acknowledgement**
   - "I authorize Miami Yachting Group LLC to charge my credit or debit card for the amount shown for this booking. I understand that I must present this card in person on the day of the rental along with matching government issued identification for verification. Failure to present the required card and identification may result in cancellation of jet ski usage by the vendor without refund."

7. **Third Party Vendor Disclosure and Liability Acknowledgement**
   - "Jet skis are provided, operated, and supervised by an independent third party vendor, not by the yacht owner or the yacht charter brokerage. The jet ski rental is a separate service subject to the jet ski vendor's own rules, licenses, permits, and requirements. The yacht owner and charter brokerage do not operate, supervise, or control jet ski use. I acknowledge that jet ski activities involve inherent risks and I choose to use the jet ski vendor's services at my own discretion and responsibility. I agree to release and hold harmless the yacht owner, the yacht charter brokerage, and Miami Yachting Group LLC from any claims arising out of or related to jet ski use. By submitting this form and typing my name below, I agree that this acknowledgement is legally binding and constitutes my electronic signature."

**Name fields:**
- First Name (text input, required)
- Last Name (text input, required)

**Birthday Check (NEW):**
- Radio buttons (required):
  - "I was born BEFORE January 1, 1988" (no license needed)
  - "I was born AFTER January 1, 1988" (license required)

**Flow:**
1. Customer adds jet ski to cart
2. Brief disclaimer shown: "Jet skis require waiver signature and possible boating license after checkout"
3. Proceed through checkout → Payment
4. **AFTER payment successful** → Waiver screen appears
5. Customer checks all 7 boxes
6. Customer types full name (electronic signature)
7. **Customer selects birthday radio button**
8. Click "Complete Booking"

**IF born AFTER Jan 1, 1988:**
9. **NEW SCREEN APPEARS** (blocking):
   - "⚠️ Your booking is not complete!"
   - "Florida state law requires a boating license to operate a jet ski if you were born after January 1, 1988."
   - "Complete your online boating course now (takes just 10 minutes):"
   - **LINK:** https://checkinmyc.com/PWCLicense
   - **IMPORTANT:** If anyone else in your group will drive the jet ski, they must also:
     - Be born before Jan 1, 1988, OR
     - Complete the boating license course
   - Button: "I've completed my license" → Final confirmation

**IF born BEFORE Jan 1, 1988:**
9. Skip license screen → Go directly to final confirmation

10. Waiver + birthday data emailed to support@miamiyachting.com
11. Show final confirmation: "Congratulations! Your booking has been processed."

---

## 📧 **Email Notification Requirements**

### **When order is placed:**

**To:** support@miamiyachting.com  
**Subject:** New Order #[ORDER_ID] - [Customer Name]

**Email should include:**

1. **Order Details:**
   - Order ID
   - Date/Time
   - Customer name, email, phone
   - Total amount paid
   - Payment method (Stripe payment ID)

2. **Items Ordered:**
   - Product name
   - Quantity
   - Price
   - **Customization details (if applicable)**
     - Cake: Flavor, message, allergy notes
     - Charcuterie: All selections
     - Dipping sauce: Selected sauce
     - Sandwiches: Meat, bread, cheese selections

3. **Waiver Data (if jet ski ordered):**
   - All acknowledgements confirmed (checkmarks)
   - Customer name (electronic signature)
   - Timestamp of waiver completion

4. **Delivery/Special Instructions:**
   - Any notes from customer

5. **Jet Ski License Reminder (if jet ski ordered):**
   - ⚠️ **IMPORTANT FOR JET SKI RENTERS:**
   - Born after January 1, 1988? You need a boating license!
   - Complete your required Florida Boater Safety Course:
   - **https://checkinmyc.com/PWCLicense**
   - Must complete BEFORE rental date

**Format:** Clean, readable HTML email

---

## 🗄️ **Data Storage (Airtable)**

### **Orders Table - Add Fields:**

- **Customization Data** (long text, JSON format)
  ```json
  {
    "item_id": "cake-001",
    "customizations": {
      "flavor": "Chocolate",
      "message": "Happy 30th Birthday!",
      "allergy_notes": "No nuts please"
    }
  }
  ```

- **Waiver Signed** (checkbox)
- **Waiver Data** (long text, JSON format)
  ```json
  {
    "waiver_type": "jet_ski",
    "signed_date": "2026-02-26T13:36:00Z",
    "signature_name": "John Smith",
    "acknowledgements": {
      "florida_laws": true,
      "security_deposit": true,
      "vessel_damage": true,
      "max_quantity": true,
      "appointments": true,
      "credit_card_id": true,
      "liability_release": true
    }
  }
  ```

---

## 🎯 **Implementation Priority**

### **Phase 1A: Customization Forms (Days 1-2)**
1. Build customization modals:
   - Cake customization
   - Charcuterie builder
   - Dipping sauce selector
   - Sandwich builder
2. Update cart to store customization data
3. Display customizations in cart sidebar

### **Phase 1B: Jet Ski Waiver (Days 2-3)**
1. Build waiver modal
2. All checkboxes + name fields
3. Electronic signature validation
4. Block "Add to Cart" until waiver complete
5. Store waiver data with cart item

### **Phase 1C: Checkout & Email (Days 3-4)**
1. Build checkout page
2. Collect customer contact info
3. Email notification to support@miamiyachting.com
4. Include all customizations + waiver data
5. Order confirmation page

### **Phase 1D: Stripe Integration (Days 5-6)**
1. Add Stripe payment processing
2. 3DS authentication
3. Payment success → trigger email
4. Store order in Airtable

---

## ✅ **User Flows**

### **Flow A: Simple Product (No Customization)**
1. Click "Add to Cart"
2. Item added immediately
3. Cart opens with item
4. Continue shopping or checkout

### **Flow B: Customizable Product (Cake, Charcuterie, etc.)**
1. Click "Add to Cart"
2. **Customization modal opens**
3. Fill in required fields
4. Click "Add to Cart" in modal
5. Item + customizations added to cart
6. Cart opens with item showing customization details

### **Flow C: Jet Ski (Waiver Required)**
1. Click "Add to Cart"
2. **Waiver modal opens**
3. Read all statements
4. Check all 7 boxes
5. Type full name (electronic signature)
6. Click "I Agree & Add to Cart"
7. Item + waiver data added to cart
8. Cart opens with item

### **Flow D: Checkout**
1. Click "Proceed to Checkout"
2. Enter contact info (name, email, phone)
3. Review order summary (with all customizations displayed)
4. Enter payment info (Stripe)
5. Complete payment
6. **Email sent to support@miamiyachting.com**
7. Order confirmation page shown

---

**Created:** 2026-02-26  
**Status:** Ready to implement  
**Dependencies:** Cart foundation (complete ✅)
