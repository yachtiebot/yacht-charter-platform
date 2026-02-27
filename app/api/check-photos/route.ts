import { NextResponse } from 'next/server';
import { getYachtsWithCache } from '@/lib/yacht-cache';

// Diagnostic endpoint to check which yachts have photos mapped
// Access: /api/check-photos

export async function GET() {
  try {
    const data = await getYachtsWithCache();
    const yachts = data.yachts || [];

    const photoMapping: { [key: string]: number } = {
      '116-Pershing': 46,
      '37-Axopar': 13,
      '27-Regal': 15
    };

    const diagnostics = yachts.map((yacht: any) => {
      const yachtId = yacht.fields['Yacht ID'];
      const hasPhotos = !!photoMapping[yachtId];
      const supabaseHeroUrl = yacht.fields['Supabase Hero URL'];
      const galleryCount = yacht.fields['Supabase Gallery URLs']?.length || 0;

      // Debug: Show all field names to diagnose mismatch
      const allFieldNames = Object.keys(yacht.fields);

      return {
        yachtId,
        yachtIdType: typeof yachtId,
        yachtIdValue: JSON.stringify(yachtId),
        boatName: yacht.fields['Boat Name'],
        hasPhotosInMapping: hasPhotos,
        photosInMapping: photoMapping[yachtId] || 0,
        supabaseHeroUrlGenerated: !!supabaseHeroUrl,
        supabaseHeroUrl: supabaseHeroUrl || 'NOT GENERATED',
        galleryImagesGenerated: galleryCount,
        showOnWebsite: yacht.fields['Show on Website?'],
        allAirtableFields: allFieldNames // NEW: Show all field names
      };
    });

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      totalYachts: yachts.length,
      yachtsWithPhotos: diagnostics.filter(y => y.hasPhotosInMapping).length,
      yachtsWithoutPhotos: diagnostics.filter(y => !y.hasPhotosInMapping).length,
      details: diagnostics,
      recommendation: 'Yachts without photos need to be added to photoMapping in lib/yacht-cache.ts'
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
