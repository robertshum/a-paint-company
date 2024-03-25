import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../../db/mock/db.json');

// GET paints
function getPaint(req: Request, res: Response) {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json(data.paint);
}

// PATCH / Update paints
function updatePaint(req: Request, res: Response) {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const newData = req.body;

  //update the stock here
  data.paint = newData.paint;

  //persist:
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json(200);
}

export default { getPaint, updatePaint };