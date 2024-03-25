import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

function applyRoutes(app: any) {

  // any necessary middleware services go here, such as...

  // ...cross origin resource sharing
  app.use(cors());

  // ...support json in request body
  app.use(express.json());

  // ...a friendly greeting
  app.get('/', (req: Request, res: Response) => {
    res.json({ id: 1, message: 'Hello Paint World' });
  });

  //all routes lead to rome, err... here.
  app.use(routes);
}

export default applyRoutes;