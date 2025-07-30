import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle"; // Import the ModeToggle component
import { logo } from "public";
import { navLinks } from "public/data";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar open/close

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full px-5 md:px-7 lg:px-10 py-4 transition-all duration-300
        bg-[var(--glass-background)] border-[var(--glass-border)] shadow-[0_4px_30px_var(--glass-shadow)] backdrop-blur-md
        lg:left-1/2 lg:top-5 lg:max-w-[1200px] lg:-translate-x-1/2 lg:rounded-full lg:border`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={closeSidebar}>
            <img src={logo} alt="crediscript_logo" className="h-10" />
            <h3 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-lg font-semibold text-transparent md:text-2xl">
              Crediscript
            </h3>
          </Link>

          {/* Desktop Navigation (>= 1024px) */}
          <div className="hidden items-center space-x-10 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium md:text-base ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                      : "hover:bg-gradient-to-r from-primary to-secondary bg-clip-text hover:text-transparent"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Button asChild>
              <Link to="/contact">Get Started</Link>
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Hamburger Menu & Actions (<= 1023px) */}
          <div className="flex items-center space-x-5 lg:hidden">
            <ModeToggle />
            <Button asChild className="ml-2 mr-4 hidden lg:block">
              <Link to="/contact" onClick={closeSidebar}>
                Get Started
              </Link>
            </Button>
            <button onClick={toggleSidebar} className="focus:outline-none">
              {isSidebarOpen ? (
                <X className="h-6 w-6 cursor-pointer text-foreground" />
              ) : (
                <Menu className="h-6 w-6 cursor-pointer text-foreground" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for when sidebar is open (Mobile/Tablet only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile/Tablet Sidebar (opens smoothly from right) */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 transform p-5 shadow-lg transition-transform duration-300 ease-in-out lg:hidden
        bg-[var(--glass-background)] backdrop-blur-md ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex justify-end">
          <button onClick={closeSidebar} className="focus:outline-none">
            <X className="h-6 w-6 cursor-pointer text-foreground" />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    : "hover:bg-gradient-to-r from-primary to-secondary bg-clip-text hover:text-transparent"
                }`
              }
              onClick={closeSidebar}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <Button asChild className="mt-5">
          <Link onClick={closeSidebar} to="/contact">
            Get Started
          </Link>
        </Button>
      </div>
    </>
  );
}
