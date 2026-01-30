import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const standRef = useRef(null);
  const stageRef = useRef(null);

  const services = [
    {
      title: "Concept Development & 3D Design",
      desc: "We specialize in creating innovative exhibition stand concepts that align seamlessly with your brand guidelines and overall event theme. Our approach combines strategic storytelling with immersive 3D design.",
      img: "https://bngglobal.net/assets/images/services/concept-development.jpg"
    },
    {
      title: "Logistics & Installation",
      desc: "Full-scale logistics management ensuring your exhibition materials are transported safely and installed to perfection by our expert on-site teams anywhere in the world.",
      img: "https://bngglobal.net/assets/images/services/custom-made-stands.jpg"
    },
    {
      title: "Custom Made Stands",
      desc: "Bespoke manufacturing tailored to your specific needs. We use high-quality materials and craftsmanship to make your brand stand out on the exhibition floor.",
      img: "https://bngglobal.net/assets/images/services/concept-development.jpg"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${services.length * 150}%`,
          scrub: 1,
          pin: true,
        },
      });

      // 1. CONTROLLED ZOOM
      // Reduced scale to 5 so it doesn't disappear instantly
      tl.to(standRef.current, { scale: 4 })
        .to(".initial-ui-text", { opacity: 0, duration: 0.5 }, "<")
        // Bring the Stage to the front and fade it in
        .to(stageRef.current, { opacity: 1, zIndex: 50, duration: 0.5 }, "-=0.3");

      // 2. INSTANT CONTENT SWAP
      services.forEach((_, i) => {
        if (i !== 0) {
          tl.to(`.content-layer-${i - 1}`, { display: "none", opacity: 0, duration: 0.1 });
          tl.to(`.content-layer-${i}`, { display: "flex", opacity: 1, duration: 0.1 });
        }
        tl.to({}, { duration: 1.5 }); // Time to read
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="hero relative">
        <img src="/images/hero/services-hero.png" className="object-cover w-full h-full" alt="" />
        <h2 className="text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Event Production Services</h2>
        <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
      </div>

      <h2 className="text-center mt-33">Our Services Include</h2>
      
      <div ref={containerRef} className="relative h-screen">
        
        {/* INITIAL VIEW (Standard Design) */}
        <div className="initial-ui absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center">
             <div className="initial-ui-text absolute start-0 space-y-33 hidden md:block">
                <p className="relative text-neutral"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute -start-6 top-1/2 -translate-y-1/2 -z-1" />Event Solution</p>
                <p className="relative -ms-20 text-neutral"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute -start-6 top-1/2 -translate-y-1/2 -z-1" />Logistics & <br />Installation</p>
                 <p className="relative text-neutral"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute -start-6 top-1/2 -translate-y-1/2 -z-1" />Event Solution</p>
             </div>
             
             <img ref={standRef} src="https://bngglobal.net/assets/images/exhibition-stand.svg" className="absolute z-10 scale-96" alt="" />
             <img src="https://bngglobal.net/assets/images/circle.png" className="mx-auto" alt="" />

             <div className="absolute -end-20 space-y-33">
                <p className="relative text-neutral"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute -start-6 top-1/2 -translate-y-1/2 -z-1" />Concept <br />& 3D Design</p>
                <p className="relative text-neutral"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute -start-6 top-1/2 -translate-y-1/2 -z-1" />On-site Support</p>
             </div>
          </div>
        </div>

        {/* STATIC STAGE (Appear Section) */}
        <div ref={stageRef} className="absolute inset-0 z-10 flex opacity-0 bg-white">
          {/* Left - Text */}
          <div className="w-1/2 bg-[#0a2361] relative">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`content-layer-${index} absolute inset-0 items-center justify-center p-16 text-white ${index === 0 ? "flex opacity-100" : "hidden opacity-0"}`}
              >
                <div className="max-w-md">
                  <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                  <p className="text-lg opacity-80 leading-relaxed font-light">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Monitor */}
          <div className="w-1/2 bg-[#d9d9d9] flex items-center justify-center">
            <div className="w-full max-w-xl aspect-video bg-black p-3 rounded-md shadow-2xl relative">
               {services.map((service, index) => (
                 <img 
                   key={index}
                   src={service.img} 
                   className={`content-layer-${index} absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover ${index === 0 ? "block opacity-100" : "hidden opacity-0"}`}
                   alt="" 
                 />
               ))}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}