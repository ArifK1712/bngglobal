import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

import businessConsulting from "../assets/images/expertise/business-consulting.webp";
import delegationsRoadshows from "../assets/images/expertise/delegations-roadshows.webp";
import marketingPromotion from "../assets/images/expertise/marketing-promotion.webp";
import fdi from "../assets/images/expertise/foreign-direct-investment.webp";
import eventProduction from "../assets/images/expertise/event-production.webp";

const ServicesSection = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const t = translations[language];

  const services = [
    {
      id: 1,
      title: t.navBusinessConsulting,
      image: businessConsulting,
      description: t.servicesListItems[0].description,
      points: t.servicesListItems[0].points
    },
    {
      id: 2,
      title: t.navDelegationsRoadshows,
      image: delegationsRoadshows,
      description: t.servicesListItems[1].description,
      points: t.servicesListItems[1].points
    },
    {
      id: 3,
      title: t.navMarketingPromotion,
      image: marketingPromotion,
      description: t.servicesListItems[2].description,
      points: t.servicesListItems[2].points
    },
    {
      id: 4,
      title: t.navFDI,
      image: fdi,
      description: t.servicesListItems[3].description,
      points: t.servicesListItems[3].points
    },
    {
      id: 5,
      title: t.navEventProduction,
      image: eventProduction
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  // 1. Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceSlug = params.get('service');
    const tabIndex = params.get('tab');
    let index = null;

    if (serviceSlug !== null) {
      const slugMap = {
        "business-consulting": 0,
        "delegations-and-roadshows": 1,
        "marketing-and-promotion": 2,
        "fdi": 3
      };
      if (slugMap[serviceSlug] !== undefined) {
        index = slugMap[serviceSlug];
      }
    } else if (tabIndex !== null) {
      index = parseInt(tabIndex);
    }

    if (index !== null && !isNaN(index) && index >= 0 && index < services.length) {
      // 1. Set the active tab
      setTimeout(() => {
        setActiveTab(index);
      }, 0);
      
      // 2. Scroll to the section only if it is not already aligned at the top of the viewport
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const style = window.getComputedStyle(sectionRef.current);
        const scrollMarginTop = parseInt(style.scrollMarginTop) || 0;
        const diff = Math.abs(rect.top - scrollMarginTop);

        if (diff > 15) {
          sectionRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }

      // 3. Open the modal (with a slight delay so the scroll finishes)
      setTimeout(() => {
        setIsModalOpen(true);
      }, 150);
    }
  }, [location, services.length]);

  return (
    <>
    <section ref={sectionRef} className="pb-12 lg:pb-40 lg:pt-12">
      <div className="app-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-20 items-center">
          <div className="relative h-100 w-full hidden lg:flex items-center justify-center">
            {services.map((service, index) => {
              let positionClass = 'opacity-0 z-0 scale-90 -translate-y-20 xl:-translate-y-0 xl:-translate-x-20 pointer-events-none';              
              if (index === activeTab) {
                positionClass = 'opacity-100 z-30 scale-100 translate-y-0 xl:translate-y-0 xl:translate-x-0'; 
              } else if (index === activeTab + 1) {
                positionClass = 'opacity-100 z-20 scale-90 -translate-y-10 xl:-translate-y-0 xl:-translate-x-20';
              } else if (index === activeTab + 2) {
                positionClass = 'opacity-100 z-10 scale-80 -translate-y-20 xl:-translate-y-0 xl:-translate-x-40';
              }
              return (
                <div
                  key={service.id}
                  className={`absolute right-0 xl:-right-8 w-full xl:w-123 h-100 xl:h-108 rounded-3xl overflow-hidden transition-all duration-500 ease-out origin-center border border-white/10 ${positionClass}`} >
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover"/>
                </div>
              );
            })}
          </div>

          {/* Navigation List - Dir sets direction vector dynamically */}
          <div className="relative flex flex-col" dir={isRtl ? "rtl" : "ltr"}>
            <div 
              className="absolute start-0 top-0 w-full bg-[#FFD600] rounded-full z-0 flex items-center justify-end px-6 lg:px-8 transition-transform duration-500 cubic-bezier(0.25, 0.8, 0.25, 1) h-13.5 md:h-17"
              style={{
                transform: `translateY(calc(${activeTab} * 100% + ${activeTab} * 0rem))`
              }}
            >
            </div>
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setActiveTab(index)}
                className={`
                  group relative z-10 flex items-center px-6 lg:px-10 h-13.5 md:h-17 rounded-full cursor-pointer transition-colors duration-300
                  ${activeTab === index 
                    ? 'text-black' 
                    : 'hover:bg-slate-100 hover:dark:text-black'
                  }
                `}
              >
                <span className={`font-normal text-[20px] md:text-[28px] truncate ${isRtl ? 'ps-4 text-right' : 'pe-4 text-left'}`}>
                  {service.title}
                </span>
                {activeTab === index && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        
                        // Check if the current tab is "Event Production Services"
                        if (service.id === 5) {
                          navigate("/services");
                        } else {
                          setIsModalOpen(true);
                        }
                      }}
                      className="ms-auto transition-transform hover:scale-110 cursor-pointer flex items-center justify-center"
                    >
                      <i className={`icon-rotated-arrow-right inline-block ${isRtl ? '-scale-x-100' : ''}`}></i>
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <dialog className={`modal ${isModalOpen ? 'modal-open overflow-auto' : ''}`}>
      <div className="modal-box w-11/12 max-w-3xl p-0 rounded-4xl bg-primary overflow-visible max-h-max my-4">
        <button className="btn btn-sm btn-circle absolute z-10 top-0 -end-2 cursor-pointer" onClick={() => setIsModalOpen(false)}>
            <i className="icon-close-flat"></i>
        </button>
        <div className="relative">
          <img  className="w-full h-20 md:h-40 object-cover rounded-4xl rounded-b-none" src={services[activeTab].image} alt={services[activeTab].title}  />
          <h4 className="bg-white p-2 px-5 md:p-3 md:px-8 justify-center inline-flex rounded-full absolute -bottom-6 md:-bottom-8 start-4 md:start-10 end-10 max-w-max text-black"> 
            {services[activeTab].title} 
          </h4>          
        </div>
        
        <div className="pt-8 p-4 md:pt-13 md:p-9 text-start" dir={isRtl ? "rtl" : "ltr"}>
          <p className="text-white mb-5">
            {services[activeTab].description || "Description coming soon for " + services[activeTab].title}
          </p>
          
          <p className="text-white mb-5 text-lg font-medium">{t.servicesIncludeText}</p>
          
          {/* DYNAMIC LIST */}
          <ul className="text-white grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {services[activeTab].points?.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 justify-start">
                <i className="icon-bg-sign text-warning text-[30px] shrink-0"></i> {point}
              </li>
            ))}
          </ul>

          {/* FOOTER CARD */}
          <div className="card bg-white/15 rounded-3xl mt-4 md:mt-15">
            <div className="card-body flex md:flex-row md:items-center justify-between p-5 md:p-8">
              <p className="text-white md:pe-8 text-xl font-light max-w-max">
                {t.servicesCtaText}
              </p>
              <div className="card-actions md:justify-end">
                <Link to="/contact" className="btn btn-warning w-29.5 flex justify-center group overflow-hidden">
                  <span className="translate-x-1 group-hover:-translate-x-2 text-[18px] transition-all duration-500">{t.servicesCtaBtn}</span>
                  <i className={`text-xs icon-rotated-arrow-right w-0 opacity-0 translate-y-6 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${isRtl ? '-scale-x-100' : ''}`}></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsModalOpen(false)}>close</button>
      </form>
    </dialog>   
    </> 
  );
};

export default ServicesSection;