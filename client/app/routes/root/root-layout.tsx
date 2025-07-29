import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-[100px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
