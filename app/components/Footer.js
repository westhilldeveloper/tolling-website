import {
  Phone,
  Mail,
  Globe,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Quick links data
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Clients", href: "/clients" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <footer
        className="relative text-white"
        style={{
          backgroundImage: "url('/images/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#08264A]/90"></div>

        <div className="relative z-10 md:max-w-8xl  mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12 lg:py-16">
          {/* Main Footer Grid - now 4 columns on lg */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 items-start">

            {/* Left - Company Name */}
            <div className="text-center md:text-left order-1">
              <h2 className="text-2xl sm:text-2xl md:text-[24px] lg:text-[28px] font-bold mb-2 md:mb-4">
                Bheema Tolling & Traffic Solutions PVT LTD (BTTS)
              </h2>
              <p className="text-[#D9A441] text-sm sm:text-base md:text-lg">
                Our People Are Your Strength
              </p>
            </div>

            {/* Center - Contact Us */}
            <div className="text-center md:text-left order-3 md:order-2">
              <h3 className="text-[#D9A441] text-lg sm:text-xl md:text-[20px] font-bold uppercase mb-4 md:mb-6">
                Contact Us
              </h3>

              <div className="space-y-3 md:space-y-4 text-[13px] sm:text-[14px]">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Phone size={18} className="text-[#D9A441] flex-shrink-0" />
                  <span>011-47083993</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Mail size={18} className="text-[#D9A441] flex-shrink-0" />
                  <span>info@bheemagroup.com</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <MapPin size={18} className="text-[#D9A441] flex-shrink-0" />
                  <span>6B, Atmaram House, Tolstoy Marg, Connaught Place, New Delhi - 110001, India</span>
                </div>
              </div>
            </div>

            {/* NEW: Quick Links */}
            <div className="text-center md:text-left order-4 md:order-3">
  <h3 className="text-[#D9A441] text-lg sm:text-xl md:text-[20px] font-bold uppercase mb-4 md:mb-6">
    Quick Links
  </h3>
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[13px] sm:text-[14px]">
    {quickLinks.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className="hover:text-[#D9A441] transition-colors"
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
</div>

            {/* Right - Logo */}
            <div className="flex justify-center order-4 md:order-4">
              <Image
                src="/images/asset/logos/trolling.png"
                alt="Bheema Group Logo"
                width={90}
                height={80}
                className="h-16 w-auto"
                priority
              />
            </div>

          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-[#2C3F5B] px-4 sm:px-6 md:px-8 pt-3 pb-2 border-t border-white/20 text-white flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        <p className="text-[11px] sm:text-xs md:text-sm text-center">
          © {currentYear} Bheema Tolling & Traffic solutions pvt Ltd (BTTS). All Rights Reserved.
        </p>

        {/* Social icons (commented out) – you can uncomment if needed */}
        {/* <div className="flex items-center gap-4 md:gap-5 text-base sm:text-lg">
          <FaFacebookF className="cursor-pointer hover:text-[#D9A441] transition-colors" />
          <FaLinkedinIn className="cursor-pointer hover:text-[#D9A441] transition-colors" />
          <FaInstagram className="cursor-pointer hover:text-[#D9A441] transition-colors" />
          <FaYoutube className="cursor-pointer hover:text-[#D9A441] transition-colors" />
        </div> */}
      </div>

      {/* Terms & Privacy */}
      <div className="bg-[#2C3F5B] px-4 sm:px-6 md:px-8 py-2 text-[11px] sm:text-xs text-yellow-600 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-6 md:gap-8">
        <Link href="/terms" className="hover:text-yellow-400 transition-colors">
          Terms & Conditions
        </Link>
        <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
          Privacy Policy
        </Link>
      </div>

      <div className="bg-[#2C3F5B] px-8 text-center text-xs text-gray-400 md:text-left">
        Made by{' '}
        <a
          href="https://mysterioushero.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:underline"
        >
          Mysterious Hero
        </a>
      </div>
    </>
  );
}