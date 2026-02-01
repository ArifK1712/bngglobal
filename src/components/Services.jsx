import React, { useState } from 'react';

const services = [
  {
    id: 1,
    title: "Strategy Development",
    image: "https://bngglobal.net/assets/images/strategy-development.jpg",
    description: "We support governments and organizations in developing forward-looking strategies that transform ambition into impact. Our approach combines global best practices with localized insights to identify opportunities, evaluate options, and define clear solutions that deliver results.",
    points: ["Competitive Benchmarking", "Market Potential Assessmen", "Competitive Benchmarking", "FDI & Trade Flow Analysis", "Sector Prioritization"]
  },
  {
    id: 2,
    title: "Go-to-Market Strategy",
    image: "https://bngglobal.net/assets/images/go-to-market-strategy.jpg",
    description: "We help you design and execute effective go-to-market strategies that accelerate entry into new markets and unlock growth opportunities.",
    points: ["Market & Segment Prioritisation", "Value Proposition & Positioning", "Channel & Partnership Strategy", "Launch & Activation Planning", "Performance & KPI Framework"]
  },
  {
    id: 3,
    title: "B2B Consulting",
    image: "https://bngglobal.net/assets/images/b2b-consulting.jpg",
    description: "We work with B2B organizations to strengthen their commercial strategy, improve sales performance, and deepen client relationships.",
    points: ["Account Segmentation & Targeting", "Sales Process Optimisation", "Partnership & Ecosystem Development", "Pricing & Commercial Models", "Customer Success Playbooks"]
  },
  {
    id: 4,
    title: "Events & Delegations",
    image: "https://bngglobal.net/assets/images/events-delegations.jpg",
    description: "We design and manage high-impact events and delegations that connect decision-makers, investors, and stakeholders across borders.",
    points: ["Trade Missions & Delegations", "Investment Forums & Roadshows", "Matchmaking & B2B Meetings", "Program & Agenda Design", "On-ground Coordination & Support"]
  },
  {
    id: 5,
    title: "Foreign Direct Investment (FDI)",
    image: "https://bngglobal.net/assets/images/foreign-direct-iInvestment.jpg",
    description: "We support governments, agencies, and organizations in attracting and retaining high-quality foreign direct investment.",
    points: ["FDI Strategy & Policy Advisory", "Investor Targeting & Lead Generation", "Value Proposition Development", "Pipeline Management & Aftercare", "Sector & Location Marketing"]
  },
  {
    id: 6,
    title: "Event Production Services",
    image: "https://bngglobal.net/assets/images/services/custom-made-stands.jpg",
    description: "Our Go-to-Market services help businesses navigate complex regulatory landscapes and establish a strong presence in the Middle East...",
    points: ["Entry Mode Selection", "Regulatory Compliance", "Partner Matching", "Local Content Strategy"]
  },
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  // 1. Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <section className="pb-40 pt-12 bg-white overflow-hidden">
      <div className="app-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative h-100 w-full flex items-center justify-center lg:justify-end">
            {services.map((service, index) => {
              let positionClass = 'opacity-0 z-0 scale-90 -translate-x-20 pointer-events-none';              
              if (index === activeTab) {
                positionClass = 'opacity-100 z-30 scale-100 translate-x-0'; 
              } else if (index === activeTab + 1) {
                positionClass = 'opacity-100 z-20 scale-90 -translate-x-12 lg:-translate-x-20';
              } else if (index === activeTab + 2) {
                positionClass = 'opacity-100 z-10 scale-80 -translate-x-24 lg:-translate-x-40';
              }
              return (
                <div
                  key={service.id}
                  className={`absolute top-0 -right-8 w-123 h-87.5 lg:h-108 rounded-3xl overflow-hidden transition-all duration-500 ease-out origin-center border border-white/10 ${positionClass}`}
                  style={{ left: 'auto' }}
                >
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
                <span className="font-normal text-[28px]">
                  {service.title}
                </span>
                {activeTab === index && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        
                        // Check if the current tab is "Event Production Services"
                        if (service.title === "Event Production Services") {
                          // Option A: Standard Redirect
                          window.location.href = "/services"; 
                          
                          // Option B: If using React Router, use: navigate("/services");
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
          <h4 className="bg-white p-3 min-w-82 justify-center inline-flex rounded-full absolute -bottom-8 start-10 text-black"> 
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
                <button className="btn btn-warning">Contact <i class="icon-rotated-arrow-right"></i></button>
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