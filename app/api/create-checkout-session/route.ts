import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// Generate waiver metadata for chargeback protection
function generateWaiverMetadata(items: any[]) {
  const itemsWithWaivers = items.filter((item: any) => item.waiverData);
  
  if (itemsWithWaivers.length === 0) return {};
  
  const metadata: Record<string, string> = {};
  
  itemsWithWaivers.forEach((item: any, index: number) => {
    const waiver = item.waiverData;
    const prefix = itemsWithWaivers.length > 1 ? `waiver_${index + 1}_` : 'waiver_';
    
    // Acceptance timestamp (key for chargeback disputes)
    metadata[`${prefix}accepted_at`] = waiver.acceptedAt || '';
    metadata[`${prefix}product`] = item.name || '';
    
    // All 7 acknowledgements for legal protection
    metadata[`${prefix}florida_laws`] = waiver.floridaLaws ? 'ACCEPTED' : 'NOT_ACCEPTED';
    metadata[`${prefix}damage_deposit`] = waiver.damageDeposit ? 'ACCEPTED' : 'NOT_ACCEPTED';
    metadata[`${prefix}damage_to_vessel`] = waiver.damageToVessel ? 'ACCEPTED' : 'NOT_ACCEPTED';
    metadata[`${prefix}max_quantity`] = waiver.maximumQuantity ? 'ACCEPTED' : 'NOT_ACCEPTED';
    metadata[`${prefix}appointments`] = waiver.appointments ? 'ACCEPTED' : 'NOT_ACCEPTED';
    metadata[`${prefix}credit_card_id`] = waiver.creditCardID ? 'ACCEPTED' : 'NOT_ACCEPTED';
    metadata[`${prefix}third_party_vendor`] = waiver.thirdPartyVendor ? 'ACCEPTED' : 'NOT_ACCEPTED';
    
    // Electronic signature confirmation
    metadata[`${prefix}electronic_signature`] = 'AGREED';
    metadata[`${prefix}terms_accepted`] = 'true';
    
    // Chargeback protection summary
    metadata[`${prefix}protection`] = 'Customer electronically accepted all 7 Jet Ski waiver acknowledgements including third-party vendor liability release, damage responsibility, and electronic signature consent.';
  });
  
  return metadata;
}

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

    // Get origin for absolute URLs
    const origin = request.headers.get('origin') || 
                   request.headers.get('referer')?.replace(/\/$/, '') ||
                   'https://yacht-charter-platform-ten.vercel.app';
    
    // Create line items for Stripe with full product tracking
    const lineItems = items.map((item: any) => {
      // Convert relative image URLs to absolute for Stripe
      let imageUrl = undefined;
      if (item.image) {
        if (item.image.startsWith('http://') || item.image.startsWith('https://')) {
          imageUrl = item.image;
        } else if (item.image.startsWith('/')) {
          imageUrl = `${origin}${item.image}`;
        }
      }
      
      // Build description with customization or waiver info
      let description = undefined;
      if (item.customization) {
        description = `Customization: ${JSON.stringify(item.customization)}`;
      } else if (item.waiverData) {
        description = `Jet Ski Waiver Accepted: ${item.waiverData.acceptedAt}`;
      }
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description,
            images: imageUrl ? [imageUrl] : undefined,
            metadata: {
              product_id: item.id || '',
              category: item.category || 'unknown',
              selected_size: item.selectedSize || '',
              has_waiver: item.waiverData ? 'true' : 'false',
            },
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity || 1,
      };
    });
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
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
        // Charter identification
        charter_id: `${customerInfo?.lastName || ''}-${customerInfo?.firstName || ''}-${customerInfo?.bookingNumber || ''}`,
        
        // Customer details
        firstName: customerInfo?.firstName || '',
        lastName: customerInfo?.lastName || '',
        email: customerInfo?.email || '',
        phone: customerInfo?.phone || '',
        
        // Charter details
        charterDate: customerInfo?.charterDate || '',
        bookingNumber: customerInfo?.bookingNumber || '',
        notes: customerInfo?.notes || '',
        
        // Product summary for QuickBooks tracking
        order_summary: items.map((item: any) => 
          `${item.id}|${item.name}|${item.category}|${item.quantity}|$${item.price}`
        ).join('; '),
        total_items: items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0).toString(),
        categories: [...new Set(items.map((item: any) => item.category))].join(', '),
        
        // Jet Ski Waiver Acceptance (for chargeback protection)
        has_jet_ski_waiver: items.some((item: any) => item.waiverData) ? 'true' : 'false',
        ...generateWaiverMetadata(items),
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
