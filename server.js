import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Helper to read reports
const readReports = () => {
  try {
    const data = fs.readFileSync(REPORTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Helper to write reports
const writeReports = (reports) => {
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
};

app.get('/api/reports', (req, res) => {
  const reports = readReports();
  res.json(reports);
});

app.post('/api/reports', (req, res) => {
  const { reports } = req.body;
  if (!Array.isArray(reports)) {
    return res.status(400).json({ error: 'Invalid reports data' });
  }
  writeReports(reports);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
