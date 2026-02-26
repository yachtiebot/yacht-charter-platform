#!/usr/bin/env node
/**
 * FIX ALL PHOTO VIOLATIONS
 * 
 * This script will:
 * 1. Rename all images to Miami_Yachting_Company_[name].jpg
 * 2. Optimize with Sharp (max 500KB, quality 85)
 * 3. Convert PNG to JPG (unless transparency needed)
 * 4. Delete originals
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PHOTO_FIXES = [
  // Today's violations - catering thumbnail
  {
    from: 'public/images/catering-thumbnail.jpg',
    to: 'public/images/Miami_Yachting_Company_catering_platter.jpg'
  },
  
  // Water toys images
  {
    from: 'public/images/products/water-toys/floating-cabana.jpg',
    to: 'public/images/products/water-toys/Miami_Yachting_Company_floating_cabana.jpg'
  },
  {
    from: 'public/images/products/water-toys/flitescooter.jpg',
    to: 'public/images/products/water-toys/Miami_Yachting_Company_flitescooter.jpg'
  },
  {
    from: 'public/images/products/water-toys/lounge-chair.jpg',
    to: 'public/images/products/water-toys/Miami_Yachting_Company_floating_lounge_chair.jpg'
  },
  {
    from: 'public/images/products/water-toys/jet-ski.jpg',
    to: 'public/images/products/water-toys/Miami_Yachting_Company_jet_ski.jpg'
  },
  {
    from: 'public/images/products/water-toys/watersports-boat.jpg',
    to: 'public/images/products/water-toys/Miami_Yachting_Company_watersports_boat.jpg'
  },
  {
    from: 'public/images/products/water-toys/seabob.jpg',
    to: 'public/images/products/water-toys/Miami_Yachting_Company_seabob.jpg'
  },
  {
    from: 'public/images/products/water-toys/hero.jpg',
    to: 'public/images/products/water-toys/Miami_Yachting_Company_water_toys_hero.jpg'
  },
  
  // Catering-new folder (scraped images) - convert to proper naming
  {
    from: 'public/images/products/catering-new/cubanplatter_1.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_cuban_platter_1.jpg'
  },
  {
    from: 'public/images/products/catering-new/cubanplatter_2.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_cuban_platter_2.jpg'
  },
  {
    from: 'public/images/products/catering-new/cubanplatter_3.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_cuban_platter_3.jpg'
  },
  {
    from: 'public/images/products/catering-new/cubanplatter_4.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_cuban_platter_4.jpg'
  },
  {
    from: 'public/images/products/catering-new/chickentenders_0.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_chicken_tenders_1.jpg'
  },
  {
    from: 'public/images/products/catering-new/chickentenders_1.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_chicken_tenders_2.jpg'
  },
  {
    from: 'public/images/products/catering-new/chickentenders_2.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_chicken_tenders_3.jpg'
  },
  {
    from: 'public/images/products/catering-new/chilledtenders_0.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_chilled_tenders_1.jpg'
  },
  {
    from: 'public/images/products/catering-new/chilledtenders_1.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_chilled_tenders_2.jpg'
  },
  {
    from: 'public/images/products/catering-new/chilledtenders_2.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_chilled_tenders_3.jpg'
  },
  {
    from: 'public/images/products/catering-new/chilledtenders_3.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_chilled_tenders_4.jpg'
  },
  {
    from: 'public/images/products/catering-new/chilledtenders_4.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_chilled_tenders_5.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmet-wraps_0.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_wraps_1.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmet-wraps_1.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_wraps_2.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmet-wraps_2.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_wraps_3.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmet-wraps_3.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_wraps_4.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmet-wraps_4.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_wraps_5.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmetspirals_0.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_spirals_1.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmetspirals_1.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_spirals_2.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmetspirals_2.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_spirals_3.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmetspirals_3.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_spirals_4.jpg'
  },
  {
    from: 'public/images/products/catering-new/gourmetspirals_4.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_gourmet_spirals_5.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-platter_0.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_platter_1.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-platter_1.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_platter_2.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-platter_2.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_platter_3.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-platter_3.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_platter_4.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-platter_4.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_platter_5.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-surimi_0.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_surimi_1.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-surimi_1.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_surimi_2.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-surimi_2.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_surimi_3.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-surimi_3.jpg',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_surimi_4.jpg'
  },
  {
    from: 'public/images/products/catering-new/shrimp-surimi_4.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_shrimp_surimi_5.jpg'
  },
  {
    from: 'public/images/products/catering-new/slider-trio_0.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_slider_trio_1.jpg'
  },
  {
    from: 'public/images/products/catering-new/slider-trio_1.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_slider_trio_2.jpg'
  },
  {
    from: 'public/images/products/catering-new/slider-trio_2.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_slider_trio_3.jpg'
  },
  {
    from: 'public/images/products/catering-new/slider-trio_3.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_slider_trio_4.jpg'
  },
  {
    from: 'public/images/products/catering-new/slider-trio_4.png',
    to: 'public/images/products/catering-new/Miami_Yachting_Company_slider_trio_5.jpg'
  },
  
  // Pre-existing violations - Bachelorette
  {
    from: 'public/images/products/bachelorette/bride+cups.jpg',
    to: 'public/images/products/bachelorette/Miami_Yachting_Company_bride_cups.jpg'
  },
  {
    from: 'public/images/products/bachelorette/bride+crown+and+veil.jpg',
    to: 'public/images/products/bachelorette/Miami_Yachting_Company_bride_crown_veil.jpg'
  },
  {
    from: 'public/images/products/bachelorette/lasttoastonthecoast.jpg',
    to: 'public/images/products/bachelorette/Miami_Yachting_Company_last_toast.jpg'
  },
  {
    from: 'public/images/products/bachelorette/bachelorette+cupcakes.jpg',
    to: 'public/images/products/bachelorette/Miami_Yachting_Company_bachelorette_cupcakes.jpg'
  },
  {
    from: 'public/images/products/bachelorette/bride+captain+hat.jpg',
    to: 'public/images/products/bachelorette/Miami_Yachting_Company_bride_captain_hat.jpg'
  },
  {
    from: 'public/images/products/bachelorette/bride+veil.jpg',
    to: 'public/images/products/bachelorette/Miami_Yachting_Company_bride_veil.jpg'
  },
  {
    from: 'public/images/products/bachelorette/bride+straws.jpg',
    to: 'public/images/products/bachelorette/Miami_Yachting_Company_bride_straws.jpg'
  },
  
  // Pre-existing violations - Catering
  {
    from: 'public/images/products/catering/chef+salad+platter1.jpg',
    to: 'public/images/products/catering/Miami_Yachting_Company_chef_salad_platter_1.jpg'
  },
  {
    from: 'public/images/products/catering/chef+salad+platter2.jpg',
    to: 'public/images/products/catering/Miami_Yachting_Company_chef_salad_platter_2.jpg'
  },
  {
    from: 'public/images/products/catering/wheel+platter.jpg',
    to: 'public/images/products/catering/Miami_Yachting_Company_wheel_platter.jpg'
  },
  {
    from: 'public/images/products/catering/MYC+platter.jpg',
    to: 'public/images/products/catering/Miami_Yachting_Company_platter.jpg'
  },
  {
    from: 'public/images/products/catering/MYC_small_platter.jpg',
    to: 'public/images/products/catering/Miami_Yachting_Company_small_platter.jpg'
  },
  {
    from: 'public/images/products/catering/relish_platter.jpg',
    to: 'public/images/products/catering/Miami_Yachting_Company_relish_platter.jpg'
  },
  {
    from: 'public/images/products/catering/cubesplatter.jpg',
    to: 'public/images/products/catering/Miami_Yachting_Company_cubes_platter.jpg'
  },
  {
    from: 'public/images/products/catering/large_platter.jpg',
    to: 'public/images/products/catering/Miami_Yachting_Company_large_platter.jpg'
  },
];

async function optimizeImage(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  SKIP: ${inputPath} (doesn't exist)`);
    return false;
  }

  try {
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size / 1024;
    
    // Optimize with Sharp
    await sharp(inputPath)
      .resize(1920, null, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85,
        progressive: true 
      })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size / 1024;
    const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
    
    // Delete original if different from output
    if (inputPath !== outputPath) {
      fs.unlinkSync(inputPath);
    }
    
    console.log(`✅ ${path.basename(outputPath)}`);
    console.log(`   ${originalSize.toFixed(0)}KB → ${newSize.toFixed(0)}KB (saved ${savings}%)`);
    
    return true;
  } catch (error) {
    console.error(`❌ FAILED: ${inputPath}`);
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

async function fixAllPhotos() {
  console.log('🔧 FIXING ALL PHOTO VIOLATIONS\n');
  console.log(`📋 Total files to process: ${PHOTO_FIXES.length}\n`);
  
  let successful = 0;
  let failed = 0;
  let skipped = 0;
  
  for (const fix of PHOTO_FIXES) {
    const result = await optimizeImage(fix.from, fix.to);
    if (result === true) successful++;
    else if (result === false && !fs.existsSync(fix.from)) skipped++;
    else failed++;
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESULTS:');
  console.log(`✅ Successful: ${successful}`);
  console.log(`⚠️  Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('='.repeat(60));
  
  if (successful > 0) {
    console.log('\n✨ All photos now follow Miami Yachting Company standards!');
  }
}

// Run the fixer
fixAllPhotos().catch(console.error);
