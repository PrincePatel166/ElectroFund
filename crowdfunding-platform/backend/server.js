const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const campaignRoutes = require('./routes/campaignRoutes'); // Import the campaigns route
const userRoutes = require('./routes/userRouter');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
// const imageRoutes = require('./routes/imageRoutes');
const imageRoutes = require('./routes/imageRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(cors());  // To allow cross-origin requests
app.use(express.json());  // To parse JSON data from the body
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/campaigns', campaignRoutes); 
app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/users', userRoutes);
app.use('/api/campaignImage', imageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
