import Sidebar from "@/components/layout/Sidebar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-bg-primary">
        <Sidebar />
        <main className="flex-1 ml-60 overflow-y-auto">{children}</main>
      </div>
    </AuthGuard>
  );
}
