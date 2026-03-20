"use client";

import { useState } from "react";
import { useCreateTask } from "@/hooks/useTasks";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const createTask = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    createTask.mutate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
        type="text"
        placeholder="What do you need to do?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-5 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        disabled={createTask.isPending}
      >
        {createTask.isPending ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
