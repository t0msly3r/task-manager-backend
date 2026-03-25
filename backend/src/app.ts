import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import helmet from 'helmet';
import { httpLogger } from './middlewares/logger.middleware';
import cors from 'cors';
import { env } from 'node:process';

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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

export default app;
