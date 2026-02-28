# Review Quote Feature - Implementation Plan

## Goal
Add a review quote to each yacht detail page with 5-star rating display, pulling from real reviews.

## Architecture

### Phase 1: Setup Infrastructure ✅
1. Add "Customer Quote" field to Airtable Yachts table (Long Text)
2. Add "Quote Author" field to Airtable Yachts table (Single Line Text)
3. Update yacht detail page to display quote with 5-star rating
4. Update scraper to leave quote fields empty (for manual entry or API integration later)

### Phase 2: Manual Entry (Immediate)
- Manually add best quotes from Google/TripAdvisor/Yelp to Airtable
- Format: "Quote text here" - Author Name

### Phase 3: API Integration (Future)
Auto-populate quotes from review APIs:

#### Option A: Google Places API
- Endpoint: `https://maps.googleapis.com/maps/api/place/details/json`
- Pros: Official, reliable
- Cons: Requires API key, may have costs

#### Option B: TripAdvisor Content API
- Endpoint: `https://api.tripadvisor.com/api/partner/2.0/location/{locationId}/reviews`
- Pros: Specific to tourism/yachts
- Cons: Requires partnership

#### Option C: Yelp Fusion API
- Endpoint: `https://api.yelp.com/v3/businesses/{business_id}/reviews`
- Pros: Simple, well-documented
- Cons: Limited to 3 reviews per business

#### Option D: Web Scraping (Fallback)
- Scrape public review pages
- Pros: Free, no API key
- Cons: Fragile, against ToS

## Display Format

```typescript
<div className="yacht-quote">
  <div className="stars">⭐⭐⭐⭐⭐</div>
  <blockquote className="quote-text">
    "{quote}"
  </blockquote>
  <cite className="quote-author">— {author}</cite>
</div>
```

Styled to match existing yacht detail page aesthetics.

## Airtable Fields

Add to Yachts table:
- **Customer Quote** (Long Text) - The review quote text
- **Quote Author** (Single Line Text) - Review author name or initials
- **Quote Source** (Single Select) - Google, TripAdvisor, Yelp, Other

## Next Steps

1. **Tonight:** Add Airtable fields manually
2. **Tomorrow:** Update yacht detail page component to display quote
3. **This week:** Manually populate top 5-10 best reviews
4. **Next sprint:** Evaluate API options and implement auto-population

## Notes

- Keep quotes under 200 characters for visual consistency
- Always 5-star reviews only
- Rotate quotes if multiple exist (optional feature)
- Default fallback quote if none exists: Generic company review
