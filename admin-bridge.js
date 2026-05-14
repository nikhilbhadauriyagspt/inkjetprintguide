import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const FOLDERS = [
    'public/products',
    'public/category',
    'public/newproimges',
    'public/about',
    'public/midbanner',
    'public/banner',
    'public/productsgrid'
];

// Helper to check if file is optimized
function isOptimized(filename) {
    return filename.includes('_thumb') || filename.includes('_med') || filename.endsWith('.avif') || filename.endsWith('.webp');
}

// 1. Get Status of all folders and images
app.get('/images/status', async (req, res) => {
    try {
        const folderStats = [];
        const allImages = [];
        let idCounter = 1;

        for (const folder of FOLDERS) {
            const absolutePath = path.join(__dirname, folder);
            try {
                const files = await fs.readdir(absolutePath);
                
                // Filter only original images (jpg, jpeg, png)
                const originals = files.filter(f => f.match(/\.(jpg|jpeg|png)$/i) && !isOptimized(f));
                
                let optimizedCount = 0;
                let pendingCount = 0;

                for (const file of originals) {
                    const baseName = path.basename(file, path.extname(file));
                    // Check if avif and webp exist for this original
                    const hasAvif = files.includes(`${baseName}.avif`);
                    const hasWebp = files.includes(`${baseName}.webp`);
                    
                    const status = (hasAvif && hasWebp) ? 'optimized' : 'pending';
                    if (status === 'optimized') optimizedCount++;
                    else pendingCount++;

                    allImages.push({
                        id: idCounter++,
                        name: file,
                        folder: `/${folder.split('/').pop()}`,
                        size: 'Local File',
                        status: status,
                        formats: status === 'optimized' ? ['AVIF', 'WEBP'] : []
                    });
                }

                folderStats.push({
                    name: folder,
                    total: originals.length,
                    optimized: optimizedCount,
                    pending: pendingCount
                });
            } catch (e) {
                folderStats.push({ name: folder, total: 0, optimized: 0, pending: 0 });
            }
        }

        res.json({
            status: 'success',
            data: {
                folders: folderStats,
                images: allImages
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// 2. Optimize images
app.post('/images/optimize', async (req, res) => {
    const { folder } = req.body;
    const foldersToProcess = folder === 'all' ? FOLDERS : [folder];

    try {
        for (const targetFolder of foldersToProcess) {
            const absolutePath = path.join(__dirname, targetFolder);
            const files = await fs.readdir(absolutePath);
            
            for (const file of files) {
                if (file.match(/\.(jpg|jpeg|png)$/i) && !isOptimized(file)) {
                    const fullPath = path.join(absolutePath, file);
                    const buffer = await fs.readFile(fullPath);
                    const baseName = path.basename(file, path.extname(file));

                    // Generate modern formats
                    await sharp(buffer).resize(300).avif({ quality: 60 }).toFile(path.join(absolutePath, `${baseName}_thumb.avif`));
                    await sharp(buffer).resize(300).webp({ quality: 60 }).toFile(path.join(absolutePath, `${baseName}_thumb.webp`));
                    await sharp(buffer).resize(600).avif({ quality: 60 }).toFile(path.join(absolutePath, `${baseName}_med.avif`));
                    await sharp(buffer).resize(600).webp({ quality: 60 }).toFile(path.join(absolutePath, `${baseName}_med.webp`));
                    await sharp(buffer).avif({ quality: 60 }).toFile(path.join(absolutePath, `${baseName}.avif`));
                    await sharp(buffer).webp({ quality: 60 }).toFile(path.join(absolutePath, `${baseName}.webp`));
                }
            }
        }
        res.json({ status: 'success', message: 'Optimization complete' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Admin Bridge running on http://localhost:${PORT}`);
    console.log(`Scan this URL in ImageManager.jsx for local image management.`);
});
