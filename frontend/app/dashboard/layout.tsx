import LogoutButton from "@/components/auth/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <h2>Dashboard</h2>
        <LogoutButton />
      </nav>

      <main>{children}</main>
    </div>
  );
}