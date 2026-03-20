import { api } from "@/lib/axios";
import { Task } from "@/types/tasks";

export const createTask = async (data: { title: string }): Promise<Task> => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async (
  id: number,
  title: string,
  completed: boolean,
): Promise<Task> => {
  const res = await api.put(`/tasks/${id}`, {
    title,
    completed,
  });
  return res.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const deleteTask = async (taskId: number) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};
