/**
 * PDF Image Extractor
 * 
 * Downloads PDF from Dropbox and extracts images
 */

import https from 'https';
import { writeFileSync, unlinkSync, readFileSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const DROPBOX_REFRESH_TOKEN = 'YyrJI2fZ8s0AAAAAAAAAAYjQXGmNy4deO2XMka5B2nuA1JzS-f6ThExuz1FpHj08';
const DROPBOX_CLIENT_ID = 'kjl4jhjq9taugf3';
const DROPBOX_CLIENT_SECRET = 'lzvh7q4q3tpk2vt';

async function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: DROPBOX_REFRESH_TOKEN,
      client_id: DROPBOX_CLIENT_ID,
      client_secret: DROPBOX_CLIENT_SECRET
    }).toString();

    const options = {
      hostname: 'api.dropboxapi.com',
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data).access_token));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function checkPdfExists(yachtId: string): Promise<boolean> {
  try {
    const token = await getAccessToken();
    const dropboxPath = `/PDF/${yachtId}.pdf`;
    
    return new Promise((resolve) => {
      const postData = JSON.stringify({ path: dropboxPath });
      
      const options = {
        hostname: 'api.dropboxapi.com',
        path: '/2/files/get_metadata',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
      req.write(postData);
      req.end();
    });
  } catch {
    return false;
  }
}

async function downloadPdf(yachtId: string, localPath: string): Promise<void> {
  const token = await getAccessToken();
  const dropboxPath = `/PDF/${yachtId}.pdf`;
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'content.dropboxapi.com',
      path: '/2/files/download',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Dropbox-API-Arg': JSON.stringify({ path: dropboxPath })
      }
    };

    const chunks: Buffer[] = [];
    const req = https.request(options, (res) => {
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        writeFileSync(localPath, Buffer.concat(chunks));
        resolve();
      });
    });
    req.on('error', reject);
    req.end();
  });
}

export async function extractImagesFromPdf(yachtId: string): Promise<string[]> {
  console.log(`\n📄 Checking for PDF in Dropbox: /PDF/${yachtId}.pdf`);
  
  // Check if PDF exists
  const exists = await checkPdfExists(yachtId);
  if (!exists) {
    console.log('   ❌ PDF not found in Dropbox');
    return [];
  }
  
  console.log('   ✅ PDF found! Downloading...');
  
  // Download PDF
  const tempDir = join(process.cwd(), 'temp');
  if (!require('fs').existsSync(tempDir)) {
    require('fs').mkdirSync(tempDir, { recursive: true });
  }
  
  const pdfPath = join(tempDir, `${yachtId}.pdf`);
  await downloadPdf(yachtId, pdfPath);
  
  console.log('   ✅ Downloaded PDF');
  
  // Get PDF page count
  const pageCountOutput = execSync(`pdfinfo "${pdfPath}" | grep Pages`).toString();
  const pageCount = parseInt(pageCountOutput.split(':')[1].trim());
  
  console.log(`   📄 PDF has ${pageCount} pages`);
  console.log('   🖼️  Extracting images (skipping page 1 and last page)...');
  
  // Extract images (skip page 1 and last page)
  const extractDir = join(tempDir, `${yachtId}-images`);
  if (!require('fs').existsSync(extractDir)) {
    require('fs').mkdirSync(extractDir, { recursive: true });
  }
  
  // Extract pages 2 to (pageCount - 1)
  execSync(`pdfimages -f 2 -l ${pageCount - 1} -j "${pdfPath}" "${extractDir}/img"`);
  
  // Get extracted image files
  const imageFiles = readdirSync(extractDir)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .map(f => join(extractDir, f));
  
  console.log(`   ✅ Extracted ${imageFiles.length} images from PDF`);
  
  // Clean up PDF
  unlinkSync(pdfPath);
  
  return imageFiles;
}

export function cleanupPdfTemp(yachtId: string): void {
  const tempDir = join(process.cwd(), 'temp');
  const extractDir = join(tempDir, `${yachtId}-images`);
  
  try {
    if (require('fs').existsSync(extractDir)) {
      readdirSync(extractDir).forEach(file => {
        unlinkSync(join(extractDir, file));
      });
      require('fs').rmdirSync(extractDir);
    }
  } catch (err) {
    // Silent fail on cleanup
  }
}
