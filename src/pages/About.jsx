import React, { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Team from "../components/Team";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const m1Ref = useRef(null);
  const m2Ref = useRef(null);
  const m3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Create a timeline that starts when the section is 80% visible
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          markers:false,
          start: "40% 60%", // Starts when top of section hits 80% of viewport
          //toggleActions: "play none none reverse", // Replays if you scroll up and down
        },
      });

      // 1. Animate m1 (First image at bottom)
      tl.fromTo(
        m1Ref.current,
        { y: 400, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "=0.12"
      )
      // 2. Animate m2 (Second image at bottom) - starts 0.2s after m1 begins
      .fromTo(
        m2Ref.current,
        { y: 300, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "=0.8" 
      )
      // 3. Animate m3 (Top image) - starts after m2 finishes
      .fromTo(
        m3Ref.current,
        { y: 200, opacity: 0 }, // Coming from top
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "=0.4"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 1. Get the current URL location
  const { hash } = useLocation();

  // 2. Scroll to the element when the hash changes
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // scrollIntoView options: 'smooth' creates the animation
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0); // Scroll to top if no hash
    }
  }, [hash]);

  return (
    <>
    <div className="hero relative">
      <img src="/images/hero/about-hero.png" className='object-cover w-full h-full' alt="About Us" />
      <h2 className="text-white z-1">About Us</h2>      
      <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
    </div>
    <div id="who-we-are" className="app-container py-22 scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-18 items-center">
        <div className="overflow-hidden md:max-w-123 rounded-2xl text-end">      
          <img src="/images/who-we-are.jpg" className='object-cover object-right origin-right h-90 scale-170 ' alt="About Us" />
        </div>
        <div className="md:px-8">
          <h2 className="mb-3">Who we are</h2>
          <p className="mb-3">Business Network Global (BNG) is a Saudi Arabia–based consulting firm dedicated to helping corporates and government bodies navigate to global markets and empowering businesses to grow.</p>
          <p>We specialize in Foreign Direct Investment (FDI) advisory and trade consulting, combining deep local knowledge with global perspectives to navigate the complexities of international markets.</p>
        </div>
      </div>
    </div>

    <div id="mission" className="bg-primary overflow-hidden scroll-mt-24">
        <div className="app-container">
            <div className="grid grid-col-1 lg:grid-cols-2 justify-between"> 
                <div className='py-20 w-full lg:w-200 lg:pe-22'>    
                    <div class="badge badge-primary rounded-full bg-[#253E80] text-white py-4 mb-2">Our Mission</div>       
                    <h2 className="mb-3 text-white">Empowering Global Business Growth</h2>
                    <p className="mb-3 text-white">At Business Network Global, our mission is to empower businesses with strategic insights and practical solutions that unlock international opportunities. We are committed to delivering exceptional consulting services that bridge markets, facilitate foreign direct investment, and drive sustainable economic growth across borders. </p>
                    <p className='text-white'>We believe that every business, regardless of size, deserves access to global markets. Our dedicated team works tirelessly to provide the expertise, connections, and support needed to navigate complex international landscapes with confidence. </p>
                </div>
                <div className="w-full lg:w-130 bg-[#253E80] relative h-[470px] lg:h-full lg:ms-auto lg:-me-20">
                    <div className="before:content-[''] before:absolute before:top-0 before:h-full before:w-lvw before:start-0 before:end-0 before:-ms-4 lg:before:ms-0 before:bg-[#253E80] "></div>
                    <img ref={m3Ref} src='/images/vectors/vector-m3.svg' className='absolute top-10 end-15 start-0 mx-auto' alt="" />
                    <div className="flex justify-center gap-20 absolute bottom-0 end-0 -start-4">
                      <img ref={m1Ref} src='/images/vectors/vector-m1.svg' alt="" />
                      <img ref={m2Ref} src='/images/vectors/vector-m2.svg' alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="team" className="scroll-mt-24">
      <Team />
    </div>
    <Footer />
    </>
  );
}