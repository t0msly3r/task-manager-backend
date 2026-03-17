"use client";

import { useState } from "react";
import { useCreateTask } from "@/hooks/useTasks";

export default function CreateTask() {
    const [title, setTitle] = useState("");
    const createTask = useCreateTask();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
 
        if (!title.trim()) return;

        createTask.mutate( title );
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
            />
            <button type="submit" disabled={createTask.isPending}>
                Add Task
            </button>
        </form>
    );
}