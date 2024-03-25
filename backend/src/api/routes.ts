import express, { Request, Response, Router } from 'express';
import paintController from './paint/controller';
import userController from './user/controller';

const router = Router();

// Paint
router.get("/api/paints", paintController.getPaint);
router.patch("/api/paints", paintController.updatePaint);

// Users
router.get("/api/users", userController.getUsers);
router.patch("/api/users", userController.updateUsers);

// No routes for delete or create (put), as it's not within scope

export default router;