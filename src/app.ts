import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import 'express-async-errors';
import { sequelize } from './config';
import './models/associations';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders',orderRoutes);

app.use((req: Request, res:Response, next: NextFunction)=>{
  res.sendStatus(404);
})
// Error handling
app.use(errorHandler);

// Server
app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});