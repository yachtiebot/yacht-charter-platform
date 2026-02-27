import { NextRequest, NextResponse } from 'next/server';
import { getYachtsWithCache } from '@/lib/yacht-cache-direct';

/**
 * DIRECT Airtable fetch - NO CACHE
 * For development/testing only
 */

export const revalidate = 0; // No cache
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const data = await getYachtsWithCache();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
