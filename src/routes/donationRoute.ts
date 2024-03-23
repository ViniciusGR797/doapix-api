import { Router } from 'express';
import { DonationController } from '../controllers/donationController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, DonationController.getDonation);

router.get('/:donation_id', authMiddleware, DonationController.getDonationById);

router.post('/', DonationController.createDonation);

router.put('/:donation_id', authMiddleware, DonationController.updateDonation);

router.delete('/:donation_id', authMiddleware, DonationController.deleteDonation);

export default router;