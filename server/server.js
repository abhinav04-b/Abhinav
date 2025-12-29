// server/server.js (Updated to connect to MongoDB)
import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose'; // Import Mongoose

const app = express();
const PORT = process.env.PORT || 3001;

// Load connection string from environment variables for security
const MONGO_URI = process.env.MONGO_URI; 

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB connection error:', err)); //

app.use(express.json());
app.use(cors());

// --- API Routes (Connect these to Mongoose Models later) ---
app.get('/api/hero', (req, res) => res.status(200).json({ name: 'Abhinav', subtitle: 'Connected to DB', bio: '', photoUrl: '' }));
// Add more API routes here (e.g., /api/projects, /api/blogs)

// --- Serve Static Frontend Files ---
const buildPath = path.join(process.cwd(), 'dist');
app.use(express.static(buildPath));
app.use((req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

