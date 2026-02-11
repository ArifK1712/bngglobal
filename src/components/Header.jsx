import React, { useState, useEffect } from "react";
import logo from '/logo-light.svg'
import { Link } from "react-router-dom";

// Header.jsx
export default function Header() {
  // 1. State to track if the user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 2. State to track if mobile drawer is open
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 3. Effect to listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to close drawer
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLinkClick = (e) => {
    // Finds the closest <details> parent and removes the 'open' attribute
    const detailsElement = e.target.closest('details');
    if (detailsElement) {
      detailsElement.removeAttribute('open');
    }
  };

  return (
    <>
      <div className={`navbar fixed top-0 z-50 text-white transition-all duration-300 ease-in-out px-0 ${
          isScrolled ? "bg-primary py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="app-container flex justify-between items-center">
          <div className="flex items-center w-full lg:w-auto justify-between">
            <Link to="/"><img src={logo} alt="Logo" className="h-12 md:h-17.5" /></Link>
            <button  onClick={() => setIsDrawerOpen(true)}  className="btn btn-ghost p-0 lg:hidden"><i className="icon-menu text-4xl"></i></button>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal p-0 flex gap-2 text-base font-medium">
              <li><Link className="hover:bg-white/10" to="/">Home</Link></li>
              <li>
                <details onMouseEnter={(e) => (e.currentTarget.open = true)} onMouseLeave={(e) => (e.currentTarget.open = false)}>
                  <summary className="hover:bg-white/10">
                    <Link  to="/about" onClick={(e) => e.currentTarget.closest('details').open = false} >About Us</Link>
                  </summary>                  
                  <ul className="p-4.5 bg-base-100 text-base-content font-normal w-46.5 z-10 gap-y-1 grid rounded-2xl">
                    <li>
                      <Link to="/about#who-we-are" onClick={handleLinkClick}>Who We Are</Link>
                    </li>
                    <li>
                      <Link to="/about#mission" onClick={handleLinkClick}>Our Mission</Link>
                    </li>
                    <li>
                      <Link to="/about#team" onClick={handleLinkClick}>Our Team</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details onMouseEnter={(e) => (e.currentTarget.open = true)} onMouseLeave={(e) => (e.currentTarget.open = false)}>
                  <summary className="hover:bg-white/10">
                    <Link  to="/our-expertise" onClick={(e) => e.currentTarget.closest('details').open = false} >Our Expertise</Link>
                  </summary>
                  <ul className="p-4.5 bg-base-100 text-base-content font-normal w-156 z-10 rounded-2xl flex justify-between -start-32">
                    <div className="grid gap-y-4.5">
                      <li><Link to="/our-expertise?tab=0">Strategy Development</Link></li>
                      <li><Link to="/our-expertise?tab=1">Go-to-Market Strategy</Link></li>
                      <li><Link to="/our-expertise?tab=2">B2B Consulting</Link></li>
                      <li><Link to="/our-expertise?tab=4">Foreign Direct Investment (FDI)</Link></li>
                      <li><Link to="/our-expertise?tab=3">Events &amp; Delegations</Link></li>
                      <li><Link to="/services">Event Production Services</Link></li>
                    </div>
                    <div className="bg-primary w-72.5 p-4 px-7 rounded-2xl relative">
                      <p className="text-wrap text-white text-lg font-light mb-6">Partner with us to make your next mission impactful.</p>
                      <Link to="/contact" className="btn btn-warning px-5 hover:px-6 hover:bg-warning border-0 transition-all py-2.5">
                        <i className="icon-right-arrow text-lg"></i>
                      </Link>
                      <img src="/images/vectors/vector-m5.svg" className="absolute -start-6 end-0 bottom-0 w-full" alt="" />
                    </div>
                  </ul>
                  
                </details>
              </li>
              <li><Link className="hover:bg-white/10" to="/industries">Industries</Link></li>
              <li><Link className="hover:bg-white/10" to="/blog">Insights / Blogs</Link></li>
              <li><Link to="/contact" className='btn-warning bg-warning items-center flex text-dark rounded-3xl min-h-10 h-10 text-[#253858] px-6'>Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Mobile Drawer (Sidebar) --- */}
      {/* 1. Overlay (Dark background) */}
      <div 
        className={`fixed inset-0 z-90 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeDrawer}
      ></div>

      {/* 2. Drawer Content (Sliding Menu) */}
      <div 
        className={`fixed top-0 right-0 z-100 h-full w-full bg-base-100 text-base-content shadow-xl transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Menu Items */}
          <div className="overflow-y-auto flex-1 p-8 pt-19">
            <button onClick={closeDrawer} className="btn btn-sm btn-circle btn-ghost absolute end-6 top-9">
              <i className="icon-close-flat text-lg"></i>
            </button>
            <ul className="menu w-full text-base p-0 space-y-6">
              <li><Link to="/" onClick={closeDrawer}>Home</Link></li>              
              <li><Link to="/about" onClick={closeDrawer}>About Us</Link></li>
              <li><Link to="/our-expertise" onClick={closeDrawer}>Our Expertise</Link></li>
              <li><Link to="/industries" onClick={closeDrawer}>Industries</Link></li>
              <li><Link to="/blog" onClick={closeDrawer}>Insights / Blogs</Link></li>
              <li className="mt-4 inline"><Link to="/contact" onClick={closeDrawer} className="bg-warning text-black rounded-4xl justify-center inline px-5.5 py-2 ms-2">Contact</Link></li>
            </ul>
          </div>
        </div>
        <img src="/images/vectors/logowatermark.svg" className="w-full absolute end-0 start-0 bottom-0" alt="" />
      </div>
    </>
  );
}