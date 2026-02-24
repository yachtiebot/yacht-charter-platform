import Link from 'next/link';

// Static yacht data
const yachts = {
  '37-axopar': {
    name: '37 ft Axopar',
    images: Array.from({length: 13}, (_, i) => 
      `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-images/yachts/37-axopar/Miami_Yachting_Company_37_Axopar_${String(i+1).padStart(2, '0')}.webp`
    )
  },
  '27-regal': {
    name: '27 ft Regal',
    images: Array.from({length: 18}, (_, i) => 
      `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-images/yachts/27-regal/Miami_Yachting_Company_27_Regal_${String(i+1).padStart(2, '0')}.webp`
    )
  },
  '116-pershing': {
    name: '116 ft Pershing',
    images: Array.from({length: 49}, (_, i) => 
      `https://wojjcivzlxsbinbmblhy.supabase.co/storage/v1/object/public/yacht-images/yachts/116-pershing/Miami_Yachting_Company_116_Pershing_${String(i+1).padStart(2, '0')}.webp`
    )
  }
};

export default function YachtPage({ params }: { params: { code: string } }) {
  const yacht = yachts[params.code as keyof typeof yachts];

  if (!yacht) {
    return (
      <div className="min-h-screen bg-[#faf9f7] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="editorial-headline mb-4">Yacht not found</h1>
          <Link href="/yacht-rental-miami" className="editorial-label">
            ← Back to Fleet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <Link href="/yacht-rental-miami" className="editorial-label text-[#6b6b6b] hover:text-[#c4a265] inline-block mb-8">
          ← BACK TO FLEET
        </Link>

        <h1 className="editorial-headline mb-12">{yacht.name}</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {yacht.images.map((img, idx) => (
            <div key={idx} className="aspect-square bg-[#f0ece6] overflow-hidden">
              <img 
                src={img}
                alt={`${yacht.name} - ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/contact"
            className="inline-block editorial-label px-12 py-3 bg-[#0f0f0f] text-white hover:bg-[#c4a265] transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}
