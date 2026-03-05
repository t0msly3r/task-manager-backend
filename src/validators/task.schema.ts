import { z } from "zod";

export const createTaskSchema = z.object({
	title: z.string().min(1, "Title is required"),
});

export const updateTaskSchema = z.object({
	title: z.string().min(1).optional(),
	completed: z.boolean().optional()
})

export const idParamSchema = z.object({
	id: z.coerce.number().int().positive()
})