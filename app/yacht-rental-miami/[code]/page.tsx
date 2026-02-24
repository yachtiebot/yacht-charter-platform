import Link from 'next/link';

// Static yacht data with LOCAL public folder images
const yachts = {
  '37-axopar': {
    name: '37 ft Axopar',
    imageCount: 13
  },
  '27-regal': {
    name: '27 ft Regal',
    imageCount: 18
  },
  '116-pershing': {
    name: '116 ft Pershing',
    imageCount: 49
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

  const images = Array.from({length: yacht.imageCount}, (_, i) => {
    const code = params.code;
    const name = code === '37-axopar' ? '37_Axopar' : code === '27-regal' ? '27_Regal' : '116_Pershing';
    return `/images/yachts/${code}/Miami_Yachting_Company_${name}_${String(i+1).padStart(2, '0')}.webp`;
  });

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <Link href="/yacht-rental-miami" className="editorial-label text-[#6b6b6b] hover:text-[#c4a265] inline-block mb-8">
          ← BACK TO FLEET
        </Link>

        <h1 className="editorial-headline mb-12">{yacht.name}</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
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
