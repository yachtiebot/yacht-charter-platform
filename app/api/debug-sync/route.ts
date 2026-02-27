import { NextResponse } from 'next/server';

// Diagnostic endpoint to check Airtable sync status
// Access: /api/debug-sync

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {},
    airtableTest: null,
    cacheInfo: null
  };

  // Check environment variables (without exposing full keys)
  diagnostics.environment = {
    airtableConfigured: !!(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_ID),
    airtableKeyPresent: !!process.env.AIRTABLE_API_KEY,
    airtableKeyLength: process.env.AIRTABLE_API_KEY?.length || 0,
    airtableBaseId: process.env.AIRTABLE_BASE_ID ? `${process.env.AIRTABLE_BASE_ID.substring(0, 5)}...` : 'MISSING',
    airtableTableId: process.env.AIRTABLE_TABLE_ID || 'MISSING',
  };

  // Test Airtable connection if configured
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_ID) {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}?maxRecords=1`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          },
        }
      );

      diagnostics.airtableTest = {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      };

      if (response.ok) {
        const data = await response.json();
        diagnostics.airtableTest.recordCount = data.records?.length || 0;
        diagnostics.airtableTest.hasRecords = data.records?.length > 0;
        
        if (data.records?.[0]) {
          const firstRecord = data.records[0];
          diagnostics.airtableTest.sampleFields = Object.keys(firstRecord.fields);
          diagnostics.airtableTest.yachtId = firstRecord.fields['Yacht ID'];
          diagnostics.airtableTest.showOnWebsite = firstRecord.fields['Show on Website?'];
        }
      } else {
        diagnostics.airtableTest.error = await response.text();
      }
    } catch (error: any) {
      diagnostics.airtableTest = {
        error: error.message,
        stack: error.stack
      };
    }
  }

  // Check cache configuration
  try {
    const yachtCachePath = '/lib/yacht-cache.ts';
    diagnostics.cacheInfo = {
      note: 'Check CACHE_DURATION in yacht-cache.ts',
      currentSetting: 'Check source code - should be 900000 (15 minutes)',
      recommendation: 'Set to 900000 for 15-minute cache, or 0 for instant updates'
    };
  } catch (error: any) {
    diagnostics.cacheInfo = { error: error.message };
  }

  return NextResponse.json(diagnostics, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    }
  });
}
