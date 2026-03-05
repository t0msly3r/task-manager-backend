import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service"

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {email, password} = req.body;
		const user = await authService.registerUser(email, password);

		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
	
}

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try{
		const { email, password } = req.body;
		const token = await authService.loginUser(email, password); 

		res.json({ token })
	} catch (error) {
		next(error);
	}
}