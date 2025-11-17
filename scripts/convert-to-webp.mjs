import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, parse } from 'path';

const imgDir = './client/public/assets/img';
const targetQuality = 80; // Good quality for WebP

async function convertToWebP() {
  console.log('Converting PNG images to WebP...\n');

  try {
    const files = await readdir(imgDir);
    const pngFiles = files.filter(f => f.endsWith('.png') && !f.endsWith('.backup'));

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const file of pngFiles) {
      const inputPath = join(imgDir, file);
      const { name } = parse(file);
      const outputPath = join(imgDir, `${name}.webp`);

      try {
        // Get original size
        const inputStats = await sharp(inputPath).metadata();
        const originalSize = inputStats.size || 0;
        totalOriginalSize += originalSize;

        // Convert to WebP
        await sharp(inputPath)
          .webp({ quality: targetQuality, effort: 6 })
          .toFile(outputPath);

        // Get new size
        const outputStats = await sharp(outputPath).metadata();
        const newSize = outputStats.size || 0;
        totalOptimizedSize += newSize;

        const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        const originalMB = (originalSize / 1024 / 1024).toFixed(2);
        const newMB = (newSize / 1024 / 1024).toFixed(2);

        console.log(`✓ ${file} → ${name}.webp`);
        console.log(`  ${originalMB}MB → ${newMB}MB (${reduction}% reduction)\n`);

      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
      }
    }

    const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    const originalTotalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const optimizedTotalMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);

    console.log('='.repeat(60));
    console.log('Conversion Complete!');
    console.log(`Total: ${originalTotalMB}MB → ${optimizedTotalMB}MB`);
    console.log(`Overall reduction: ${totalReduction}%`);
    console.log('='.repeat(60));
    console.log('\nNext steps:');
    console.log('1. Update component image sources from .png to .webp');
    console.log('2. Test that all images load correctly');
    console.log('3. Delete .png files if satisfied with WebP versions');

  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convertToWebP();
