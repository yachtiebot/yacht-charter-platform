import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

// POST /api/webhooks/stripe
// Handles Stripe webhook events
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const reservationId = session.metadata?.reservation_id;

  if (!reservationId) {
    console.error('No reservation_id in session metadata');
    return;
  }

  // Update payment record
  await supabaseAdmin
    .from('internal_payments')
    .update({
      stripe_payment_intent_id: session.payment_intent as string,
      status: 'succeeded',
      stripe_event_id: session.id,
    })
    .eq('stripe_checkout_session_id', session.id);

  // Update reservation status to confirmed
  await supabaseAdmin
    .from('internal_reservations')
    .update({
      status: 'confirmed',
      hold_expires_at: null,
    })
    .eq('id', reservationId);

  // Update availability block from 'hold' to 'confirmed_reservation'
  const { data: reservation } = await supabaseAdmin
    .from('internal_reservations')
    .select('public_vessel_id, start_time, end_time')
    .eq('id', reservationId)
    .single();

  if (reservation) {
    await supabaseAdmin
      .from('public_availability_blocks')
      .update({ block_type: 'confirmed_reservation' })
      .eq('public_vessel_id', reservation.public_vessel_id)
      .eq('start_time', reservation.start_time)
      .eq('end_time', reservation.end_time)
      .eq('block_type', 'hold');
  }

  // Update add-on payment status
  await supabaseAdmin
    .from('internal_reservation_add_ons')
    .update({ payment_status: 'upfront_paid' })
    .eq('reservation_id', reservationId)
    .neq('payment_status', 'vendor_direct');

  console.log(`Reservation ${reservationId} confirmed via checkout session ${session.id}`);
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  await supabaseAdmin
    .from('internal_payments')
    .update({ status: 'succeeded' })
    .eq('stripe_payment_intent_id', paymentIntent.id);

  console.log(`Payment succeeded: ${paymentIntent.id}`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  await supabaseAdmin
    .from('internal_payments')
    .update({ status: 'failed' })
    .eq('stripe_payment_intent_id', paymentIntent.id);

  console.log(`Payment failed: ${paymentIntent.id}`);
}
