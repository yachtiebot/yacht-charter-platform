# Design Standards

## Typography

### Page Headers (H1)
**Standard size for all pages:**
```jsx
<h1 className="editorial-display text-5xl md:text-6xl lg:text-7xl mb-6" style={{ fontWeight: 300 }}>
  Your Title Here
</h1>
```

**Breakdown:**
- `editorial-display` - Uses Cormorant Garamond font
- `text-5xl md:text-6xl lg:text-7xl` - Responsive sizing (60px → 72px on desktop)
- `fontWeight: 300` - Light weight for elegance
- Mobile: 48px → Tablet: 60px → Desktop: 72px

**Used on:**
- Yacht Rental Miami page ("The Fleet")
- Contact page ("Get in Touch")

**For future pages:**
Use this exact pattern for all new page headers to maintain consistency.

### Homepage Hero
Homepage uses smaller size (3.5rem / 56px) to balance with image:
```jsx
<h1 className="editorial-display text-white mb-6" style={{fontSize: '3.5rem'}}>
```

## Navigation

### Menu Links - Transparent State
All menu text includes drop shadow when navbar is transparent:
```jsx
style={isTransparent ? { textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)' } : {}}
```

Applies to:
- Main menu links
- Language switcher
- WhatsApp icon (use `filter: drop-shadow()` for SVG)
- Phone number

### Book Now Button
- Thin dark border: `border-[#0f0f0f]/20`
- Maintains border on hover with color change

## Layout

### Yacht Grid
- Desktop: 3 columns (`md:grid-cols-3`)
- Mobile: 1 column
- Natural sort: Smallest to largest by "Length in Feet"

## Colors
- Gold accent: `#c4a265`
- Dark text: `#0f0f0f`
- Light text: `#6b6b6b`
- Background: `#faf9f7`
