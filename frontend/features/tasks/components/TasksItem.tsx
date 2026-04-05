"use client";

import { useDeleteTask, useUpdateTask } from "@/features/tasks/hooks/useTasks";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Task } from "@/types/tasks";
import { useState } from "react";

export default function TasksItem({ task }: { task: Task }) {
  const { data: user } = useAuth();
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();

  const isAdmin = user?.role === "ADMIN";
  const isOwner = user?.id === task.userId;

  const canEdit = isAdmin || isOwner;

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleToggle = () => {
    updateTask.mutate({
      id: task.id,
      title: task.title,
      completed: !task.completed,
    });
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    deleteTask.mutate(id, {
      onSettled: () => setDeletingId(null),
    });
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
          onClick={() => handleDelete(task.id)}
          disabled={deletingId === task.id}
          className="text-sm text-red-500 hover:text-red-700 transition"
        >
          {deleteTask.isPending ? "Deleting..." : "Delete"}
        </button>
      )}
    </li>
  );
}
