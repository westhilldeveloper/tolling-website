"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import LeadershipPage from "./LeadershipPage";
import HeroHead from "./HeroHead";

export default function About() {
  const missionPoints = [
    "We are committed to providing honest, efficient, and technology-driven services that maximize operational performance, enhance revenue realization, maintain the highest safety standards, and create secure, clean, and well-managed environments through professional manpower and integrated facility management.",
  ];

  // Refs for each animated section
  const headingRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  useEffect(() => {
    // Callback function for observer
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(callback, {
      threshold: 0.15,
      rootMargin: "0px 0px -30px 0px",
    });

    // Observe each element
    const elements = [headingRef.current, visionRef.current, missionRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* <HeroHead /> */}
      <section id="about" className="bg-[#f5f5f5] py-28 sm:py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* ===== About Heading (animated) ===== */}
          <div
            ref={headingRef}
            className="text-center mb-8 sm:mb-10 md:mb-12 animate-on-scroll"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 mb-3 sm:mb-4">
              <div className="w-6 sm:w-8 md:w-12 h-[1px] bg-[#D9A441]" />
              <h2 className="text-[#08264A] text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold uppercase">
                ABOUT US
              </h2>
              <div className="w-6 sm:w-8 md:w-12 h-[1px] bg-[#D9A441]" />
            </div>
            <p className="max-w-7xl mx-auto text-xs sm:text-sm md:text-[14px] leading-5 font-bold sm:leading-6 text-gray-500 px-2">
              Building India's Highway Infrastructure with Excellence
            </p>
            <p className="max-w-7xl mx-auto text-xs sm:text-sm md:text-[14px] leading-5 text-justify sm:leading-6 text-gray-500 px-2">
              we provide end-to-end Toll Management, Highway Operations & Maintenance, Traffic Management, Security Services, Housekeeping, Incident Management, and Professional Manpower Solutions across India.
            </p>
            <p className="max-w-7xl mx-auto text-xs sm:text-sm md:text-[14px] mt-4 text-justify text-gray-500 px-2">
              With nearly 16 years of operational excellence, we have earned the trust of NHAI, NHIT, L&T IDPL, Maple Highways, Adani Road O&M, Welspun, KMC Construction, Essel Infra, and numerous government organizations by consistently delivering reliable operations, higher revenue realization, and world-class service quality.
            </p>
            <p className="max-w-7xl mx-auto text-xs sm:text-sm md:text-[14px] mt-4 text-justify text-gray-500 px-2">
              Our expertise lies in successfully managing challenging toll plazas, highway infrastructure, and large-scale manpower deployments while ensuring uninterrupted operations, maximum revenue assurance, and complete client satisfaction.
            </p>
          </div>

          {/* ===== Vision & Mission (animated) ===== */}
          <div className="grid lg:grid-cols-2 gap-10 md:gap-10 lg:gap-20 mb-4 mt-8 sm:mt-10 md:mt-14">
            {/* Vision */}
            <div ref={visionRef} className="animate-on-scroll">
              <h3 className="text-[#08264A] text-xl sm:text-2xl md:text-[28px] font-bold uppercase mb-4 pl-4 sm:mb-6 md:mb-8 text-center lg:text-left">
                OUR VISION
              </h3>
              <div className="flex flex-col sm:flex-row items-center pl-4 sm:items-start gap-3 sm:gap-5">
                <p className="text-gray-700 md:mt-4 mt-0 text-center sm:text-left text-base sm:text-lg md:text-[14px] font-regular max-w-xl">
                  To become India's most trusted organization in Highway Operations, Toll Management, Security, and Integrated Facility Services by delivering operational excellence, maximizing revenue, and ensuring safe, incident-free infrastructure across the nation.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div ref={missionRef} className="animate-on-scroll">
              <h3 className="text-[#041E3D] text-xl sm:text-2xl md:text-[28px] font-bold uppercase mb-4 sm:mb-6 md:mb-8 text-center lg:text-left">
                OUR MISSION
              </h3>
              <div className="space-y-4 sm:space-y-5 text-center sm:text-left md:space-y-6">
                {missionPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 sm:gap-4">
                    <p className="text-gray-700 text-sm sm:text-base md:text-[14px]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <LeadershipPage />
      </section>
    </>
  );
}