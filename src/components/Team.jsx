import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Aryan Sarang",
    role: "Deputy Director",
    department: "Global Projects",
    description: "Aryan leads BNG Consulting's international business development with a strategic focus on markets across the Middle East.",
    email: "aryan.sarang@bngglobal.net",
    image: "images/team/aryan-sarang.png",
  },
  {
    id: 2,
    name: "Sejal Hule",
    role: "Senior Consultant",
    department: "Market Strategy",
    description: "Sejal specializes in market entry strategies and competitive analysis, helping clients navigate complex regulatory landscapes.",
    email: "sejal.hule@bngglobal.net",
    image: "images/team/sejal-hule.png",
  },
  {
    id: 3,
    name: "Omar Al-Fayed",
    role: "Regional Head",
    department: "Middle East Ops",
    description: "Omar brings over 15 years of experience in energy and infrastructure, facilitating rapid deployment of capital in the GCC.",
    email: "omar.fayed@bngglobal.net",
    image: "images/team/ahmed-khan.png",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "VP of Innovation",
    department: "Tech & Sustainability",
    description: "Sarah drives the innovation agenda at BNG, ensuring global projects align with modern ESG standards and technology.",
    email: "sarah.j@bngglobal.net",
    image: "images/team/sarah-jenkins.png",
  },
];

const RADIUS = 220;
const ACTIVE_TRANSLATE_OFFSET = 60; 
const AUTOPLAY_DELAY = 5000;

export default function TeamCarousel() {
  const [virtualIndex, setVirtualIndex] = useState(0);

  const activeIndex = ((virtualIndex % TEAM_MEMBERS.length) + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
  const activeMember = TEAM_MEMBERS[activeIndex];

  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef({ value: 0 });
  const isAnimating = useRef(false);

  // --- 1. SETUP EFFECT ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-avatar-item", {
        scale: 0, opacity: 0, duration: 1.0, stagger: 0.1, ease: "back.out(1.5)", delay: 0.2
      });
      updatePositions(0);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- 2. TEXT ANIMATION (Use useLayoutEffect to prevent FOUC/Jumping) ---
  useLayoutEffect(() => {
    // This runs BEFORE the browser paints, eliminating the "jump to left" glitch.
    gsap.fromTo(textRef.current,
      { opacity: 0, x: -50 }, // Start slightly left and invisible
      { opacity: 1, x: 0, duration: 1.0, ease: "power2.inOut", overwrite: "auto" } // Slide right to 0
    );
  }, [virtualIndex]);

  // --- 3. CIRCLE ANIMATION & LOGIC ---
  useEffect(() => {
    const diff = Math.abs(virtualIndex - progressRef.current.value);
    const dynamicDuration = diff > 1 ? 1.2 : 0.8;

    gsap.to(progressRef.current, {
      value: virtualIndex,
      duration: dynamicDuration,
      ease: "power3.inOut",
      onUpdate: () => {
        updatePositions(progressRef.current.value);
      },
      onComplete: () => {
        isAnimating.current = false;
      }
    });
  }, [virtualIndex]);

  // --- 4. AUTOPLAY ---
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [virtualIndex]);


  // --- Math Logic ---
  const updatePositions = (progress) => {
    const total = TEAM_MEMBERS.length; 
    const step = 360 / total; 
    const colorInterpolator = gsap.utils.interpolate("#e5e7eb", "#FFD500");

    TEAM_MEMBERS.forEach((_, i) => {
      const offset = i - progress;
      const angleDeg = offset * step; 
      const angleRad = (angleDeg * Math.PI) / 180;

      const normalizedAngle = (angleDeg % 360 + 360) % 360;
      const distToZero = Math.min(normalizedAngle, 360 - normalizedAngle);
      const scaleRange = 60; 
      const scaleRatio = Math.max(0, (scaleRange - distToZero) / scaleRange);
      const easeFactor = scaleRatio * scaleRatio; 

      const currentRadius = RADIUS + (ACTIVE_TRANSLATE_OFFSET * easeFactor);

      const x = Math.cos(angleRad) * currentRadius;
      const y = Math.sin(angleRad) * currentRadius;
      const finalScale = 1 + (1.25 * easeFactor);
      const finalColor = colorInterpolator(easeFactor); 

      gsap.set(`.team-avatar-${i}`, {
        x: x,
        y: y,
        scale: finalScale,
        opacity: 1,
        rotation: 0, 
        backgroundColor: finalColor,
        overwrite: "auto"
      });
    });
  };

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setVirtualIndex((prev) => prev + 1);
  };

  const handleDotClick = (targetIndex) => {
    if (isAnimating.current) return;
    
    const total = TEAM_MEMBERS.length;
    const currentModIndex = ((virtualIndex % total) + total) % total;

    if (currentModIndex === targetIndex) return;

    isAnimating.current = true;

    let diff = targetIndex - currentModIndex;
    if (diff < 0) diff += total;

    setVirtualIndex((prev) => prev + diff);
  };

  return (
    <div className="w-full pt-32 pb-52" ref={containerRef}>
      <div className="app-container">
        <h2 className="ms-auto max-w-122 mb-10">Our Team</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-58 items-center">
          
          {/* ORBIT AREA */}
          <div className="relative w-full h-full flex items-center justify-center -ms-8">
            <div className="absolute border border-solid border-gray-300 rounded-full" style={{ width: RADIUS * 2, height: RADIUS * 2 }}></div>

            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={member.id}
                onClick={() => handleDotClick(i)}
                className={`team-avatar-${i} team-avatar-item absolute w-32 h-32 rounded-full overflow-hidden flex items-center justify-center cursor-pointer bg-gray-200`}
              >
                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-[center_8px] pointer-events-none" />
              </div>
            ))}
          </div>

          {/* TEXT AREA */}
          <div className="relative z-30 md:px-0" ref={textRef}>
            <div className="flex flex-col items-start space-y-6">
              <div>
                <h3 className="mb-3">{activeMember.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <p>{activeMember.role}</p><p>|</p><p>{activeMember.department}</p>
                </div>
              </div>
              <p>{activeMember.description}</p>
              <a href={`mailto:${activeMember.email}`} className="underline">
                {activeMember.email}
              </a>
              <button 
                onClick={handleNext} 
                className="group mt-4 w-14.5 h-9.5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-warning hover:text-primary transition-all duration-300">
                 <i className="icon-right-arrow text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}