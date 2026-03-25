import { Express } from 'express';
import taskRoutes from './task.routes';
import authRoutes from './auth.routes';

export const registerRoutes = (app: Express) => {
  app.use('/tasks', taskRoutes);
  app.use('/auth', authRoutes);
};
