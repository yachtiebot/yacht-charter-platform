import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';

// POST /api/public/reservations/checkout
// Creates Stripe checkout session for a held reservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reservation_id, add_ons } = body;

    if (!reservation_id) {
      return NextResponse.json(
        { error: 'Missing reservation_id' },
        { status: 400 }
      );
    }

    // Get reservation
    const { data: reservation, error: reservationError } = await supabaseAdmin
      .from('internal_reservations')
      .select(`
        *,
        public_vessels:public_vessel_id (
          public_code,
          make,
          model,
          length_ft
        ),
        internal_customers:customer_id (
          email,
          full_name
        )
      `)
      .eq('id', reservation_id)
      .single();

    if (reservationError || !reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    // Verify reservation is in hold status
    if (reservation.status !== 'hold') {
      return NextResponse.json(
        { error: 'Reservation is not in hold status' },
        { status: 400 }
      );
    }

    // Check if hold has expired
    const holdExpiry = new Date(reservation.hold_expires_at);
    if (holdExpiry < new Date()) {
      return NextResponse.json(
        { error: 'Hold has expired' },
        { status: 410 }
      );
    }

    // Get pricing
    const { data: pricing, error: pricingError } = await supabaseAdmin
      .from('public_pricing_rules')
      .select('base_rates, currency')
      .eq('public_vessel_id', reservation.public_vessel_id)
      .single();

    if (pricingError || !pricing) {
      return NextResponse.json(
        { error: 'Pricing not found' },
        { status: 500 }
      );
    }

    const durationKey = reservation.duration_hours.toString();
    const basePriceCents = pricing.base_rates[durationKey];

    if (!basePriceCents) {
      return NextResponse.json(
        { error: 'Price not configured for this duration' },
        { status: 500 }
      );
    }

    let totalCents = basePriceCents;

    // Build line items
    const lineItems: any[] = [
      {
        price_data: {
          currency: pricing.currency,
          product_data: {
            name: `${reservation.public_vessels.length_ft}ft ${reservation.public_vessels.make} Charter`,
            description: `${reservation.duration_hours} hours`,
          },
          unit_amount: basePriceCents,
        },
        quantity: 1,
      },
    ];

    // Add-ons (if provided)
    if (add_ons && add_ons.length > 0) {
      for (const addOn of add_ons) {
        const { data: addOnData } = await supabaseAdmin
          .from('internal_add_ons')
          .select('*')
          .eq('id', addOn.id)
          .eq('is_active', true)
          .single();

        if (addOnData) {
          let addOnPrice = 0;

          // Calculate price based on payment model
          if (addOnData.payment_model === 'split_payment') {
            addOnPrice = addOnData.upfront_cents || 0;
          } else if (addOnData.payment_model === 'full_collection' || addOnData.payment_model === 'flat_fee') {
            addOnPrice = addOnData.total_cents || 0;
          }
          // vendor_direct -> collect $0 via Stripe

          if (addOnPrice > 0) {
            totalCents += addOnPrice * (addOn.quantity || 1);

            lineItems.push({
              price_data: {
                currency: pricing.currency,
                product_data: {
                  name: addOnData.name,
                  description: addOnData.description || '',
                },
                unit_amount: addOnPrice,
              },
              quantity: addOn.quantity || 1,
            });
          }

          // Record add-on to reservation
          await supabaseAdmin
            .from('internal_reservation_add_ons')
            .insert({
              reservation_id: reservation.id,
              add_on_id: addOn.id,
              quantity: addOn.quantity || 1,
              upfront_paid_cents: addOnPrice,
              vendor_balance_cents: addOnData.vendor_balance_cents || 0,
              payment_status: addOnData.payment_model === 'vendor_direct' ? 'vendor_direct' : 'pending',
            });
        }
      }
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: reservation.internal_customers?.email || undefined,
      client_reference_id: reservation.id,
      metadata: {
        reservation_id: reservation.id,
        reservation_code: reservation.reservation_code,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel?reservation_id=${reservation.id}`,
      expires_at: Math.floor(holdExpiry.getTime() / 1000), // Align with hold expiration
    });

    // Record payment intent
    await supabaseAdmin
      .from('internal_payments')
      .insert({
        reservation_id: reservation.id,
        stripe_checkout_session_id: session.id,
        amount_cents: totalCents,
        currency: pricing.currency,
        status: 'pending',
      });

    return NextResponse.json({
      checkout_url: session.url,
      session_id: session.id,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
