import { Request, Response } from 'express';
import CartItem from '../models/CartItem';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Book from '../models/Book';

export const checkout = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    // Fetch cart items
    const cartItems = await CartItem.findAll({ where: { userId }, include: [Book] });

    if (cartItems.length === 0) {
        res.status(400).json({ error: 'Cart is empty' });
        return;    
    }
    // Calculate total amount
    let totalAmount = 0;
    const orderItemsData = cartItems.map((item:any) => {
      totalAmount += item.quantity * item.Book.price;
      return {
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.Book.price,
      };
    });

    // Create order
    const order = await Order.create({ userId, totalAmount });

    // Add order items
    for (const orderItem of orderItemsData) {
      await OrderItem.create({
        orderId: order.id,
        bookId: orderItem.bookId,
        quantity: orderItem.quantity,
        price: orderItem.price,
      });
    }

    // Clear cart
    await CartItem.destroy({ where: { userId } });

    res.status(200).json({ message: 'Checkout successful', order });
  } catch (error: any) {
    res.status(500).json({ error: 'Error during checkout', details: error.message });
  }
};
