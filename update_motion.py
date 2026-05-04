import re
import os

files = [
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
]

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace motion with m in imports from framer-motion
        # Handles: import { motion } from 'framer-motion'
        # Handles: import { motion, AnimatePresence } from 'framer-motion'
        # Handles: import { AnimatePresence, motion } from "framer-motion"
        def replace_import(match):
            import_statement = match.group(0)
            return re.sub(r'\bmotion\b', 'm', import_statement)

        content = re.sub(r'import\s+\{[^}]*\}\s+from\s+[\'\"]framer-motion[\'\"]', replace_import, content)
        
        # Replace <motion. and </motion. with <m. and </m.
        content = re.sub(r'<(/?)\s*motion\.', r'<\1m.', content)
        
        with open(file_path, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print(f'Updated {file_path}')
    else:
        print(f'File not found: {file_path}')
