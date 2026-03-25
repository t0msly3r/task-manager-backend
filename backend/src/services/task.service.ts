import { Role } from '@prisma/client';
import { prisma } from '../prisma';
import { NotFoundError } from '../errors/NotFoundError';
import { ForbiddenError } from '../errors/ForbiddenError';

export const createTask = async (title: string, userId: number) => {
  return prisma.task.create({
    data: {
      title,
      userId,
    },
  });
};

export const getTasks = async (userId: number, role: Role) => {
  if (role == Role.ADMIN) {
    return prisma.task.findMany();
  }

  return prisma.task.findMany({
    where: { userId },
  });
};

export const updateTask = async (
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  role: Role,
) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  if (task.userId !== userId && role !== Role.ADMIN) {
    throw new ForbiddenError('You cannot update this task');
  }

  return prisma.task.update({
    where: { id },
    data: {
      title,
      completed,
    },
  });
};

export const deleteTask = async (
  userId: number,
  taskId: number,
  role: Role,
) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new NotFoundError('Task no found');
  }

  if (role !== Role.ADMIN && task.userId !== userId) {
    throw new ForbiddenError('You cannot access this task');
  }

  return prisma.task.delete({
    where: { id: taskId },
  });
};
