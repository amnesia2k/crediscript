import { useAuth } from "@/providers/auth-context";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
