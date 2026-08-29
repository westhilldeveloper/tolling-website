"use client";

import Image from "next/image";

export default function StickyButton() {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <a
        href="https://www.bheemagroup.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center h-12 bg-[#08264A] rounded-full shadow-lg overflow-hidden border-2 border-[#D9A441] transition-all duration-300 hover:bg-[#D9A441] hover:animate-none animate-gentle-pulse"
      >
        {/* Logo container – shrinks to 0 on hover */}
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center transition-all duration-300 overflow-hidden group-hover:w-0">
          <Image
            src="/images/Bheema_logo.png"
            alt="Bheema Group"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Text – hidden until hover, then expands */}
        <span className="text-white font-bold text-sm whitespace-nowrap transition-all duration-300 max-w-0 opacity-0 overflow-hidden group-hover:max-w-[200px] group-hover:opacity-100 group-hover:px-4 group-hover:py-2">
          Visit Bheema Group
        </span>
      </a>
    </div>
  );
}