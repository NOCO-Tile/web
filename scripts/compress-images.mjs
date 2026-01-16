#!/usr/bin/env node

import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const PUBLIC_IMAGES_DIR = 'public/images';

async function getImageFiles(dir) {
  const files = [];
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (IMAGE_EXTENSIONS.includes(extname(entry).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();

  try {
    // Get original size
    const statsBefore = await stat(filePath);
    const sizeBefore = (statsBefore.size / 1024 / 1024).toFixed(2);

    // Compress based on file type
    if (ext === '.jpg' || ext === '.jpeg') {
      // Compress JPEG to 80% quality, progressive
      await execAsync(`npx sharp-cli -i "${filePath}" -o "${filePath}" -q 80 -p`);
    } else if (ext === '.png') {
      // Compress PNG to 80% quality
      await execAsync(`npx sharp-cli -i "${filePath}" -o "${filePath}" -q 80`);
    }

    // Get new size
    const statsAfter = await stat(filePath);
    const sizeAfter = (statsAfter.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - statsAfter.size / statsBefore.size) * 100).toFixed(1);

    console.log(`✓ ${filePath}: ${sizeBefore}MB → ${sizeAfter}MB (${savings}% reduction)`);
  } catch (error) {
    console.error(`✗ Failed to compress ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image compression...\n');

  const imageFiles = await getImageFiles(PUBLIC_IMAGES_DIR);
  console.log(`Found ${imageFiles.length} images to compress\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  // Get total size before
  for (const file of imageFiles) {
    const stats = await stat(file);
    totalBefore += stats.size;
  }

  // Compress each image
  for (const file of imageFiles) {
    await compressImage(file);
  }

  // Get total size after
  for (const file of imageFiles) {
    const stats = await stat(file);
    totalAfter += stats.size;
  }

  const totalSizeBefore = (totalBefore / 1024 / 1024).toFixed(2);
  const totalSizeAfter = (totalAfter / 1024 / 1024).toFixed(2);
  const totalSavings = ((1 - totalAfter / totalBefore) * 100).toFixed(1);

  console.log(`\n✅ Compression complete!`);
  console.log(`📊 Total: ${totalSizeBefore}MB → ${totalSizeAfter}MB (${totalSavings}% reduction)`);
}

main().catch(console.error);
