'use client';

import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
 
        if (!email.trim() || !password.trim()) return;

        login.mutate({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            <button type="submit" disabled={login.isPending}>
                Login
            </button>

            {login.error && <p>{(login.error as Error).message}</p>}
        </form>
    );
}
