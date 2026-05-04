const fs = require('fs');
const path = require('path');

const files = [
    'src/pages/Wishlist.jsx',
    'src/pages/Shop.jsx',
    'src/pages/Profile.jsx',
    'src/pages/ProductDetail.jsx',
    'src/pages/Orders.jsx',
    'src/pages/FAQ.jsx',
    'src/pages/Contact.jsx',
    'src/pages/Compare.jsx',
    'src/pages/Checkout.jsx',
    'src/pages/About.jsx',
    'src/layouts/PolicyLayout.jsx',
    'src/components/Features.jsx',
    'src/components/Toast.jsx',
    'src/components/SearchOverlay.jsx',
    'src/components/Hero.jsx',
    'src/components/Header.jsx',
    'src/components/Collections.jsx',
    'src/components/BottomNav.jsx',
    'src/components/CartDrawer.jsx'
];

files.forEach(filePath => {
    const fullPath = path.resolve(filePath);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');

        // Fix the damage: framer-m -> framer-motion
        content = content.replace(/from\s+['"]framer-m['"]/g, "from 'framer-motion'");

        // Redo the import replacement correctly
        content = content.replace(/import\s+\{([^}]*)\}\s+from\s+(['"]framer-motion['"])/g, (match, p1, p2) => {
            const updatedP1 = p1.replace(/\bmotion\b/g, 'm');
            return `import {${updatedP1}} from ${p2}`;
        });

        // Ensure <motion. and </motion. with <m. and </m. (in case any were missed or if I'm re-running)
        content = content.replace(/<(?:(\/))?\s*motion\./g, '<$1m.');

        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed and Updated ${filePath}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
