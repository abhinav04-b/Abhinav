const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect", err));

// 2. Comprehensive Schema matching your db.json
const PortfolioSchema = new mongoose.Schema({
  hero: {
    name: String,
    subtitle: String,
    bio: String,
    photoUrl: String,
    status: String
  },
  projects: [{
    id: String,
    title: String,
    description: String,
    image: String,
    link: String,
    technologies: [String]
  }],
  contacts: [{
    id: String,
    platform: String,
    value: String,
    url: String,
    iconName: String
  }],
  blogs: [{
    id: String,
    title: String,
    date: String,
    content: String,
    fullContent: String,
    mediaUrl: String,
    mediaType: String,
    caption: String
  }]
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

// 3. API Routes
// GET: Fetch all data
app.get('/api/content', async (req, res) => {
  try {
    const data = await Portfolio.findOne();
    // Return MongoDB data or empty defaults if DB is new
    res.json(data || { hero: {}, projects: [], contacts: [], blogs: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// POST: Update all data (Admin Panel)
app.post('/api/content', async (req, res) => {
  try {
    const updatedData = await Portfolio.findOneAndUpdate(
      {}, 
      req.body, 
      { new: true, upsert: true }
    );
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ error: "Failed to update content" });
  }
});

// 4. Serve Static Frontend Files
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Express 5 specific catch-all route using regex to match everything EXCEPT /api
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
