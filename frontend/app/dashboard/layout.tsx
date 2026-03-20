import LogoutButton from "@/components/auth/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="font-bold text-2xl text-cyan-500 text-shadow-2xs">
          Task Manager
        </h1>
        <LogoutButton />
      </nav>

      {/* Contenido */}
      <main className="max-w-2xl mx-auto mt-8 p-4">{children}</main>
    </div>
  );
}
