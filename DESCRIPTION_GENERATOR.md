# Auto-Generated Description System

## Purpose
Automatically generate SEO-optimized, legally compliant descriptions for yachts and products when added to Airtable.

---

## Yacht Description Generator

### Required Airtable Fields
```
Input Fields:
├── Yacht ID (e.g., "37-Axopar")
├── Boat Name (e.g., "37 ft Axopar")
├── Brand (e.g., "Axopar")
├── Model (e.g., "37 Sun Top")
├── Length in Feet (e.g., 37)
├── Boat Style (e.g., "Day Boat")
├── Maximum Passengers (e.g., 12)
├── Main Departure Location (e.g., "Miami Beach")
├── Features (array: e.g., ["Air Conditioning", "Jacuzzi", "Wet Bar"])
├── Toys (array: e.g., ["Inflatables", "Jet Ski"])
├── Amenities (array: e.g., ["Kitchen", "BBQ Grill"])
├── Sound System Type (e.g., "Premium Bluetooth")
├── Number of Staterooms (number)
├── Number of Bathrooms (number)

Use Case Checkboxes (only mention if TRUE):
├── Corporate Events (checkbox)
├── Birthday Celebrations (checkbox)
├── Bachelorette Parties (checkbox)
├── Proposals (checkbox)
├── Anniversaries (checkbox)
├── Family Outings (checkbox)

Output Fields:
├── Short Description (auto-generated, editable)
├── Full Description (auto-generated, editable)
```

---

### Short Description Template (Fleet Listing)

**Formula:**
```
"A [length]-foot [brand] [boat style] featuring [1-2 standout features]. Available for charter in [departure location]."
```

**Examples:**

Input:
- 37 ft Axopar, Day Boat, Sun Top + Spacious Layout, Miami Beach

Output:
> "A 37-foot Axopar day boat featuring a sun top and spacious open layout. Available for charter in Miami Beach."

---

Input:
- 116 ft Pershing, Superyacht, 3 Staterooms + Jacuzzi, Miami

Output:
> "A 116-foot Pershing superyacht featuring three staterooms and a jacuzzi on the flybridge. Available for charter in Miami."

---

### Full Description Template (Detail Page)

**Structure:**
```
PARAGRAPH 1: Vessel Introduction & Specs
PARAGRAPH 2: Onboard Features & Amenities  
PARAGRAPH 3: Booking & Availability
PARAGRAPH 4 (conditional): Use Cases (only if checkboxes are TRUE)
```

**Paragraph 1 - Vessel Introduction:**
```
"The [length]-foot [brand] [model] is a [boat style] designed for [comfort/performance/luxury]. This vessel features [manufacturer highlights]. The yacht accommodates up to [max passengers] guests and is available for charter departing from [location]."
```

**Paragraph 2 - Onboard Features:**
```
"Onboard, guests will find [amenities list]. The vessel is equipped with [features list], [sound system type], and [toys if applicable]. [Staterooms/bathrooms if applicable]."
```

**Paragraph 3 - Booking:**
```
"Available for 2 to 8 hour charters in the Miami area. Contact us to discuss availability and customize your charter experience."
```

**Paragraph 4 - Use Cases (ONLY if checkboxes are TRUE):**
```
IF corporate events = TRUE:
"Popular choice for corporate outings and business events on the water."

IF birthday/anniversary = TRUE:
"Ideal for celebrating birthdays and anniversaries with family and friends."

IF bachelorette = TRUE:
"A favorite for bachelorette celebrations and special occasions."
```

**Full Example:**

Input:
- 37 ft Axopar, Day Boat, 12 guests, Miami Beach
- Features: Sun Top, Swim Platform
- Amenities: Premium Sound System, Comfortable Seating
- Use Cases: Birthday ✓, Family Outings ✓

Output:
> "The 37-foot Axopar Sun Top is a modern Scandinavian day boat designed for comfort and performance. This vessel features a spacious open layout with comfortable seating, a retractable sun top for shade, and a swim platform for easy water access. The yacht accommodates up to 12 guests and is available for charter departing from Miami Beach.
>
> Onboard, guests will find a premium Bluetooth sound system and comfortable cushioned seating throughout. The vessel is equipped with modern navigation and safety equipment, ensuring a smooth experience on Biscayne Bay and surrounding waters.
>
> Available for 2 to 8 hour charters in the Miami area. Contact us to discuss availability and customize your charter experience.
>
> Popular choice for birthday celebrations and family outings on the water."

---

## Product Description Generator

### Catering Products

**Template:**
```
"[Made fresh/Prepared fresh] [food description]. Serves [size range] guests [optional quality note]. [Optional: Popular choice for yacht charters]."
```

**Examples:**

Input: Gourmet Wraps Platter, Serves 8-25

Output:
> "Made fresh to order with premium ingredients, includes lettuce and tomato. Serves 8 to 25 guests depending on platter size. A popular choice for yacht charters and special events."

---

Input: Shrimp Platter, Serves 10-15

Output:
> "Fresh jumbo shrimp served with cocktail sauce and lemon. Serves 10 to 15 guests. Perfect for seafood lovers aboard your charter."

---

### Water Toys Products

**Template:**
```
"[Product type description]. [Key feature/benefit]. [Usage details]. [Lead time if applicable]."
```

**Examples:**

Input: Seabob, $499, 48hr notice

Output:
> "Luxury underwater jet ski allowing riders to glide on the surface or dive below. Batteries last 1 to 2 hours depending on riding style. Recommended for ages 12 and up. Requires 48 hours advance notice."

---

Input: Floating Cabana, $349

Output:
> "Spacious floating cabana offering plush seating and ample space for relaxation. Perfect for sunbathing or enjoying refreshments on the water. Rental includes delivery and setup. Requires 48 hours advance notice."

---

### Flower Products

**Template:**
```
"[Arrangement style] featuring [flower types]. Hand selected for [quality notes]. [Optional occasion note]."
```

**Examples:**

Input: Rose Pave, Roses

Output:
> "Elegant arrangement featuring premium roses in a classic pave style. Hand selected for beauty and lasting freshness. Perfect for romantic occasions aboard your charter."

---

Input: Tropical Paradise, Mixed tropical flowers

Output:
> "Vibrant tropical arrangement featuring orchids, birds of paradise, and exotic blooms. Hand selected for beauty and fragrance. Ideal for celebrations on the water."

---

## SEO Keyword Integration

**Every yacht description must include:**
- "Miami yacht charter" OR "charter in Miami"
- Vessel type (day boat, luxury yacht, superyacht)
- Location (Miami Beach, Biscayne Bay, Miami)
- Length + brand (37-foot Axopar)

**Natural Integration Examples:**

✅ Good: "Available for charter in Miami Beach"
✅ Good: "37-foot Axopar day boat for Miami yacht charters"
✅ Good: "Luxury yacht charter on Biscayne Bay"

❌ Bad: "Miami yacht charter boat rental Miami Beach charter"
❌ Bad: Keyword stuffing

---

## Compliance Rules (Applied Automatically)

**Auto-Enforced:**
- ✅ No mention of crew/captain/staff
- ✅ Only vessel features described
- ✅ No promises about included services
- ✅ Use cases only if Airtable checkbox = TRUE
- ✅ No banned words (elevate, pinnacle, epitome, new level)
- ✅ No dashes in text
- ✅ Regional keywords included

**Team Can Override:**
All auto-generated descriptions can be manually edited in Airtable after generation.

---

## Implementation

**When new yacht/product added to Airtable:**
1. Bot detects new record
2. Reads all input fields
3. Generates short + long descriptions using templates above
4. Writes to "Short Description" and "Full Description" fields
5. Team can edit if needed
6. Website pulls descriptions via API (15-min cache)

**Fallback:**
If auto-generation fails, descriptions remain empty and team fills manually.
