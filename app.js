const express = require('express');
const cors = require('cors');
const path = require('path');
const upload = require('./utils/multerConfig');
const serveUploads = require('./utils/serveStatic');
const app = express();
app.use(cors());
app.use(express.json());

serveUploads(app);
app.post('/api/assets/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    res.json({
        filename: req.file.filename,
        url: `http://localhost:5000/uploads/${req.file.filename}`
    });
});

app.get('/api/assets/get-asset', (req, res) => {
    const { path: filename } = req.query;
    const filepath = path.join(__dirname, 'uploads', filename);
    res.sendFile(filepath);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
