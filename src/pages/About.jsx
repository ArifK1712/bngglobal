import React, { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Team from "../components/Team";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import aboutHero from "../assets/images/hero/about-hero.webp";
import whoWeAreImg from "../assets/images/who-we-are.webp";
import vectorM3 from "../assets/images/vectors/vector-m3.svg";
import vectorM1 from "../assets/images/vectors/vector-m1.svg";
import vectorM2 from "../assets/images/vectors/vector-m2.svg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);
  const m1Ref = useRef(null);
  const m2Ref = useRef(null);
  const m3Ref = useRef(null);
  const containerRef = useRef(null);
  const clientIds = Array.from({ length: 21 }, (_, i) => i + 1);

  // 1. Clients zoom transition using useGSAP
  useGSAP(() => {
    const images = containerRef.current?.querySelectorAll('img');
    if (!images || !images.length) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(images, {
      scale: 1.30,
      filter: "grayscale(0%)",
      zIndex: 10,
      duration: 0.8,
      force3D: true, 
      stagger: {
        each: 1,
        yoyo: true, 
        repeat: 1 
      },
      ease: "power2.inOut" 
    });
  }, { scope: containerRef });

  // 2. Mission Section ScrollTrigger vectors using useGSAP
  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        markers: false,
        start: "40% 60%", 
      },
    });

    tl.fromTo(
      m1Ref.current,
      { y: 400, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "=0.12"
    )
    .fromTo(
      m2Ref.current,
      { y: 300, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "=0.8" 
    )
    .fromTo(
      m3Ref.current,
      { y: 200, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      "=0.4"
    );
  }, { scope: sectionRef });

  // 3. Get the current URL location
  const location = useLocation();

  // 4. Scroll to the element when the hash or state changes
  useEffect(() => {
    const scrollToSection = location.state?.scrollTo;
    const hash = location.hash;

    if (scrollToSection) {
      const element = document.getElementById(scrollToSection);
      if (element) {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        const scrollMarginTop = parseInt(style.scrollMarginTop) || 0;
        const diff = Math.abs(rect.top - scrollMarginTop);

        // Only scroll if the element is not already aligned at the top
        if (diff > 15) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0); 
    }
  }, [location.hash, location.state]);

  return (
    <>
    <div className="hero relative">
      <img src={aboutHero} className='object-cover w-full h-full' alt={t.aboutHeader} loading="lazy" />
      <h2 className="text-white z-1">{t.aboutHeader}</h2>      
      <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
    </div>
    <div id="who-we-are" className="app-container py-10 lg:py-25 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">        
        <div className="lg:order-1">
          <h2 className="mb-3 text-start">{t.aboutWhoWeAreTitle}</h2>
          <p className="mb-3 text-start">{t.aboutWhoWeAreP1}</p>
          <p className="mb-3 text-start">{t.aboutWhoWeAreP2}</p>
          {t.aboutWhoWeAreP3 && <p className="mb-3 text-start">{t.aboutWhoWeAreP3}</p>}
          {t.aboutWhoWeAreP4 && <p className="mb-3 text-start">{t.aboutWhoWeAreP4}</p>}
          {t.aboutWhoWeAreP5 && <p className="text-start">{t.aboutWhoWeAreP5}</p>}
        </div>
        <div className="overflow-hidden lg:max-w-140 rounded-2xl text-end">      
          <img src={whoWeAreImg} className='object-cover object-right origin-right w-full lg:h-125 scale-130' loading="lazy" alt={t.aboutHeader} />
        </div>
      </div>
    </div>

    <div id="mission" ref={sectionRef} className="bg-primary overflow-hidden scroll-mt-24">
        <div className="app-container">
            <div className="grid grid-col-1 lg:grid-cols-2 justify-between"> 
                <div className='py-12 lg:py-20 w-full lg:w-200 lg:pe-22'>    
                    <div className="badge badge-primary rounded-full bg-[#253E80] text-white py-4 mb-2 border-1/white">{t.aboutOurMissionBadge}</div>       
                    <h2 className="mb-3 text-white text-start">{t.aboutOurMissionTitle}</h2>
                    <p className="mb-3 text-white text-start">{t.aboutOurMissionP1}</p>
                    <p className="mb-3 text-white text-start">{t.aboutOurMissionP2}</p>
                    {t.aboutOurMissionP3 && <p className="text-white text-start">{t.aboutOurMissionP3}</p>}
                </div>
                <div className="w-full lg:w-130 bg-[#253E80] relative h-100 lg:h-full lg:ms-auto lg:-me-20">
                    <div className="before:content-[''] before:absolute before:top-0 before:h-full before:w-lvw before:start-0 before:end-0 before:-ms-4 lg:before:ms-0 before:bg-[#253E80] "></div>
                    <img ref={m3Ref} src={vectorM3} className='absolute bottom-45 end-15 start-0 mx-auto w-100 lg:w-auto' alt="" loading="lazy" />
                    <div className="flex justify-center gap-10 lg:gap-20 absolute bottom-0 end-0 -start-4">
                      <img ref={m1Ref} src={vectorM1} className="h-50 md:h-auto" alt="" loading="lazy" />
                      <img ref={m2Ref} src={vectorM2} className="h-50 md:h-auto" alt="" loading="lazy" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="team" className="scroll-mt-24">
      <Team />
    </div>

    <div id="clients" className="scroll-mt-24">
      <div className="app-container pb-15" ref={containerRef}>
        <h2 className="text-center mb-10">{t.aboutOurClientsTitle}</h2>      
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 items-center">
          {clientIds.map((id) => (
            <img 
              key={id} 
              src={new URL(`../assets/images/clients/${id}.webp`, import.meta.url).href} 
              alt={`Client ${id}`} 
              // Keep the manual hover as well so it still works if user touches it
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          ))}
        </div>    
      </div>
    </div>    
    <Footer />
    </>
  );
}