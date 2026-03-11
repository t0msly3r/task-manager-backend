import { api } from "@/lib/axios";

export const createTask = async (data: {
    title: string;
}) => {
    const res = await api.post("/tasks", data);
    return (res.data);
};

export const updateTask = async (id: number, data: unknown) => {
    const res = await api.put(`/tasks/${id}`, data);
    return (res.data);
};

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return (res.data);
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(`/tasks/${id}`);
  return (res.data);
};