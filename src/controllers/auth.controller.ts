import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service"
import { UnauthorizedError } from "../errors/UnauthorizedError";

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
		const result = await authService.loginUser(email, password); 

		res.json(result)
	} catch (error) {
		next(error);
	}
}

export const me = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			throw new UnauthorizedError();
		}
		const user = await authService.getMe(req.user.userId);

		res.json(user);
	} catch (error) {
		next(error);
	}
}