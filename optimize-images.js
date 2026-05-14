import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const folders = [

  'public/banner'
];

async function optimizeFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(folderPath, file.name);

      if (file.isDirectory()) {
        await optimizeFolder(fullPath);
        continue;
      }

      if (file.name.match(/\.(jpg|jpeg|png)$/i) && !file.name.includes('_thumb') && !file.name.includes('_med')) {
        const buffer = await fs.readFile(fullPath);
        const ext = path.extname(file.name).toLowerCase();
        const baseName = path.basename(file.name, ext);

        console.log(`Processing: ${file.name}`);

        // Thumbnail (300px)
        await sharp(buffer).resize(300).avif({ quality: 60 }).toFile(path.join(folderPath, `${baseName}_thumb.avif`));
        await sharp(buffer).resize(300).webp({ quality: 60 }).toFile(path.join(folderPath, `${baseName}_thumb.webp`));

        // Medium (600px)
        await sharp(buffer).resize(600).avif({ quality: 60 }).toFile(path.join(folderPath, `${baseName}_med.avif`));
        await sharp(buffer).resize(600).webp({ quality: 60 }).toFile(path.join(folderPath, `${baseName}_med.webp`));

        // Standard AVIF
        await sharp(buffer).avif({ quality: 60 }).toFile(path.join(folderPath, `${baseName}.avif`));
        // Standard WebP
        await sharp(buffer).webp({ quality: 60 }).toFile(path.join(folderPath, `${baseName}.webp`));

        console.log(`Optimized: ${file.name}`);
      }
    }
  } catch (err) {
    console.error(`Error in ${folderPath}:`, err);
  }
}

async function start() {
  console.log('Optimizing all folders...');
  for (const folder of folders) {
    const absolutePath = path.resolve(folder);
    try {
      await fs.access(absolutePath);
      await optimizeFolder(absolutePath);
    } catch (e) { }
  }
  console.log('Complete!');
}

start();
