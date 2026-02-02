import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const sliderRef = useRef(null);
  const words = ["Investment", "Growth", "Tourism", "Innovation"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWords = words.length;
      const mm = gsap.matchMedia();
      const step = 100 / (totalWords + 1);      
      const tl = gsap.timeline({ repeat: -1 });

      words.forEach((_, index) => {
        tl.to(sliderRef.current, {
          yPercent: -step * (index + 1),
          duration: 0.5,
          ease: "power2.inOut",
          delay: 1,
        });
      });
      
      tl.to(sliderRef.current, {
        yPercent: 0,
        duration: 0,
      });

    }, sliderRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 h-full w-full -z-10 overflow-hidden">
        <video
          playsInline
          autoPlay
          muted
          loop
          className="h-full w-full object-cover"
        >
          <source
            src="https://d1o4s320mkx6gb.cloudfront.net/bng-global/Sequence.mp4"
            type="video/mp4"
          />
          <source
            src="https://d1o4s320mkx6gb.cloudfront.net/bng-global/Sequence.mp4"
            type="video/webm"
          />
        </video>

        <div className="app-container">
          <h1 className="absolute text-white z-50 top-45 w-full max-w-xl text-5xl leading-tight md:leading-snug md:text-6xl">
            Empowering Global Trade{" "}
            <span className="inline-block h-[1.2em] align-bottom overflow-hidden relative">
              <div ref={sliderRef} className="flex flex-col">
                {words.map((word, i) => (
                  <span key={i} className="font-semibold h-[1.2em] flex items-center">
                    {word}
                  </span>
                ))}

                <span className="font-semibold h-[1.2em] flex items-center">
                  {words[0]}
                </span>
              </div>
            </span>
          </h1>
          <div className="absolute inset-x-0 bottom-4 md:bottom-15 z-50 mx-auto w-full px-6 lg:px-10 text-white lg:max-w-5xl xl:max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h3 className="mb-2">
                  Navigating Global Markets with Expertise
                </h3>
                <p className="text-white">
                  BNG Business Network Global is your strategic partner. We strengthen industries 
                  and create lasting impact, empowering enterprises to unlock international 
                  opportunities through expert FDI advisory and trade consulting.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:flex md:flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-end">
                <Link to="/services" className="btn btn-lg px-7">
                  Discover Our Services
                </Link>
                <Link to="/contact" className="btn btn-link text-white no-underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>         
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_59.63%,rgba(0,0,0,0.67)_100%)] fixed right-0 left-0 bottom-0 top-0"></div>
      </div>
    </>
  );
}