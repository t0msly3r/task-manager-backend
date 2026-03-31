export declare const registerUser: (email: string, password: string) => Promise<{
    email: string;
    role: import(".prisma/client").$Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    id: number;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    token: string;
    user: {
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    };
}>;
export declare const getMe: (userId: number) => Promise<{
    email: string;
    role: import(".prisma/client").$Enums.Role;
    createdAt: Date;
    id: number;
}>;
//# sourceMappingURL=auth.service.d.ts.map