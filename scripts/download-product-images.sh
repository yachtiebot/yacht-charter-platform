#!/bin/bash
# Download high-res product images from Squarespace

mkdir -p /root/clawd/yacht-charter-platform/public/images/products/{water-toys,catering,flowers,bachelorette}

# Flower images (found in HTML)
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1721239727413-EQ6YB30LCXLHVC8HJRNL/rose+pave.png?format=2500w" -o /root/clawd/yacht-charter-platform/public/images/products/flowers/rose-pave.png
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1721240115543-WCE5TMJS3M2MIRC30TZH/bloomingorchid.png?format=2500w" -o /root/clawd/yacht-charter-platform/public/images/products/flowers/blooming-orchid.png
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1721239899758-9R0MTQNI6G1M7QIM0FLB/tropical+paradise.png?format=2500w" -o /root/clawd/yacht-charter-platform/public/images/products/flowers/tropical-paradise.png
curl -s "https://images.squarespace-cdn.com/content/v1/6053bbf206cd5c56562321cc/1721242215309-AJQJO9W39L0EW8DIY814/dancingroses.png?format=2500w" -o /root/clawd/yacht-charter-platform/public/images/products/flowers/dancing-roses.png

echo "✓ Downloaded flower images"
echo "Next: Need to find water toy, catering, and bachelorette images from their product pages"
