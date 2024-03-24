import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import serverless from "serverless-http";
import fs from 'fs';
import path from 'path';
const dbPath = path.resolve(__dirname, '../db/mock/db.json');

const app = express();
const router = Router();

// Enable CORS for all routes
// TODO might need to update for security reasons
router.use(cors());

// Middleware to parse JSON request bodies
router.use(express.json());

router.get('/paints', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json(data.paint);
});

// Update Paint stock
router.patch('/paints', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const newData = req.body;
  console.log("newData", newData);

  //update the stock here
  data.paint = newData.paint;

  //persist:
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json(200);
});

router.get('/users', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json(data.users);
});

// Update user settings
router.patch('/users', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const newData = req.body;
  console.log("newData", newData);

  //update the user here
  data.users = newData.users;

  //persist:
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json(200);
});

router.get('/paintremoval', (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const users = data.users;

  // remove one at the top
  users.splice(0, 1);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json(data.users);
});

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my Express application');
});

router.get('/helloworld', (req: Request, res: Response) => {
  res.json({ id: 1, message: 'Hello Paint World' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/", router);

export const handler = serverless(app);