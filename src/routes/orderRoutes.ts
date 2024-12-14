import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { checkout } from '../controllers/orderController';

const router = Router();

router.post('/checkout', authenticate, checkout);

export default router;
