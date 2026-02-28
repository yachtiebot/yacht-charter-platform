#!/usr/bin/env npx tsx
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

async function testWaterToysAPI() {
  console.log('🔍 Testing Water Toys API...\n');
  
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Water%20Toys`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    
    console.log(`✅ Found ${data.records.length} products in Airtable\n`);
    
    data.records.forEach((record: any) => {
      const fields = record.fields;
      console.log(`📦 ${fields['Name'] || 'Unnamed'}`);
      console.log(`   Product ID: ${fields['Product ID'] || 'MISSING'}`);
      console.log(`   Price: $${fields['Price'] || 'N/A'}`);
      console.log(`   Description: ${fields['Description']?.substring(0, 50) || 'MISSING'}...`);
      console.log(`   Image URL: ${fields['Image URL']?.substring(0, 60) || 'MISSING'}...`);
      console.log('');
    });
    
    // Check for missing Product IDs
    const missingIds = data.records.filter((r: any) => !r.fields['Product ID']);
    if (missingIds.length > 0) {
      console.log(`⚠️  ${missingIds.length} products missing Product ID!`);
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

testWaterToysAPI();
