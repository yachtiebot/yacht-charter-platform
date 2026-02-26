#!/bin/bash

# Script to lowercase all URL directories and update references

cd /root/clawd/yacht-charter-platform

echo "🔄 Renaming directories to lowercase..."

# Rename directories
mv app/Miami-Yacht-Charter-Add-Ons app/miami-yacht-charter-add-ons 2>/dev/null
mv app/Miami-Yacht-Charter-Bachelorette-Packages app/miami-yacht-charter-bachelorette-packages 2>/dev/null
mv app/Miami-Yacht-Charter-Catering app/miami-yacht-charter-catering 2>/dev/null
mv app/Miami-Yacht-Charter-Flowers app/miami-yacht-charter-flowers 2>/dev/null
mv app/Miami-Yacht-Charter-Water-Toys app/miami-yacht-charter-water-toys 2>/dev/null

echo "✅ Directories renamed"
echo ""
echo "🔄 Updating all href references..."

# Fix all href references in TSX files
find app components -name "*.tsx" -type f -exec sed -i '
  s|/Miami-Yacht-Charter-Add Ons|/miami-yacht-charter-add-ons|g
  s|/Miami-Yacht-Charter-Add-Ons|/miami-yacht-charter-add-ons|g
  s|/Miami-Yacht-Charter-Bachelorette-Packages|/miami-yacht-charter-bachelorette-packages|g
  s|/Miami-Yacht-Charter-Catering|/miami-yacht-charter-catering|g
  s|/Miami-Yacht-Charter-Flowers|/miami-yacht-charter-flowers|g
  s|/Miami-Yacht-Charter-Water-Toys|/miami-yacht-charter-water-toys|g
' {} \;

echo "✅ All references updated"
echo ""
echo "✨ Done! All URLs are now lowercase"
