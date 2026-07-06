import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import industriesHero from "../assets/images/hero/industries-hero.webp";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Industries() {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const t = translations[language];

  const INDUSTRIES = [
    { id: 1, title: t.industriesItems[0].title, desc: t.industriesItems[0].desc, image: new URL("../assets/images/industries/tourism.jpg", import.meta.url).href },
    { id: 2, title: t.industriesItems[1].title, desc: t.industriesItems[1].desc, image: new URL("../assets/images/industries/consumer-products.jpg", import.meta.url).href },
    { id: 3, title: t.industriesItems[2].title, desc: t.industriesItems[2].desc, image: new URL("../assets/images/industries/hospitality.jpg", import.meta.url).href },
    { id: 4, title: t.industriesItems[3].title, desc: t.industriesItems[3].desc, image: new URL("../assets/images/industries/logistics-infrastructure.jpg", import.meta.url).href },
    { id: 5, title: t.industriesItems[4].title, desc: t.industriesItems[4].desc, image: new URL("../assets/images/industries/healthcare-lifesciences.jpg", import.meta.url).href },
    { id: 6, title: t.industriesItems[5].title, desc: t.industriesItems[5].desc, image: new URL("../assets/images/industries/agribusiness-food.jpg", import.meta.url).href },
    { id: 7, title: t.industriesItems[6].title, desc: t.industriesItems[6].desc, image: new URL("../assets/images/industries/environmental.jpg", import.meta.url).href },
    { id: 8, title: t.industriesItems[7].title, desc: t.industriesItems[7].desc, image: new URL("../assets/images/industries/epp.jpg", import.meta.url).href },
    { id: 9, title: t.industriesItems[8].title, desc: t.industriesItems[8].desc, image: new URL("../assets/images/industries/construction-projects.jpg", import.meta.url).href },
    { id: 10, title: t.industriesItems[9].title, desc: t.industriesItems[9].desc, image: new URL("../assets/images/industries/automotive.jpg", import.meta.url).href },
    { id: 11, title: t.industriesItems[10].title, desc: t.industriesItems[10].desc, image: new URL("../assets/images/industries/technology-innovation.jpg", import.meta.url).href },
  ];

  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const blueSectionRef = useRef(null);
  const tlRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState(INDUSTRIES.length - 1);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1200;
    }
    return false;
  });
  const isClickingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    if (isMobile) return;

    // Reset scroll position to top synchronously before GSAP measurements
    window.scrollTo(0, 0);

    // Reset properties to clean up after LTR/RTL transitions
    setActiveTab(INDUSTRIES.length - 1);
    gsap.set(pillRef.current, { clearProps: "all" });
    gsap.set(blueSectionRef.current, { clearProps: "all" });
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    tlRef.current = tl;

    const isDocRtl = document.documentElement.dir === "rtl";
    tl.to(pillRef.current, {
      width: "100vw", height: "100vh", borderRadius: "0px",
      y: "-90px", backgroundImage: "none", x: 0, top: 0,
      ...(isDocRtl ? { right: -22 } : { left: -22 }),
      duration: 2, ease: "power2.inOut",
    });

    tl.to(blueSectionRef.current, { opacity: 1, duration: 0.5 }, "-=0.5");

    const lastIndex = INDUSTRIES.length - 1;
    tl.addLabel(`tab-${lastIndex}`);
    tl.to({}, { duration: 1 });

    for (let i = lastIndex - 1; i >= 0; i--) {
      tl.addLabel(`tab-${i}`);
      tl.to({}, {
        duration: 1,
        onStart: () => { if (!isClickingRef.current) setActiveTab(i); },
        onReverseComplete: () => { if (!isClickingRef.current) setActiveTab(i + 1); },
      });
    }
  }, { dependencies: [isMobile, language], scope: containerRef });

  const handleTabClick = (index) => {
    if (!tlRef.current || isMobile) return;
    isClickingRef.current = true;
    setActiveTab(index);
    const labelPos = tlRef.current.scrollTrigger.labelToScroll(`tab-${index}`);
    if (labelPos !== undefined) {
      gsap.to(window, {
        scrollTo: labelPos + 5,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => { isClickingRef.current = false; }
      });
    }
  };

  return (
    <>
      <div className="hero relative">
        <img src={industriesHero} className="object-cover w-full h-full" alt={t.industriesHeroTitle} />
        <h2 className="text-white z-10 relative px-6">{t.industriesHeroTitle}</h2>
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>

      {!isMobile ? (
        /* DESKTOP VIEW — structural wrappers locked to LTR so GSAP layout never reverses */
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white mb-35" dir="ltr" style={{ direction: "ltr" }}>
          <div className="absolute pt-30 left-0 w-full flex flex-col items-center z-10" dir="ltr" style={{ direction: "ltr" }}>
            <h2 className="text-center dark:text-[#253858]" dir="ltr" style={{ direction: "ltr" }}>
              <span dangerouslySetInnerHTML={{ __html: t.industriesHeadingPart1 }}></span>
              <span className="inline-block relative w-23 h-11.5 mx-3 align-middle">
                <div ref={pillRef} className="absolute left-1/2 -translate-x-1/2 w-23 h-11.5 bg-[#0033A0] rounded-4xl z-20 flex items-center justify-center overflow-hidden bg-[url(https://d1o4s320mkx6gb.cloudfront.net/bng-global/globe.svg)] bg-no-repeat bg-bottom" dir="ltr" style={{ direction: "ltr" }}>
                  <i className="icon-globe text-white text-xl relative z-30 opacity-80"></i>
                  <div ref={blueSectionRef} className="absolute top-0 inset-0 opacity-0 w-screen h-screen flex items-center justify-start bg-[#003a86]" dir="ltr" style={{ direction: "ltr" }}>
                    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0" dir="ltr" style={{ direction: "ltr" }}>
                      {/* LEFT COLUMN: image + description — always physically on the left */}
                      <div className="flex flex-col h-full w-full relative bg-white" dir="ltr" style={{ direction: "ltr" }}>
                        <div className="relative w-full h-100 md:h-125 lg:h-[30vh] xl:h-[40vh] 2xl:h-[58vh] shrink-0 overflow-hidden">
                          {INDUSTRIES.map((item, index) => (
                            <div key={item.id} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeTab === index ? "opacity-100" : "opacity-0"}`}>
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        {/* Description text — this is the only place Arabic RTL text direction applies */}
                        <div className="w-full max-w-160 p-5 2xl:p-10 ms-auto text-start" dir={isRtl ? "rtl" : "ltr"}>
                          <div className="relative">
                            <p className="leading-relaxed opacity-0 pointer-events-none">{INDUSTRIES[activeTab].desc}</p>
                            {INDUSTRIES.map((item, index) => (
                              <p key={item.id} className={`absolute top-0 left-0 leading-relaxed w-full transition-all duration-700 ease-in-out ${activeTab === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
                                {item.desc}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* RIGHT COLUMN: blue panel with stacked titles — always physically on the right */}
                      <div className="flex flex-col justify-center items-end h-full pe-4 perspective-container pointer-events-auto" dir="ltr" style={{ direction: "ltr" }}>
                        <div className="industry-list flex flex-col items-end relative h-[400px] justify-center" dir={isRtl ? "rtl" : "ltr"}>
                          {INDUSTRIES.map((item, index) => {
                            const diff = index - activeTab;
                            return (
                              <div
                                key={item.id}
                                onClick={() => handleTabClick(index)}
                                className="transition-all duration-700 ease-out absolute right-40 origin-right flex items-center justify-end cursor-pointer group"
                                style={{
                                  transform: `translate(${Math.abs(diff) * 40}px, ${diff * 160}px) rotate(${diff * -8}deg)`,
                                  opacity: diff === 0 ? 1 : Math.max(0.5, 1 - Math.abs(diff) * 0.5),
                                  zIndex: 100 - Math.abs(diff),
                                  top: "50%",
                                  marginTop: `${diff * 25}px`,
                                }}
                              >
                                <h2 className="whitespace-nowrap text-3xl 2xl:text-4xl text-white">{item.title}</h2>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
              {t.industriesHeadingPart2}
            </h2>
          </div>
        </div>
      ) : (
        /* MOBILE VIEW */
        <div className="w-full bg-white" dir={isRtl ? "rtl" : "ltr"}>
          <div className="py-8 px-2 text-center">
            <h2>{t.industriesHeadingMobile}</h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-0 no-scrollbar">
            {INDUSTRIES.map((item) => (
              <div 
                key={item.id} 
                className="min-w-full snap-center flex flex-col md:flex-row"
              >
                {/* CONTENT SECTION: 100% width on mobile, 50% on medium+ */}
                <div className="bg-primary p-4 flex flex-col justify-center w-full md:w-1/2 text-start">
                  <h3 className="text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white">
                    {item.desc}
                  </p>
                </div>

                {/* IMAGE SECTION: 100% width on mobile, 50% on medium+ */}
                <div className="w-full md:w-1/2 lg:h-auto">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}