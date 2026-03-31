"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../prisma");
const NotFoundError_1 = require("../errors/NotFoundError");
const ForbiddenError_1 = require("../errors/ForbiddenError");
const createTask = async (title, userId) => {
    return prisma_1.prisma.task.create({
        data: {
            title,
            userId,
        },
    });
};
exports.createTask = createTask;
const getTasks = async (userId, role) => {
    if (role == client_1.Role.ADMIN) {
        return prisma_1.prisma.task.findMany();
    }
    return prisma_1.prisma.task.findMany({
        where: { userId },
    });
};
exports.getTasks = getTasks;
const updateTask = async (id, userId, title, completed, role) => {
    const task = await prisma_1.prisma.task.findUnique({
        where: { id },
    });
    if (!task) {
        throw new NotFoundError_1.NotFoundError('Task not found');
    }
    if (task.userId !== userId && role !== client_1.Role.ADMIN) {
        throw new ForbiddenError_1.ForbiddenError('You cannot update this task');
    }
    return prisma_1.prisma.task.update({
        where: { id },
        data: {
            title,
            completed,
        },
    });
};
exports.updateTask = updateTask;
const deleteTask = async (userId, taskId, role) => {
    const task = await prisma_1.prisma.task.findUnique({
        where: { id: taskId },
    });
    if (!task) {
        throw new NotFoundError_1.NotFoundError('Task no found');
    }
    if (role !== client_1.Role.ADMIN && task.userId !== userId) {
        throw new ForbiddenError_1.ForbiddenError('You cannot access this task');
    }
    return prisma_1.prisma.task.delete({
        where: { id: taskId },
    });
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.service.js.map