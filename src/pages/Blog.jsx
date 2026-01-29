import Footer from "../components/Footer";

export default function Blog() {
  return (
    <>
      <div className="hero relative">
        <img src="./src/assets/images/hero/blog-hero.png" className="object-cover w-full" alt="About Us" />
        <h2 className="text-white z-1">Blogs / Insights</h2>      
        <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
      </div>
      <div className="app-container py-20">
        <div className="grid gap-y-15">
            <div className="text-center mb-10">
              <h2 class="mb-3">Insights & Thought Leadership</h2>
              <p>Explore expert perspectives, case studies, and updates on global trade, FDI, and investment trends.</p>
            </div>

            <div className="group relative overflow-hidden rounded-4xl">
              <img src="./src/assets/images/blog/blog-1.jpg" className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out w-full" alt="About Us" />
              <div className="bg-white rounded-3xl px-8 pt-12 pb-10 absolute start-5 end-0 bottom-5 max-w-169.5">
                <h4 className="mb-3 leading-tight group-hover:underline">Building Pathways for<br /> Sustainable Investment in Saudi Arabia</h4>
                <p>As Vision 2030 accelerates economic diversification, sustainability has become central to investment strategy. Discover how governments and investors can align growth with environmental responsibility.</p>
                <button className="btn bg-gray-200 px-5 group-hover:bg-warning border-0 transition-all duration-500 py-2.5 mt-10">
                    <i className="icon-right-arrow text-lg group-hover:-rotate-50 transition-all duration-500"></i>
                  </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4.5">
                <div className="group">
                    <div className="overflow-hidden rounded-3xl relative mb-3">
                      <img src="./src/assets/images/blog/blog-2.jpg" className="h-65.5 object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out w-full" alt="About Us" />
                      <button className="btn absolute bottom-0 translate-y-10 group-hover:-translate-y-5 end-5 bg-gray-200 px-5 group-hover:bg-warning border-0 transition-all duration-500 py-2.5">
                        <i className="icon-right-arrow text-lg group-hover:-rotate-50 transition-all duration-500"></i>
                      </button>
                    </div> 
                    <h4 className="mb-3 leading-tight group-hover:underline">The Future of Public-Private Partnerships in the Gulf</h4>           
                </div>
                <div className="group">
                    <div className="overflow-hidden rounded-3xl relative mb-3">
                      <img src="./src/assets/images/blog/blog-3.jpg" className="h-65.5 object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out w-full" alt="About Us" />
                      <button className="btn absolute bottom-0 translate-y-10 group-hover:-translate-y-5 end-5 bg-gray-200 px-5 group-hover:bg-warning border-0 transition-all duration-500 py-2.5">
                        <i className="icon-right-arrow text-lg group-hover:-rotate-50 transition-all duration-500"></i>
                      </button>
                    </div> 
                    <h4 className="mb-3 leading-tight group-hover:underline">The Future of Public-Private Partnerships in the Gulf</h4>           
                </div>
                <div className="group">
                    <div className="overflow-hidden rounded-3xl relative mb-3">
                      <img src="./src/assets/images/blog/blog-4.jpg" className="h-65.5 object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out w-full" alt="About Us" />
                      <button className="btn absolute bottom-0 translate-y-10 group-hover:-translate-y-5 end-5 bg-gray-200 px-5 group-hover:bg-warning border-0 transition-all duration-500 py-2.5">
                        <i className="icon-right-arrow text-lg group-hover:-rotate-50 transition-all duration-500"></i>
                      </button>
                    </div> 
                    <h4 className="mb-3 leading-tight group-hover:underline">The Future of Public-Private Partnerships in the Gulf</h4>           
                </div>
            </div>
          </div>
      </div>
      
      <Footer />
    </>
  );
}