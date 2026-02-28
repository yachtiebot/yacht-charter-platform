import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-10-28.acacia',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    console.log('Stripe key exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('Stripe key prefix:', process.env.STRIPE_SECRET_KEY?.substring(0, 15));
    
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    const { items, customerInfo } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.customization ? 
            `Customization: ${JSON.stringify(item.customization)}` : 
            undefined,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/checkout?canceled=true`,
      customer_email: customerInfo?.email,
      // Require 3D Secure for all transactions
      payment_intent_data: {
        setup_future_usage: undefined,
        capture_method: 'automatic',
      },
      // Request 3DS authentication
      payment_method_options: {
        card: {
          request_three_d_secure: 'any', // Always request 3DS
        },
      },
      metadata: {
        firstName: customerInfo?.firstName || '',
        lastName: customerInfo?.lastName || '',
        phone: customerInfo?.phone || '',
        charterDate: customerInfo?.charterDate || '',
        bookingNumber: customerInfo?.bookingNumber || '',
        notes: customerInfo?.notes || '',
      },
      // Shipping for catering delivery (optional)
      ...(customerInfo?.address && {
        shipping_address_collection: {
          allowed_countries: ['US'],
        },
      }),
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
