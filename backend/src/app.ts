import express from 'express';
import taskRoutes from './routes/task.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import helmet from 'helmet';
import { httpLogger } from './middlewares/logger.middleware';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(httpLogger);

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

export default app;
