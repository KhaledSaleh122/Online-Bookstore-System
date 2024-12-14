import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import {
  addToCart,
  viewCart,
  updateCartItem,
  removeCartItem,
} from '../controllers/cartController';

const router = Router();

router.post('/add', authenticate, addToCart);
router.get('/', authenticate, viewCart);
router.put('/update', authenticate, updateCartItem);
router.delete('/remove/:bookId', authenticate, removeCartItem);

export default router;
