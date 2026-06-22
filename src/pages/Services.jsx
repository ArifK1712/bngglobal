import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  ClipboardList,
  PenTool,
  Hammer,
  BadgeCheck,
  Truck,
  Headphones,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const media = [
  { type: "image", src: "/images/gallery/1.jpg", title: "Premium Event Setup" },
  {
    type: "video",
    src: "https://bngglobal.net/assets/images/gallery/philips.mp4",
    title: "Brand Experience",
  },
  {
    type: "image",
    src: "/images/gallery/2.jpg",
    title: "Exhibition Production",
  },
  {
    type: "video",
    src: "https://bngglobal.net/assets/images/gallery/jana-marine.mp4",
    title: "Live Activation",
  },
  { type: "image", src: "/images/gallery/3.jpg", title: "Custom Booth" },
  { type: "image", src: "/images/gallery/4.jpg", title: "Conference Setup" },
  { type: "image", src: "/images/gallery/5.jpg", title: "Corporate Event" },
  { type: "image", src: "/images/gallery/6.jpg", title: "Production Detail" },
  {
    type: "image",
    src: "/images/gallery/7.jpg",
    title: "Immersive Experience",
  },
];

const statsData = [
  {
    number: "100,000+",
    unit: "SQM",
    label: "Fabrication Delivered",
    desc: "Custom-built exhibition and event structures produced with quality, precision, and attention to detail.",
  },
  {
    number: "70+",
    label: "Project Delivered per Year",
    desc: "Annual projects completed across exhibitions, corporate events, brand activations, and custom builds.",
  },
  {
    number: "30+",
    label: "In-house Experts",
    desc: "A skilled team of designers, fabricators, project managers, and on-site execution specialists.",
  },
];

const marqueeItems = [
  "Media Support",
  "Custom Booths",
  "Digital Badges",
  "Event Management",
  "3D Design",
  "On-Site Support",
  "Logistics",
  "Brand Activations",
  "Production",
  "Exhibition Stands",
];

const processSteps = [
  {
    step: "01",
    icon: Search,
    title: "Discovery & Understanding",
    desc: "We clarify your vision, goals, and requirements to align our approach from the start.",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Planning & Strategy",
    desc: "We develop a clear project plan with defined scope, timelines, resources, and milestones.",
  },
  {
    step: "03",
    icon: PenTool,
    title: "Design & Development",
    desc: "Concepts and solutions are crafted, refined, and aligned with quality standards and your feedback.",
  },
  {
    step: "04",
    icon: Hammer,
    title: "Fabrication & Execution",
    desc: "Using advanced tools and skilled craftsmanship, we bring the design to life with precision and consistency.",
  },
  {
    step: "05",
    icon: BadgeCheck,
    title: "Quality Assurance",
    desc: "Every element is rigorously checked to meet industry standards and your expectations.",
  },
  {
    step: "06",
    icon: Truck,
    title: "Delivery & Installation",
    desc: "We deliver and install on schedule, ensuring a seamless and polished handover.",
  },
  {
    step: "07",
    icon: Headphones,
    title: "Ongoing Support",
    desc: "We remain available for guidance, adjustments, and long-term support.",
  },
];

const services = [
  {
    title: "Concept Development & 3D Design",
    desc: "<p class='text-white'>We specialize in creating innovative exhibition stand concepts that align seamlessly with your brand guidelines and overall event theme. Our approach combines strategic storytelling with immersive 3D design, ensuring every element—from layout to visual aesthetics—reflects your brand identity. By integrating functionality with creativity, we deliver designs that captivate audiences and enhance engagement.</p>",
    img: "/images/services/concept-development.jpg",
  },
  {
    title: "Event Solutions",
    desc: "<p>From Concept to Completion – We’ve Got You Covered</p><p>At BNG Arabia, we deliver a true turnkey solution for all your event needs. From creative design to flawless execution, our team ensures every detail is handled with precision. Whether it’s an indoor conference or an outdoor activation, locally or internationally, we bring your vision to life with expertise and innovation.</p>",
    img: "/images/services/event-solutions.jpg",
  },
  {
    title: "Logistics & Installation",
    desc: "<p>At BNG Arabia, we manage every aspect of logistics and installation to ensure a seamless experience. From transportation and on-site coordination to precise assembly, our team guarantees timely delivery and flawless execution. With our regional expertise and in-house production capabilities, we handle complex requirements efficiently, so your event runs smoothly from start to finish.</p>",
    img: "/images/services/logistics-installation.jpg",
  },
  {
    title: "On-Site Support & Dismantling",
    desc: "<p>At BNG Arabia, we provide comprehensive on-site support to ensure your event runs smoothly from start to finish. Our dedicated team handles every detail during setup, monitors the stand throughout the event, and manages the dismantling process efficiently. With precision and care, we guarantee a hassle-free experience, leaving your venue in perfect condition.</p>",
    img: "/images/services/onsite-support-dismantling.jpg",
  },
  {
    title: "Custom Made stands",
    desc: `
      <p>Your Trusted Partner for Custom Exhibition Stands</p>
      <ul>
        <li>At BNG Arabia, we combine creativity, precision, and craftsmanship to create exhibition stands that make your brand stand out.</li>
        <li>Premium & Sustainable Materials</li>
        <li>High-quality, eco-friendly materials that deliver durability without compromising design.</li>
        <li>Innovative Concepts</li>
        <li>Attention-grabbing stand concepts that reflect your brand story and guidelines.</li>
        <li>Regional Expertise</li>
        <li>Strong local knowledge, supplier relationships, and venue experience across the Middle East.</li>
        <li>Integrated Production  </li>
        <li>In-house design, graphics, furniture, and fabrication for better value and consistent quality.</li>
      </ul>`,
    img: "/images/services/custom-made-stands.jpg",
  },
];

const serviceOptions = [
  "Event Management",
  "Exhibition Stand Builder",
  "Indoor & Outdoor Branding",
  "Booth Fabrication",
  "Vehicle Branding",
  "Corporate Gifts",
  "Display Stand Manufacturer",
  "Flags, Pop Ups, Roll Ups",
  "Stickers & Banner Printing",
];

export default function Services() {
  const rootRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const marqueeTweenRef = useRef(null);
  const statsSectionRef = useRef(null);
  const statNumberRefs = useRef([]);
  const [activeProcess, setActiveProcess] = useState(0);
  const [isProcessPaused, setIsProcessPaused] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  
  const [rfpData, setRfpData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceRequest: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleRfpChange = (e) => {
    const { name, value } = e.target;
    setRfpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRfpSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const payload = {
        ...rfpData,
        access_key: "8bda1892-a2eb-45e4-9aaa-ac9132b04c24",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Message sent successfully.");
        setRfpData({ fullName: "", email: "", phone: "", serviceRequest: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting RFP:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  const getNumberParts = (value) => {
    const numericValue = parseInt(value.replace(/\D/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");
    return { numericValue, suffix };
  };

  const nextImage = () => {
    setCurrentMedia((prev) => (prev < media.length - 1 ? prev + 1 : prev));
  };

  const prevImage = () => {
    setCurrentMedia((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (isProcessPaused) return;

    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % processSteps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isProcessPaused]);

  useGSAP(() => {
    gsap.set(
      ".intro-kicker, .intro-title, .intro-copy, .services-left, .services-stand-card, .service-card, .service-media, .stat-card, .process-card, .gallery-item",
      {
        opacity: 1,
        visibility: "visible",
        clearProps: "filter",
      },
    );

    gsap.fromTo(
      ".process-orbit-node",
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".process-showcase",
          start: "top 70%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".process-card",
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-showcase",
          start: "top 75%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".intro-kicker, .intro-title, .intro-copy",
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 78%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".services-left > *",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-showcase",
          start: "top 75%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".service-card",
      {
        y: 90,
        opacity: 0,
        scale: 0.96,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.14,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".services-showcase",
          start: "top 65%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".service-media",
      {
        scale: 1.22,
      },
      {
        scale: 1,
        duration: 1.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-showcase",
          start: "top 65%",
          once: true,
        },
      },
    );

    statNumberRefs.current.forEach((el, index) => {
      if (!el) return;

      const { numericValue, suffix } = getNumberParts(
        statsData[index].number,
      );
      const counter = { value: 0 };

      gsap.to(counter, {
        value: numericValue,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: statsSectionRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          const rollingValue = Math.floor(counter.value);
          el.textContent = `${rollingValue}${suffix}`;
        },
        onComplete: () => {
          el.textContent = statsData[index].number;
        },
      });
    });

    gsap.fromTo(
      ".stat-card",
      {
        y: 55,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsSectionRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".gallery-item",
      {
        y: 70,
        opacity: 0,
        clipPath: "inset(18% 0% 18% 0% round 32px)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0% round 32px)",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 85%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".gallery-media",
      {
        scale: 1.12,
      },
      {
        scale: 1,
        duration: 1.25,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 85%",
          once: true,
        },
      },
    );

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, { scope: rootRef });

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    marqueeTweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: totalWidth / 120,
      ease: "none",
      repeat: -1,
    });

    return () => {
      marqueeTweenRef.current?.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="overflow-x-hidden">
      {/* HERO - kept as existing/common hero */}
      <div className="hero relative">
        <img
          src="/images/hero/services-hero.png"
          className="object-cover w-full h-full"
          alt=""
          loading="lazy"
        />
        <h2 className="text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          Event Production Services
        </h2>
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>
      {/* INTRO */}
      <section className="intro-section relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,213,0,0.35),transparent_24%),radial-gradient(circle_at_88%_20%,rgba(0,58,134,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] dark:bg-none" />
        <div className="app-container relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold mb-4">
                BNG Fabrication
              </h2>

              <p className="mb-4">
                BNG Arabia is a Saudi-based service provider of exhibition and
                experiential solutions, offering comprehensive design,
                fabrication, and execution services for government, corporate,
                and international clients. With strong roots in the Kingdom’s
                rapidly evolving events industry, we merge creative insight with
                technical capability to deliver distinctive, high-quality
                environments.
              </p>

              <p>
                We craft exhibition stands, conferences, branded spaces, and
                corporate environments that embody innovation, precision, and
                professionalism. From initial concept to final delivery, we
                oversee every stage with efficiency and meticulous attention—
                ensuring every project makes a lasting impact.
              </p>
            </div>
            <img
              src="/images/fabrication-image.jpg"
              className="rounded-4xl shadow-2xl shadow-[#003a86]/10"
            />
          </div>
        </div>
      </section>
      {/* SERVICES */}
      <section className="services-showcase relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_45%,#ffffff_100%)] dark:bg-none" />
        <div className="absolute -right-0 top-20 h-105 w-105 rounded-full bg-[#ffd500]/25 blur-3xl dark:bg-none" />

        <div className="app-container relative z-10">
          {/* Header */}
          <div className="services-left mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-[#003a86]/10 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#003a86] shadow-lg shadow-[#003a86]/5">
                Our Services
              </p>

              <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold">
                Our Expertise & Capabilities in Event Production
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Luxury events & Fashion Shows",
                "Corporate and Conference setups",
                "Retail Experiences & Pop-up venues",
                "Brand activations",
                "Sport and Automotive setups",
                "Events Solution",
                "Exhibitions and Booth Fabrications",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#003a86] text-sm font-bold text-[#ffd500] transition duration-500 group-hover:bg-[#ffd500] group-hover:text-[#003a86]">
                    ✓
                  </span>

                  <span className="leading-6 transition duration-500 group-hover:text-[#003a86]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Service */}
          {services[0] && (
            <article className="service-card group relative mb-6 overflow-hidden rounded-[2.5rem] bg-[#003a86] shadow-2xl shadow-[#003a86]/25">
              <div className="grid min-h-[560px] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative flex flex-col justify-between overflow-hidden p-8 text-white md:p-10 lg:p-12">
                  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffd500]/30 blur-3xl" />

                  <div className="relative">
                    <h3 className="text-4xl md:text-5xl xl:text-6xl font-semibold mb-4 text-white">
                      {services[0].title}
                    </h3>

                    <div
                      className="mt-7 max-w-xl text-sm leading-8 text-white [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
                      dangerouslySetInnerHTML={{ __html: services[0].desc }}
                    />
                  </div>
                </div>

                <div className="relative min-h-[360px] overflow-hidden lg:min-h-full">
                  <img
                    src={services[0].img}
                    className="service-media h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    alt={services[0].title}
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#003a86]/10 to-[#003a86]/35" />

                  <div className="absolute bottom-8 left-8 right-8 overflow-hidden rounded-[2rem] border border-white/15 bg-white/15 p-5 text-white shadow-2xl backdrop-blur-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ffd500]">
                        Premium Experience Design
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Bento Services */}
          <div className="services-grid grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(1).map((service, index) => {
              const isFirstCard = index === 0;
              const isLastCard = index === services.slice(1).length - 1;

              return (
                <article
                  key={service.title}
                  className={`service-card group relative overflow-hidden rounded-[2rem] border border-[#003a86]/10 p-4 shadow-xl shadow-[#003a86]/10 transition duration-500 hover:-translate-y-2 hover:border-[#ffd500] hover:shadow-2xl hover:shadow-[#003a86]/15
                    ${isFirstCard ? "" : ""}
                    ${isLastCard ? "md:col-span-2 xl:col-span-4" : ""}
                  `}
                >
                  <div
                    className={`grid gap-0 ${
                      isLastCard ? "lg:grid-cols-[0.9fr_1.1fr]" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-[1.5rem] bg-[#003a86] ${
                        isLastCard ? "h-80 lg:h-full" : "h-50"
                      }`}
                    >
                      <img
                        src={service.img}
                        className="service-media h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        alt={service.title}
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#003a86]/95 via-[#003a86]/30 to-transparent" />

                      <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-3xl">
                        {service.title}
                      </h3>
                    </div>

                    <div
                      className={`relative p-4 pt-6 flex items-center ${isLastCard ? "lg:p-10" : ""}`}
                    >
                      <div
                        className={`text-sm leading-7 text-[#003a86]/65 [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 ${
                          isLastCard ? "" : "line-clamp-10"
                        }`}
                        dangerouslySetInnerHTML={{ __html: service.desc }}
                      />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#ffd500]/0 blur-3xl transition duration-500 group-hover:bg-[#ffd500]/40" />
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* PREMIUM BOOTH SECTION */}
      <section className="premium-booth-section relative overflow-hidden py-10">
        <div className="app-container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT IMAGE */}
            <div className="booth-visual relative">
              <img
                src="/images/premium-booth-design.png"
                className="h-full w-full object-contain"
                alt="Premium Exhibition Booth Design"
                loading="lazy"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="booth-section-content">
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold mb-4">
                Exhibition Booth Design & Buildups
              </h2>

              <p className="mt-7 max-w-xl">
                We design and fabricate custom-built exhibition booths and shell
                scheme enhancements that maximize brand impact and audience
                engagement at trade shows and exhibitions. From concept
                development and 3D visualization to production and on-site
                installation, each stand is tailored to reflect your brand
                identity, optimize visitor flow, and create meaningful
                interaction. Our focus on quality materials, smart spatial
                planning, and seamless execution ensures a striking presence
                that attracts attention and delivers measurable results.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* STATS */}
      <section ref={statsSectionRef} className="relative py-16">
        <div className="app-container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#003a86] p-5 shadow-2xl shadow-[#003a86]/25 lg:p-10">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffd500]/30 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

            <div className="relative mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#ffd500]">
                  Numbers That Matter
                </p>

                <h2 className="max-w-3xl text-4xl font-semibold text-white md:text-5xl">
                  Proven delivery backed by experience, scale and consistency.
                </h2>
              </div>
            </div>

            <div className="relative grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
              {statsData.map((item, index) => (
                <div
                  key={item.label}
                  className="stat-card group rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:bg-transparent hover:backdrop-blur-none"
                >
                  <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#ffd500] transition duration-500">
                    {item.label}
                  </p>

                  <div className="flex min-h-[70px] flex-wrap items-end gap-3 relative">
                    <h3
                      ref={(el) => (statNumberRefs.current[index] = el)}
                      className="text-5xl font-semibold leading-none tracking-[-0.06em] text-white transition duration-500 group-hover:text-[#ffd500] md:text-6xl"
                    >
                      0
                    </h3>

                    {item.unit && (
                      <span className="absolute -right-1 bottom-3 text-sm font-bold uppercase tracking-[0.18em] text-white">
                        {item.unit}
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* MARQUEE */}
      <section className="overflow-hidden pb-20">
        <div
          ref={marqueeTrackRef}
          className="flex w-max items-center whitespace-nowrap"
          onMouseEnter={() => marqueeTweenRef.current?.pause()}
          onMouseLeave={() => marqueeTweenRef.current?.resume()}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="group mx-3 flex items-center gap-6 rounded-full border border-[#003a86]/10 bg-white px-8 py-5 text-4xl md:text-5xl font-semibold uppercase text-[#003a86] shadow-lg shadow-[#003a86]/10 transition duration-300 hover:border-[#ffd500] hover:bg-[#ffd500]"
            >
              <span>{item}</span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#003a86]/5 transition group-hover:bg-white/50 md:h-16 md:w-16">
                <img
                  src="/favicon.svg"
                  className="block w-7 md:w-10"
                  alt=""
                  loading="lazy"
                />
              </span>
            </div>
          ))}
        </div>
      </section>
      {/* PROCESS */}
      <section className="process-showcase relative overflow-hidden bg-[#001f4f] py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,213,0,0.22),transparent_28%),radial-gradient(circle_at_82%_80%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#001f4f_0%,#003a86_55%,#001f4f_100%)]" />

        <div className="app-container relative z-10">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#ffd500]">
              Our Process
            </p>

            <h2 className="text-4xl font-semibold text-white md:text-5xl xl:text-6xl">
              A premium workflow from first idea to final show day.
            </h2>
          </div>

          <div
            className="relative mx-auto max-w-7xl"
            onMouseEnter={() => setIsProcessPaused(true)}
            onMouseLeave={() => setIsProcessPaused(false)}
          >
            <div className="relative">
              <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                {/* LEFT ACTIVE STEP CONTENT */}
                <div className="flex flex-col justify-between rounded-[2.2rem] border border-white/10 bg-[#001f4f]/45 p-7 shadow-xl shadow-black/10">
                  <div>
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#ffd500]">
                        Step {processSteps[activeProcess].step}
                      </div>

                      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                        {activeProcess + 1} / {processSteps.length}
                      </div>
                    </div>

                    <h3 className="text-4xl font-semibold text-white md:text-5xl xl:text-6xl">
                      {processSteps[activeProcess].title}
                    </h3>

                    <p className="mt-6 text-white/70">
                      {processSteps[activeProcess].desc}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-2">
                    {processSteps.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveProcess(index)}
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          activeProcess === index
                            ? "w-12 bg-[#ffd500]"
                            : "w-2.5 bg-white/25 hover:bg-white/50"
                        }`}
                        aria-label={`Go to process step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* RIGHT STEPS INSIDE SAME BOX */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {processSteps.map((item, index) => {
                    const isActive = activeProcess === index;
                    const Icon = item.icon;

                    return (
                      <button
                        type="button"
                        key={item.step}
                        onClick={() => setActiveProcess(index)}
                        onMouseEnter={() => {
                          setIsProcessPaused(true);
                          setActiveProcess(index);
                        }}
                        onMouseLeave={() => setIsProcessPaused(false)}
                        className={`process-mini-step group relative overflow-hidden rounded-[1.5rem] border p-4 text-left transition duration-500 ${
                          isActive
                            ? "border-[#ffd500] bg-[#ffd500] text-[#003a86] shadow-xl shadow-[#ffd500]/20"
                            : "border-white/10 bg-white/10 text-white hover:border-[#ffd500]/60 hover:bg-white/15"
                        }`}
                      >
                        <div className="relative z-10 flex items-center gap-4">
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition duration-500 ${
                              isActive
                                ? "bg-[#003a86] text-[#ffd500]"
                                : "bg-[#ffd500] text-[#003a86] group-hover:scale-110"
                            }`}
                          >
                            <Icon size={22} strokeWidth={2.2} />
                          </span>

                          <h4 className="text-base font-semibold leading-5">
                            {item.title}
                          </h4>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PORTFOLIO */}
      <section className="relative py-20">
        <div className="app-container">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#003a86]">
                Selected Work
              </p>

              <h2 className="max-w-4xl  text-4xl md:text-5xl xl:text-6xl font-semibold mb-4">
                A cinematic gallery of spaces, details and live experiences.
              </h2>
            </div>
          </div>

          <div className="portfolio-grid columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
            {media.map((item, index) => {
              const heights = [360, 460, 320, 520, 380, 440, 330, 500, 360];

              return (
                <div
                  key={`${item.title}-${index}`}
                  className="gallery-item group relative mb-6 break-inside-avoid overflow-hidden rounded-[2rem] border border-[#003a86]/10 bg-white shadow-xl shadow-[#003a86]/10"
                  style={{ height: `${heights[index % heights.length]}px` }}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      className="gallery-media h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      alt={item.title}
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="gallery-media h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#003a86]/90 via-[#003a86]/20 to-transparent opacity-90" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd500]">
                        Project
                      </p>

                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setCurrentMedia(index)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-xl text-white backdrop-blur-xl transition hover:bg-[#ffd500] hover:text-[#003a86]"
                      aria-label={`Open ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {currentMedia !== null && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/85 p-6 backdrop-blur-2xl">
              <button
                onClick={() => setCurrentMedia(null)}
                className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-2xl text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500]"
                aria-label="Close media preview"
              >
                ×
              </button>

              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-2xl text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500]"
                aria-label="Previous media"
              >
                ‹
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-2xl text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500]"
                aria-label="Next media"
              >
                ›
              </button>

              <div className="max-h-[88vh] max-w-[88vw] overflow-hidden rounded-[2rem] border border-[#003a86]/10 bg-white p-3 shadow-2xl shadow-[#003a86]/20">
                {media[currentMedia].type === "image" ? (
                  <img
                    src={media[currentMedia].src}
                    className="max-h-[82vh] max-w-[84vw] rounded-[1.4rem] object-contain"
                    alt={media[currentMedia].title}
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={media[currentMedia].src}
                    controls
                    autoPlay
                    className="max-h-[82vh] max-w-[84vw] rounded-[1.4rem]"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      {/* RFP SECTION */}
      <section className="rfp-section relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_52%,#fff9d8_100%)] dark:bg-none" />
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#ffd500]/25 blur-3xl dark:bg-none" />
        <div className="absolute -right-40 bottom-10 h-[520px] w-[520px] rounded-full bg-[#003a86]/10 blur-3xl dark:bg-none" />

        <div className="app-container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            {/* LEFT CONTENT */}
            <div>
              <p className="mb-5 inline-flex rounded-full border border-[#003a86]/10 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[#003a86] shadow-lg shadow-[#003a86]/5">
                Request for Proposal
              </p>

              <h2 className="max-w-4xl text-4xl md:text-5xl xl:text-6xl font-semibold mb-4">
                Tell us what you need, and we’ll help you build it.
              </h2>

              <p className="mt-5">
                Share your service request and project details. Our team will
                review your requirement and get back to you with the right
                solution.
              </p>
            </div>

            {/* RIGHT FORM */}
            <div className="w-full">
              <div className="card bg-primary w-full rounded-4xl lg:ms-auto">
                <div className="card-body px-9.5 pt-15 pb-9.5">
                  <form onSubmit={handleRfpSubmit} className="flex flex-col">
                    <div className="grid space-x-4 md:grid-cols-2">
                      <div className="mb-4">
                        <label
                          htmlFor="fullName"
                          className="label text-[18px] text-white ps-3 block mb-1"
                        >
                          Full Name
                        </label>

                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={rfpData.fullName}
                          onChange={handleRfpChange}
                          className="input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="label text-[18px] text-white ps-3 block mb-1"
                        >
                          Email Address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={rfpData.email}
                          onChange={handleRfpChange}
                          className="input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="label text-[18px] text-white ps-3 block mb-1"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={rfpData.phone}
                        onChange={handleRfpChange}
                        className="input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="serviceRequest"
                        className="label text-[18px] text-white ps-3 block mb-1"
                      >
                        Service Request
                      </label>

                      <select
                        id="serviceRequest"
                        name="serviceRequest"
                        value={rfpData.serviceRequest}
                        onChange={handleRfpChange}
                        className="select bg-primary border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12"
                        required
                      >
                        <option value="" disabled>
                          Select a service
                        </option>

                        {serviceOptions.map((service) => (
                          <option
                            key={service}
                            value={service}
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="label text-[18px] text-white ps-3 block mb-1"
                      >
                        Project Requirement
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={rfpData.message}
                        onChange={handleRfpChange}
                        className="textarea bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-37.5 resize-none"
                        placeholder="Tell us about your project or inquiry"
                        required
                      ></textarea>
                    </div>

                    {status && (
                      <div className="mt-2 text-white text-center font-medium">
                        {status}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-lg btn-light dark:btn-warning py-2 text-[18px] mt-4 w-33 ms-auto"
                      disabled={status === "Sending..."}
                    >
                      {status === "Sending..." ? "Sending..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
