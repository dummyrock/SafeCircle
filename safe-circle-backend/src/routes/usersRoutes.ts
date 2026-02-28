import { Router } from 'express';
import UsersController from '../controllers/usersController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const usersController = new UsersController();

router.get('/:id', authMiddleware, usersController.getUserDetails);
router.put('/:id', authMiddleware, usersController.updateUser);

export default router;