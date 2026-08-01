"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname(); // current route

  // Define nav items with their corresponding routes
  const navItems = [
    { name: "HOME", route: "/" },
    { name: "ABOUT US", route: "/about" },
    { name: "LEADERSHIP", route: "/leadership" },
    { name: "OUR ACHIEVEMENTS", route: "/achievements" },
    { name: "OUR SERVICES", route: "/services" },
    { name: "PROJECTS", route: "/projects" },
    { name: "CLIENTS", route: "/clients" },
    { name: "GALLERY", route: "/gallery" },
  ];

  // Helper to check if current route matches (exact match)
  const isActive = (route) => pathname === route;

  return (
    <header className="sticky top-0 z-50 bg-[#0A2342] text-white shadow-md">
      <div className="max-w-8xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo - links to home */}
        <Link href="/" className="flex bg-white p-1 items-center rounded-sm border-2 border-blue-900">
          <Image
            src="/images/asset/logos/trolling.png"
            alt="Bheema Group Logo"
            width={90}
            height={80}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-[13px] font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.route}
                  className={`transition-colors duration-300 ${
                    isActive(item.route)
                      ? "text-[#D9A441]"
                      : "hover:text-[#D9A441]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenu ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="bg-[#08264A] border-t border-white/10">
          <ul className="flex flex-col py-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.route}
                  onClick={() => setMobileMenu(false)}
                  className={`block px-6 py-3 transition ${
                    isActive(item.route)
                      ? "text-[#D9A441] bg-white/10"
                      : "hover:bg-white/10 hover:text-[#D9A441]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}