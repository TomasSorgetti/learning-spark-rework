import GuestGuard from "@/lib/guards/GuestGuard";

export default async function AuthLayout({ children }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <GuestGuard>{children}</GuestGuard>
    </div>
  );
}
