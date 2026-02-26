const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Determine the path to the assets folder
        const assetsDir = path.join(process.cwd(), 'assets');

        // Check if directory exists
        if (!fs.existsSync(assetsDir)) {
            return res.status(200).json({ images: [] });
        }

        // Read directory contents
        const files = fs.readdirSync(assetsDir);

        // Filter only .png files and those starting with "name" optionally
        const imageFiles = files.filter(f => f.endsWith('.png'));

        // Sort files alphabetically to ensure consistent sequence
        imageFiles.sort();

        return res.status(200).json({
            images: imageFiles,
            count: imageFiles.length
        });

    } catch (error) {
        console.error('Error reading assets directory:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
