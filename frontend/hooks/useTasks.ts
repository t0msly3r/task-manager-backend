import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as taskService from "@/services/task.service";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: taskService.getTasks,
    retry: false,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => taskService.createTask({ title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => taskService.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
      completed,
    }: {
      id: number;
      title: string;
      completed: boolean;
    }) => taskService.updateTask(id, title, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
