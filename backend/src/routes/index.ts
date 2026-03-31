import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';
import taskRoutes from './task.routes';
import authRoutes from './auth.routes';

export const registerRoutes = (app: Express) => {
  app.use('/tasks', taskRoutes);
  app.use('/auth', authRoutes);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
