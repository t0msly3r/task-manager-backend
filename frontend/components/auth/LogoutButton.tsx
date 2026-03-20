"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";

export default function LogoutButton() {
  const router = useRouter();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
