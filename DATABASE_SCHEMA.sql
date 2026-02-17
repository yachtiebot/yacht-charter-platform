-- DATABASE_SCHEMA.sql
-- Miami Yachting Company - Yacht Charter Platform
-- Public/Internal Schema Separation for Security

-- ============================================
-- PUBLIC SCHEMA (Read-only for public API)
-- ============================================

-- Table: public_vessels
-- Only contains data safe for public display
CREATE TABLE public_vessels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_code TEXT UNIQUE NOT NULL,
    make TEXT NOT NULL,
    model TEXT,
    length_ft INTEGER NOT NULL,
    length_bucket TEXT NOT NULL CHECK (length_bucket IN ('20-40 ft', '40-60 ft', '60-80 ft', '80-100 ft', '100+ ft')),
    category TEXT NOT NULL CHECK (category IN ('day boat', 'luxury yacht', 'super yacht', 'event vessels')),
    location_tag TEXT NOT NULL CHECK (location_tag IN ('Miami', 'Miami Beach', 'Key Biscayne', 'Coconut Grove', 'Hollywood', 'Fort Lauderdale')),
    capacity_guests INTEGER,
    min_hours INTEGER NOT NULL,
    max_hours INTEGER NOT NULL,
    allowed_durations INTEGER[] NOT NULL,
    toys TEXT[] NOT NULL DEFAULT '{}',
    amenities TEXT[] NOT NULL DEFAULT '{}',
    hero_image_url TEXT,
    gallery_image_urls TEXT[] NOT NULL DEFAULT '{}',
    public_description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_public_vessels_active ON public_vessels(is_active);
CREATE INDEX idx_public_vessels_category ON public_vessels(category);
CREATE INDEX idx_public_vessels_location ON public_vessels(location_tag);
CREATE INDEX idx_public_vessels_length_bucket ON public_vessels(length_bucket);

-- Table: public_pricing_rules
CREATE TABLE public_pricing_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_vessel_id UUID NOT NULL REFERENCES public_vessels(id) ON DELETE CASCADE,
    currency TEXT NOT NULL DEFAULT 'usd',
    base_rates JSONB NOT NULL, -- {"2": 120000, "3": 150000, "4": 180000, "6": 240000, "8": 300000, "24": 900000}
    extra_hour_cents INTEGER,
    deposit_policy JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_public_pricing_vessel ON public_pricing_rules(public_vessel_id);

-- Table: public_schedule_rules
CREATE TABLE public_schedule_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_vessel_id UUID NOT NULL REFERENCES public_vessels(id) ON DELETE CASCADE,
    timezone TEXT NOT NULL DEFAULT 'America/New_York',
    earliest_departure TIME NOT NULL DEFAULT '09:00',
    latest_return TIME NOT NULL DEFAULT '21:00',
    slot_increment_minutes INTEGER NOT NULL DEFAULT 30,
    fixed_start_times TIME[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_public_schedule_vessel ON public_schedule_rules(public_vessel_id);

-- Table: public_availability_blocks
-- Generic busy blocks without sensitive info
CREATE TABLE public_availability_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_vessel_id UUID NOT NULL REFERENCES public_vessels(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    block_type TEXT NOT NULL CHECK (block_type IN ('internal_block', 'external_calendar_block', 'confirmed_reservation', 'hold')),
    source TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_public_avail_vessel_time ON public_availability_blocks(public_vessel_id, start_time, end_time);
CREATE INDEX idx_public_avail_block_type ON public_availability_blocks(block_type);

-- ============================================
-- INTERNAL SCHEMA (Admin-only access)
-- ============================================

-- Table: internal_vessels
-- Contains sensitive operational data
CREATE TABLE internal_vessels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_vessel_id UUID UNIQUE NOT NULL REFERENCES public_vessels(id) ON DELETE CASCADE,
    internal_vessel_name TEXT,
    marina_name TEXT, -- NEVER expose publicly
    provider_company TEXT,
    provider_contact JSONB,
    google_calendar_id TEXT,
    google_calendar_timezone TEXT,
    special_curfew_return_time TIME, -- For Miami Beach Marina 8pm rule
    is_miami_beach_marina BOOLEAN DEFAULT FALSE,
    notes_internal TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_vessels_public ON internal_vessels(public_vessel_id);

-- Table: internal_calendar_sources
CREATE TABLE internal_calendar_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    internal_vessel_id UUID NOT NULL REFERENCES internal_vessels(id) ON DELETE CASCADE,
    google_calendar_id TEXT NOT NULL,
    sync_token TEXT,
    last_synced_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_internal_calendar_vessel ON internal_calendar_sources(internal_vessel_id);

-- Table: internal_external_calendar_events
CREATE TABLE internal_external_calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    internal_vessel_id UUID NOT NULL REFERENCES internal_vessels(id) ON DELETE CASCADE,
    external_event_id TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'deleted')),
    raw_payload JSONB,
    last_seen_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_external_events_vessel ON internal_external_calendar_events(internal_vessel_id);
CREATE INDEX idx_internal_external_events_time ON internal_external_calendar_events(start_time, end_time);

-- Table: internal_customers
CREATE TABLE internal_customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT,
    phone TEXT,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_customers_email ON internal_customers(email);

-- Table: internal_reservations
CREATE TABLE internal_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_code TEXT UNIQUE NOT NULL,
    public_vessel_id UUID NOT NULL REFERENCES public_vessels(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES internal_customers(id) ON DELETE SET NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    duration_hours INTEGER NOT NULL,
    guest_count INTEGER,
    occasion TEXT,
    status TEXT NOT NULL CHECK (status IN ('hold', 'confirmed', 'cancelled', 'completed')),
    hold_expires_at TIMESTAMPTZ,
    notes_customer TEXT,
    notes_internal TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_reservations_vessel ON internal_reservations(public_vessel_id);
CREATE INDEX idx_internal_reservations_customer ON internal_reservations(customer_id);
CREATE INDEX idx_internal_reservations_status ON internal_reservations(status);
CREATE INDEX idx_internal_reservations_time ON internal_reservations(start_time, end_time);

-- Table: internal_payments
CREATE TABLE internal_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES internal_reservations(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_checkout_session_id TEXT,
    stripe_payment_intent_id TEXT,
    amount_cents INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
    stripe_event_id TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_payments_reservation ON internal_payments(reservation_id);
CREATE INDEX idx_internal_payments_stripe_session ON internal_payments(stripe_checkout_session_id);

-- Table: internal_documents
CREATE TABLE internal_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES internal_reservations(id) ON DELETE CASCADE,
    doc_type TEXT NOT NULL CHECK (doc_type IN ('waiver', 'contract', 'invoice', 'receipt')),
    file_url TEXT,
    status TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_documents_reservation ON internal_documents(reservation_id);
CREATE INDEX idx_internal_documents_type ON internal_documents(doc_type);

-- Table: internal_audit_log
CREATE TABLE internal_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID,
    actor_email TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_audit_created ON internal_audit_log(created_at);
CREATE INDEX idx_internal_audit_actor ON internal_audit_log(actor_email);

-- Table: internal_add_ons
CREATE TABLE internal_add_ons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('water_toys', 'premium_services', 'catering', 'party_accessories')),
    description TEXT,
    payment_model TEXT NOT NULL CHECK (payment_model IN ('split_payment', 'full_collection', 'flat_fee', 'vendor_direct')),
    upfront_cents INTEGER, -- For split_payment model
    total_cents INTEGER, -- Full price
    vendor_balance_cents INTEGER, -- For split_payment or full_collection
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_addons_category ON internal_add_ons(category);
CREATE INDEX idx_internal_addons_active ON internal_add_ons(is_active);

-- Table: internal_reservation_add_ons
CREATE TABLE internal_reservation_add_ons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES internal_reservations(id) ON DELETE CASCADE,
    add_on_id UUID NOT NULL REFERENCES internal_add_ons(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    upfront_paid_cents INTEGER,
    vendor_balance_cents INTEGER,
    payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'upfront_paid', 'fully_paid', 'vendor_direct')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_internal_reservation_addons_reservation ON internal_reservation_add_ons(reservation_id);

-- ============================================
-- DATABASE ROLES & PERMISSIONS
-- ============================================

-- Create read-only role for public API
-- CREATE ROLE public_reader;
-- GRANT SELECT ON public_vessels, public_pricing_rules, public_schedule_rules, public_availability_blocks TO public_reader;

-- Create admin role with full access
-- CREATE ROLE admin_role;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO admin_role;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function: Derive length_bucket from length_ft
CREATE OR REPLACE FUNCTION derive_length_bucket(length INTEGER)
RETURNS TEXT AS $$
BEGIN
    CASE
        WHEN length >= 20 AND length < 40 THEN RETURN '20-40 ft';
        WHEN length >= 40 AND length < 60 THEN RETURN '40-60 ft';
        WHEN length >= 60 AND length < 80 THEN RETURN '60-80 ft';
        WHEN length >= 80 AND length < 100 THEN RETURN '80-100 ft';
        WHEN length >= 100 THEN RETURN '100+ ft';
        ELSE RETURN NULL;
    END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger: Auto-set length_bucket on insert/update
CREATE OR REPLACE FUNCTION set_length_bucket()
RETURNS TRIGGER AS $$
BEGIN
    NEW.length_bucket := derive_length_bucket(NEW.length_ft);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_length_bucket
BEFORE INSERT OR UPDATE ON public_vessels
FOR EACH ROW
EXECUTE FUNCTION set_length_bucket();

-- Trigger: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_public_vessels_timestamp
BEFORE UPDATE ON public_vessels
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_internal_vessels_timestamp
BEFORE UPDATE ON internal_vessels
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_internal_reservations_timestamp
BEFORE UPDATE ON internal_reservations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CONFLICT PREVENTION
-- ============================================

-- Function: Check for overlapping reservations
CREATE OR REPLACE FUNCTION check_reservation_overlap()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM internal_reservations
        WHERE public_vessel_id = NEW.public_vessel_id
        AND status IN ('confirmed', 'hold')
        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
        AND (
            (NEW.start_time >= start_time AND NEW.start_time < end_time)
            OR (NEW.end_time > start_time AND NEW.end_time <= end_time)
            OR (NEW.start_time <= start_time AND NEW.end_time >= end_time)
        )
    ) THEN
        RAISE EXCEPTION 'Reservation time conflicts with existing booking';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_reservation_overlap
BEFORE INSERT OR UPDATE ON internal_reservations
FOR EACH ROW
EXECUTE FUNCTION check_reservation_overlap();
