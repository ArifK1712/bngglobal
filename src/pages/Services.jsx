import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Common component for the service title with the yellow decorative bubble
 */
const ServiceLabel = ({ title, className = "", isHeader = false }) => {
  const Tag = isHeader ? "h4" : "p";
  return (
    <Tag className={`relative ps-6 ${isHeader ? "font-medium mb-5 relative z-2" : ""} ${className}`}>
      <span className="bg-warning size-14.5 rounded-full absolute start-0 top-1/2 -translate-y-1/2 -z-1" />
      {title}
    </Tag>
  );
};

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
      desc: "<p>At BNG Arabia, we manage every aspect of logistics and installation to ensure a seamless experience. From transportation and on-site coordination to precise assembly, our team guarantees timely delivery and flawless execution. With our regional expertise and in-house production capabilities, we handle complex requirements efficiently, so your event runs smoothly from start to finish.</p>",
      img: "/images/services/logistics-installation.jpg"
    },
    {
      title: "On-Site Support & Dismantling",
      desc: "<p>At BNG Arabia, we provide comprehensive on-site support to ensure your event runs smoothly from start to finish. Our dedicated team handles every detail during setup, monitors the stand throughout the event, and manages the dismantling process efficiently. With precision and care, we guarantee a hassle-free experience, leaving your venue in perfect condition.</p>",
      img: "/images/services/onsite-support-dismantling.jpg"
    }
  ];

  useEffect(() => {
    if (window.innerWidth < 1199) return;
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

      tl.to(standRef.current, { scale: 4 })
        .to(".initial-ui-text", { opacity: 0, duration: 0.5 }, "<")
        .to(stageRef.current, { opacity: 1, zIndex: 50, duration: 0.5 }, "-=0.3");

      services.forEach((_, i) => {
        if (i !== 0) {
          tl.to(`.text-content-${i - 1}`, { y: "-100%", opacity: 0, duration: 0.6, ease: "power2.inOut" });
          tl.fromTo(`.text-content-${i}`, { y: "100%", opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "<");
          tl.to(`.img-layer-${i - 1}`, { display: "none", opacity: 0, duration: 0.01 }, "<");
          tl.to(`.img-layer-${i}`, { display: "block", opacity: 1, duration: 0.01 }, "<");
        }
        tl.to({}, { duration: 1.5 });
      });

      tl.to(stageRef.current, { opacity: 0, duration: 0.5 })
        .to(standRef.current, { scale: 1, duration: 0.8 }, "<")
        .to(".initial-ui-text", { opacity: 1, duration: 0.5 }, "-=0.2");

    }, containerRef);

    return () => ctx.revert();
  }, [services.length]);

  return (
    <div className="bg-white">
      <div className="hero relative">
        <img src="/images/hero/services-hero.png" className="object-cover w-full h-full" alt="" />
        <h2 className="text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">Event Production Services</h2>
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>

      <h2 className="text-center mt-10 lg:mt-32 mb-0 lg:mb-10">Our Services Include</h2>

      {/* MOBILE & TABLET VIEW */}
      <div className="app-container xl:hidden block">
        <div className="relative flex justify-center py-8 overflow-hidden">
          <img src="/images/exhibition-stand.svg" className="w-full md:max-w-2/3 absolute z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" alt="Stand" />
          <img src="/images/circle.png" className="w-full md:max-w-2/3" alt="" />
        </div>
        {services.map((service, index) => (
          <div key={index} className="flex flex-col mb-10">
            <ServiceLabel title={service.title} isHeader={true} />
            <div 
              className="text-gray-700 leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3"
              dangerouslySetInnerHTML={{ __html: service.desc }} 
            />
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src={service.img} className="w-full h-45 object-cover" alt={service.title} />
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW */}
      <div ref={containerRef} className="relative overflow-hidden hidden xl:block" style={{ height: 'calc(100vh - 114px)' }}>
        <div className="inset-0 flex flex-col items-center z-20">
          <div className="app-container">
            <div className="relative w-full flex items-center justify-between mx-auto">
              {/* Left Column Labels */}
              <div className="initial-ui-text space-y-32 ps-20 w-60 flex flex-col items-start">
                  <ServiceLabel title="Event Solution" />
                  <ServiceLabel title={<>Logistics & <br />Installation</>} className="-ms-20" />
                  <ServiceLabel title={<>Custom Made <br /> Stands</>} />
              </div>
              
              {/* Center Stand */}
              <div className="flex flex-col justify-center">
                <img ref={standRef} src="/images/exhibition-stand.svg" className="absolute max-w-180 start-0 end-0 mx-auto z-10" alt="" />
                <img src="/images/circle.png" className="initial-ui-text" alt="" />
              </div>
              
              {/* Right Column Labels */}
              <div className="initial-ui-text space-y-32 w-60 flex flex-col items-end -mt-30">
                  <ServiceLabel title={<>Concept Development <br />& 3D Design</>} />
                  <ServiceLabel title={<>On-Site Support<br />& Dismantling</>} />
              </div>
            </div>
          </div>
        </div>

        {/* STATIC STAGE Content */}
        <div ref={stageRef} className="absolute inset-0 z-10 flex opacity-0">
          <div className="w-1/2 bg-[#0a2361] relative overflow-hidden">
            {services.map((service, index) => (
              <div key={index} className={`text-content-${index} absolute inset-0 flex items-center text-white ${index === 0 ? "opacity-100" : "opacity-0"}`}>
                <div className="w-2xl ps-17 pe-8 ms-auto">
                  <h2 className="mb-6">{service.title}</h2>
                  <div className="[&_p]:mb-3 [&_p]:text-white [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:ml-8" dangerouslySetInnerHTML={{ __html: service.desc }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-1/2 bg-[#d9d9d9] flex items-center justify-center 2xl:justify-start">
            <div className="w-full max-w-116.5 h-68 border-10 border-black rounded-md relative 2xl:ms-35">
               {services.map((service, index) => (
                 <img key={index} src={service.img} className={`img-layer-${index} absolute h-full w-full object-cover ${index === 0 ? "block opacity-100" : "hidden opacity-0"}`} alt="" />
               ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}