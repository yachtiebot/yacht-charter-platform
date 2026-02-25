import { NextRequest, NextResponse } from 'next/server';
import { getYachtsWithCache } from '@/lib/yacht-cache';

/**
 * /api/yachts endpoint
 * 
 * Fetches yacht data with 15-minute caching and fallback:
 * - Polls Airtable every 15 minutes
 * - Serves from cache between polls
 * - Falls back to stale cache or static data if Airtable fails
 * - Handles 500-700 daily visitors with minimal API calls
 */

export const revalidate = 900; // 15 minutes

export async function GET(request: NextRequest) {
  try {
    const data = await getYachtsWithCache();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
      },
    });
  } catch (error) {
    console.error('Error in /api/yachts:', error);
    return NextResponse.json(
      { error: 'Internal server error', yachts: [] },
      { status: 500 }
    );
  }
}
