import { Role } from '@prisma/client';
export declare const createTask: (title: string, userId: number) => Promise<{
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}>;
export declare const getTasks: (userId: number, role: Role) => Promise<{
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}[]>;
export declare const updateTask: (id: number, userId: number, title: string, completed: boolean, role: Role) => Promise<{
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}>;
export declare const deleteTask: (userId: number, taskId: number, role: Role) => Promise<{
    createdAt: Date;
    updatedAt: Date;
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}>;
//# sourceMappingURL=task.service.d.ts.map