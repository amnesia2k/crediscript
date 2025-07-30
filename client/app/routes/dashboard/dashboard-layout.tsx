import { AuthProvider, useAuth } from "@/providers/auth-context";
import { Navigate, Outlet } from "react-router";

export default function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <span className="text-muted-foreground animate-pulse text-sm">
          Checking authentication...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/secret/login" />;
  }
  return (
    <>
      <Outlet />;
    </>
  );
}
