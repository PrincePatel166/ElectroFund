const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '..', 'uploads', filename);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: 'Image file not found on server' });
    }

    res.sendFile(imagePath);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
