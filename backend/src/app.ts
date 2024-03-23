import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
// TODO might need to update for security reasons
app.use(cors());

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