import React, { useState } from "react";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import { MapPin, Calendar, Film, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import expertiseHero from "../assets/images/hero/gallery-hero.webp";

const projectsData = {
  en: [
    {
      id: 1,
      name: "Philips Healthcare Exhibition Stand",
      date: "November 2025",
      venue: "Riyadh Exhibition Center",
      coverImage: new URL("../assets/images/gallery/1.webp", import.meta.url).href,
      media: [
        { type: "image", src: new URL("../assets/images/gallery/1.webp", import.meta.url).href },
        { type: "video", src: new URL("../assets/images/gallery/philips.mp4", import.meta.url).href },
        { type: "image", src: new URL("../assets/images/gallery/2.webp", import.meta.url).href },
        { type: "image", src: new URL("../assets/images/gallery/3.webp", import.meta.url).href }
      ]
    },
    {
      id: 2,
      name: "Jana Marine Live Activation",
      date: "December 2025",
      venue: "Jeddah Hilton Hall",
      coverImage: new URL("../assets/images/gallery/6.webp", import.meta.url).href,
      media: [
        { type: "image", src: new URL("../assets/images/gallery/6.webp", import.meta.url).href },
        { type: "video", src: new URL("../assets/images/gallery/jana-marine.mp4", import.meta.url).href }
      ]
    },
    {
      id: 3,
      name: "Vision Investment Forum",
      date: "January 2026",
      venue: "Dammam International Convention Center",
      coverImage: new URL("../assets/images/gallery/4.webp", import.meta.url).href,
      media: [
        { type: "image", src: new URL("../assets/images/gallery/4.webp", import.meta.url).href },
        { type: "image", src: new URL("../assets/images/gallery/5.webp", import.meta.url).href }
      ]
    },
    {
      id: 4,
      name: "General Authority of Civil Aviation (GACA) Exhibition",
      date: "January 2026",
      venue: "Dammam International Convention Center",
      coverImage: new URL("../assets/images/gallery/7.webp", import.meta.url).href,
      media: [
        { type: "image", src: new URL("../assets/images/gallery/7.webp", import.meta.url).href }
      ]
    }
  ],
  ar: [
    {
      id: 1,
      name: "جناح فيليبس للرعاية الصحية",
      date: "نوفمبر ٢٠٢٥",
      venue: "مركز الرياض للمعارض",
      coverImage: new URL("../assets/images/gallery/1.webp", import.meta.url).href,
      media: [
        { type: "image", src: new URL("../assets/images/gallery/1.webp", import.meta.url).href },
        { type: "video", src: new URL("../assets/images/gallery/philips.mp4", import.meta.url).href },
        { type: "image", src: new URL("../assets/images/gallery/2.webp", import.meta.url).href },
        { type: "image", src: new URL("../assets/images/gallery/3.webp", import.meta.url).href }
      ]
    },
    {
      id: 2,
      name: "تفعيل مباشر لجانا مارين",
      date: "ديسمبر ٢٠٢٥",
      venue: "قاعة هيلتون جدة",
      coverImage: new URL("../assets/images/gallery/2.webp", import.meta.url).href,
      media: [
        { type: "image", src: new URL("../assets/images/gallery/6.webp", import.meta.url).href },
        { type: "video", src: new URL("../assets/images/gallery/jana-marine.mp4", import.meta.url).href }
      ]
    },
    {
      id: 3,
      name: "منتدى الأعمال السعودي العالمي",
      date: "يناير ٢٠٢٦",
      venue: "مركز الدمام الدولي للمؤتمرات",
      coverImage: new URL("../assets/images/gallery/6.webp", import.meta.url).href,
      media: [
        { type: "image", src: new URL("../assets/images/gallery/4.webp", import.meta.url).href },
        { type: "image", src: new URL("../assets/images/gallery/5.webp", import.meta.url).href }
      ]
    },
    {
      id: 4,
      name: "General Authority of Civil Aviation (GACA) Exhibition",
      date: "January 2026",
      venue: "Dammam International Convention Center",
      coverImage: new URL("../assets/images/gallery/7.webp", import.meta.url).href,
      media: [
        { type: "image", src: new URL("../assets/images/gallery/7.webp", import.meta.url).href }
      ]
    }
  ]
};

export default function Gallery() {
  const { language } = useLanguage();
  const t = translations[language];

  const projects = projectsData[language] || projectsData.en;

  const [activeProject, setActiveProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const nextMedia = () => {
    if (!activeProject) return;
    setCurrentMediaIndex((prev) => (prev + 1) % activeProject.media.length);
  };

  const prevMedia = () => {
    if (!activeProject) return;
    setCurrentMediaIndex((prev) => (prev - 1 + activeProject.media.length) % activeProject.media.length);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero relative">
        <img 
          src={expertiseHero} 
          className="object-cover w-full h-full" 
          alt={t.navGallery} 
          loading="lazy"
        />
        <h2 className="text-white relative z-10">{t.navGallery}</h2>
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>

      {/* Projects Showcase Grid */}
      <div className="bg-slate-50 py-16 md:py-24">
        <div className="app-container">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4">
              {language === "en" ? "Our Gallery" : "أعمالنا المتميزة"}
            </h2>
            <p>
              {language === "en" 
                ? "Explore our portfolio of successfully delivered exhibitions, trade delegations, and live brand experiences across Saudi Arabia." 
                : "استكشف معرض أعمالنا من المعارض الناجحة والوفود التجارية وتجارب العلامات التجارية الحية في المملكة العربية السعودية."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative overflow-hidden bg-info rounded-2xl transition-all duration-500 flex flex-col min-h-full h-full"
              >
                
                {/* Cover Image Container */}
                <div 
                  onClick={() => { setActiveProject(project); setCurrentMediaIndex(0); }}
                  className="relative overflow-hidden cursor-pointer aspect-video"
                >
                  <img 
                    src={project.coverImage}  
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  {/* Hover overlay with a plus icon */}
                  <div className="absolute inset-0 bg-[#003a86]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-5xl font-light">+</span>
                  </div>
                  
                  {/* Media Counts Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                    <ImageIcon size={14} /> {project.media.filter(m => m.type === "image").length}
                    {project.media.some(m => m.type === "video") && (
                      <>
                        <span className="w-px h-3 bg-white/30" />
                        <Film size={14} /> {project.media.filter(m => m.type === "video").length}
                      </>
                    )}
                  </div>
                </div>

                {/* Info Card Content */}
                <div className="p-6 flex flex-col grow justify-between">
                  <div className="flex flex-col justify-between">
                    <h4 className="mb-3">
                      {project.name}
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{project.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{project.venue}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setActiveProject(project); setCurrentMediaIndex(0); }}
                    className="mt-6 w-full btn-warning bg-warning items-center justify-center flex text-dark rounded-3xl min-h-10 h-10 text-[#253858] px-6 font-medium cursor-pointer"
                  >
                    {language === "en" ? "View Project Media" : "عرض وسائط المشروع"}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Media Popup Modal (replicates the design on the Services page) */}
      {activeProject !== null && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/85 p-6 backdrop-blur-2xl">
          {/* Close Button */}
          <button
            onClick={() => setActiveProject(null)}
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-2xl text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500] cursor-pointer z-10"
            aria-label="Close media preview"
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            onClick={prevMedia}
            className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500] cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextMedia}
            className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500] cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          {/* Media Content Display Area */}
          <div className="max-h-[88vh] max-w-[88vw] overflow-hidden rounded-[2rem] border border-[#003a86]/10 bg-white p-3 shadow-2xl shadow-[#003a86]/20">
            {activeProject.media[currentMediaIndex].type === "image" ? (
              <img
                src={activeProject.media[currentMediaIndex].src}
                className="max-h-[82vh] max-w-[84vw] rounded-[1.4rem] object-contain"
                alt={activeProject.name}
                loading="lazy"
              />
            ) : (
              <video
                src={activeProject.media[currentMediaIndex].src}
                controls
                autoPlay
                className="max-h-[82vh] max-w-[84vw] rounded-[1.4rem]"
              />
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
