import React, { useState } from 'react';

const services = [
  {
    id: 1,
    title: "Strategy Development",
    image: "https://bngglobal.net/assets/images/strategy-development.jpg", 
  },
  {
    id: 2,
    title: "Go-to-Market Strategy",
    image: "https://bngglobal.net/assets/images/go-to-market-strategy.jpg",
  },
  {
    id: 3,
    title: "B2B Consulting",
    image: "https://bngglobal.net/assets/images/b2b-consulting.jpg",
  },
  {
    id: 4,
    title: "Events & Delegations",
    image: "https://bngglobal.net/assets/images/events-delegations.jpg",
  },
  {
    id: 5,
    title: "Foreign Direct Investment (FDI)",
    image: "https://bngglobal.net/assets/images/foreign-direct-iInvestment.jpg",
  },
  {
    id: 6,
    title: "Event Production Services",
    image: "https://bngglobal.net/assets/images/services/custom-made-stands.jpg",
  },
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
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
              <i className="icon-rotated-arrow-right"></i>
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
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;