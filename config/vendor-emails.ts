/**
 * Vendor Email Configuration
 * 
 * Update these email addresses for each vendor.
 * Vendors will receive CC copies of waiver confirmations.
 */

export const VENDOR_EMAILS = {
  // Seabob rental vendor
  seabob: 'vendor-seabob@example.com',  // TODO: Update with real email
  
  // Flitescooter rental vendor
  flitescooter: 'vendor-flitescooter@example.com',  // TODO: Update with real email
  
  // Floating equipment vendor (Cabana, Lounge Chairs, Rafts)
  floating: 'vendor-floating@example.com',  // TODO: Update with real email
  
  // Add more vendors as needed
  // jetski: 'vendor-jetski@example.com',
};

/**
 * Sales team email (receives all waiver confirmations)
 */
export const SALES_EMAIL = 'hello@miamiyachtingcompany.com';

/**
 * Get vendor email for a specific product
 */
export function getVendorEmail(productId: string): string | null {
  if (productId.includes('seabob')) {
    return VENDOR_EMAILS.seabob;
  }
  if (productId.includes('flitescooter')) {
    return VENDOR_EMAILS.flitescooter;
  }
  if (
    productId.includes('floating') ||
    productId.includes('raft') ||
    productId.includes('cabana') ||
    productId.includes('lounge')
  ) {
    return VENDOR_EMAILS.floating;
  }
  
  return null;  // No vendor email for this product
}
