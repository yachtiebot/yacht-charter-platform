-- SAMPLE_DATA.sql
-- Sample yacht data to demonstrate the design
-- Run this after DATABASE_SCHEMA.sql to see the site with real content

-- Insert sample vessels
INSERT INTO public_vessels (
  public_code,
  make,
  model,
  length_ft,
  category,
  location_tag,
  capacity_guests,
  min_hours,
  max_hours,
  allowed_durations,
  toys,
  amenities,
  hero_image_url,
  gallery_image_urls,
  public_description,
  is_active
) VALUES
(
  'sunseeker-68-miami-beach',
  'Sunseeker',
  'Manhattan 68',
  68,
  'luxury yacht',
  'Miami Beach',
  12,
  4,
  8,
  ARRAY[4, 6, 8],
  ARRAY['Jet Ski', 'Seabob', 'Inflatables', 'Paddleboards'],
  ARRAY['Air Conditioning', 'Premium Sound System', 'Full Galley', 'Master Stateroom', 'Flybridge'],
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80'
  ],
  'Elegant 68-foot Sunseeker featuring a spacious flybridge, luxurious accommodations, and premium water toys. Perfect for entertaining or celebrating special occasions on Biscayne Bay.',
  true
),
(
  'azimut-55-key-biscayne',
  'Azimut',
  '55 Flybridge',
  55,
  'luxury yacht',
  'Key Biscayne',
  10,
  4,
  8,
  ARRAY[4, 6, 8],
  ARRAY['Seabob', 'Inflatables', 'Snorkel Gear'],
  ARRAY['Air Conditioning', 'Sound System', 'Full Galley', 'Three Staterooms'],
  'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1622401123028-b0fc4e6dd96b?w=1200&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80'
  ],
  'Sophisticated Azimut offering Italian craftsmanship and comfortable cruising. Ideal for island hopping and sandbar visits from Key Biscayne.',
  true
),
(
  'searay-52-coconut-grove',
  'Sea Ray',
  'Sundancer 52',
  52,
  'day boat',
  'Coconut Grove',
  8,
  3,
  6,
  ARRAY[3, 4, 6],
  ARRAY['Jet Ski', 'Paddleboards'],
  ARRAY['Air Conditioning', 'Sound System', 'Wet Bar'],
  'https://images.unsplash.com/photo-1606845465243-b5be7202025e?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1575581381481-cd0f45468052?w=1200&q=80'
  ],
  'Sporty and stylish Sea Ray perfect for day cruises. Excellent for exploring Biscayne Bay with friends and family.',
  true
),
(
  'pershing-70-miami-beach',
  'Pershing',
  '70',
  70,
  'super yacht',
  'Miami Beach',
  12,
  6,
  24,
  ARRAY[6, 8, 24],
  ARRAY['Jet Ski', 'Seabob', 'Jacuzzi', 'Tender'],
  ARRAY['Air Conditioning', 'Premium Audio/Visual', 'Full Galley', 'Master Suite', 'VIP Staterooms', 'Crew Quarters'],
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80'
  ],
  'High-performance luxury yacht with sleek Italian design. Features spacious deck areas, premium amenities, and thrilling speed capabilities.',
  true
),
(
  'beneteau-45-fort-lauderdale',
  'Beneteau',
  'Oceanis 45',
  45,
  'day boat',
  'Fort Lauderdale',
  8,
  3,
  8,
  ARRAY[3, 4, 6, 8],
  ARRAY['Paddleboards', 'Snorkel Gear'],
  ARRAY['Sound System', 'Galley', 'Cabin'],
  'https://images.unsplash.com/photo-1606845465243-b5be7202025e?w=1200&q=80',
  ARRAY[]::text[],
  'Classic sailing yacht perfect for relaxed day cruises along the coast. Comfortable cockpit and smooth sailing experience.',
  true
);

-- Insert pricing for each vessel
INSERT INTO public_pricing_rules (public_vessel_id, currency, base_rates) VALUES
(
  (SELECT id FROM public_vessels WHERE public_code = 'sunseeker-68-miami-beach'),
  'usd',
  '{"4": 320000, "6": 450000, "8": 580000}'::jsonb
),
(
  (SELECT id FROM public_vessels WHERE public_code = 'azimut-55-key-biscayne'),
  'usd',
  '{"4": 280000, "6": 400000, "8": 520000}'::jsonb
),
(
  (SELECT id FROM public_vessels WHERE public_code = 'searay-52-coconut-grove'),
  'usd',
  '{"3": 180000, "4": 220000, "6": 300000}'::jsonb
),
(
  (SELECT id FROM public_vessels WHERE public_code = 'pershing-70-miami-beach'),
  'usd',
  '{"6": 500000, "8": 650000, "24": 1800000}'::jsonb
),
(
  (SELECT id FROM public_vessels WHERE public_code = 'beneteau-45-fort-lauderdale'),
  'usd',
  '{"3": 150000, "4": 180000, "6": 250000, "8": 320000}'::jsonb
);

-- Insert schedule rules
INSERT INTO public_schedule_rules (public_vessel_id, timezone, earliest_departure, latest_return) 
SELECT 
  id,
  'America/New_York',
  '09:00'::time,
  CASE 
    WHEN location_tag = 'Miami Beach' THEN '20:00'::time  -- Special 8pm curfew
    ELSE '21:00'::time
  END
FROM public_vessels;

-- Insert internal vessel data (with marina names - never shown publicly)
INSERT INTO internal_vessels (public_vessel_id, internal_vessel_name, marina_name, is_miami_beach_marina)
SELECT 
  id,
  make || ' ' || model,
  CASE location_tag
    WHEN 'Miami Beach' THEN 'Miami Beach Marina'
    WHEN 'Key Biscayne' THEN 'Crandon Park Marina'
    WHEN 'Coconut Grove' THEN 'Grove Harbour Marina'
    WHEN 'Fort Lauderdale' THEN 'Bahia Mar Marina'
    ELSE 'Bayside Marina'
  END,
  location_tag = 'Miami Beach'
FROM public_vessels;
