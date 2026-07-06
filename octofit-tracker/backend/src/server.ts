import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    baseUrl,
  });
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on ${baseUrl}`);
});
