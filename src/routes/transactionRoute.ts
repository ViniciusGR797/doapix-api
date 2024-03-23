import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/:donation_id', authMiddleware, TransactionController.getTransactionByDonation);

router.get('/:transaction_id', authMiddleware, TransactionController.getTransactionById);

router.post('/', TransactionController.createTransaction);

export default router;