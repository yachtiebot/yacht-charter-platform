import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log('=== CHECKOUT SESSION COMPLETED ===');
    console.log('Session ID:', session.id);
    console.log('Customer Email:', session.customer_email);
    console.log('Metadata:', session.metadata);
    
    // Check if this order has jet ski waivers
    if (session.metadata?.has_jet_ski_waiver === 'true') {
      console.log('Order contains Jet Ski waiver - triggering email');
      
      // TODO: Retrieve full order details from session and send waiver emails
      // You would need to:
      // 1. Expand line_items from session to get waiver data
      // 2. Call send-waiver-email API
      // 3. Log to database/Airtable
      
      // For now, just log it
      console.log('Waiver email would be sent here');
    }
    
    console.log('==================================');
  }

  return NextResponse.json({ received: true });
}
