import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/public/vessels/:code - Get single vessel by public_code
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    const { data: vessel, error } = await supabase
      .from('public_vessels')
      .select('*')
      .eq('public_code', code)
      .eq('is_active', true)
      .single();

    if (error || !vessel) {
      return NextResponse.json(
        { error: 'Vessel not found' },
        { status: 404 }
      );
    }

    // Get pricing rules
    const { data: pricing } = await supabase
      .from('public_pricing_rules')
      .select('*')
      .eq('public_vessel_id', vessel.id)
      .single();

    // Get schedule rules
    const { data: schedule } = await supabase
      .from('public_schedule_rules')
      .select('*')
      .eq('public_vessel_id', vessel.id)
      .single();

    // Explicitly allowlist response fields
    const safeResponse = {
      vessel: {
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
      },
      pricing: pricing ? {
        currency: pricing.currency,
        base_rates: pricing.base_rates,
        extra_hour_cents: pricing.extra_hour_cents,
        deposit_policy: pricing.deposit_policy,
      } : null,
      schedule: schedule ? {
        timezone: schedule.timezone,
        earliest_departure: schedule.earliest_departure,
        latest_return: schedule.latest_return,
        slot_increment_minutes: schedule.slot_increment_minutes,
        fixed_start_times: schedule.fixed_start_times,
      } : null,
    };

    return NextResponse.json(safeResponse);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
