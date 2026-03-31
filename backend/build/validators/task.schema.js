"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    completed: zod_1.z.boolean().optional(),
});
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.coerce.number().int().positive(),
});
//# sourceMappingURL=task.schema.js.map