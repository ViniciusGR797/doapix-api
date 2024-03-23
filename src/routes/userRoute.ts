import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, UserController.getUserMe);

router.post('/', UserController.createUser);

router.post('/login', UserController.loginUser);

router.put('/', authMiddleware, UserController.updateUserMe);

router.delete('/', authMiddleware, UserController.deleteUserMe);

export default router;