import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import expertiseHero from "../assets/images/hero/expertise-hero.webp";
import vectorM4 from "../assets/images/vectors/vector-m4.svg";

export default function Expertise() {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const t = translations[language];

  const steps = [
    {
      title: t.expertiseSteps[0].title,
      iconClass: "icon-analyse-markets",
      desc: t.expertiseSteps[0].desc
    },
    {
      title: t.expertiseSteps[1].title,
      iconClass: "icon-develop-strategy",
      desc: t.expertiseSteps[1].desc
    },
    {
      title: t.expertiseSteps[2].title,
      iconClass: "icon-drive-sustainable-growth",
      desc: t.expertiseSteps[2].desc
    }
  ];

  const cards = [
    {
      title: t.expertiseCards[0].title,
      icon: "icon-global-collaboration",
      desc: t.expertiseCards[0].desc,
      theme: "light", 
    },
    {
      title: t.expertiseCards[1].title,
      icon: "icon-sustainable-growth",
      desc: t.expertiseCards[1].desc,
      theme: "dark", 
    },
    {
      title: t.expertiseCards[2].title,
      icon: "icon-global-collaboration",
      desc: t.expertiseCards[2].desc,
      theme: "light",
    },
    {
      title: t.expertiseCards[3].title,
      icon: "icon-results-driven",
      desc: t.expertiseCards[3].desc,
      theme: "dark",
    },
    {
      title: t.expertiseCards[4].title,
      icon: "icon-trusted-partner",
      desc: t.expertiseCards[4].desc,
      theme: "light",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <>
      {/* Hero Section */}
      <div className="hero relative">
        <img 
            src={expertiseHero} 
            className='object-cover w-full h-full' 
            alt={t.expertiseHeroTitle} 
            loading="lazy"
        />
        <h2 className="text-white relative z-10">{t.expertiseHeroTitle}</h2>
        <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
      </div>

      {/* Intro Text */}
      <div className="app-container py-10 lg:py-32" dir={isRtl ? "rtl" : "ltr"}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap:5 lg:gap-10">
          <h2 className="mb-3 text-start">{t.expertiseIntroHeading}</h2>
          <div className="col-span-3 text-start">
            <p className="mb-3">{t.expertiseIntroP1}</p>
            <p>{t.expertiseIntroP2}</p>
          </div>
        </div>
      </div>

      <Services />

      {/* Animation Loop Section */}
      <div className="bg-primary">
        <div className="app-container text-center text-white py-10 lg:pb-25" dir={isRtl ? "rtl" : "ltr"}>
          <h2 className="mb-2.5">{t.expertiseApproachHeading}</h2>
          <p className="text-center text-white mb-12 md:mb-18">{t.expertiseApproachSubheading}</p>          
          <div className="flex flex-col md:grid grid-cols-3 gap-5 gap-y-8 xl:gap-30 justify-between">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <div key={index} className="grid md:gap-y-5 max-w-xs mx-auto">
                  <div
                    className={`icon w-30 h-30 mx-auto rounded-full flex justify-center items-center relative md:mb-3 transition-transform duration-500 ease-in-out ${
                      isActive ? "scale-93 md:scale-125" : "scale-76 md:scale-100"
                    }`}
                  >
                    <svg
                      className="icon-circle-svg absolute end-0 start-0"
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
                    <i className={`${step.iconClass} text-5xl md:text-6xl text-warning`}></i>
                  </div>

                  <h4
                    className={`transition-colors duration-500 ease-in-out mb-2.5 ${
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
      <div className="app-container py-10 lg:py-24" dir={isRtl ? "rtl" : "ltr"}>
        <h2 className="mb-2 text-start">{t.expertiseChooseTitle}</h2>
        <p className="mb-6 md:mb-10 text-start">{t.expertiseChooseSubheading}</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, index) => {
            const isDark = card.theme === "dark";

            return (
              <div
                key={index}
                className={`${
                  isDark ? "bg-primary" : "bg-info  dark:bg-primary"
                } rounded-2xl p-8 pb-7 relative group overflow-hidden h-auto xl:h-67.5`}
              >
                {/* Expanding Circle */}
                <div className="bg-warning w-6 h-6 rounded-full absolute top-6 start-15 
                  transition-transform duration-1000 ease-in-out 
                  delay-0 group-hover:delay-0 
                  group-hover:scale-[35]">
                </div>

                {/* Content Layer */}
                <div className="relative z-10 text-start">
                  <i
                    className={`${card.icon} text-5xl mb-12 block transition-colors duration-300 delay-300 group-hover:delay-0 
                    ${
                      isDark
                        ? "text-white group-hover:text-primary"
                        : "text-primary dark:text-white group-hover:text-primary"
                    }`}
                  ></i>
                  
                  <h4
                    className={`mb-1.5 transition-colors duration-300 delay-300 group-hover:delay-0 
                    ${
                      isDark
                        ? "text-white group-hover:text-primary"
                        : "text-primary dark:text-white group-hover:text-primary"
                    }`}
                  >
                    {card.title}
                  </h4>
                  
                  <p
                    className={`transition-colors duration-300 delay-300 group-hover:delay-0 
                    ${
                      isDark
                        ? "text-white group-hover:text-primary"
                        : "text-primary dark:text-white group-hover:text-primary"
                    }`}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CTA Card */}
          <div className="border border-[#5E6C84] rounded-2xl p-8 pb-7 relative group overflow-hidden h-67.5">
            <div className="relative z-10 text-start">
              <h4 className="mb-1.5">{t.expertiseCtaHeading}</h4>
              <Link to="/contact" className="btn btn-warning px-5 hover:px-6 hover:bg-warning border-0 transition-all py-2.5 mt-10">
                <i className={`icon-right-arrow text-lg inline-block ${isRtl ? "rotate-180" : ""}`}></i>
              </Link>
            </div>
            {/* Same image path fix applies here */}
            <img
              src={vectorM4}
              className="absolute bottom-0 start-0"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}