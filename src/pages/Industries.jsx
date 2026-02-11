import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Industries() {
  const INDUSTRIES = [
    { id: 1, title: "Tourism", desc: "Tourism is a major growth vector for Saudi Arabia’s economic transformation, with giant destination projects, regulatory revisions and infrastructure upgrades forming the foundation of this push under Vision 2030.", image: "/images/industries/tourism.jpg?v=1" },
    { id: 2, title: "Consumer Products", desc: "The Consumer Products sector in Saudi Arabia is poised for growth, driven by demographic trends, rising disposable incomes and modern retail/e-commerce expansion under Vision 2030’s economic-diversification agenda.", image: "/images/industries/consumer-products.jpg?v=1" },
    { id: 3, title: "Hospitality", desc: "The Hospitality sector is a pivotal element of Saudi Arabia’s tourism-led diversification strategy, supported by a large hotel-development pipeline and regulatory reforms to enhance inbound leisure and business tourism under Vision 2030.", image: "/images/industries/hospitality.jpg?v=1" },
    { id: 4, title: "Logistics & Infrastructure", desc: "Logistics & Infrastructure is a cornerstone for Saudi Arabia’s economic strategy, with ambitious targets to raise the sector’s contribution to GDP and position the Kingdom as a regional logistics hub. Transport, ports, airports and multimodal corridors are being expanded under Vision 2030.", image: "/images/industries/logistics-infrastructure.jpg?v=1" },
    { id: 5, title: "Healthcare & Life Sciences", desc: "The Healthcare & Life Sciences sector is undergoing transformation in Saudi Arabia through the Health Sector Transformation Program under Vision 2030, with an emphasis on preventive care, digital health, private-sector participation and local manufacturing of pharmaceuticals/devices.", image: "/images/industries/healthcare-lifesciences.jpg?v=1" },
    { id: 6, title: "Agribusiness & Food", desc: "Agribusiness and Food is a critical non-oil sector for Saudi Arabia, anchored by Vision 2030 goals around food security, value-added agriculture and supply-chain resilience. The Kingdom has invested in modern agriculture, food processing and logistics to reduce import reliance and build domestic capability.", image: "/images/industries/agribusiness-food.jpg?v=1" },
    { id: 7, title: "Environmental", desc: "Environmental sustainability is increasingly enshrined in Saudi Arabia’s policy agenda, led by the Saudi Green Initiative (SGI) and embedded within Vision 2030’s sustainability pillar. Efforts span carbon-emission reduction, land & marine ecosystem restoration, afforestation and circular-economy approaches.", image: "/images/industries/environmental.jpg?v=1" },
    { id: 8, title: "Energy, Power & Products (EPP)", desc: "Saudi Arabia’s Energy, Power & Products sector is on a dual path: continuing its hydrocarbon-based strength while accelerating transformation toward renewables, hydrogen and value-added products. The Kingdom invests heavily in downstream integration, petrochemicals, and clean-energy platforms as part of its decarbonisation and diversification strategy.", image: "/images/industries/epp.jpg?v=1" },
    { id: 9, title: "Construction, Projects & Assets", desc: "The Construction, Projects & Assets sector is experiencing a surge in Saudi Arabia, fuelled by large-scale public/private “giga-projects” under Vision 2030 and PIF-led investment. These projects cover residential, tourism, transport, cultural heritage and mixed-use development, forming a multi-year pipeline of construction and asset-delivery activity.", image: "/images/industries/construction-projects.jpg?v=1" },
    { id: 10, title: "Automotive", desc: "The Automotive sector in Saudi Arabia is shifting from a predominantly import/distribution model toward localization, EV adoption and advanced mobility solutions. Driven by Vision 2030’s industrial development arm and Public Investment Fund (PIF)-backed investments, localization of vehicle assembly and value-chains is accelerating.", image: "/images/industries/automotive.jpg?v=1" },
    { id: 11, title: "Technology & Innovation", desc: "Saudi Arabia’s Technology & Innovation sector is a strategic pillar of Vision 2030, aimed at diversifying the economy via digital transformation, R&D and startup ecosystems. Government initiatives such as the National Transformation Program and dedicated data/AI authorities drive investments in cloud infrastructure, cybersecurity, digital payments and smart-city platforms. Key growth trajectories include public-service digitalisation, sovereign tech capital deployment, and global technology partnerships.", image: "/images/industries/technology-innovation.jpg?v=1" },
  ];

  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const blueSectionRef = useRef(null);
  const tlRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState(INDUSTRIES.length - 1);
  const [isMobile, setIsMobile] = useState(false);
  const isClickingRef = useRef(false);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    // DESKTOP & TABLET LANDSCAPE
    mm.add("(min-width: 1200px)", () => {
      setIsMobile(false);
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

      tl.to(pillRef.current, {
        width: "100vw", height: "100vh", borderRadius: "0px",
        y: "-90px", backgroundImage: "none", x: 0, top: 0, left: -22,
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
    });

    // MOBILE & TABLET PORTRAIT
    mm.add("(max-width: 1199px)", () => {
      setIsMobile(true);
    });

    return () => mm.revert();
  }, []);

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
        <img src="/images/hero/industries-hero.png" className="object-cover w-full h-full" alt="Industries" />
        <h2 className="text-white z-10 relative px-6">Industries</h2>
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>

      {!isMobile ? (
        /* DESKTOP VIEW (Unchanged) */
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white mb-35">
          <div className="absolute pt-30 left-0 w-full flex flex-col items-center z-10">
            <h2 className="text-center">
              Specialized Expertise Across Diverse <br /> Sectors to Power Your
              <span className="inline-block relative w-23 h-11.5 mx-3 align-middle">
                <div ref={pillRef} className="absolute left-1/2 -translate-x-1/2 w-23 h-11.5 bg-[#0033A0] rounded-4xl z-20 flex items-center justify-center overflow-hidden bg-[url(https://bngglobal.net/assets/images/vectors/globe.svg)] bg-no-repeat bg-bottom">
                  <i className="icon-globe text-white text-xl relative z-30 opacity-80"></i>
                  <div ref={blueSectionRef} className="absolute top-0 inset-0 opacity-0 w-screen h-screen flex items-center justify-start bg-[#003a86]">
                    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="flex flex-col h-full w-full relative bg-white">
                        <div className="relative w-full h-100 md:h-125 lg:h-[30vh] xl:h-[40vh] 2xl:h-[58vh] shrink-0 overflow-hidden">
                          {INDUSTRIES.map((item, index) => (
                            <div key={item.id} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeTab === index ? "opacity-100" : "opacity-0"}`}>
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <div className="w-full max-w-160 p-5 2xl:p-10 ms-auto text-start">
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
                      <div className="flex flex-col justify-center items-end h-full pr-4 perspective-container pointer-events-auto">
                        <div className="industry-list flex flex-col items-end relative h-[400px] justify-center">
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
              Global Growth
            </h2>
          </div>
        </div>
      ) : (
        /* MOBILE VIEW: Adjusted to match your image */
        <div className="w-full bg-white">
          <div className="py-8 px-2 text-center">
            <h2>Specialized Expertise Across Diverse Sectors to Power Your Global Growth</h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-0 no-scrollbar">
            {INDUSTRIES.map((item) => (
              <div 
                key={item.id} 
                className="min-w-full snap-center flex flex-col md:flex-row"
              >
                {/* CONTENT SECTION: 100% width on mobile, 50% on medium+ */}
                <div className="bg-primary p-4 flex flex-col justify-center w-full md:w-1/2">
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