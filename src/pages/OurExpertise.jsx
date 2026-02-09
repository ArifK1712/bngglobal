import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Services from "../components/Services";
import Footer from "../components/Footer";

// 1. BEST PRACTICE: Move static data OUTSIDE the component.
// This prevents React from re-creating these arrays on every single render.
const steps = [
  {
    title: "Analyse Markets",
    iconClass: "icon-analyse-markets",
    desc: "Deep dive into market dynamics, competitive landscapes, and regulatory environments to identify opportunities."
  },
  {
    title: "Develop Strategy",
    iconClass: "icon-develop-strategy",
    desc: "Deep dive into market dynamics, competitive landscapes, and regulatory environments to identify opportunities."
  },
  {
    title: "Drive Sustainable Growth",
    iconClass: "icon-drive-sustainable-growth",
    desc: "Deep dive into market dynamics, competitive landscapes, and regulatory environments to identify opportunities."
  }
];

const cards = [
  {
    title: "Global Collaboration",
    icon: "icon-global-collaboration",
    desc: "We bring together expertise, experience, and a global perspective to help your business thrive internationally.",
    theme: "light", 
  },
  {
    title: "Sustainable Growth",
    icon: "icon-sustainable-growth",
    desc: "We bring together expertise, experience, and a global perspective to help your business thrive internationally.",
    theme: "dark", 
  },
  {
    title: "Innovative Solutions",
    icon: "icon-global-collaboration",
    desc: "Cutting-edge strategies tailored to today's dynamic global markets",
    theme: "light",
  },
  {
    title: "Results-Driven",
    icon: "icon-results-driven",
    desc: "Strategic approach focused on measurable outcomes and sustainable growth",
    theme: "dark",
  },
  {
    title: "Trusted Partner",
    icon: "icon-trusted-partner",
    desc: "Ensuring credibility and comprehensive support in the local Saudi Market",
    theme: "light",
  },
];

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="hero relative">
        <img 
            src="/images/hero/expertise-hero.png" 
            className='object-cover w-full h-full' 
            alt="Our Expertise" 
        />
        <h2 className="text-white relative z-10">Our Expertise</h2>
        <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
      </div>

      {/* Intro Text */}
      <div className="app-container py-10 lg:py-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap:5 lg:gap-10">
          <h2 className="mb-3">Our Expertise</h2>
          <div className="col-span-3">
            <p className="mb-3">In an era of rapid global transformation, economic development demands agility, innovation, and strategic foresight. BNG Arabia partners with governments, trade bodies, and private enterprises to unlock the full potential of economies — by attracting investment, driving export growth, and building global competitiveness.</p>
            <p>Our work spans the full spectrum of economic development — from strategy and execution to impact assessment. We identify high-potential sectors, evaluate market ecosystems, and design programs that deliver measurable outcomes. Through data-driven insights, stakeholder engagement, and policy advisory, we help our clients shape the future of growth.</p>
          </div>
        </div>
      </div>

      <Services />

      {/* Animation Loop Section */}
      <div className="bg-primary">
        <div className="app-container text-center text-white py-10 lg:pb-25">
          <h2 className="mb-2.5">Our Approach</h2>
          <p className="text-center text-white mb-18">A Proven 3-Step Methodology That Transforms Insights Into Impact</p>
          
          <div className="flex flex-col md:grid grid-cols-3 gap-5 gap-y-10 xl:gap-30 justify-between">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <div key={index} className="grid gap-y-5">
                  <div
                    // FIX 2: 'scale-120' is not a default Tailwind class. 
                    // Changed to 'scale-125' (or use scale-[1.2] for exact value)
                    className={`icon w-30 h-30 mx-auto rounded-full flex justify-center items-center relative mb-3 transition-transform duration-500 ease-in-out ${
                      isActive ? "scale-125" : "scale-100"
                    }`}
                  >
                    <svg
                      className="icon-circle-svg absolute end-0 start-0"
                      width="136"
                      height="136"
                      viewBox="0 0 136 136"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="68"
                        cy="68"
                        r="66"
                        fill="none"
                        stroke={isActive ? "#FBBF24" : "rgba(255, 255, 255, 0.31)"} 
                        strokeWidth="1"
                        strokeDasharray="8 8"
                        className="transition-colors duration-500 ease-in-out"
                      ></circle>
                    </svg>
                    <i className={`${step.iconClass} text-6xl text-warning`}></i>
                  </div>

                  <h4
                    className={`transition-colors duration-500 ease-in-out ${
                      isActive ? "text-warning" : "text-white"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-white">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Cards Grid Section */}
      <div className="app-container py-10 lg:py-24">
        <h3 className="mb-2">Why Choose BNG</h3>
        <p className="mb-10">We bring together expertise, experience, and a global perspective to help your business thrive internationally.</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, index) => {
            const isDark = card.theme === "dark";

            return (
              <div
                key={index}
                className={`${
                  isDark ? "bg-primary" : "bg-info"
                } rounded-2xl p-8 pb-7 relative group overflow-hidden h-auto xl:h-67.5`}
              >
                {/* Expanding Circle */}
                <div className="bg-warning w-6 h-6 rounded-full absolute top-6 start-15 
                  transition-transform duration-1000 ease-in-out 
                  delay-0 group-hover:delay-0 
                  group-hover:scale-[35]">
                </div>

                {/* Content Layer */}
                <div className="relative z-10">
                  <i
                    className={`${card.icon} text-5xl mb-12 block 
                    ${
                      isDark
                        ? "text-white transition-colors duration-300 delay-300 group-hover:delay-0 group-hover:text-primary"
                        : "text-primary"
                    }`}
                  ></i>
                  
                  <h4
                    className={`mb-1.5 
                    ${
                      isDark
                        ? "text-white transition-colors duration-300 delay-300 group-hover:delay-0 group-hover:text-primary"
                        : "text-primary"
                    }`}
                  >
                    {card.title}
                  </h4>
                  
                  <p
                    className={`
                    ${
                      isDark
                        ? "text-white transition-colors duration-300 delay-300 group-hover:delay-0 group-hover:text-primary"
                        : "text-primary"
                    }`}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CTA Card */}
          <div className="bg-white border border-[#5E6C84] rounded-2xl p-8 pb-7 relative group overflow-hidden h-67.5">
            <div className="relative z-10">
              <h4 className="mb-1.5">Let’s Build Your Global Success Story Together</h4>
              <Link to="/contact" className="btn btn-warning px-5 hover:px-6 hover:bg-warning border-0 transition-all py-2.5 mt-10">
                <i className="icon-right-arrow text-lg"></i>
              </Link>
            </div>
            {/* Same image path fix applies here */}
            <img
              src="/images/vectors/vector-m4.svg"
              className="absolute bottom-0 start-0"
              alt=""
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}