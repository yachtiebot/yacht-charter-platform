import { NextResponse } from 'next/server';
import { getCateringWithCache } from '@/lib/catering-cache-direct';

export const revalidate = 0; // No cache
export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getCateringWithCache();
  return NextResponse.json(data.catering, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
