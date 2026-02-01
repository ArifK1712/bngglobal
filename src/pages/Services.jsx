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
      desc: "<p>We specialize in creating innovative exhibition stand concepts that align seamlessly with your brand guidelines and overall event theme. Our approach combines strategic storytelling with immersive 3D design, ensuring every element—from layout to visual aesthetics—reflects your brand identity. By integrating functionality with creativity, we deliver designs that captivate audiences and enhance engagement.</p>",
      img: "/images/services/concept-development.jpg"
    },
    {
      title: "Custom Made stands",
      desc: `
        <p>Your Trusted Partner for Custom Exhibition Stands</p>
        <ul>
          <li>At BNG Arabia, we combine creativity, precision, and craftsmanship to deliver exhibition stands that make your brand shine. Our production unit ensures every detail is executed to perfection, from concept to completion.</li>
          <li>Premium & Sustainable Materials</li>
          <li>We use high-quality, eco-friendly materials to transform your vision into reality, ensuring durability and sustainability without compromising aesthetics.</li>
          <li>Innovative Concepts that Tell Your Story</li>
          <li>Our designers work closely with you to craft attention-grabbing ideas that align with your brand guidelines and communicate your story effectively.</li>
          <li>Deep Regional Knowledge</li>
          <li>Our strong relationships with local suppliers and venues, combined with hands-on experience in the Middle East, allow us to navigate regional specifications and challenges with agility.</li>
          <li>Integrated Services for Maximum Value</li>
          <li>From design elements to graphics and furniture, our in-house production capabilities reduce costs while maintaining superior quality and consistency.</li>
        </ul>`,
      img: "/images/services/custom-made-stands.jpg"
    },
    {
      title: "Event Solutions",
      desc: "<p>From Concept to Completion – We’ve Got You Covered</p><p>At BNG Arabia, we deliver a true turnkey solution for all your event needs. From creative design to flawless execution, our team ensures every detail is handled with precision. Whether it’s an indoor conference or an outdoor activation, locally or internationally, we bring your vision to life with expertise and innovation.</p>",
      img: "/images/services/event-solutions.jpg"
    },
    {
      title: "Logistics & Installation",
      desc: "At BNG Arabia, we manage every aspect of logistics and installation to ensure a seamless experience. From transportation and on-site coordination to precise assembly, our team guarantees timely delivery and flawless execution. With our regional expertise and in-house production capabilities, we handle complex requirements efficiently, so your event runs smoothly from start to finish.",
      img: "/images/services/logistics-installation.jpg"
    },
    {
      title: "On-Site Support & Dismantling",
      desc: "<p>At BNG Arabia, we provide comprehensive on-site support to ensure your event runs smoothly from start to finish. Our dedicated team handles every detail during setup, monitors the stand throughout the event, and manages the dismantling process efficiently. With precision and care, we guarantee a hassle-free experience, leaving your venue in perfect condition.</p>",
      img: "/images/services/onsite-support-dismantling.jpg"
    }
  ];

  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "servicePin",
          trigger: containerRef.current,
          start: "top 114px",
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
      <div className="hero relative">
        <img src="/images/hero/services-hero.png" className="object-cover w-full h-full" alt="" />
        <h2 className="text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Event Production Services</h2>
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>

      <h2 className="text-center mt-32 mb-10">Our Services Include</h2>      
      <div ref={containerRef} className="relative overflow-hidden" style={{ height: 'calc(100vh - 114px)' }}>
        
        {/* INITIAL VIEW */}
        <div className="inset-0 flex flex-col items-center z-20">
          <div className="app-container">
            <div className="relative w-full flex items-center justify-between mx-auto">
              <div className="initial-ui-text space-y-32 ps-20 w-60 flex flex-col items-start">
                  <p className="relative ps-6"><span className="bg-warning w-14.5 h-14.5 rounded-full start-0 absolute top-1/2 -translate-y-1/2 -z-1" />Event Solution</p>
                  <p className="relative ps-6 -ms-20"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute start-0 top-1/2 -translate-y-1/2 -z-1" />Logistics & <br />Installation</p>
                  <p className="relative ps-6"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute start-0 top-1/2 -translate-y-1/2 -z-1" />Custom Made <br /> Stands</p>
              </div>
              <div className="flex flex-col justify-center">
                <img ref={standRef} src="/images/exhibition-stand.svg" className="absolute max-w-180 start-0 end-0 mx-auto z-10" alt="" />
                <img src="/images/circle.png" className="initial-ui-text" alt="" />
              </div>
              <div className="initial-ui-text space-y-32 w-60 flex flex-col items-end -mt-30">
                  <p className="relative ps-6"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute start-0 top-1/2 -translate-y-1/2 -z-1" />Concept Development <br />& 3D Design</p>
                  <p className="relative ps-6"><span className="bg-warning w-14.5 h-14.5 rounded-full absolute start-0 top-1/2 -translate-y-1/2 -z-1" />On-Site Support<br />& Dismantling</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATIC STAGE */}
        <div ref={stageRef} className="absolute inset-0 z-10 flex opacity-0">
          <div className="w-1/2 bg-[#0a2361] relative overflow-hidden">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`text-content-${index} absolute inset-0 flex items-center text-white ${index === 0 ? "opacity-100" : "opacity-0"}`}
              >
                <div className="w-2xl ps-17 pe-8 ms-auto">
                  <h2 className="mb-6">{service.title}</h2>
                  <div className="[&_p]:mb-3 [&_p]:text-white [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:ml-8" dangerouslySetInnerHTML={{ __html: service.desc }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-1/2 bg-[#d9d9d9] flex items-center justify-center">
            <div className="w-full max-w-116.5 h-68 border-10 border-black rounded-md relative">
               {services.map((service, index) => (
                 <img 
                   key={index} 
                   src={service.img} 
                   className={`img-layer-${index} absolute h-full w-full object-cover ${index === 0 ? "block opacity-100" : "hidden opacity-0"}`} 
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