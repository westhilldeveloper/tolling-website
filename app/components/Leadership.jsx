'use client';

import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

// Card component – with an optional `delay` prop for staggered animation
const LeadershipCard = ({ service, delay = 0 }) => {
  const initials = service.title
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex w-full max-w-sm flex-col rounded-2xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:max-w-xs md:max-w-sm"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#D9A441]" />
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#041E3D] text-xl font-bold text-white shadow-inner">
        {initials}
      </div>
      <h3 className="text-xl font-bold text-[#041E3D] sm:text-2xl">
        {service.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-[#D9A441] sm:text-base">
        {service.designation}
      </p>
      <div className="mx-auto my-4 h-px w-12 bg-gray-200" />
      <p className="flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
        {service.description}
      </p>
      <Quote size={20} className="mx-auto mt-4 text-[#D9A441]/40" />
    </div>
  );
};

export default function Leadership({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  if (!slides.length) return null;

  // Auto‑advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Scroll to active slide
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const slideWidth = container.children[0]?.offsetWidth || 0;
      const gap = 16;
      container.scrollTo({
        left: currentSlide * (slideWidth + gap),
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  // ----- Intersection Observer for scroll animations (mobile cards) -----
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="leadership" className="bg-[#041E3D] px-4 py-12 text-center sm:px-6 md:px-10 lg:px-12 lg:py-16">
      {/* Heading and description – same as before */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 mb-3 sm:mb-4">
        <div className="w-6 sm:w-8 md:w-12 h-[1px] bg-[#D9A441]" />
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold uppercase">
          LEADERSHIP
        </h2>
        <div className="w-6 sm:w-8 md:w-12 h-[1px] bg-[#D9A441]" />
      </div>

      <p className="mx-auto mt-4 max-w-full text-white text-[12px] leading-5 sm:text-[13px] md:text-[14px]">
        Behind Bheema Tolling & Traffic Solution Pvt. Ltd. (BTTS) is a team of accomplished professionals with deep expertise in infrastructure, toll operations, security management, strategic planning, and technology. Their collective leadership, industry knowledge, and commitment to operational excellence have been instrumental in building trusted partnerships and delivering exceptional results across India's highway and infrastructure sector.
      </p>

      {/* -------- MOBILE VIEW (static, each card animated) -------- */}
      <div className="mt-10 sm:hidden">
        <div className="grid grid-cols-1 gap-6 justify-items-center">
          {slides.map((slide, slideIndex) =>
            slide.map((service, idx) => {
              // Calculate a unique index for staggered delay
              const cardIndex = slideIndex * slide.length + idx;
              const delay = cardIndex * 150; // 150ms between each card
              return (
                <div
                  key={`${slideIndex}-${idx}`}
                  className="animate-on-scroll w-full max-w-sm"
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <LeadershipCard service={service} />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* -------- DESKTOP/TABLET VIEW (carousel with peek) -------- */}
      <div className="relative mt-10 hidden sm:block">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="w-full shrink-0 snap-start">
              <div className="grid grid-cols-2 gap-4 justify-items-center lg:grid-cols-4 xl:gap-6">
                {slide.map((service, idx) => (
                  <LeadershipCard key={idx} service={service} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3.5 w-3.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'scale-110 bg-[#D9A441]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}