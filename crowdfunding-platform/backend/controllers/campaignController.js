const Campaign = require('../models/Campaign');

// Create a new campaign
exports.createCampaign = async (req, res) => {
  const { title, description, goalAmount, startupURL, spotlight } = req.body; // Include spotlight
  // Remove image handling since no longer needed
  
  try {
    const newCampaign = new Campaign({
      title,
      description,
      goalAmount,
      startupURL,
      spotlight // Save spotlight info instead of image
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully!', campaign: newCampaign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create campaign', error: err.message });
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get one campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaignDoc = await Campaign.findById(req.params.id);
    if (!campaignDoc) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Convert to plain JS object
    const campaign = campaignDoc.toObject();

    // No image URL handling is required now since we're using spotlight instead of an image
    res.json(campaign);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Invest in a campaign
exports.investCampaign = async (req, res) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid investment amount' });
    }

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Update totals
    campaign.raisedAmount += amount;
    campaign.investors.push({ amount });
    await campaign.save();

    res.json({ message: 'Investment successful', campaign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
