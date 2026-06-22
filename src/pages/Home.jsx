import { Link } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const sliderRef = useRef(null);
  const words = t.homeWords;

  useGSAP(() => {
    // Reset inline styles to avoid stale transform values when toggling languages
    gsap.set(sliderRef.current, { clearProps: "all" });

    const totalWords = words.length;
    const step = 100 / (totalWords + 1);      
    const tl = gsap.timeline({ repeat: -1 });

    words.forEach((_, index) => {
      tl.to(sliderRef.current, {
        yPercent: -step * (index + 1),
        duration: 0.90,
        ease: "power2.inOut",
        delay: 1,
      });
    });
    
    tl.to(sliderRef.current, {
      yPercent: 0,
      duration: 0,
    });
  }, { scope: sliderRef, dependencies: [language] });

  return (
    <>
      <div className="">
        <video
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover fixed top-0 left-0 -z-10 overflow-hidden"
        >
          <source
            src="https://d1o4s320mkx6gb.cloudfront.net/bng-global/homepage-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className="app-container pt-22 landscape:max-lg:pt-25 md:pt-46 ">
          <h1 className="text-white relative z-50 w-full max-w-3xl text-4xl leading-tight md:leading-tight sm:text-6xl text-start">
            {t.homeEmpowering}{" "}
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
          <div className="absolute landscape:max-lg:relative bottom-0 inset-x-0 z-50 mx-auto w-full landscape:max-lg:px-0 px-5 lg:px-10 pb-3 md:pb-17 text-white lg:max-w-5xl xl:max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 md:items-center md:justify-between">
              <div className="xl:w-2xl text-start">
                <h3 className="mb-2 text-start">
                  {t.homeSubtitleHeader}
                </h3>
                <p className="text-white text-sm sm:text-[18px] leading-tight sm:leading-6 text-start">
                  {t.homeSubtitleCopy}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:flex md:flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-end">
                <Link to="/services" className="btn btn-lg dark:btn-warning px-7">
                  {t.homeDiscoverBtn}
                </Link>
                <Link to="/contact" className="btn btn-lg btn-link text-white no-underline">
                  {t.homeContactUs}
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