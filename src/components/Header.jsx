import React, { useState, useEffect } from "react";
import logo from '/logo-light.svg'
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import LanguageToggle from "./LanguageToggle";
import vectorM5 from "../assets/images/vectors/vector-m5.svg";
import logoWatermark from "../assets/images/vectors/logowatermark.svg";

// Header.jsx
export default function Header() {
  const { language } = useLanguage();
  const t = translations[language];

  // 1. State to track if the user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 2. State to track if mobile drawer is open
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 3. Controlled states for dropdown menus
  const [aboutOpen, setAboutOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);

  // 4. Effect to listen for scroll events (throttled with requestAnimationFrame)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to close drawer
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className={`navbar fixed top-0 z-60 text-white transition-all duration-300 ease-in-out px-0 ${
          isScrolled ? "bg-primary py-4" : "bg-transparent py-3 lg:py-10"
        }`}
      >
        <div className="app-container flex justify-between items-center">
          <div className="flex items-center w-full lg:w-auto justify-between">
            <Link to="/"><img src={logo} alt="Logo" className="h-12 lg:h-17.5" /></Link>
            <div className="space-x-2">
              <LanguageToggle className="text-base-content bg-base-200 hover:bg-base-300 border border-base-content/10 hidden lg:hidden" />
              <button  onClick={() => setIsDrawerOpen(true)}  className="btn btn-ghost p-0 lg:hidden" aria-label="Open Mobile Menu"><i className="icon-menu text-3xl"></i></button>
            </div>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal p-0 flex gap-2 text-base font-normal items-center text-white">
              <li><Link className="hover:bg-transparent hover:underline" to="/">{t.navHome}</Link></li>
              
              <li>
                <details 
                  open={aboutOpen} 
                  onToggle={(e) => setAboutOpen(e.target.open)}
                  onMouseEnter={() => setAboutOpen(true)} 
                  onMouseLeave={() => setAboutOpen(false)}
                > 
                  <summary className="hover:bg-transparent hover:underline list-none [&::-webkit-details-marker]:hidden after:hidden cursor-pointer">
                    <Link to="/about" onClick={() => setAboutOpen(false)}>
                      {t.navAboutUs}
                    </Link>
                  </summary>                  
                  
                  <ul className="p-4.5 bg-base-100 text-base-content font-normal w-46.5 z-10 gap-y-1 grid rounded-2xl mt-1">
                    <li>
                      <Link to="/about" state={{ scrollTo: "who-we-are" }} onClick={() => setAboutOpen(false)}>{t.navWhoWeAre}</Link>
                    </li>
                    <li>
                      <Link to="/about" state={{ scrollTo: "mission" }} onClick={() => setAboutOpen(false)}>{t.navOurMission}</Link>
                    </li>
                    <li>
                      <Link to="/about" state={{ scrollTo: "team" }} onClick={() => setAboutOpen(false)}>{t.navOurTeam}</Link>
                    </li>
                    <li>
                      <Link to="/about" state={{ scrollTo: "clients" }} onClick={() => setAboutOpen(false)}>{t.navOurClients}</Link>
                    </li>
                  </ul>
                </details>
              </li>
              
              <li>
                <details 
                  open={expertiseOpen} 
                  onToggle={(e) => setExpertiseOpen(e.target.open)}
                  onMouseEnter={() => setExpertiseOpen(true)} 
                  onMouseLeave={() => setExpertiseOpen(false)}
                >
                  <summary className="hover:bg-transparent hover:underline [&::-webkit-details-marker]:hidden after:hidden cursor-pointer">
                    <Link to="/our-expertise" onClick={() => setExpertiseOpen(false)}>{t.navOurExpertise}</Link>
                  </summary>
                  <ul className="p-4.5 bg-base-100 text-base-content font-normal w-156 z-10 rounded-2xl flex justify-between -start-32 mt-1">
                    <div className="grid gap-y-4.5 text-start">
                       <li><Link to="/our-expertise?service=business-consulting" onClick={() => setExpertiseOpen(false)}>{t.navBusinessConsulting}</Link></li>
                       <li><Link to="/our-expertise?service=delegations-and-roadshows" onClick={() => setExpertiseOpen(false)}>{t.navDelegationsRoadshows}</Link></li>
                       <li><Link to="/our-expertise?service=marketing-and-promotion" onClick={() => setExpertiseOpen(false)}>{t.navMarketingPromotion}</Link></li>
                       <li><Link to="/our-expertise?service=fdi" onClick={() => setExpertiseOpen(false)}>{t.navFDI}</Link></li>                      
                    </div>
                    <div className="bg-primary w-72.5 p-4 px-7 rounded-2xl relative text-start">
                      <p className="text-wrap text-white text-lg font-light mb-6">{t.navPartnerText}</p>
                      <Link to="/contact" onClick={() => setExpertiseOpen(false)} className="btn btn-warning px-5 hover:px-6 hover:bg-warning border-0 transition-all py-2.5 relative z-10">
                        <i className="icon-right-arrow text-lg rtl:rotate-180"></i>
                      </Link>
                      <img src={vectorM5} className="absolute -start-6 end-0 bottom-0 w-full" alt="" />
                    </div>
                  </ul>                  
                </details>
              </li>
              <li><Link className="hover:bg-transparent hover:underline" to="/services">{t.navEventProduction}</Link></li>
              <li><Link className="hover:bg-transparent hover:underline" to="/industries">{t.navIndustries}</Link></li>
              <li><Link className="hover:bg-transparent hover:underline" to="">{t.navEventCalendar}</Link></li>
              <li><Link className="hover:bg-transparent hover:underline" to="/blog">{t.navInsightsBlogs}</Link></li>              
              <li><Link to="/contact" className='btn-warning bg-warning items-center flex text-dark rounded-3xl min-h-10 h-10 text-[#253858] px-6 font-medium'>{t.navContact}</Link></li>
              {/* <li className="flex items-center justify-center px-1"><LanguageToggle /></li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 z-90 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeDrawer}
      ></div>
      <div 
        className={`fixed top-0 right-0 z-100 h-full w-full bg-base-100 text-base-content shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="overflow-y-auto flex-1 p-8 pt-19 text-start">
            <button onClick={closeDrawer} className="btn btn-sm btn-circle btn-ghost absolute end-6 top-9">
              <i className="icon-close-flat text-lg"></i>
            </button>
            <ul className="menu w-full text-base p-0 space-y-6 text-start">
              <li><Link to="/" onClick={closeDrawer}>{t.navHome}</Link></li>              
              <li><Link to="/about" onClick={closeDrawer}>{t.navAboutUs}</Link></li>
              <li><Link to="/our-expertise" onClick={closeDrawer}>{t.navOurExpertise}</Link></li>
              <li><Link to="/industries" onClick={closeDrawer}>{t.navIndustries}</Link></li>
              <li><Link to="/blog" onClick={closeDrawer}>{t.navInsightsBlogs}</Link></li>
              <li className="mt-4 flex flex-row items-center gap-4">
                <Link to="/contact" onClick={closeDrawer} className="bg-warning text-black rounded-4xl justify-center px-5.5 py-2">
                  {t.navContact}
                </Link>                
              </li>
            </ul>
          </div>
        </div>
        <img src={logoWatermark} className="w-full absolute end-0 start-0 bottom-0" alt="" />
      </div>
      
    </>
  );
}