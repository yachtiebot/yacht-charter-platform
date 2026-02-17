import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { VesselSearchFilters } from '@/lib/types';

// GET /api/public/vessels - List and search vessels
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Build query
    let query = supabase
      .from('public_vessels')
      .select('*')
      .eq('is_active', true);

    // Apply filters
    const lengthBucket = searchParams.get('length_bucket');
    if (lengthBucket) {
      query = query.eq('length_bucket', lengthBucket);
    }

    const locationTag = searchParams.get('location_tag');
    if (locationTag) {
      query = query.eq('location_tag', locationTag);
    }

    const category = searchParams.get('category');
    if (category) {
      query = query.eq('category', category);
    }

    const toys = searchParams.get('toys');
    if (toys) {
      const toysArray = toys.split(',');
      query = query.contains('toys', toysArray);
    }

    // Execute query
    const { data, error } = await query.order('length_ft', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch vessels' },
        { status: 500 }
      );
    }

    // Explicitly allowlist response fields (security measure)
    const safeData = data.map(vessel => ({
      id: vessel.id,
      public_code: vessel.public_code,
      make: vessel.make,
      model: vessel.model,
      length_ft: vessel.length_ft,
      length_bucket: vessel.length_bucket,
      category: vessel.category,
      location_tag: vessel.location_tag,
      capacity_guests: vessel.capacity_guests,
      min_hours: vessel.min_hours,
      max_hours: vessel.max_hours,
      allowed_durations: vessel.allowed_durations,
      toys: vessel.toys,
      amenities: vessel.amenities,
      hero_image_url: vessel.hero_image_url,
      gallery_image_urls: vessel.gallery_image_urls,
      public_description: vessel.public_description,
    }));

    return NextResponse.json({ vessels: safeData });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
