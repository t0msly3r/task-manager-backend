import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import helmet from 'helmet';
import { httpLogger } from './middlewares/logger.middleware';
import cors from 'cors';
import { env } from 'node:process';
import { registerRoutes } from './routes';

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(httpLogger);
registerRoutes(app);

app.use(errorMiddleware);

export default app;
