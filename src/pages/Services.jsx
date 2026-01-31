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
    ScrollTrigger.getAll().forEach(t => t.kill());

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "servicePin",
          trigger: containerRef.current,
          start: "top top",
          end: `+=${services.length * 50}%`, 
          scrub: 2, 
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Zoom Animation
      tl.to(standRef.current, { scale: 4 })
        .to(".initial-ui-text", { opacity: 0, duration: 0.5 }, "<")
        .to(stageRef.current, { opacity: 1, zIndex: 50, duration: 0.5 }, "-=0.3");

      // 2. Content Transitions
      services.forEach((_, i) => {
        if (i !== 0) {
          tl.to(`.text-content-${i - 1}`, {
            y: "-100%",
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut"
          });

          tl.fromTo(`.text-content-${i}`,
            { y: "100%", opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            },
            "<"
          );

          tl.to(`.img-layer-${i - 1}`, { display: "none", opacity: 0, duration: 0.01 }, "<");
          tl.to(`.img-layer-${i}`, { display: "block", opacity: 1, duration: 0.01 }, "<");
        }

        tl.to({}, { duration: 1.5 }); 
      });

      // 3. RETURN TO DEFAULT (The "Exit" animation)
      // This slides the stage out and fades the original labels back in if desired,
      // or simply clears the screen for the next section.
      tl.to(stageRef.current, { opacity: 0, duration: 0.5 })
        .to(standRef.current, { scale: 1, duration: 0.8 }, "<")
        .to(".initial-ui-text", { opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);

    return () => {
      ctx.revert();
      const trigger = ScrollTrigger.getById("servicePin");
      if (trigger) trigger.kill(true);
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="hero relative h-[40vh]">
        <img src="/images/hero/services-hero.png" className="object-cover w-full h-full" alt="" />
        <h2 className="text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold uppercase">Event Production Services</h2>
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>

      <h2 className="text-center mt-32 text-3xl font-bold initial-ui-text">Our Services Include</h2>
      
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        
        {/* INITIAL VIEW */}
        <div className="initial-ui absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center">
             <div className="initial-ui-text absolute start-0 space-y-32 hidden md:block">
                <p className="relative font-bold"><span className="bg-warning w-12 h-12 rounded-full absolute -start-4 top-1/2 -translate-y-1/2 -z-1 opacity-80" />Event Solution</p>
                <p className="relative font-bold -ms-16"><span className="bg-warning w-12 h-12 rounded-full absolute -start-4 top-1/2 -translate-y-1/2 -z-1 opacity-80" />Logistics & Installation</p>
                <p className="relative font-bold"><span className="bg-warning w-12 h-12 rounded-full absolute -start-4 top-1/2 -translate-y-1/2 -z-1 opacity-80" />Custom Stands</p>
             </div>
             
             <img ref={standRef} src="https://bngglobal.net/assets/images/exhibition-stand.svg" className="absolute z-10 w-2/3 md:w-auto" alt="" />
             <img src="https://bngglobal.net/assets/images/circle.png" className="initial-ui-text opacity-10" alt="" />

             <div className="initial-ui-text absolute -end-20 space-y-32 hidden md:block">
                <p className="relative font-bold"><span className="bg-warning w-12 h-12 rounded-full absolute -start-4 top-1/2 -translate-y-1/2 -z-1 opacity-80" />Concept & 3D Design</p>
                <p className="relative font-bold"><span className="bg-warning w-12 h-12 rounded-full absolute -start-4 top-1/2 -translate-y-1/2 -z-1 opacity-80" />On-site Support</p>
             </div>
          </div>
        </div>

        {/* STATIC STAGE */}
        <div ref={stageRef} className="absolute inset-0 z-10 flex opacity-0">
          <div className="w-1/2 bg-[#0a2361] relative overflow-hidden">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`text-content-${index} absolute inset-0 flex items-center justify-center p-16 text-white ${index === 0 ? "opacity-100" : "opacity-0"}`}
              >
                <div className="max-w-md">
                  <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                  <p className="text-lg opacity-80 leading-relaxed font-light">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-1/2 bg-[#d9d9d9] flex items-center justify-center p-12">
            <div className="w-full max-w-xl aspect-video bg-black p-3 rounded-md shadow-2xl relative overflow-hidden">
               {services.map((service, index) => (
                 <img 
                   key={index} 
                   src={service.img} 
                   className={`img-layer-${index} absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover ${index === 0 ? "block opacity-100" : "hidden opacity-0"}`} 
                   alt="" 
                 />
               ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}