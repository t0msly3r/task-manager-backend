"use client";

import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";
import { Task } from "@/types/tasks";

export default function TasksItem({ task }: { task: Task }) {
  const { data: user } = useAuth();
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  const isAdmin = user?.role === "ADMIN";
  const isOwner = user?.id === task.userId;

  const canEdit = isAdmin || isOwner;

  const handleToggle = () => {
    updateTask.mutate({
      id: task.id,
      title: task.title,
      completed: !task.completed,
    });
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id);
  };

  return (
    <li className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition">
      <span
        onClick={handleToggle}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {task.title}
      </span>

      {canEdit && (
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:text-red-700 transition"
        >
          Delete
        </button>
      )}
    </li>
  );
}
