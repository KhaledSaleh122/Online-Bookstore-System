import { Request, Response } from 'express';
import Book from '../models/Book';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  const { title, author, genre, price, inventory } = req.body;

  if (!title || !author || !genre || !price || inventory === undefined) {
    res.status(400).json({ error: 'All fields are required: title, author, genre, price, inventory' });
    return;
  }

  try {
    const book = await Book.create({ title, author, genre, price, inventory });
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Error creating book', details: error });
  }
};

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books', details: error });
  }
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book', details: error });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, genre, price, inventory } = req.body;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    await book.update({ title, author, genre, price, inventory });
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Error updating book', details: error });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book', details: error });
  }
};
