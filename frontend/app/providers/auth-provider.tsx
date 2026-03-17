'use client';

import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const { isLoading } = useAuth();
    
    if (isLoading) return <p>Loading user...</p>;

    return <>{children}</>;
}
