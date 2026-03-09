import {Request, Response, NextFunction} from "express";
import { AppError } from "../errors/AppError";
import { logger } from "../config/logger";

export const errorMiddleware = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
)=> {
	logger.error({ err }, "Unhandled error");

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message
		});
	}

	res.status(500).json({
		message: "Internal Server Error"
	})
}