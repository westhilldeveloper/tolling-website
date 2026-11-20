"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import OngoingProjects from "./OngoingProjects";

export default function Hero() {
  const images = [
    "/images/h1.png",
    "/images/h2.png",
    "/images/h3.png",
    "/images/h4.png",
    "/images/h5.png",
    "/images/h6.png",
    "/images/h7.png",
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
      {/* Hero Slider - FINAL FIXED - No Black Shade, No Extra Background */}
      <section id="home" className="relative md:mt-0 mt-22 w-full overflow-hidden bg-white">
        {/* Image Slider - Height follows image exactly */}
        <div className="relative w-full">
          {images.map((src, index) => (
            <div
              key={index}
              className={`relative w-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              {/* MAIN IMAGE ONLY - No blurred background, No overlay */}
              <Image
                src={src}
                alt={`Hero Background ${index + 1}`}
                width={1920}
                height={1080}
                className="w-full h-auto block object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Dots - Only on Desktop, Hidden on Mobile */}
        <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#D9A441] w-8"
                  : "bg-white/60 hover:bg-white w-2.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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
              Bheema Tolling & Traffic Solution Pvt. Ltd. (BTTS) is one of India&apos;s leading providers of integrated Toll Management, Highway Operations & Maintenance (O&M), Traffic Management, Incident Response, Road Maintenance, and Professional Manpower Solutions. With nearly 16 years of industry experience, BTTS has built a strong reputation for delivering reliable, efficient, and compliant operational services to national highways, expressways, and large-scale infrastructure projects. Our expertise lies in maximizing toll revenue, ensuring uninterrupted operations, maintaining the highest safety standards, and providing customized solutions that meet the evolving needs of highway concessionaires and government authorities.
            </p>
            <p>
              Trusted by prestigious organizations such as NHAI, NHIT, L&T IDPL, Maple Highways, Adani Road O&M, Welspun, KMC Constructions, and Essel Infra, BTTS has successfully managed some of India&apos;s most demanding toll plazas and highway infrastructure projects. Backed by a highly skilled workforce, experienced leadership, and a commitment to operational excellence, we continue to deliver innovative, sustainable, and value-driven services that enhance infrastructure performance, improve road safety, and create long-term value for our clients. Guided by our philosophy, <span className="font-semibold text-[#D9A441]">&quot;Our People Are Your Strength,&quot;</span> we remain dedicated to building safer, smarter, and more efficient transportation infrastructure across India.
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