"use client";

import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";

export default function TasksPage() {
  const { data: tasks, isLoading } = useTasks();
  const { data: user } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome {user?.email}</h2>

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