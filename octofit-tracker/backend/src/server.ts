import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
