import express from "express";
import taskRoutes from "./routes/task.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use(errorMiddleware);

export default app;
