import React, { useState, useEffect, useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: "Business Consulting",
    image: "/images/expertise/business-consulting.jpg",
    description: "We support governments and organizations in developing forward-looking strategies that transform ambition into impact. Our approach combines global best practices with localized insights to identify opportunities, evaluate options, and define clear solutions that deliver results.",
    points: ["Competitive Benchmarking", "Market Potential Assessmen", "Competitive Benchmarking", "FDI & Trade Flow Analysis", "Sector Prioritization"]
  },
  {
    id: 2,
    title: "Delegations & Roadshows",
    image: "/images/expertise/delegations-roadshows.jpg",
    description: "We help you design and execute effective go-to-market strategies that accelerate entry into new markets and unlock growth opportunities.",
    points: ["Market & Segment Prioritisation", "Value Proposition & Positioning", "Channel & Partnership Strategy", "Launch & Activation Planning", "Performance & KPI Framework"]
  },
  {
    id: 3,
    title: "Marketing & Promotion",
    image: "/images/expertise/marketing-promotion.jpg",
    description: "We work with B2B organizations to strengthen their commercial strategy, improve sales performance, and deepen client relationships.",
    points: ["Account Segmentation & Targeting", "Sales Process Optimisation", "Partnership & Ecosystem Development", "Pricing & Commercial Models", "Customer Success Playbooks"]
  },
  {
    id: 4,
    title: "Foreign Direct Investment (FDI)",
    image: "/images/expertise/foreign-direct-investment.jpg",
    description: "We design and manage high-impact events and delegations that connect decision-makers, investors, and stakeholders across borders.",
    points: ["Trade Missions & Delegations", "Investment Forums & Roadshows", "Matchmaking & B2B Meetings", "Program & Agenda Design", "On-ground Coordination & Support"]
  },
  {
    id: 5,
    title: "Event Production",
    image: "/images/expertise/event-production.jpg"
  },
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  // 1. Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabIndex = params.get('tab');

    if (tabIndex !== null) {
      const index = parseInt(tabIndex);
      
      // 1. Set the data
      setActiveTab(index);
      
      // 2. Scroll to the section first
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }

      // 3. Open the modal (with a slight delay so the scroll finishes)
      setTimeout(() => {
        setIsModalOpen(true);
      }, 150);
    }
  }, [location]);

  return (
    <>
    <section ref={sectionRef} className="pb-15 lg:pb-40 lg:pt-12 bg-white">
      <div className="app-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-20 items-start">
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

          {/* RIGHT: Navigation List */}
          <div className="relative flex flex-col">
            <div 
              className="absolute left-0 top-0 w-full bg-[#FFD600] rounded-full z-0 flex items-center justify-end px-6 lg:px-8 transition-transform duration-500 cubic-bezier(0.25, 0.8, 0.25, 1)"
              style={{
                height: '4.25rem', 
                transform: `translateY(calc(${activeTab} * 100% + ${activeTab} * 0rem))`
              }}
            >
            </div>
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setActiveTab(index)}
                className={`
                  group relative z-10 flex items-center px-6 lg:px-10 h-17 rounded-full cursor-pointer transition-colors duration-300
                  ${activeTab === index 
                    ? 'text-black' 
                    : 'hover:bg-slate-100'
                  }
                `}
              >
                <span className="font-normal text-[28px] truncate pe-4">
                  {service.title}
                </span>
                {activeTab === index && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        
                        // Check if the current tab is "Event Production Services"
                        if (service.title === "Event Production") {
                          // Option A: Standard Redirect
                          //window.location.href = "/services"; 
                          
                          navigate("/services");
                        } else {
                          setIsModalOpen(true);
                        }
                      }}
                      className="ms-auto transition-transform hover:scale-110 cursor-pointer"
                    >
                      <i className="icon-rotated-arrow-right"></i>
                    </button>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <dialog className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-3xl p-0 rounded-4xl bg-primary">
        <div className="relative">
          {/* DYNAMIC IMAGE */}
          <img 
            className="w-full h-40 object-cover" 
            src={services[activeTab].image} 
            alt={services[activeTab].title} 
          />
          {/* DYNAMIC TITLE */}
          <h4 className="bg-white p-3 px-8 justify-center inline-flex rounded-full absolute -bottom-8 start-10 text-black"> 
            {services[activeTab].title} 
          </h4>
        </div>

        <div className="pt-13 p-9">
          {/* DYNAMIC DESCRIPTION */}
          <p className="text-white mb-5">
            {services[activeTab].description || "Description coming soon for " + services[activeTab].title}
          </p>
          
          <p className="text-white mb-5 text-lg font-medium">Our services include:</p>
          
          {/* DYNAMIC LIST */}
          <ul className="text-white grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {services[activeTab].points?.map((point, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <i className="icon-bg-sign text-warning text-[30px]"></i> {point}
              </li>
            ))}
          </ul>

          {/* FOOTER CARD */}
          <div className="card bg-white/15 rounded-3xl mt-15">
            <div className="card-body flex flex-row items-center p-8">
              <p className="text-white pe-8 text-xl font-light">
                Contact us to explore how to map your strategic roadmap.
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-warning w-29.5 flex justify-center group overflow-hidden"><span className="translate-x-1 group-hover:-translate-x-2 text-[18px] transition-all duration-500">Contact</span><i class="icon-rotated-arrow-right w-0 opacity-0 translate-y-7 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"></i></button>
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