import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController';

const router = Router();

// Routes for book management
router.post('/', authenticate, createBook); // Create a book (authenticated)
router.get('/', getBooks); // Get all books
router.get('/:id', getBookById); // Get a single book
router.put('/:id', authenticate, updateBook); // Update a book (authenticated)
router.delete('/:id', authenticate, deleteBook); // Delete a book (authenticated)

export default router;
