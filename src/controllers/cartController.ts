import { Request, Response } from 'express';
import CartItem from '../models/CartItem';
import Book from '../models/Book';

export const addToCart = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { bookId, quantity } = req.body;

    if (!bookId || !quantity) {
        res.status(400).json({ error: 'Book ID and quantity are required' });
        return;
    }
    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }
        const cartItem = await CartItem.findOne({ where: { userId, bookId } });

        if (cartItem) {
            await cartItem.update({ quantity: cartItem.quantity + quantity });
        } else {
            await CartItem.create({ userId, bookId, quantity });
        }

        res.status(200).json({ message: 'Book added to cart successfully' });
    } catch (error: any) {
        res.status(500).json({ error: 'Error adding to cart', details: error.message });
    }
};

export const viewCart = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;

    try {
        const cartItems = await CartItem.findAll({
            where: { userId },
            include: [{ model: Book }],
        });

        res.status(200).json(cartItems);
    } catch (error: any) {
        res.status(500).json({ error: 'Error fetching cart', details: error.message });
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { bookId, quantity } = req.body;

    if (!bookId || quantity === undefined) {
        res.status(400).json({ error: 'Book ID and quantity are required' });
        return;
    }

    try {
        const cartItem = await CartItem.findOne({ where: { userId, bookId } });

        if (!cartItem) {
            res.status(404).json({ error: 'Cart item not found' });
            return;
        }

        await cartItem.update({ quantity });
        res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error: any) {
        res.status(500).json({ error: 'Error updating cart item', details: error.message });
    }
};

export const removeCartItem = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { bookId } = req.params;

    try {
        const cartItem = await CartItem.findOne({ where: { userId, bookId } });

        if (!cartItem) {
            res.status(404).json({ error: 'Cart item not found' });
            return;
        }

        await cartItem.destroy();
        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error: any) {
        res.status(500).json({ error: 'Error removing cart item', details: error.message });
    }
};
