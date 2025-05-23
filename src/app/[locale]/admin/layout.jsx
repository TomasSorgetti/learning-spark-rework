import AdminBar from "@/layouts/AdminBar";
import AdminGuard from "@/lib/guards/AdminGuard";

export default async function AdminLayout({ children }) {
  return (
    <div className="relative min-h-screen flex">
      <AdminGuard>
        <AdminBar />
        {children}
      </AdminGuard>
    </div>
  );
}
