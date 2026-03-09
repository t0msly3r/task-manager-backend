import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { createTaskSchema, idParamSchema, updateTaskSchema } from "../validators/task.schema";
import { validate } from "../middlewares/validate.middleware";
import { authenticate } from "../middlewares/authentication.middleware";

const router = Router();
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/",
	authenticate,
	validate(createTaskSchema),
	taskController.create);
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/",
	authenticate,
	taskController.getAll);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/:id",
	authenticate,
	validate(idParamSchema, "params"),
	validate(updateTaskSchema, "body"),
	taskController.update);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted
 */
router.delete("/:id",
	authenticate, 
	taskController.remove);

export default router;
