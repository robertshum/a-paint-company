import express, { Request, Response } from 'express';
import cors from 'cors';

import fs from 'fs';
import path from 'path';
const dbPath = path.resolve(__dirname, '../db/mock/db.json');

const app = express();

// Enable CORS for all routes
// TODO might need to update for security reasons
app.use(cors());

app.get('/api/paints', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json(data.paint);
});

app.get('/api/paintremoval', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const users = data.users;

  // remove one at the top
  users.splice(0, 1);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json(data.users);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Express application');
});

app.get('/api/helloworld', (req: Request, res: Response) => {
  res.json({ id: 1, message: 'Hello Paint World' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});