#!/usr/bin/env npx tsx
import axios from 'axios';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const RECORD_ID = 'recvnnlgTqFTBr04G';

async function fix() {
  console.log('🔧 Fixing 27 Monterey location field...\n');
  
  const update = {
    fields: {
      'Main Departure Location': 'Miami Beach'
    }
  };
  
  try {
    await axios.patch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Yachts/${RECORD_ID}`,
      update,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Fixed! Location now: Miami Beach');
  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

fix();
