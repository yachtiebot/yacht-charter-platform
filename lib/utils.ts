import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate unique reservation code
export function generateReservationCode(): string {
  const prefix = 'MYC';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// Format currency
export function formatCurrency(cents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

// Derive length bucket from length_ft
export function deriveLengthBucket(lengthFt: number): string {
  if (lengthFt >= 20 && lengthFt < 40) return '20-40 ft';
  if (lengthFt >= 40 && lengthFt < 60) return '40-60 ft';
  if (lengthFt >= 60 && lengthFt < 80) return '60-80 ft';
  if (lengthFt >= 80 && lengthFt < 100) return '80-100 ft';
  if (lengthFt >= 100) return '100+ ft';
  throw new Error(`Invalid length: ${lengthFt}`);
}

// Check if time ranges overlap
export function timeRangesOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && end1 > start2;
}

// Calculate hold expiration (15 minutes from now)
export function calculateHoldExpiration(): Date {
  return new Date(Date.now() + 15 * 60 * 1000);
}
