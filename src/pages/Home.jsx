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
          <h1 className="absolute text-white z-50 top-45 w-full max-w-lg text-5xl leading-tight">
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
          <div className="grid grid-cols-2 justify-between gap-4 absolute bottom-10 z-50 text-white max-w-302">
            <div>
              <h3>Navigating Global Markets with Expertise</h3>
              <p className="text-white">BNG Business Network Global is your strategic partner that strengthen industries, and create lasting impacts empowers enterprises to unlock international opportunities through strategic FDI advisory and trade consulting services.</p>
            </div>
            <div className="flex justify-end items-center gap-4">
              <button className="btn btn-lg">Discover Our Services</button>
              <button className="btn btn-link no-underline text-white underline-none btn-lg">Contact Us</button>
            </div>
          </div>
          
        </div>

        <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_59.63%,rgba(0,0,0,0.67)_100%)] fixed right-0 left-0 bottom-0 top-0"></div>
      </div>
    </>
  );
}