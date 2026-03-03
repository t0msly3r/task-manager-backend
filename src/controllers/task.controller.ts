import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/task.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {

	try
	{
		const { title } = req.body;
		if (!req.user)
		{
			return res.status(401).json({ message: "Unathorized"});
		}
		const userId = req.user.userId;
		const task = await taskService.createTask(title, userId);
		res.status(201).json(task);
  	} 
	catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  
	try
	{
		const userId = req.user!.userId;
		const role = req.user!.role;
		const tasks = await taskService.getTasks(userId, role);
		res.json(tasks);
	}
	catch (error) {
		next(error);
	}
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  
	try
	{
		const id = Number(req.params.id);
		const { title, completed } = req.body;
		const task = await taskService.updateTask(id, title, completed);
		res.json(task);
	}
	catch(error) {
		next(error);
	}
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  
	try
	{
		const {userId , role} = req.user!;
		const taskId = Number(req.params.id);

		await taskService.deleteTask(userId, taskId, role);
  		res.status(204).send();
	}
	catch (error) {
		next(error);
	}
};
