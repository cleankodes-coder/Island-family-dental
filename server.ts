import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { handleReceptionistChat } from './src/server/receptionistHandler.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route for Gemini receptionist
app.post('/api/receptionist', async (req, res) => {
  try {
    const { message, history } = req.body;
    const result = await handleReceptionistChat(message || '', history || []);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Server error' });
  }
});

// Serve static assets from dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Island Family Dental production server running on port ${PORT}`);
});
