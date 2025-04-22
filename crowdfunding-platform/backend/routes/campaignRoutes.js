const express = require('express');
const multer = require('multer');
const path = require('path'); // Use require to load path module
const router = express.Router();
const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  investCampaign
} = require('../controllers/campaignController');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to ensure unique filenames
  },
});

const upload = multer({ storage }); // Multer middleware to handle the upload

// Serve static files (images) from the 'uploads' folder
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serving static images

// POST /api/campaigns → Create
router.post('/', upload.single('image'), createCampaign); // Handle image upload here

// GET /api/campaigns → List all
router.get('/', getAllCampaigns);

// GET /api/campaigns/:id → Detail
router.get('/:id', getCampaignById);

// POST /api/campaigns/:id/invest → Invest
router.post('/:id/invest', investCampaign);

module.exports = router;
