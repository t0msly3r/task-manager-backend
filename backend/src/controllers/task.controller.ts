import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.userId;
    const task = await taskService.createTask(title, userId);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const tasks = await taskService.getTasks(req.user.userId, req.user.role);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const { userId, role } = req.user!;
    const { title, completed } = req.body;
    const task = await taskService.updateTask(
      id,
      userId,
      title,
      completed,
      role,
    );
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const taskId = Number(req.params.id);

    await taskService.deleteTask(req.user.userId, taskId, req.user.role);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
