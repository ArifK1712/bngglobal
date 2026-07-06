import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import blogHero from "../assets/images/hero/blog-hero.webp";
import blog1 from "../assets/images/blog/blog-1.jpg";
import blog2 from "../assets/images/blog/blog-2.jpg";
import blog3 from "../assets/images/blog/blog-3.jpg";
import blog4 from "../assets/images/blog/blog-4.jpg";

// 1. SUB-COMPONENT: Handles the standard grid items
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
        <i className="icon-right-arrow text-lg group-hover:-rotate-50 transition-all duration-500 inline-block rtl:-scale-x-100"></i>
      </button>
    </div> 
    <h4 className="mb-3 leading-tight group-hover:underline">
      {post.title}
    </h4>          
  </div>
);

// 3. MAIN PAGE COMPONENT
export default function Blog() {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const t = translations[language];

  const featuredPost = {
    image: blog1,
    title: t.blogFeaturedTitle,
    excerpt: t.blogFeaturedExcerpt,
    link: "#"
  };

  const blogPosts = [
    {
      image: blog2,
      title: t.blogPostTitle1,
      link: "#"
    },
    {
      image: blog3,
      title: t.blogPostTitle2,
      link: "#"
    },
    {
      image: blog4,
      title: t.blogPostTitle3,
      link: "#"
    },
  ];

  return (
    <>
      <div className="hero relative" dir={isRtl ? "rtl" : "ltr"}>
        <img src={blogHero} className="object-cover w-full" alt={t.blogHeroTitle} />
        <h2 className="text-white z-1">{t.blogHeroTitle}</h2>      
        <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
      </div>

      <main className="app-container py-20" dir={isRtl ? "rtl" : "ltr"}>
        <div className="grid">            
            {/* Section Header */}
            <div className="text-center mb-10 lg:mb-15">
              <h2 className="mb-6">{t.blogHeading}</h2>
              <p>
                {t.blogSubheading}
              </p>
            </div>

            {/* Featured Post (Optimized) */}
            <article className="group relative md:overflow-hidden -mx-4 md:mb-15 md:mx-0 md:rounded-4xl">
              <img 
                src={featuredPost.image} 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out w-full h-auto md:h-100 xl:h-auto" 
                alt={featuredPost.title} 
              />
              <div className="bg-white rounded-3xl px-8 pt-12 pb-10 md:absolute start-0 md:start-5 end-5 lg:end-0 bottom-5 max-w-full mx-4 md:mx-0 md:max-w-169.5 -mt-10 relative z-10 text-start">
                <h4 className="mb-3 leading-tight group-hover:underline max-w-md dark:text-info">
                    {featuredPost.title}
                </h4>
                <p className="mb-10 dark:text-info">
                    {featuredPost.excerpt}
                </p>
                <button 
                    aria-label="Read featured article"
                    className="btn bg-gray-200 px-5 group-hover:bg-warning border-0 transition-all duration-500 py-2.5"
                >
                    <i className="icon-right-arrow text-lg group-hover:-rotate-50 transition-all duration-500 inline-block rtl:-scale-x-100"></i>
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