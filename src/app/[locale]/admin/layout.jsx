import AdminBar from "@/layouts/AdminBar";

export default async function AdminLayout({ children }) {
  return (
    <div className="relative min-h-screen">
      <AdminBar />
      {children}
    </div>
  );
}
