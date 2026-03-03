import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { createTaskSchema, idParamSchema, updateTaskSchema } from "../validators/task.schema";
import { validate } from "../middlewares/validate.middleware";
import { authenticate } from "../middlewares/authentication.middleware";

const router = Router();

router.post("/",
    authenticate,
    validate(createTaskSchema),
    taskController.create);
router.get("/",
    authenticate,
    taskController.getAll);
router.put("/:id",
    authenticate,
    validate(idParamSchema, "params"),
    validate(updateTaskSchema, "body"),
    taskController.update);
router.delete("/:id",
    authenticate, 
    taskController.remove);

export default router;
