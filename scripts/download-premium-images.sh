#!/bin/bash
# Download premium add-ons images

DEST_DIR="/root/clawd/yacht-charter-platform/public/images/premium-addons"
mkdir -p "$DEST_DIR"

echo "📸 Downloading premium add-ons images..."

# Water toys / Jet ski
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1616100764204-85WEJ6WZ3K77C506AZNH/jetski.jpg?format=2500w" -o "$DEST_DIR/Miami_Yachting_Company_premium_watersports.jpg"
echo "✓ Water sports"

# Flowers/Floral
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1719481692050-PHB02D792QCT23WGOCWG/image-asset.jpeg?format=2500w" -o "$DEST_DIR/Miami_Yachting_Company_premium_florals.jpg"
echo "✓ Florals"

# Premium alcohol/bottles
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1719481747615-H1PA0BF5SG043GPG2FJX/image-asset.jpeg?format=2500w" -o "$DEST_DIR/Miami_Yachting_Company_premium_alcohol.jpg"
echo "✓ Premium alcohol"

# Luxury transportation
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1721395387981-TS1SJ6YKIL4R0N6BJ833/Miami_Yachting_Company_luxury_transport_vehicle_options1.jpg?format=2500w" -o "$DEST_DIR/Miami_Yachting_Company_luxury_transport.jpg"
echo "✓ Luxury transport"

# Hero image
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1759748042876-7O78E4GCMBROGWHG32NQ/unsplash-image-h2_OMqGcAHU.jpg?format=2500w" -o "$DEST_DIR/Miami_Yachting_Company_premium_hero.jpg"
echo "✓ Hero image"

echo ""
echo "✅ Downloaded 5 premium images"
echo "📁 Location: $DEST_DIR"
