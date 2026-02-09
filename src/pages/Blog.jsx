import Footer from "../components/Footer";

// 1. DATA: Move data outside the component or into a JSON file
const featuredPost = {
  image: "/images/blog/blog-1.jpg",
  title: "Building Pathways for Sustainable Investment in Saudi Arabia",
  excerpt: "As Vision 2030 accelerates economic diversification, sustainability has become central to investment strategy. Discover how governments and investors can align growth with environmental responsibility.",
  link: "#" // Placeholder for actual link
};

const blogPosts = [
  {
    image: "/images/blog/blog-2.jpg",
    title: "The Future of Public-Private Partnerships in the Gulf",
    link: "#"
  },
  {
    image: "/images/blog/blog-3.jpg",
    title: "The Future of Public-Private Partnerships in the Gulf",
    link: "#"
  },
  {
    image: "/images/blog/blog-4.jpg",
    title: "The Future of Public-Private Partnerships in the Gulf",
    link: "#"
  },
];

// 2. SUB-COMPONENT: Handles the standard grid items
const BlogCard = ({ post }) => (
  <div className="group">
    <div className="overflow-hidden rounded-3xl relative mb-3">
      <img 
        src={post.image} 
        className="h-65.5 object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out w-full" 
        alt={post.title} 
        loading="lazy"
      />
      <button 
        aria-label={`Read more about ${post.title}`}
        className="btn absolute bottom-0 translate-y-10 group-hover:-translate-y-5 end-5 bg-gray-200 px-5 group-hover:bg-warning border-0 transition-all duration-500 py-2.5"
      >
        <i className="icon-right-arrow text-lg group-hover:-rotate-50 transition-all duration-500"></i>
      </button>
    </div> 
    <h4 className="mb-3 leading-tight group-hover:underline">
      {post.title}
    </h4>          
  </div>
);

// 3. MAIN PAGE COMPONENT
export default function Blog() {
  return (
    <>
      <div className="hero relative">
        <img src="/images/hero/blog-hero.png" className="object-cover w-full" alt="About Us" />
        <h2 className="text-white z-1">Blogs / Insights</h2>      
        <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
      </div>

      <main className="app-container py-20">
        <div className="grid">            
            {/* Section Header */}
            <div className="text-center mb-10 lg:mb-15">
              <h2 className="mb-6">Insights & Thought Leadership</h2>
              <p>
                Explore expert perspectives, case studies, and updates on global trade, FDI, and investment trends.
              </p>
            </div>

            {/* Featured Post (Optimized) */}
            <article className="group relative md:overflow-hidden -mx-4 md:mb-15 md:mx-0 md:rounded-4xl">
              <img 
                src={featuredPost.image} 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out w-full h-auto md:h-100 xl:h-auto" 
                alt={featuredPost.title} 
              />
              <div className="bg-white rounded-3xl px-8 pt-12 pb-10 md:absolute start-0 md:start-5 end-5 lg:end-0 bottom-5 max-w-full mx-4 md:mx-0 md:max-w-169.5 -mt-10 relative z-10">
                <h4 className="mb-3 leading-tight group-hover:underline max-w-md">
                    {featuredPost.title}
                </h4>
                <p className="mb-10">
                    {featuredPost.excerpt}
                </p>
                <button 
                    aria-label="Read featured article"
                    className="btn bg-gray-200 px-5 group-hover:bg-warning border-0 transition-all duration-500 py-2.5"
                >
                    <i className="icon-right-arrow text-lg group-hover:-rotate-50 transition-all duration-500"></i>
                  </button>
              </div>
            </article>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-3 gap-4.5">
              {blogPosts.map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
            </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}