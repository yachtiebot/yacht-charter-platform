import { NextRequest, NextResponse } from 'next/server';

// Email sending API for Jet Ski waivers
// This will be called after successful payment

export async function POST(request: NextRequest) {
  try {
    const { customerInfo, items, sessionId } = await request.json();

    // Find items with waivers
    const itemsWithWaivers = items.filter((item: any) => item.waiverData);

    if (itemsWithWaivers.length === 0) {
      return NextResponse.json({ success: true, message: 'No waivers to send' });
    }

    // Sales team email
    const salesEmail = 'hello@miamiyachtingcompany.com';

    // Build waiver email content for each item
    for (const item of itemsWithWaivers) {
      const waiver = item.waiverData;
      
      // Detect waiver type and generate appropriate HTML
      const isJetSki = item.id?.includes('jet-ski');
      const waiverHTML = isJetSki 
        ? generateJetSkiWaiverHTML(item, waiver, customerInfo)
        : generateWaterSportsWaiverHTML(item, waiver, customerInfo);

      // TODO: Integrate with your email service (SendGrid, Resend, AWS SES, etc.)
      // For now, we'll log it. You'll need to add your email service here.
      
      console.log('=== JET SKI WAIVER EMAIL ===');
      console.log('To Customer:', customerInfo.email);
      console.log('To Sales:', salesEmail);
      console.log('Subject:', `Jet Ski Waiver - ${customerInfo.firstName} ${customerInfo.lastName}`);
      console.log('HTML Content:', waiverHTML);
      console.log('===========================');

      // Example integration with Resend (commented out - add your API key):
      /*
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Miami Yachting Company <noreply@miamiyachtingcompany.com>',
          to: [customerInfo.email],
          bcc: [salesEmail],
          subject: `Jet Ski Waiver Confirmation - Booking #${customerInfo.bookingNumber}`,
          html: waiverHTML,
        }),
      });
      */
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Waiver emails logged (integrate email service to send)'
    });
    
  } catch (error: any) {
    console.error('Waiver email error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send waiver emails' },
      { status: 500 }
    );
  }
}

function generateJetSkiWaiverHTML(item: any, waiver: any, customerInfo: any): string {
  const acceptedDate = new Date(waiver.acceptedAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'America/New_York'
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f0f0f; background: #faf9f7; margin: 0; padding: 20px; }
    .container { max-width: 700px; margin: 0 auto; background: white; padding: 40px; border: 1px solid #e5e5e5; }
    .header { border-bottom: 2px solid #c4a265; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 24px; font-weight: 300; color: #0f0f0f; margin-bottom: 10px; }
    .title { font-size: 28px; font-weight: 300; color: #0f0f0f; margin: 0 0 10px 0; }
    .subtitle { font-size: 14px; color: #6b6b6b; margin: 0; }
    .section { margin: 30px 0; }
    .section-title { font-size: 14px; font-weight: 600; color: #0f0f0f; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 15px; }
    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .info-label { font-size: 13px; color: #6b6b6b; font-weight: 500; }
    .info-value { font-size: 13px; color: #0f0f0f; }
    .waiver-item { padding: 15px; background: #f9f9f9; margin: 10px 0; border-left: 3px solid #c4a265; }
    .waiver-title { font-size: 13px; font-weight: 600; color: #0f0f0f; margin-bottom: 8px; }
    .waiver-text { font-size: 13px; color: #6b6b6b; line-height: 1.6; margin: 0; }
    .checkmark { color: #10b981; font-weight: bold; margin-right: 8px; }
    .signature { margin-top: 30px; padding: 20px; background: #f0ece6; border-left: 4px solid #c4a265; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 12px; color: #6b6b6b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Miami Yachting Company</div>
      <h1 class="title">Jet Ski Waiver Acknowledgement</h1>
      <p class="subtitle">Booking #${customerInfo.bookingNumber} • Charter Date: ${customerInfo.charterDate}</p>
    </div>

    <div class="section">
      <div class="section-title">Customer Information</div>
      <div class="info-row">
        <span class="info-label">Name</span>
        <span class="info-value">${customerInfo.firstName} ${customerInfo.lastName}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Email</span>
        <span class="info-value">${customerInfo.email}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Phone</span>
        <span class="info-value">${customerInfo.phone}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Product</span>
        <span class="info-value">${item.name}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Accepted</span>
        <span class="info-value">${acceptedDate}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Acknowledgements (All Accepted)</div>
      
      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Florida Jet Ski Laws</div>
        <p class="waiver-text">I confirm that I have reviewed Florida jet ski laws and minimum age requirements for operating a jet ski in Miami Dade County using the links provided. If I do not meet the requirements to operate without a boating license, I agree to complete the required course before my rental. I am responsible for ensuring that all members of my group who operate the jet skis meet these requirements. Miami Yachting Group LLC is not responsible for any lost rental time if these requirements are not satisfied.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Damage Security Deposit</div>
        <p class="waiver-text">I understand that jet skis are provided by an independent third party vendor who requires a damage security deposit at the time of delivery. The jet ski vendor will refund the deposit at the end of the rental if no damage occurs. Failure or refusal to pay the vendor's required deposit, as determined by the jet ski vendor, may result in cancellation of jet ski usage and forfeiture of rental time without refund.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Damage to the Vessel</div>
        <p class="waiver-text">I understand that I am responsible for any damage caused by myself or my guests to the charter vessel or any related equipment or accessories resulting from jet ski use, and I agree to cover the cost of repairs.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Maximum Quantity of Jet Skis</div>
        <p class="waiver-text">I understand that a maximum of two jet skis are permitted at any vessel at any time.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Jet Ski Appointments</div>
        <p class="waiver-text">I understand that jet skis are scheduled through an independent third party vendor on an appointment only basis. If I or any member of my group arrives late to the charter vessel's scheduled departure time, jet ski usage time may be reduced or forfeited. Jet ski time cannot be rescheduled and any lost time due to late arrival will not be refunded.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Credit Card and ID Acknowledgement</div>
        <p class="waiver-text">I authorize Miami Yachting Group LLC to charge my credit or debit card for the amount shown for this booking. I understand that I must present this card in person on the day of the rental along with matching government issued identification for verification. Failure to present the required card and identification may result in cancellation of jet ski usage by the vendor without refund.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Third Party Vendor Disclosure and Liability</div>
        <p class="waiver-text">Jet skis are provided, operated, and supervised by an independent third party vendor, not by the yacht owner or the yacht charter brokerage. The jet ski rental is a separate service subject to the jet ski vendor's own rules, licenses, permits, and requirements. The yacht owner and charter brokerage do not operate, supervise, or control jet ski use. I acknowledge that jet ski activities involve inherent risks and I choose to use the jet ski vendor's services at my own discretion and responsibility. I agree to release and hold harmless the yacht owner, the yacht charter brokerage, and Miami Yachting Group LLC from any claims arising out of or related to jet ski use. By submitting this form, I agree that this acknowledgment is legally binding and constitutes my electronic signature.</p>
      </div>
    </div>

    <div class="signature">
      <strong>Electronic Signature:</strong><br>
      By completing the online waiver form, ${customerInfo.firstName} ${customerInfo.lastName} has electronically signed this waiver on ${acceptedDate}.
    </div>

    <div class="footer">
      <p>This is a legally binding document. Please keep this email for your records.</p>
      <p style="margin-top: 15px;">
        <strong>Miami Yachting Company</strong><br>
        Phone: 1-800-747-9585 | Email: hello@miamiyachtingcompany.com
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

function generateWaterSportsWaiverHTML(item: any, waiver: any, customerInfo: any): string {
  const acceptedDate = new Date(waiver.acceptedAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'America/New_York'
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f0f0f; background: #faf9f7; margin: 0; padding: 20px; }
    .container { max-width: 700px; margin: 0 auto; background: white; padding: 40px; border: 1px solid #e5e5e5; }
    .header { border-bottom: 2px solid #c4a265; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 24px; font-weight: 300; color: #0f0f0f; margin-bottom: 10px; }
    .title { font-size: 28px; font-weight: 300; color: #0f0f0f; margin: 0 0 10px 0; }
    .subtitle { font-size: 14px; color: #6b6b6b; margin: 0; }
    .section { margin: 30px 0; }
    .section-title { font-size: 14px; font-weight: 600; color: #0f0f0f; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 15px; }
    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .info-label { font-size: 13px; color: #6b6b6b; font-weight: 500; }
    .info-value { font-size: 13px; color: #0f0f0f; }
    .waiver-item { padding: 15px; background: #f9f9f9; margin: 10px 0; border-left: 3px solid #c4a265; }
    .waiver-title { font-size: 13px; font-weight: 600; color: #0f0f0f; margin-bottom: 8px; }
    .waiver-text { font-size: 13px; color: #6b6b6b; line-height: 1.6; margin: 0; }
    .checkmark { color: #10b981; font-weight: bold; margin-right: 8px; }
    .signature { margin-top: 30px; padding: 20px; background: #f0ece6; border-left: 4px solid #c4a265; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 12px; color: #6b6b6b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Miami Yachting Company</div>
      <h1 class="title">${item.name} Waiver Acknowledgement</h1>
      <p class="subtitle">Booking #${customerInfo.bookingNumber} • Charter Date: ${customerInfo.charterDate}</p>
    </div>

    <div class="section">
      <div class="section-title">Customer Information</div>
      <div class="info-row">
        <span class="info-label">Name</span>
        <span class="info-value">${customerInfo.firstName} ${customerInfo.lastName}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Email</span>
        <span class="info-value">${customerInfo.email}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Phone</span>
        <span class="info-value">${customerInfo.phone}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Product</span>
        <span class="info-value">${item.name}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Accepted</span>
        <span class="info-value">${acceptedDate}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Acknowledgements (All Accepted)</div>
      
      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Cancellation Policy</div>
        <p class="waiver-text">I understand this item is special ordered and delivered to my rental yacht, because of the custom nature of this delivery, 48 hours cancellation notice prior to my rental date is required for a refund. If I cancel less than 48 hours from my rental date, the rental vendor may charge a $100.00 cancellation fee per item.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Damage Deposit</div>
        <p class="waiver-text">I understand this rental item is provided by a 3rd party independent vendor who may charge a damage security deposit to rent this item. Damage security deposits are refunded at the end of the rental if myself or my guests do not damage the rental item. Normal wear and minor scratches do not constitute damage. Refusal to pay the vendor's required damage security deposit prior to usage may result in forfeiture of rental time and cancellation of the rental without refund.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Experience Acknowledgement</div>
        <p class="waiver-text">I understand that the usage of this item requires some limited knowledge. I understand there may be a level of physicality required on my part when using this rental item. Not being able to "stay on" the rental item does not constitute grounds for a refund.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Liability Acknowledgement</div>
        <p class="waiver-text">I understand that if myself or one of my guests cause damage to the charter vessel with the rental item, I will be charged for the repairs to the charter vessel. Furthermore, I understand that the yacht crew is not responsible for the safekeeping of this item or for the instructions on how to use the item. I am renting this item from a 3rd party vendor that is unrelated to my charter vessel or its crew.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Card and Charge Authorization</div>
        <p class="waiver-text">I authorize Miami Yachting Group LLC to charge my credit/debit card in the amount shown for this booking. I will bring this card with me in person the day of my rental for verification as well as my matching ID. I understand that if I do not bring this card with me in person and my matching ID for verification purposes, my rental may be canceled by the vendor.</p>
      </div>

      <div class="waiver-item">
        <div class="waiver-title"><span class="checkmark">✓</span>Rental Price</div>
        <p class="waiver-text">I understand the price of the rental is $499.99 per item and that my initial payment of $99.00 per item will be deducted from my final balance, leaving me with a total due of $400.00 per item which is payable directly to the water toy vendor.</p>
      </div>
    </div>

    <div class="signature">
      <strong>Electronic Signature:</strong><br>
      By completing the online waiver form, ${customerInfo.firstName} ${customerInfo.lastName} has electronically signed this waiver on ${acceptedDate}.
    </div>

    <div class="footer">
      <p>This is a legally binding document. Please keep this email for your records.</p>
      <p style="margin-top: 15px;">
        <strong>Miami Yachting Company</strong><br>
        Phone: 1-800-747-9585 | Email: hello@miamiyachtingcompany.com
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
