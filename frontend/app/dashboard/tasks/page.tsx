"use client";

import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";
import TasksItem from "@/components/tasks/TasksItem";
import CreateTask from "@/components/tasks/CreateTask";

export default function TasksPage() {
  const { data: tasks, isLoading } = useTasks();
  const { data: user } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-black text-shadow-sm">
        Welcome {user?.email}
      </h2>

      <CreateTask />

      {!tasks?.length && (
        <p className="text-gray-500 mt-4">No tasks yet. Create one 👇</p>
      )}

      <ul className="flex flex-col gap-3 mt-4">
        {tasks?.map((task) => (
          <TasksItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
