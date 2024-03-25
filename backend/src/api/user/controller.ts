import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../../db/mock/db.json');

// GET Users
function getUsers(req: Request, res: Response) {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json(data.users);
}

// Update / Patch Users
function updateUsers(req: Request, res: Response) {
  const data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const newData = req.body;

  //update the user here
  data.users = newData.users;

  //persist:
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  res.json(200);
}

export default { getUsers, updateUsers };