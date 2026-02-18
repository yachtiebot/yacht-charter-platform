# Homepage Rebuild Task - Match PDF Layout Exactly

## Section Order (from PDF):
1. Hero (dark) - KEEP AS IS, already correct
2. **Fleet** (white bg #faf9f7) - ADD "View Collection →" to cards
3. **Our Philosophy** (black bg #0d0d0d) - "Not a Crowded Marketplace"
4. **Experiences** (white bg #faf9f7) - WITH descriptions and hourly pricing
5. **Departure Points** (off-white bg #f0ece6) - 6 cities
6. **Award** (black bg #0d0d0d) - "Recognized by Miami's Most Trusted Voice"
7. **Corporate Partners** (white bg #faf9f7) - NEW SECTION - "Proud Service Providers"
8. **CTA** (dark bg with photo overlay) - "Ready to Get on the Water?"
9. Footer (black bg #0f0f0f) - KEEP AS IS

## Specific Changes:

### Fleet Cards - Add to each card overlay:
```
<div className="editorial-label text-white flex items-center gap-2">
  <span>View Collection</span>
  <span>→</span>
</div>
```

### Experiences Section - Update with hourly pricing:
Each card needs description text + "From $X/hour" pricing

### Departure Points:
- Background: #f0ece6 (sand color, not white)
- 6 cities: Miami, Miami Beach, Key Biscayne, Coconut Grove, Fort Lauderdale, Hollywood

### Corporate Partners Section (NEW):
```jsx
<section className="bg-[#faf9f7]" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
  <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
    <div className="rule-gold mx-auto" />
    <h2 className="editorial-headline text-[#0f0f0f] mb-4">Proud Service Providers To</h2>
    <p className="editorial-body text-[#6b6b6b] mb-12">
      Trusted by the world's leading brands for corporate yacht charters and private events.
    </p>
    {/* Logo grid - placeholder for now */}
    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-40">
      {/* Add company logos here */}
    </div>
  </div>
</section>
```

## Files to modify:
- `app/page.tsx` - Main homepage rebuild

## Git workflow:
1. Backup current version
2. Rebuild sections in correct order
3. Test locally
4. Commit and deploy
