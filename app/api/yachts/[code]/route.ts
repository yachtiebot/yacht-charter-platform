import { NextRequest, NextResponse } from 'next/server';
import { getYachtsWithCache } from '@/lib/yacht-cache';

export const revalidate = 900; // 15 minutes

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const data = await getYachtsWithCache();
    
    // Find yacht by code (case-insensitive)
    const yacht = data.yachts.find((y: any) => 
      y.fields['Yacht ID']?.toLowerCase() === code.toLowerCase()
    );
    
    if (!yacht) {
      return NextResponse.json(
        { error: 'Yacht not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(yacht, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Error in /api/yachts/[code]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
