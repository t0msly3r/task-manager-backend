"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getAll = exports.create = void 0;
const taskService = __importStar(require("../services/task.service"));
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const create = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!req.user) {
            throw new UnauthorizedError_1.UnauthorizedError('User not authorized');
        }
        const userId = req.user.userId;
        const task = await taskService.createTask(title, userId);
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const getAll = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new UnauthorizedError_1.UnauthorizedError('User not authenticated');
        }
        const tasks = await taskService.getTasks(req.user.userId, req.user.role);
        res.json(tasks);
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
const update = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!req.user) {
            throw new UnauthorizedError_1.UnauthorizedError('User not authenticated');
        }
        const { userId, role } = req.user;
        const { title, completed } = req.body;
        const task = await taskService.updateTask(id, userId, title, completed, role);
        res.json(task);
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new UnauthorizedError_1.UnauthorizedError('User not authenticated');
        }
        const taskId = Number(req.params.id);
        await taskService.deleteTask(req.user.userId, taskId, req.user.role);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.remove = remove;
//# sourceMappingURL=task.controller.js.map