import Link from 'next/link';
import YachtDetailClient from './YachtDetailClient';
import { getYachtsWithCache } from '@/lib/yacht-cache';

// Server component - fetch data with caching
async function getYacht(code: string) {
  try {
    const data = await getYachtsWithCache();
    
    // Find yacht by code (case-insensitive)
    const found = data.yachts.find((y: any) => {
      const yachtId = y.fields['Yacht ID'];
      if (!yachtId) {
        console.error('Yacht missing Yacht ID field:', y.fields['Boat Name']);
        return false;
      }
      return yachtId.toLowerCase() === code.toLowerCase();
    });
    
    if (!found) {
      console.log(`Yacht not found: ${code}`);
      console.log(`Available IDs:`, data.yachts.map((y: any) => y.fields['Yacht ID']));
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

// Revalidate every 15 minutes
export const revalidate = 900;
