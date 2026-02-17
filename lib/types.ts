// Public Types (safe for API responses)
export type LengthBucket = '20-40 ft' | '40-60 ft' | '60-80 ft' | '80-100 ft' | '100+ ft';
export type Category = 'day boat' | 'luxury yacht' | 'super yacht' | 'event vessels';
export type LocationTag = 'Miami' | 'Miami Beach' | 'Key Biscayne' | 'Coconut Grove' | 'Hollywood' | 'Fort Lauderdale';

export interface PublicVessel {
  id: string;
  public_code: string;
  make: string;
  model: string | null;
  length_ft: number;
  length_bucket: LengthBucket;
  category: Category;
  location_tag: LocationTag;
  capacity_guests: number | null;
  min_hours: number;
  max_hours: number;
  allowed_durations: number[];
  toys: string[];
  amenities: string[];
  hero_image_url: string | null;
  gallery_image_urls: string[];
  public_description: string | null;
  is_active: boolean;
}

export interface PublicPricingRules {
  id: string;
  public_vessel_id: string;
  currency: string;
  base_rates: Record<string, number>; // duration_hours -> cents
  extra_hour_cents: number | null;
  deposit_policy: any;
}

export interface PublicScheduleRules {
  id: string;
  public_vessel_id: string;
  timezone: string;
  earliest_departure: string;
  latest_return: string;
  slot_increment_minutes: number;
  fixed_start_times: string[] | null;
}

export interface AvailabilitySlot {
  start_time: string; // ISO 8601
  end_time: string;
  available: boolean;
}

// Internal Types (admin only)
export interface InternalVessel {
  id: string;
  public_vessel_id: string;
  internal_vessel_name: string | null;
  marina_name: string | null;
  provider_company: string | null;
  provider_contact: any;
  google_calendar_id: string | null;
  google_calendar_timezone: string | null;
  special_curfew_return_time: string | null;
  is_miami_beach_marina: boolean;
  notes_internal: string | null;
}

export interface InternalReservation {
  id: string;
  reservation_code: string;
  public_vessel_id: string;
  customer_id: string | null;
  start_time: string;
  end_time: string;
  duration_hours: number;
  guest_count: number | null;
  occasion: string | null;
  status: 'hold' | 'confirmed' | 'cancelled' | 'completed';
  hold_expires_at: string | null;
  notes_customer: string | null;
  notes_internal: string | null;
  created_at: string;
  updated_at: string;
}

export interface InternalCustomer {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string | null;
}

export type PaymentModel = 'split_payment' | 'full_collection' | 'flat_fee' | 'vendor_direct';
export type AddOnCategory = 'water_toys' | 'premium_services' | 'catering' | 'party_accessories';

export interface InternalAddOn {
  id: string;
  name: string;
  category: AddOnCategory;
  description: string | null;
  payment_model: PaymentModel;
  upfront_cents: number | null;
  total_cents: number | null;
  vendor_balance_cents: number | null;
  is_active: boolean;
}

// API Request/Response Types
export interface VesselSearchFilters {
  length_bucket?: LengthBucket;
  location_tag?: LocationTag;
  category?: Category;
  toys?: string[];
}

export interface AvailabilityRequest {
  vessel_code: string;
  date: string; // YYYY-MM-DD
  duration_hours: number;
}

export interface CreateHoldRequest {
  public_vessel_id: string;
  start_time: string; // ISO 8601
  duration_hours: number;
  customer: {
    email: string;
    phone: string;
    full_name: string;
  };
  guest_count?: number;
  occasion?: string;
}

export interface CreateHoldResponse {
  reservation_id: string;
  reservation_code: string;
  hold_expires_at: string;
}
