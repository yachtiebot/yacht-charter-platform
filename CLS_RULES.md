# CLS_RULES.md - Code and Library Standards

**Hard-scripted rules that must be followed in all code execution.**

---

## Image Processing & SEO Standards

### Image Naming Convention (MANDATORY)

**Rule:** All images after optimization via Sharp MUST be renamed following this exact pattern:

```
Miami_Yachting_Company_[descriptive-name].ext
```

**IMPORTANT:** It is "Miami_Yachting_Company" (with "Yachting") - NOT "Miami_Yacht_Company"

**Examples:**
- `Miami_Yachting_Company_68ft-sunseeker-exterior-aerial.jpg`
- `Miami_Yachting_Company_luxury-yacht-deck-sunset.jpg`
- `Miami_Yachting_Company_bow-seating-area.webp`
- `Miami_Yachting_Company_jet-ski-water-toys.jpg`
- `Miami_Yachting_Company_hero-miami-beach.jpg`

**Why:** This enforces SEO best practices by:
1. Including brand name in every image filename
2. Providing descriptive, search-friendly names
3. Supporting Google Images indexing
4. Building brand association in file paths
5. Following consistent naming schema across entire platform

### Image Optimization Requirements

1. **Use Sharp library** for all image processing
2. **Max file size:** 500KB
3. **After optimization**, rename file according to naming convention above
4. **Descriptive part** should include:
   - Vessel characteristics (size, make, type)
   - Location if relevant
   - Feature being shown (deck, interior, toys, etc.)
   - Perspective (aerial, side, bow, stern, etc.)

5. **Format standards:**
   - Use lowercase for descriptive parts
   - Use hyphens (not underscores) in descriptive section
   - Use underscores to separate "Miami_Yachting_Company" from description
   - No spaces in filenames
   - Preserve appropriate extension (.jpg, .webp, .png)

### Script Enforcement

Any script that processes images MUST:
1. Run Sharp optimization first (max 500KB)
2. Automatically rename output file to follow `Miami_Yachting_Company_[description].ext` pattern
3. Delete original large files from GitHub to save space
4. Log the transformation for audit
5. Fail loudly if naming convention cannot be applied

**Example implementation pattern:**
```javascript
// WRONG
const outputPath = `optimized-${originalName}`;

// CORRECT
const description = deriveDescription(originalName); // e.g., "68ft-sunseeker-bow"
const ext = path.extname(originalName);
const outputPath = `Miami_Yachting_Company_${description}${ext}`;
```

---

## Data Privacy & Exposure Rules

### NEVER Expose Publicly
Reference: SPECIFICATIONS.md

The following data MUST NEVER appear in:
- Public API responses
- Public web pages
- Customer-facing interfaces
- AI concierge responses
- Search results
- Image metadata

**Protected internal data:**
- Vessel legal names
- Marina names
- Provider contact details
- Google Calendar event titles
- Internal notes
- Operational details

### Public Data Only
Public-facing code must ONLY access:
- `public_vessels` table
- `public_pricing_rules` table
- `public_schedule_rules` table
- `public_availability_blocks` table

Use separate database roles to enforce this at DB level.

---

## Location Tags (Allowed Values Only)

Enforce strict enum validation:
- Miami
- Miami Beach
- Key Biscayne
- Coconut Grove
- Hollywood
- Fort Lauderdale

No other location values allowed in public data.

---

## Category Tags (Allowed Values Only)

Enforce strict enum validation:
- day boat
- luxury yacht
- super yacht
- event vessels

No other category values allowed in public data.

---

## Time Window Enforcement

### Global Rules
- Earliest departure: 9:00 AM
- Latest return: 9:00 PM (21:00)

### Special Case: Miami Beach Marina
- If internal flag `is_miami_beach_marina` is true AND `location_tag` is "Miami Beach"
- Latest return: 8:00 PM (20:00)

**UI Display Rule:** Never mention marina name. Just show: "Latest return time for this vessel is 8:00 PM"

---

## API Separation

### Public API (`/api/public/*`)
- Uses `public_reader` DB role
- Only accesses public tables
- Never returns internal fields
- Response allowlist enforced
- No implicit object spreading

### Admin API (`/api/admin/*`)
- Uses `admin` DB role
- Accesses internal tables
- Role-based access control enforced
- Audit log required for all mutations

**No shared serializers between public and admin APIs.**

---

## Automated Testing Requirements

### Image Processing Tests
- Verify Sharp optimization runs correctly
- Verify output filename matches `Miami_Yacht_Company_*` pattern
- Verify file extension preserved
- Verify no spaces or invalid characters

### Data Exposure Tests
- Assert public endpoints never return internal fields
- Assert marina names never appear in responses
- Assert vessel legal names never appear in responses
- Test that only allowed location/category enums are returned

### Access Control Tests
- Verify `public_reader` role cannot SELECT from internal tables
- Verify admin endpoints require authentication
- Verify role-based restrictions work

---

## Code Review Checklist

Before merging any PR:

- [ ] Image processing follows `Miami_Yacht_Company_*` naming convention
- [ ] No marina names in public-facing code
- [ ] No vessel legal names in public-facing code
- [ ] Only allowed location tags used
- [ ] Only allowed category tags used
- [ ] Time window enforcement correct
- [ ] Separate DB roles used for public vs admin
- [ ] Response allowlists enforced
- [ ] Tests pass for data exposure prevention
- [ ] Audit logging in place for admin mutations

---

## Enforcement

**These are not suggestions. These are hard requirements.**

Any code that violates CLS rules must be rejected in code review and fixed before deployment.

When in doubt, reference this document.
