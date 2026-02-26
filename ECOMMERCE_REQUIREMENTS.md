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

## 📝 **Waiver Forms Required**

### **1. Jet Ski Acknowledgements**
**Products:** All jet ski rentals

**Important:** This waiver must be completed BEFORE payment is processed.

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

**Flow:**
1. Customer clicks "Add to Cart" on jet ski product
2. Waiver modal opens (MUST complete before adding to cart)
3. Customer checks all boxes
4. Customer types name (electronic signature)
5. THEN item adds to cart
6. At checkout, waiver data is emailed to support@miamiyachting.com

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
