"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import OngoingProjects from "./OngoingProjects";

export default function HeroHead() {
  const images = [
    "/images/her.jpeg",
    "/images/hero_2.jpeg",
    "/images/hero_3.jpeg",
    "/images/hero_4.jpeg",
    "/images/hero_5.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const operationPoints = [
    "Successfully eliminated local transporter interference across multiple major toll plazas.",
    "Maintained some of the highest daily toll collections at Shahjahanpur, Samakhiali, and Karjan.",
    "Ensured uninterrupted booth and lane operations with maximum operational uptime.",
    "Achieved zero major operational, security, or incident breaches over the past 16 years.",
    "Delivered consistent housekeeping, manpower deployment, incident management, and operational support across all project locations.",
    "Built a reputation for maximizing revenue realization while maintaining full compliance with concession agreements and client requirements.",
  ];

  const choosePoints = [
    "Reliable Toll Operations & Revenue Assurance",
    "Highway Operations & Maintenance Excellence",
    "Professional Security & Housekeeping Services",
    "Efficient Incident Management & Emergency Response",
    "Skilled Manpower Deployment",
    "Complete Regulatory & Contractual Compliance",
    "Consistent Operational Performance Across India",
  ];

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Hero Slider – now with only headline, subtitle, and button */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0 z-0">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`Hero Background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#D9A441] w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content – reduced to essentials */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-12 lg:py-0">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] text-[#C8A34B] font-bold mb-4 leading-tight">
              Bheema Tolling & Traffic <br /> Solution Pvt. Ltd.
            </h1>
            <h2 className="text-lg sm:text-xl md:text-[32px] text-white mb-4 font-medium">
              India's Trusted Partner in Toll Management, Highway O&M & Security Solutions
            </h2>
            {/* Short placeholder – optional, you can remove this line */}
            <p className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 text-justify lg:text-left mb-6 leading-relaxed">
              Delivering operational excellence and safety across India's highways for over 16 years.
            </p>
            <button className="bg-[#D9A441] px-6 py-2 font-bold text-white rounded-md hover:bg-[#c8933a] transition">
              Visit Bheema Group
            </button>
          </div>
        </div>
      </section>

     
    </>
  );
}