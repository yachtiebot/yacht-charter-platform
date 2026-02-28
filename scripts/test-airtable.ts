#!/usr/bin/env tsx
/**
 * Test Airtable connection and show Vessels table fields
 */

import axios from 'axios';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

async function main() {
  console.log('🔍 Testing Airtable connection...\n');
  
  if (!AIRTABLE_API_KEY) {
    console.error('❌ AIRTABLE_API_KEY not found in environment');
    process.exit(1);
  }
  
  if (!AIRTABLE_BASE_ID) {
    console.error('❌ AIRTABLE_BASE_ID not found in environment');
    process.exit(1);
  }
  
  console.log(`✅ API Key: ${AIRTABLE_API_KEY.substring(0, 10)}...`);
  console.log(`✅ Base ID: ${AIRTABLE_BASE_ID}\n`);
  
  try {
    // Fetch Yachts table
    console.log('📡 Fetching Yachts table...');
    const response = await axios.get(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Yachts?maxRecords=1`,
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        }
      }
    );
    
    console.log(`✅ Successfully connected to Airtable\n`);
    
    if (response.data.records.length > 0) {
      const firstRecord = response.data.records[0];
      console.log('📋 Available fields in Yachts table:');
      console.log('═'.repeat(50));
      Object.keys(firstRecord.fields).sort().forEach(field => {
        const value = firstRecord.fields[field];
        const type = typeof value;
        const preview = type === 'string' && value.length > 50 
          ? value.substring(0, 50) + '...' 
          : value;
        console.log(`  • ${field} (${type}): ${JSON.stringify(preview)}`);
      });
    } else {
      console.log('⚠️  No records found in Yachts table');
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

main();
