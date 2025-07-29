import {
  Facebook,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { logo } from "public";
import { navLinks } from "public/data";
import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="crediscript_logo" className="h-10" />
              <span className="text-primary text-lg font-semibold md:text-2xl">
                Crediscript
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Professional academic writing services helping students and
              researchers achieve excellence in their academic pursuits.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-primary" />
              <Twitter className="h-5 w-5 text-primary" />
              <Linkedin className="h-5 w-5 text-primary" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium md:text-base ${
                      isActive
                        ? "text-primary underline"
                        : "hover:text-primary hover:underline"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@crediscript.com">info@crediscript.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+2349070936769">+234 907 093 6769</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Crediscript. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
