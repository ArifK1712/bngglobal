import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Aryan Sarang",
    role: "Data & Research Associate",
    department: "",
    description: "Aryan Sarang supports BNG Arabia’s global research and data-driven consulting initiatives, with a focus on market intelligence, investment analysis, and trade facilitation across the Middle East and emerging markets. His work spans research on market entry strategies, competitive benchmarking, and policy tracking to strengthen BNG’s advisory and investment promotion capabilities.",
    email: "aryan.sarang@bngglobal.net",
    image: "/images/team/aryan-sarang.png",
  },
  {
    id: 2,
    name: "Sejal Hule",
    role: "Deputy Director - Global Projects & Investment Promotion",
    department: "",
    description: "Sejal Hule leads BNG Consulting’s international business development and foreign investment initiatives with a strategic focus on markets across the Middle East, Europe, and Africa and the USA. With a proven track record in driving cross-border partnerships and trade collaborations, she has successfully spearheaded high-impact projects across several markets.",
    email: "sejal.hule@bngglobal.net",
    image: "/images/team/sejal-hule.png",
  },
  {
    id: 3,
    name: "Atharva Harde",
    role: "Business Development Executive - Investment Promotion",
    department: "Middle East Ops",
    description: "Atharva Harde is a Business Development Executive at BNG Consulting, where he facilitates cross-border investments across the Middle East, Africa, and Europe. Drawing on his previous experience at the World Trade Center, he specializes in building international partnerships and driving Foreign Direct Investment (FDI). Atharva is recognized for his results-oriented approach to fostering global expansion and managing strategic corridors for BNG's clients.",
    email: "atharva.harde@bngglobal.net",
    image: "/images/team/atharva-harde.png",
  },
  {
    id: 4,
    name: "Mohammad Ovais",
    role: "Key Account Manager – Sales",
    department: "",
    description: `Mohammad Ovais drives revenue growth and strategic account development at BNG Arabia, focusing on client acquisition, deal closure, and long-term partnership building across the Middle East. He works closely with senior stakeholders to convert opportunities into high-value engagements and expand key accounts.
    In addition to sales leadership, Mohammad manages end-to-end project coordination for exhibitions and events, ensuring seamless execution, on-time delivery, and alignment with client objectives. He bridges sales and operations to deliver impactful event experiences while maintaining consistent client satisfaction and repeat business.`,
    email: "mohammad.ovais@bngglobal.net",
    image: "/images/team/mohammad-ovais.png",
  },
  {
    id: 5,
    name: "Khaled Hemdan",
    role: "Project Manager",
    department: "",
    description: `Khaled Hemdan leads the planning and execution of projects at BNG Arabia, managing exhibitions and events across the Middle East. He partners closely with clients and senior stakeholders to ensure projects are completed on schedule, within budget, and meet all objectives.
    Beyond project oversight, Khaled collaborates with cross-functional teams, streamlines operational workflows, and guarantees smooth execution. He effectively connects strategic planning with operational delivery to create memorable event experiences while maintaining excellent client satisfaction.`,
    email: "khaled.hemdan@bngglobal.net",
    image: "/images/team/khaled-hemdan.png",
  },
  {
    id: 6,
    name: "Saiful Haq",
    role: "General Manager",
    department: "",
    description: `Saiful Haq provides overall leadership and strategic direction for BNG Arabia’s events and exhibitions operations across the region. He oversees business growth, client relationships, and operational excellence, ensuring every project aligns with the company’s vision and market goals.
    With extensive experience in managing large-scale exhibitions, corporate events, and brand activations, Saiful leads cross-functional teams from concept to completion. He ensures smooth coordination between sales, design, production, and on-site execution, delivering high-quality experiences that meet client expectations, timelines, and budgets.`,
    email: "khaled.hemdan@bngglobal.net",
    image: "/images/team/saiful-haq.png",
  },
];

// --- CONSTANTS ---
const RADIUS_DEFAULT = 207; // For screens > 1500px
const RADIUS_TABLET = 170;  // For screens 1024px - 1500px
const ACTIVE_TRANSLATE_OFFSET = 60; 
const AUTOPLAY_DELAY = 5000;

export default function TeamCarousel() {
  const [virtualIndex, setVirtualIndex] = useState(0);

  const activeIndex = ((virtualIndex % TEAM_MEMBERS.length) + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
  const activeMember = TEAM_MEMBERS[activeIndex];

  const containerRef = useRef(null);
  const orbitContainerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef({ value: 0 });
  const isAnimating = useRef(false);

  // Helper: Checks breakpoint for logic switching
  const isMobile = () => window.innerWidth < 1024;

  // Helper: Gets dynamic radius based on screen width
  const getRadius = () => {
    return window.innerWidth >= 1500 ? RADIUS_DEFAULT : RADIUS_TABLET;
  };

  // --- 0. RESIZE LISTENER ---
  // Forces layout update when resizing window (crucial for responsive radius)
  useEffect(() => {
    const handleResize = () => {
      // Re-run position logic immediately on resize
      updatePositions(progressRef.current.value);
      // Force a re-render to update the static circle div size
      setVirtualIndex((prev) => prev); 
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // --- 2. TEXT ANIMATION (Slides IN from Right) ---
  useLayoutEffect(() => {
    gsap.fromTo(textRef.current,
      // Start State: Transparent and slightly to the RIGHT (20px)
      { opacity: 0, x: -50 }, 
      // End State: Fully visible and slides to Center (0px)
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.inOut", overwrite: "auto" } 
    );
  }, [virtualIndex]);

  // --- 3. ANIMATION LOOP ---
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


  // --- MATH & POSITIONING LOGIC ---
  const updatePositions = (progress) => {
    const mobile = isMobile();
    const currentRadius = getRadius();
    const total = TEAM_MEMBERS.length;
    
    // 90 degrees ensures the "Top, Right, Bottom, Left" layout
    const desktopStep = 90; 
    const colorInterpolator = gsap.utils.interpolate("#e5e7eb", "#FFD500");
    
    const containerWidth = orbitContainerRef.current ? orbitContainerRef.current.offsetWidth : window.innerWidth;
    const mobileSpacing = (containerWidth / 2) - 38;

    TEAM_MEMBERS.forEach((_, i) => {
      // Shortest path calculation
      let offset = (i - progress) % total;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const isActive = Math.round(offset) === 0;

      if (mobile) {
        // --- MOBILE LOGIC ---
        const absDiff = Math.abs(offset);
        const isVisible = absDiff < 1.8; 
        const x = offset * mobileSpacing; 
        
        gsap.set(`.team-avatar-${i}`, {
          display: isVisible ? "flex" : "none",
          x: x,
          y: 0, 
          scale: isActive ? 1.15 : 0.85,
          zIndex: 10 - Math.round(absDiff),
          backgroundColor: isActive ? "#FFD500" : "#e5e7eb",
          overwrite: "auto",
        });

      } else {
        // --- DESKTOP LOGIC ---
        // Visible window: -1 (Top), 0 (Right/Active), 1 (Bottom), 2 (Left)
        // This covers all 4 cardinal points.
        const isVisible = offset >= -1.2 && offset <= 2.2;

        const angleDeg = offset * desktopStep; 
        const angleRad = (angleDeg * Math.PI) / 180;

        // Scaling effect based on proximity to the active (0 degree) position
        const distToZero = Math.abs(angleDeg);
        const scaleRange = 90; 
        const scaleRatio = Math.max(0, (scaleRange - distToZero) / scaleRange);
        const easeFactor = scaleRatio * scaleRatio; 

        // Add the translate offset only to the active member to push it "forward"
        const finalRadius = currentRadius + (ACTIVE_TRANSLATE_OFFSET * easeFactor);

        const x = Math.cos(angleRad) * finalRadius;
        const y = Math.sin(angleRad) * finalRadius;

        gsap.set(`.team-avatar-${i}`, {
          display: isVisible ? "flex" : "none",
          x: x,
          y: y,
          scale: 1 + (1.2 * easeFactor),
          opacity: 1,
          zIndex: isActive ? 20 : 10,
          backgroundColor: colorInterpolator(easeFactor),
          overwrite: "auto"
        });
      }
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
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    setVirtualIndex((prev) => prev + diff);
  };

  // Safe check for current radius during render for the static circle div
  const currentRenderRadius = typeof window !== "undefined" ? getRadius() : RADIUS_DEFAULT;

  return (
    <div className="w-full pt-10 lg:pt-20 pb-20 lg:pb-52 overflow-hidden lg:overflow-visible" ref={containerRef}>
      <div className="app-container">
        <h2 className="lg:ms-auto w-full mb-5 text-center"><span className="xl:ms-98">Our Team</span></h2>
        
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-40 xl:gap-58 items-center">
          
          {/* VISUAL AREA (Orbit/Slider) */}
          <div 
            ref={orbitContainerRef}
            className="relative w-full flex items-center justify-center 2xl:-ms-8"
          >
            
            {/* DESKTOP ORBIT CIRCLE */}
            {/* Dynamic width/height based on current screen size */}
            <div className="hidden lg:block absolute border border-solid border-gray-300 rounded-full transition-all duration-500 ease-in-out" 
                 style={{ 
                   width: currentRenderRadius * 2, 
                   height: currentRenderRadius * 2 
                 }}></div>
            
            {/* MOBILE LINE: Full Width */}
            <div className="block lg:hidden absolute w-4xl h-px bg-gray-300 z-0 top-1/2 -translate-y-1/2"></div>

            {/* AVATARS */}
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={member.id}
                onClick={() => handleDotClick(i)}
                className={`team-avatar-${i} team-avatar-item 
                  absolute
                  w-20 h-20 lg:w-25 lg:h-25 xl:w-32 xl:h-32 
                  rounded-full overflow-hidden flex items-center justify-center cursor-pointer bg-gray-200`}
              >
                <img src={member.image} alt={member.name} className=" object-cover object-[center_8px] pointer-events-none" />
              </div>
            ))}
          </div>

          {/* TEXT AREA */}
          <div className="relative w-full text-start pt-10 lg:pt-0" ref={textRef}>
            <div className="flex flex-col items-start space-y-4">
              <div>
                <h3 className="mb-2">{activeMember.name}</h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-gray-600">
                  <p>{activeMember.role}</p><span></span><p>{activeMember.department}</p>
                </div>
              </div>
              <div className="space-y-3"> {/* space-y-4 adds gap between paragraphs */}
                {activeMember.description.split('\n').map((text, index) => (
                  <p key={index}>
                    {text}
                  </p>
                ))}
              </div>
              <a href={`mailto:${activeMember.email}`} className="underline">
                {activeMember.email}
              </a>
              <button 
                onClick={handleNext} 
                className="group mt-4 w-14 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-all">
                 <i className="icon-right-arrow text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}