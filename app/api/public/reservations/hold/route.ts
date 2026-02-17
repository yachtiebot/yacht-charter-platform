import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateReservationCode, calculateHoldExpiration } from '@/lib/utils';
import { CreateHoldRequest } from '@/lib/types';

// POST /api/public/reservations/hold
// Creates a temporary hold on a time slot
export async function POST(request: NextRequest) {
  try {
    const body: CreateHoldRequest = await request.json();

    const {
      public_vessel_id,
      start_time,
      duration_hours,
      customer,
      guest_count,
      occasion,
    } = body;

    // Validate required fields
    if (!public_vessel_id || !start_time || !duration_hours || !customer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!customer.email || !customer.phone || !customer.full_name) {
      return NextResponse.json(
        { error: 'Complete customer information required' },
        { status: 400 }
      );
    }

    // Calculate end time
    const startDate = new Date(start_time);
    const endDate = new Date(startDate.getTime() + duration_hours * 60 * 60 * 1000);

    // Check vessel exists and is active
    const { data: vessel, error: vesselError } = await supabaseAdmin
      .from('public_vessels')
      .select('id, allowed_durations')
      .eq('id', public_vessel_id)
      .eq('is_active', true)
      .single();

    if (vesselError || !vessel) {
      return NextResponse.json(
        { error: 'Vessel not found or inactive' },
        { status: 404 }
      );
    }

    // Validate duration is allowed
    if (!vessel.allowed_durations.includes(duration_hours)) {
      return NextResponse.json(
        { error: 'Invalid duration for this vessel' },
        { status: 400 }
      );
    }

    // Check for overlapping reservations
    const { data: overlapping, error: overlapError } = await supabaseAdmin
      .from('internal_reservations')
      .select('id')
      .eq('public_vessel_id', public_vessel_id)
      .in('status', ['hold', 'confirmed'])
      .or(`and(start_time.lte.${endDate.toISOString()},end_time.gte.${startDate.toISOString()})`);

    if (overlapError) {
      console.error('Overlap check error:', overlapError);
      return NextResponse.json(
        { error: 'Failed to check availability' },
        { status: 500 }
      );
    }

    if (overlapping && overlapping.length > 0) {
      return NextResponse.json(
        { error: 'Time slot no longer available' },
        { status: 409 }
      );
    }

    // Create or get customer
    let customerId: string;
    const { data: existingCustomer } = await supabaseAdmin
      .from('internal_customers')
      .select('id')
      .eq('email', customer.email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      
      // Update customer info if needed
      await supabaseAdmin
        .from('internal_customers')
        .update({
          phone: customer.phone,
          full_name: customer.full_name,
        })
        .eq('id', customerId);
    } else {
      const { data: newCustomer, error: customerError } = await supabaseAdmin
        .from('internal_customers')
        .insert({
          email: customer.email,
          phone: customer.phone,
          full_name: customer.full_name,
        })
        .select('id')
        .single();

      if (customerError || !newCustomer) {
        console.error('Customer creation error:', customerError);
        return NextResponse.json(
          { error: 'Failed to create customer record' },
          { status: 500 }
        );
      }

      customerId = newCustomer.id;
    }

    // Create hold
    const reservationCode = generateReservationCode();
    const holdExpiresAt = calculateHoldExpiration();

    const { data: reservation, error: reservationError } = await supabaseAdmin
      .from('internal_reservations')
      .insert({
        reservation_code: reservationCode,
        public_vessel_id,
        customer_id: customerId,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        duration_hours,
        guest_count,
        occasion,
        status: 'hold',
        hold_expires_at: holdExpiresAt.toISOString(),
      })
      .select('id, reservation_code, hold_expires_at')
      .single();

    if (reservationError || !reservation) {
      console.error('Reservation creation error:', reservationError);
      return NextResponse.json(
        { error: 'Failed to create hold' },
        { status: 500 }
      );
    }

    // Create availability block
    await supabaseAdmin
      .from('public_availability_blocks')
      .insert({
        public_vessel_id,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        block_type: 'hold',
        source: 'booking_engine',
      });

    return NextResponse.json({
      reservation_id: reservation.id,
      reservation_code: reservation.reservation_code,
      hold_expires_at: reservation.hold_expires_at,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
