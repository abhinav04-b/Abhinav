const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect", err));

// 2. Define a "Schema" (tells Mongo what your data looks like)
const PortfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  projects: Array
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

// 3. Update your Routes
app.get('/api/content', async (req, res) => {
  const data = await Portfolio.findOne();
  // If database is empty, send an empty object so the frontend doesn't crash
  res.send(data || { title: "", description: "", projects: [] });
});

app.post('/api/content', async (req, res) => {
  try {
    // This finds the first document and updates it with the new data from the Admin Panel.
    // { upsert: true } creates the document if it doesn't exist yet.
    const updatedData = await Portfolio.findOneAndUpdate(
      {}, 
      req.body, 
      { new: true, upsert: true }
    );
    res.status(200).json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating portfolio content");
  }
});
const PORT = process.env.PORT || 5000;
const path = require('path');

// 1. Serve the static files from the React app build folder
// Note: Use 'dist' if you use Vite, or 'build' if you use Create React App
app.use(express.static(path.join(__dirname, '../dist')));

// 2. The "catch-all" route: If the user goes to /about or /admin, 
// send them index.html so React Router can take over.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
