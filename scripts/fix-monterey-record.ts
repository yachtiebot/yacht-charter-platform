#!/usr/bin/env npx tsx
import axios from 'axios';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const RECORD_ID = 'rec6YOKZKUbVeVlgn';

async function fixMonterey() {
  console.log('🔧 Fixing Monterey record...\n');
  
  // Update with correct data, removing photo URLs from Airtable
  const update = {
    fields: {
      'Yacht ID': '27-Monterey',
      'Boat Name': '27 ft Monterey Black',
      'Model': 'Black',
      'Sound System Type': 'Bluetooth/Aux',
      'Main Departure Location': 'Miami Beach',
      'Notes': ''  // Clear notes (remove gallery URLs)
    }
  };
  
  try {
    const response = await axios.patch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Yachts/${RECORD_ID}`,
      update,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Record updated successfully!');
    console.log('   Yacht ID:', response.data.fields['Yacht ID']);
    console.log('   Boat Name:', response.data.fields['Boat Name']);
    console.log('   Sound System:', response.data.fields['Sound System Type']);
    console.log('   Notes:', response.data.fields['Notes'] || '(empty)');
    
    // Note: Hero Image URL field cannot be set to null via API, only cleared in UI
    console.log('\n⚠️  Please manually clear "Hero Image URL" field in Airtable UI');
    
  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

fixMonterey();
