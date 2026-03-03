import { Role, User } from "@prisma/client";
import { prisma } from "../prisma";

export const createTask = async (title: string, userId: number) => {
  return prisma.task.create({
    data: {
      title,
      userId,
    },
  });
};

export const getTasks = async (userId: number, role: Role) => {
  
  if (role == "ADMIN"){
    return prisma.task.findMany();
  }

  return prisma.task.findMany({
    where: { userId }
  })
};

export const updateTask = async (id: number, title: string, completed: boolean) => {
  return prisma.task.update({
    where: { id },
    data: {
      title,
      completed,
    },
  });
};

export const deleteTask = async (userId: number, taskId: number, role: Role) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId } 
  })

  if (!task) {
    throw new Error("Task no found");
  }

  if (role !== "ADMIN" && task.userId !== userId) {
    throw new Error("Forbidden");
  }

  return prisma.task.delete({
    where: { id: taskId }
  });
};
