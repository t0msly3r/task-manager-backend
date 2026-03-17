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

  return <button onClick={handleLogout}>Logout</button>;
}
