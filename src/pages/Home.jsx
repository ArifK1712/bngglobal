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
  <section className="relative isolate min-h-[100svh] overflow-hidden">
    {/* Background video */}
    <video
      playsInline
      autoPlay
      muted
      loop
      preload="auto"
      aria-hidden="true"
      className="fixed inset-0 -z-20 h-full w-full object-cover"
    >
      <source
        src="https://d1o4s320mkx6gb.cloudfront.net/bng-global/homepage-video.mp4"
        type="video/mp4"
      />
    </video>

    {/* Video overlay */}
    <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_59.63%,rgba(0,0,0,0.67)_100%)]" />

    {/* Hero content */}
    <div className="app-container relative z-10 flex min-h-[100svh] flex-col px-5 pt-28 pb-8 text-white sm:px-6 md:pt-46 md:pb-16 lg:px-10">
      {/* Main heading */}
      <h1 className="text-white relative z-50 w-full max-w-3xl text-4xl leading-tight md:leading-tight sm:text-6xl text-start">
        {t.homeEmpowering}{" "}
        <span className="relative inline-block h-[2.35em] overflow-hidden align-bottom sm:h-[1.15em]">
          <div ref={sliderRef} className="flex flex-col">
            {words.map((word, i) => (
              <span
                key={i}
                className="flex h-[2.35em] items-center font-semibold sm:h-[1.15em]"
              >
                {word}
              </span>
            ))}

            <span className="flex h-[2.35em] items-center font-semibold sm:h-[1.15em]">
              {words[0]}
            </span>
          </div>
        </span>
      </h1>

      {/* Bottom content: stays in normal flow and moves down safely */}
      <div className="mt-auto w-full pt-12 md:pt-16">
        <div className="grid gap-6 md:grid-cols-2 md:items-center md:justify-between">
          <div className="xl:w-2xl text-start">
            <h3 className="mb-2 text-start">
              {t.homeSubtitleHeader}
            </h3>

            <p className="text-start text-sm leading-tight text-white sm:text-[18px] sm:leading-6">
              {t.homeSubtitleCopy}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:flex md:flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-end">
            <Link
              to="/services"
              className="btn btn-lg dark:btn-warning px-7"
            >
              {t.homeDiscoverBtn}
            </Link>

            <Link
              to="/contact"
              className="btn btn-lg btn-link text-white no-underline"
            >
              {t.homeContactUs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}