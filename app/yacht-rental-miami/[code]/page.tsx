import Link from 'next/link';
import { notFound } from 'next/navigation';
import YachtDetailClient from './YachtDetailClient';

// Server component - fetch data here
async function getYacht(code: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yacht-charter-platform-ten.vercel.app';
    const response = await fetch(`${baseUrl}/api/yachts`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!response.ok) {
      console.error('Failed to fetch yachts:', response.status);
      return null;
    }
    
    const data = await response.json();
    const found = data.yachts.find((y: any) => 
      y.fields['Yacht ID'].toLowerCase() === code.toLowerCase()
    );
    
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
