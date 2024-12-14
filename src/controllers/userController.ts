import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Op, Sequelize } from 'sequelize';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({ error: 'All fields are required: username, password, email' });
    return;
  }
  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        res.status(409).json({ error: 'Email is already in use' });
        return;
      }
      if (existingUser.username === username) {
        res.status(409).json({ error: 'Username is already in use' });
        return;
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user', details: error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Both email and password are required' });
    return;
  }
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error logging in', details: error });
  }
};
