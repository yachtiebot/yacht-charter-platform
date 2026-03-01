import { NextRequest, NextResponse } from 'next/server';

// Admin API to add Vendor Email field to Water Toys table
export async function POST(request: NextRequest) {
  try {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Missing Airtable credentials' },
        { status: 500 }
      );
    }

    console.log('Fetching Water Toys table metadata...');

    // Get table metadata
    const metadataUrl = `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`;
    
    const response = await fetch(metadataUrl, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch table metadata', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Find Water Toys table
    const waterToysTable = data.tables?.find((t: any) => t.name === 'Water Toys');
    
    if (!waterToysTable) {
      return NextResponse.json(
        { 
          error: 'Water Toys table not found',
          availableTables: data.tables?.map((t: any) => t.name)
        },
        { status: 404 }
      );
    }

    console.log('Found Water Toys table:', waterToysTable.id);

    // Check if Vendor Email field already exists
    const hasVendorEmail = waterToysTable.fields?.some((f: any) => f.name === 'Vendor Email');
    
    if (hasVendorEmail) {
      return NextResponse.json({
        success: true,
        message: 'Vendor Email field already exists',
        tableId: waterToysTable.id
      });
    }

    console.log('Adding Vendor Email field...');

    // Add the field
    const updateUrl = `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables/${waterToysTable.id}/fields`;
    
    const addFieldResponse = await fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Vendor Email',
        type: 'singleLineText',
        description: 'Vendor email to CC on waiver confirmations (leave blank for no CC)'
      })
    });

    const result = await addFieldResponse.json();

    if (addFieldResponse.ok) {
      return NextResponse.json({
        success: true,
        message: 'Successfully added Vendor Email field!',
        field: result
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to add field', details: result },
        { status: addFieldResponse.status }
      );
    }

  } catch (error: any) {
    console.error('Error adding field:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
