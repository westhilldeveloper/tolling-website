"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { name: "Home", route: "/" },
    { name: "About Us", route: "/about" },
    { name: "Services", route: "/services" },
    { name: "Projects", route: "/projects" },
    { name: "Clients", route: "/clients" },
    { name: "Gallery", route: "/gallery" },
    { name: "Careers", route: "/careers" },
  ];

  const isActive = (route) => pathname === route;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);

      if (mobileMenu) {
        setVisible(true);
      } else if (currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling DOWN -> Hide MAIN navbar only, utility bar stays
        setVisible(false);
      } else {
        // Scrolling UP -> Show MAIN navbar
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenu]);

  return (
    <header
    className={`fixed top-0 left-0 right-0 z-50`}
  >
      
     
{/* ===== TOP UTILITY BAR - Slanted Ribbon - FORCED WITH INLINE STYLE ===== */}
 <div className="hidden lg:block" style={{ background: "transparent" }}>
        <div
          className="bg-white text-[#0A1628] relative"
          style={{
            marginLeft: "160px",
            clipPath: "polygon(60px 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          {/* Gold line on slanted edge */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-[#B08D57]"
            style={{
              left: "28px",
              transform: "skewX(-48deg)",
              transformOrigin: "top",
            }}
          />
          <div className="max-w-7xl mx-auto px-6 pl-16 h-9 flex items-center justify-between text-[11px] tracking-[0.08em] font-medium">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone size={12} className="text-[#B08D57]" /> 011-47083993
              </span>
              <span className="flex items-center gap-2">
                <Mail size={12} className="text-[#B08D57]" /> info@bheemagroup.com
              </span>
            </div>
            <div className="flex items-center gap-2 pr-2">
              <MapPin size={12} className="text-[#B08D57]" />
              <span>India | Toll Management & Highway O&M</span>
            </div>
          </div>
        </div>
      </div>

    
      {/* ===== MAIN NAVBAR ===== */}
 <div
        className={`bg-white border-b  overflow-hidden transition-all duration-500 ease-in-out ${
          visible ? mobileMenu
           ? "max-h-[620px] opacity-100 translate-y-0" 
            : "max-h-[120px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 border-transparent"
        } ${
          scrolled
            ? "border-slate-200 m-8 shadow-[0_2px_20px_rgba(10,22,40,0.08)]"
            : "border-slate-100 shadow-none"
        }`}
      >
  {/* Increased height for larger logo */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[88px] lg:h-[92px] flex items-center justify-between">

    {/* Logo + Text */}
    <Link href="/" className="flex items-center gap-4 group">
      <div className="  flex items-center justify-center">
        <Image
          src="/images/asset/logos/trolling.png"
          alt="Bheema Group Logo"
          width={72}
          height={72}
          className="h-16 w-16 lg:h-[90px] lg:w-[90px] object-contain"
          priority
        />
      </div>
      
    </Link>

    {/* Desktop Menu - Always dark text now */}
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.name} className="relative group">
            <Link
              href={item.route}
              className={`text-[12.5px] font-semibold tracking-[0.08em] uppercase py-2 transition-colors ${
                isActive(item.route)
                  ? "text-[#B08D57]"
                  : "text-[#0A1628]/80 hover:text-[#0A1628]"
              }`}
            >
              {item.name}
            </Link>
            <span
              className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#B08D57] transition-all duration-300 ${
                isActive(item.route) ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </li>
        ))}
        <li>
          <Link
            href="/contact"
            className="ml-2 px-5 py-2.5 text-[12px] font-semibold tracking-[0.1em] uppercase border border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>

    {/* Mobile Button - Always dark now */}
    <button
      onClick={() => setMobileMenu(!mobileMenu)}
      className="lg:hidden p-2 text-[#0A1628]"
    >
      {mobileMenu ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-white ${
            mobileMenu ? "max-h- border-t border-slate-100" : "max-h-0"
          }`}
        >
          <ul className="py-3 px-6">
            {navItems.map((item) => (
              <li key={item.name} className="border-b border-slate-50 last:border-0">
                <Link
                  href={item.route}
                  onClick={() => setMobileMenu(false)}
                  className={`flex justify-between items-center py-3.5 text- font-semibold tracking-wide uppercase ${
                    isActive(item.route) ? "text-[#B08D57]" : "text-[#0A1628]"
                  }`}
                >
                  {item.name}
                  <span className="text-[#B08D57]">→</span>
                </Link>
              </li>
            ))}
            <li className="pt-3 pb-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenu(false)}
                className="block text-center bg-[#0A1628] text-white py-3 text- tracking-[0.15em] font-semibold uppercase"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}