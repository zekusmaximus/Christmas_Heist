import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const imgDir = './client/public/assets/img';
const targetQuality = 75; // Good balance between quality and size

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  try {
    const files = await readdir(imgDir);
    const pngFiles = files.filter(f => f.endsWith('.png'));

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const file of pngFiles) {
      const inputPath = join(imgDir, file);
      const outputPath = join(imgDir, file); // Overwrite original
      const backupPath = join(imgDir, `${file}.backup`);

      try {
        // Get original size
        const { size: originalSize } = await sharp(inputPath).metadata();
        totalOriginalSize += originalSize;

        // Create backup first
        await sharp(inputPath).toFile(backupPath);

        // Optimize: reduce quality and resize if too large
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        let pipeline = sharp(inputPath);

        // If image is very large (>2000px wide), resize it
        if (metadata.width > 2000) {
          pipeline = pipeline.resize(2000, null, {
            fit: 'inside',
            withoutEnlargement: true
          });
        }

        // Convert to optimized format with quality setting
        await pipeline
          .png({
            quality: targetQuality,
            compressionLevel: 9,
            effort: 10
          })
          .toFile(outputPath + '.tmp');

        // Check new size
        const { size: newSize } = await sharp(outputPath + '.tmp').metadata();

        // Only use optimized version if it's actually smaller
        if (newSize < originalSize) {
          await sharp(outputPath + '.tmp').toFile(outputPath);
          totalOptimizedSize += newSize;

          const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
          const originalMB = (originalSize / 1024 / 1024).toFixed(2);
          const newMB = (newSize / 1024 / 1024).toFixed(2);

          console.log(`✓ ${file}`);
          console.log(`  ${originalMB}MB → ${newMB}MB (${reduction}% reduction)`);
        } else {
          // Keep original if optimization didn't help
          totalOptimizedSize += originalSize;
          console.log(`⊘ ${file} - keeping original (optimization didn't reduce size)`);
        }

        // Clean up temp file
        await sharp(outputPath + '.tmp').toFile('/dev/null').catch(() => {});

      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
        totalOptimizedSize += await sharp(inputPath).metadata().then(m => m.size);
      }
    }

    const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    const originalTotalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const optimizedTotalMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);

    console.log('\n' + '='.repeat(60));
    console.log('Optimization Complete!');
    console.log(`Total: ${originalTotalMB}MB → ${optimizedTotalMB}MB`);
    console.log(`Overall reduction: ${totalReduction}%`);
    console.log('='.repeat(60));
    console.log('\nNote: Original files backed up with .backup extension');

  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

optimizeImages();
