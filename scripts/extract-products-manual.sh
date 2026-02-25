#!/bin/bash
# Manual product extraction using web_fetch data

cat > /root/clawd/yacht-charter-platform/scraped-data/products-extracted.json << 'EOF'
{
  "water-toys": [
    {
      "id": "seabob",
      "name": "Seabob",
      "price": 499,
      "depositPrice": 99,
      "description": "Ride on the surface or emerge under water with these luxury under water jet skis (SEABOBs). Easy to ride for young and old. Recommended age is 12+. Comes fully charged for usage, batteries last for approximately 1-2 hours depending on riders style. Charger also included.",
      "details": "48 hours notice required. Vendor collects remaining balance of $400 per Seabob prior to rental date. Rental duration is for the length of your entire charter.",
      "minQuantity": 1,
      "maxQuantity": 2,
      "options": ["1 Seabob Reservation", "2 Seabob Reservations"],
      "category": "water-toys",
      "requiresWaiver": true
    }
  ],
  "catering": [],
  "flowers": [],
  "bachelorette": []
}
EOF

echo "✓ Created products-extracted.json template"
echo "Now fetching remaining products..."
