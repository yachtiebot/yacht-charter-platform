# Image Optimization Guide

## System Setup ✅
- **Quality**: 90 (near-lossless, no visible degradation)
- **Formats**: Automatic WebP/AVIF conversion
- **Lazy Loading**: Enabled by default
- **Responsive**: Multiple sizes generated automatically

## Adding New Images

### Method 1: Use OptimizedImage Component (Recommended)
```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/images/yacht-hero.webp"
  alt="60ft Azimut Yacht"
  fill
  priority={false}  // true for above-fold images
  quality={90}      // 90 = high quality (default)
  className="object-cover"
/>
```

### Method 2: Bulk Upload & Optimize
1. Place raw images in a folder (e.g., `raw-images/`)
2. Run optimization script:
```bash
node scripts/optimize-images.js ./raw-images ./public/images
```
3. This will generate:
   - High-quality WebP versions
   - Multiple responsive sizes (400w, 800w, 1200w, 1920w, 2400w)

### Method 3: Manual Upload to /public/images/
Just drop files in `/public/images/` and use the OptimizedImage component.

## Image Sizes by Section

### Hero Images
- **Dimensions**: 2400x1600px minimum
- **Aspect**: 3:2
- **Usage**: Full-screen backgrounds

### Fleet Cards
- **Dimensions**: 800x1067px minimum
- **Aspect**: 3:4 portrait
- **Usage**: Yacht category cards

### Experience Thumbnails
- **Dimensions**: 800x800px minimum
- **Aspect**: 1:1 square
- **Usage**: Experience category cards

### Location Cards
- **Dimensions**: 600x400px minimum
- **Aspect**: 3:2
- **Usage**: Departure point cards

## Quality Settings

**Current**: Quality 90 (no visible degradation)
- Hero images: 90
- Card images: 90
- Thumbnails: 90

## External Image Sources (CDN)
Currently configured:
- ✅ images.unsplash.com
- ✅ lh3.googleusercontent.com
- ✅ *.googleusercontent.com (Google Drive)

To add more sources, edit `next.config.ts` → `remotePatterns`
