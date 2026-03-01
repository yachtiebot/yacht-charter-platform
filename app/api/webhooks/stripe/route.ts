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

  if (!signature) {
    console.error('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    // In development without webhook secret, still process but log warning
    console.warn('⚠️  Webhook secret not set - skipping signature verification (DEV ONLY)');
  }

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      // Production: verify signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Development: parse without verification (NOT FOR PRODUCTION)
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`📨 Webhook received: ${event.type}`);

  // Handle payment success
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log('=== ✅ PAYMENT SUCCESSFUL ===');
    console.log('Session ID:', session.id);
    console.log('Payment Status:', session.payment_status);
    console.log('Customer Email:', session.customer_email);
    
    // ONLY send emails if payment is actually successful
    if (session.payment_status === 'paid') {
      console.log('💰 Payment confirmed - processing order');
      
      // Extract customer info from metadata
      const customerInfo = {
        firstName: session.metadata?.firstName || '',
        lastName: session.metadata?.lastName || '',
        email: session.customer_email || session.metadata?.email || '',
        phone: session.metadata?.phone || '',
        bookingNumber: session.metadata?.bookingNumber || '',
        charterDate: session.metadata?.charterDate || '',
      };
      
      // Check if this order has jet ski waivers
      if (session.metadata?.has_jet_ski_waiver === 'true') {
        console.log('🛥️  Order contains Jet Ski waiver - triggering email');
        
        // Retrieve line items to get waiver data
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product'],
          });
          
          console.log(`Found ${lineItems.data.length} line items`);
          
          // TODO: Call waiver email API
          // await sendWaiverEmails(customerInfo, lineItems, session.id);
          
          console.log('✉️  Waiver emails would be sent here');
        } catch (error: any) {
          console.error('Failed to retrieve line items:', error.message);
        }
      }
      
      // Send order confirmation email
      console.log('✉️  Order confirmation email would be sent here');
      
    } else {
      console.log('⚠️  Payment not completed - status:', session.payment_status);
      console.log('❌ NO EMAILS SENT - Payment must be successful first');
    }
    
    console.log('================================');
  }

  // Handle payment failures
  if (event.type === 'checkout.session.async_payment_failed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log('=== ❌ PAYMENT FAILED ===');
    console.log('Session ID:', session.id);
    console.log('Customer Email:', session.customer_email);
    
    // Send payment failed notification
    console.log('✉️  Payment failure notification would be sent here');
    console.log('Message: "Your payment could not be processed. Please update your payment method."');
    
    console.log('=======================');
  }

  // Handle expired sessions
  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    console.log('=== ⏰ SESSION EXPIRED ===');
    console.log('Session ID:', session.id);
    console.log('Customer did not complete payment in time');
    console.log('========================');
  }

  return NextResponse.json({ received: true });
}
