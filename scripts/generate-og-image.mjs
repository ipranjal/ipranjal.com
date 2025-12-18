#!/usr/bin/env node
/**
 * Convert og-image.svg to og-image.png for social media compatibility
 */

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function generateOGImage() {
  try {
    const svgBuffer = readFileSync(join(publicDir, 'og-image.svg'));
    
    await sharp(svgBuffer, { density: 300 })
      .resize(1200, 630)
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(join(publicDir, 'og-image.png'));
    
    console.log('✓ Generated og-image.png (1200x630)');
  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();
