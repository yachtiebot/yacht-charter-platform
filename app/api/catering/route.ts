import { NextResponse } from 'next/server';
import { getCateringWithCache } from '@/lib/catering-cache';

export const revalidate = 900; // 15 minutes

export async function GET() {
  try {
    const data = await getCateringWithCache();
    return NextResponse.json(data.catering);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
