const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
  // you can add `user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }` here later
});

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  goalAmount: {
    type: Number,
    required: true
  },
  startupURL: {
    type: String,
    required: true
  },
  spotlight: {
    type: String,
    default: ''      // <-- new field for previous rounds / achievements
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  raisedAmount: {
    type: Number,
    default: 0
  },
  investors: [investorSchema]
});

module.exports = mongoose.model('Campaign', campaignSchema);
