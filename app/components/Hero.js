"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import OngoingProjects from "./OngoingProjects";

export default function Hero() {
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

  // Intersection Observer – uses global .animate-on-scroll class
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Slider */}
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

        <div 
  className="absolute inset-0 z-0" 
  style={{
    background: 'black',
    maskImage: 'radial-gradient(circle at top right, transparent 0%, black 100%)',
    WebkitMaskImage: 'radial-gradient(circle at top right, transparent 0%, black 100%)',
  }}
/>

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-12 lg:py-0">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[72px] text-[#C8A34B] font-bold mb-4 leading-tight">
              Bheema Tolling & Traffic <br /> Solution Pvt. Ltd.
            </h1>
            <h2 className="text-lg sm:text-xl md:text-[32px] text-white mb-4 font-medium">
              India's Trusted Partner in Toll Management, Highway O&M & Security Solutions
            </h2>
            <p className="text-gray-200 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 text-justify lg:text-left mb-6 leading-relaxed">
              Delivering operational excellence and safety across India's highways for over 16 years.
            </p>
            <button className="bg-[#D9A441] px-6 py-2 font-bold text-white rounded-md hover:bg-[#c8933a] transition">
              Visit Bheema Group
            </button>
          </div>
        </div>
      </section>

      {/* ===== INTRODUCTION (animate-on-scroll) ===== */}
      <section
        id="introduction"
        className="animate-on-scroll bg-white py-4 md:py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg mx-auto text-justify text-sm md:text-md text-gray-700 leading-relaxed space-y-4">
            <p>
              Bheema Tolling & Traffic Solution Pvt. Ltd. (BTTS) is one of India's leading providers of integrated Toll Management, Highway Operations & Maintenance (O&M), Traffic Management, Incident Response, Road Maintenance, and Professional Manpower Solutions. With nearly 16 years of industry experience, BTTS has built a strong reputation for delivering reliable, efficient, and compliant operational services to national highways, expressways, and large-scale infrastructure projects. Our expertise lies in maximizing toll revenue, ensuring uninterrupted operations, maintaining the highest safety standards, and providing customized solutions that meet the evolving needs of highway concessionaires and government authorities.
            </p>
            <p>
              Trusted by prestigious organizations such as NHAI, NHIT, L&T IDPL, Maple Highways, Adani Road O&M, Welspun, KMC Constructions, and Essel Infra, BTTS has successfully managed some of India's most demanding toll plazas and highway infrastructure projects. Backed by a highly skilled workforce, experienced leadership, and a commitment to operational excellence, we continue to deliver innovative, sustainable, and value-driven services that enhance infrastructure performance, improve road safety, and create long-term value for our clients. Guided by our philosophy, <span className="font-semibold text-[#D9A441]">"Our People Are Your Strength,"</span> we remain dedicated to building safer, smarter, and more efficient transportation infrastructure across India.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ONGOING PROJECTS (animate-on-scroll) ===== */}
      <div className="animate-on-scroll">
        <OngoingProjects />
      </div>

      {/* ===== OPERATIONAL EXCELLENCE (animate-on-scroll) ===== */}
      <section className="animate-on-scroll bg-white py-4 md:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-1 gap-10 md:gap-12 lg:gap-16">
            <div>
              <h3 className="text-[#08264A] text-md sm:text-2xl font-bold uppercase mb-4">
                Operational Excellence
              </h3>
              <p className="text-gray-700 text-sm md:text-sm leading-relaxed mb-6">
                Our long-standing success is built on disciplined operations, experienced manpower, and a commitment to continuous improvement.
              </p>
              <h4 className="text-[#08264A] text-md sm:text-2xl font-semibold uppercase mb-4">
                Our Achievements
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {operationPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#D9A441] font-bold text-md leading-none">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE BTTS (animate-on-scroll) ===== */}
      <section className="animate-on-scroll bg-white py-4 md:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-1 gap-10 md:gap-12 lg:gap-16">
            <div>
              <h4 className="text-[#08264A] text-md sm:text-2xl mt:4 md:mt-4 font-semibold uppercase mb-4">
                Why Leading Organizations Choose BTTS
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                {choosePoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#D9A441] font-bold text-md leading-none">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    
      
    </>
  );
}