import express from 'express';
import serverless from "serverless-http";

const app = express();

import applyRoutes from './api/middleware';

// Routes to controller and middleware here
applyRoutes(app);

// Listen 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const handler = serverless(app);