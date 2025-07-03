import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'gts@123';

export const hashPassword = async (password) => await bcrypt.hash(password, 10);

export const verifyPassword = async (password, hash) => await bcrypt.compare(password, hash);

export const generateToken = (user) => jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
