/**
 * DIRECT Airtable fetch - NO CACHE, NO SAFETY
 * For development/testing only
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID!;

export async function getYachtsWithCache() {
  console.log('→ Fetching DIRECT from Airtable (no cache, no safety)');
  
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
    {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
      cache: 'no-store' // Force fresh every time
    }
  );
  
  if (!response.ok) {
    throw new Error(`Airtable error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Filter to active yachts (Status = "Active")
  const activeYachts = data.records.filter((record: any) => 
    record.fields['Status']?.toLowerCase() === 'active'
  );
  
  console.log(`✓ Fetched ${activeYachts.length} yachts directly from Airtable`);
  
  return { yachts: activeYachts };
}
