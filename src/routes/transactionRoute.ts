import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';

const router = Router();

router.get('/donation/:donation_id', TransactionController.getTransactionByDonation);

router.get('/:transaction_id', TransactionController.getTransactionById);

router.post('/', TransactionController.createTransaction);

export default router;