import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { NotFoundError } from '../errors/NotFoundError';
import { logger } from '../config/logger';
import { env } from '../config/env';
import { AppError } from '../errors/AppError';

const JWT_SECRET = env.JWT_SECRET;

export const registerUser = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError('User already exist', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...safeUser } = user;
  return safeUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: '1h',
    },
  );

  logger.info({ userId: user.id }, 'User logged in');
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};

export const getMe = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};
