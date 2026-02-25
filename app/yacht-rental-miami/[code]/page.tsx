import Link from 'next/link';
import YachtDetailClient from './YachtDetailClient';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID!;

// Server component - fetch data directly from Airtable
async function getYacht(code: string) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        },
        next: { revalidate: 60 }
      }
    );
    
    if (!response.ok) {
      console.error('Failed to fetch from Airtable:', response.status);
      return null;
    }
    
    const data = await response.json();
    
    // Filter to only show yachts with "Show on Website?" = true
    const activeYachts = data.records.filter((record: any) => 
      record.fields['Show on Website?'] === true
    );
    
    // Enhance with Supabase photo URLs
    const supabaseBaseUrl = 'https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-photos';
    const photoMapping: { [key: string]: number } = {
      '116-Pershing': 46,
      '37-Axopar': 13,
      '27-Regal': 18
    };
    
    const enhancedYachts = activeYachts.map((yacht: any) => {
      const yachtId = yacht.fields['Yacht ID'];
      const photoCount = photoMapping[yachtId] || 0;
      
      if (photoCount > 0) {
        yacht.fields['Supabase Hero URL'] = `${supabaseBaseUrl}/${yachtId}/Miami_Yachting_Company_${yachtId}_hero.webp`;
        yacht.fields['Supabase Gallery URLs'] = Array.from(
          { length: photoCount },
          (_, i) => `${supabaseBaseUrl}/${yachtId}/Miami_Yachting_Company_${yachtId}_${String(i + 1).padStart(2, '0')}.webp`
        );
      }
      
      return yacht;
    });
    
    // Find yacht by code (case-insensitive)
    const found = enhancedYachts.find((y: any) => {
      const yachtId = y.fields['Yacht ID'];
      if (!yachtId) {
        console.error('Yacht missing Yacht ID field:', y.fields['Boat Name']);
        return false;
      }
      return yachtId.toLowerCase() === code.toLowerCase();
    });
    
    if (!found) {
      console.log(`Available yacht IDs:`, enhancedYachts.map((y: any) => y.fields['Yacht ID']));
      console.log(`Looking for code: ${code}`);
    }
    
    return found || null;
  } catch (error) {
    console.error('Error fetching yacht:', error);
    return null;
  }
}

export default async function YachtDetailPage({ params }: { params: { code: string } }) {
  const yacht = await getYacht(params.code);

  if (!yacht) {
    return (
      <div className="min-h-screen bg-[#faf9f7] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="editorial-headline mb-4">Yacht not found</h1>
          <p className="text-[#6b6b6b] mb-4">Code: {params.code}</p>
          <Link href="/yacht-rental-miami" className="editorial-label hover:text-[#c4a265]">
            ← BACK TO FLEET
          </Link>
        </div>
      </div>
    );
  }

  return <YachtDetailClient yacht={yacht} />;
}

// Generate static params for known yachts
export async function generateStaticParams() {
  return [
    { code: '37-axopar' },
    { code: '27-regal' },
    { code: '116-pershing' },
  ];
}
