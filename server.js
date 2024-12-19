const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));  // Set a max file size for images

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle image upload
app.post('/upload', (req, res) => {
    const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");

    const timestamp = Date.now();
    const filePath = path.join(__dirname, `uploads/photo_${timestamp}.jpg`);

    // Save the image to the file system
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to save image' });
        } else {
            res.status(200).json({ message: 'Image uploaded successfully' });
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});