"use client";

import { useState } from "react";
import { useRegister } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const register = useRegister();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    register.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/dashboard/tasks");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-sm mx-auto mt-10"
    >
      <h2 className="text-xl font-bold">Register</h2>

      <input
        className="border p-2 rounded"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded"
        disabled={register.isPending}
      >
        {register.isPending ? "Creating..." : "Register"}
      </button>

      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
      {register.error && <p className="text-red-500">Error creating account</p>}
    </form>
  );
}
