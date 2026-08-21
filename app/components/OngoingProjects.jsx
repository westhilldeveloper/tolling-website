'use client';

import { useEffect, useState, useRef } from 'react';

export default function OngoingProjects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // ----- Project data -----
  const project1 = {
    title: 'Shahjahanpur Toll Plaza',
    description1:
      'Successfully dismantled the local MAV transporter nexus, enforced complete tariff collection in accordance with the Concession Agreement, and maintained uninterrupted operations for 7 consecutive years. The project consistently achieved one of the highest daily toll collections while outperforming previous operators.',
    image: '/images/Shahjahan.png',
    logo: '/images/cmp_logo/NCC_Ltd.png',
  };

  const project2 = {
    title: 'Samakhiali Toll Plaza',
    description1:
      'Delivered a remarkable 50% increase in toll revenue within just 11 months by eliminating local operational challenges and reducing run-throughs and unauthorized exemptions to client-specified limits. The project has continued to operate successfully for over 8 years with sustained operational excellence.',
    image: '/images/Samakhiali.png',
    logo: '/images/cmp_logo/Suryapriya.png',
  };

  const project3 = {
    title: 'Bhigan Toll Plaza',
    description1:
      'Achieved an impressive ₹7 lakh increase in daily revenue within the first month of operations while significantly reducing unauthorized exemptions and improving overall toll collection efficiency.',
    image: '/images/Bhigan.png',
    logo: '/images/cmp_logo/KEC_Int.png',
  };

  const project4 = {
    title: 'Panihar & Mudhkheda Toll Plazas',
    description1:
      'Successfully initiated toll operations while maintaining unauthorized exemptions consistently below 1.25%, ensuring strict compliance and enhanced revenue protection.',
    image: '/images/Panihar.png',
    logo: '/images/cmp_logo/KEC_Int.png',
  };

  const project5 = {
    title: 'Karjan Toll Plaza',
    description1:
      'Completely neutralized local and employee MAV interference through a balanced combination of operational discipline, legal intervention, and stakeholder management. The result was substantial revenue enhancement and zero unauthorized exemptions for local commercial vehicles.',
    image: '/images/Karjan.png',
    logo: '/images/cmp_logo/KEC_Int.png',
  };

  const slides = [project1, project2, project3, project4, project5];

  // ----- Auto‑play functions -----
  const startAutoPlay = () => {
    stopAutoPlay(); // clear any existing interval
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const restartAutoPlayAfterDelay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      startAutoPlay();
    }, 2000); // 2 second delay after interaction ends
  };

  // Pause / Resume handlers
  const handlePause = () => {
    stopAutoPlay();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleResume = () => {
    restartAutoPlayAfterDelay();
  };

  // Initial auto‑play & cleanup
  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to current slide
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

  // Entrance animation
  useEffect(() => {
    const cards = document.querySelectorAll('.card-animate');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('card-visible');
      }, 100 + i * 150);
    });
  }, []);

  // Navigation handlers
  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    handlePause();
    restartAutoPlayAfterDelay();
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    handlePause();
    restartAutoPlayAfterDelay();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    handlePause();
    restartAutoPlayAfterDelay();
  };

  return (
    <section id="achievements" className="bg-white px-4 py-4 md:px-4 lg:px-4 lg:py-4">
      <div className="mx-auto max-w-full">
        {/* Heading */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5 mb-3 sm:mb-4">
          <div className="w-6 sm:w-8 md:w-12 h-[1px] bg-[#D9A441]" />
          <h2 className="text-[#08264A] text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-bold uppercase">
            Our Achievements
          </h2>
          <div className="w-6 sm:w-8 md:w-12 h-[1px] bg-[#D9A441]" />
        </div>

        <p className="mx-auto font-bold mt-4 max-w-full text-center text-[10px] leading-[1.35] text-[#3f3f3f] md:text-[14px]">
          Delivering Measurable Results Across India's Highway Infrastructure
        </p>
        <p className="mx-auto mt-1 max-w-full text-center text-[10px] leading-[1.35] text-[#3f3f3f] md:text-[14px]">
          For nearly 16 years, Bheema Tolling & Traffic Solution Pvt. Ltd. (BTTS) has successfully
          managed some of India's most challenging toll plazas and highway infrastructure projects.
          Our expertise extends beyond routine toll operations, we specialize in maximizing revenue,
          eliminating operational inefficiencies, maintaining uninterrupted services, and delivering
          exceptional operational performance even in high-pressure environments.
        </p>
        <p className="mx-auto mt-4 max-w-full text-center text-[10px] leading-[1.35] text-[#3f3f3f] md:text-[14px]">
          Through strategic planning, experienced leadership, and disciplined execution, we have
          consistently helped our clients improve revenue realization, strengthen operational
          control, and maintain seamless highway operations.
        </p>

        {/* Carousel with pause on hover/touch */}
        <div
          ref={carouselRef}
          className="relative mt-6"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
        >
          {/* Scroll container */}
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="md:w-3/5 w-full mr-4 shrink-0 snap-start card-animate"
              >
                <div className="mx-auto rounded-[12px] bg-[#FFF6EB] px-4 py-4 shadow-sm md:px-5 md:py-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex flex-col gap-5 lg:flex-row lg:gap-2">
                    {/* Image */}
                    <div className="flex h-[180px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#f7f7f7] md:h-[220px] md:w-full lg:h-[220px] lg:w-[312px]">
                      <img
                        src={slide.image}
                        alt="Landmark Success Stories"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="w-full flex-1 pl-2 pt-1">
                      <p className="mt-3 max-w-full text-[10px] leading-[1.4] text-[#555] md:text-[14px]">
                        Landmark Success Stories
                      </p>
                      <h3 className="text-[18px] font-medium leading-tight text-black md:text-[28px]">
                        {slide.title}
                      </h3>
                      <p className="mt-3 max-w-full text-[10px] text-justify leading-[1.4] text-[#555] md:text-[14px]">
                        {slide.description1}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D9A441] md:left-4 md:p-3"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0A2342]"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D9A441] md:right-4 md:p-3"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#0A2342]"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3.5 w-3.5 rounded-full transition-all ${
                currentSlide === index ? 'bg-[#8b6335]' : 'bg-[#f0ece6]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for entrance animations */}
      <style>
        {`
          .card-animate {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          .card-visible {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
          }
        `}
      </style>
    </section>
  );
}