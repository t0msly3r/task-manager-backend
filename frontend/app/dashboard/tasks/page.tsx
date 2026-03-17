"use client";

import { useTasks } from "@/hooks/useTasks";
import CreateTask from "@/components/tasks/CreateTask";

export default function TasksPage() {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Tasks</h1>

      <CreateTask />

      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ul>
    </div>
  );
}