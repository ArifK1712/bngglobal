import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-primary text-white pt-10 pb-4 md:pt-20 md:pb-10">
      <div className="app-container">
          <div className="flex flex-col gap-y-8 sm:grid grid-cols-3 lg:grid-cols-4 gap-0">
              <nav className="flex flex-col gap-2.5 text-start">
                <p className="text-white font-medium mb-0 sm:mb-4">{t.navOurExpertise}</p>
                <Link className="link link-hover text-sm" to="/our-expertise?service=business-consulting">{t.footerConsulting}</Link>
                <Link className="link link-hover text-sm" to="/our-expertise?service=delegations-and-roadshows">{t.footerRoadshows}</Link>
                <Link className="link link-hover text-sm" to="/our-expertise?service=marketing-and-promotion">{t.footerMarketing}</Link>
                <Link className="link link-hover text-sm" to="/services">{t.footerProduction}</Link>
                <Link className="link link-hover text-sm" to="/our-expertise?service=fdi">{t.footerFDI}</Link>
              </nav>
              <nav className="flex flex-col gap-2.5 items-start text-start">
                <h6 className="text-white font-medium mb-0 sm:mb-4">{t.navAboutUs}</h6>
                 <Link className="link link-hover text-sm" to="/about" state={{ scrollTo: "who-we-are" }}>{t.navWhoWeAre}</Link>
                 <Link className="link link-hover text-sm" to="/about" state={{ scrollTo: "mission" }}>{t.navOurMission}</Link>
                 <Link className="link link-hover text-sm" to="/about" state={{ scrollTo: "team" }}>{t.navOurTeam}</Link>
                 <Link className="link link-hover text-sm" to="/about" state={{ scrollTo: "clients" }}>{t.navOurClients}</Link>
              </nav>
              <nav className="flex flex-col gap-2.5 text-start">
                <h6 className="text-white font-medium mb-0 sm:mb-4">{t.footerOthers}</h6>
                <Link to="/industries" className="link link-hover text-sm">{t.navIndustries}</Link>
                <Link to="/blog" className="link link-hover text-sm">{t.navInsightsBlogs}</Link>
                <Link to="/terms-and-conditions" className="link link-hover text-sm">{language === 'en' ? 'Terms & Conditions' : 'الشروط والأحكام'}</Link>
                <Link to="/privacy-policy" className="link link-hover text-sm">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</Link>
                <Link to="/gallery" className="link link-hover text-sm">{t.navGallery}</Link>
              </nav>
              <nav className="grid gap-2.5 col-span-3 lg:col-span-1 text-start">
                <p className="text-white text-sm">{t.footerDesc}</p>
              </nav>          
          </div>
          <hr className="h-px mt-8 md:mt-20 bg-base-200 opacity-40 border-0 w-full"></hr>
          <div className="flex flex-col gap-y-5 text-center md:flex-row justify-between pt-4 md:pt-10">
            <p className="text-white text-sm">{t.footerCopyright}</p>
            <div className="flex gap-12 justify-center md:justify-start items-center">
              <a 
                href="https://www.linkedin.com/company/bng-arabia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="link link-hover text-md flex items-center" 
                aria-label="Visit our LinkedIn profile"
              >
                <i class="icon-linkedin"></i>
              </a>
              <a 
                href="https://x.com/BNGArabia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="link link-hover text-md flex items-center" 
                aria-label="Visit our X profile"
              >
                <i class="icon-x"></i>
              </a>
              <a 
                href="https://wa.me/966590754816" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="link link-hover text-md flex items-center" 
                aria-label="Chat with us on WhatsApp"
              >
                <i class="icon-whatsapp"></i>
              </a>
              <a 
                href="https://www.youtube.com/@BNGArabia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="link link-hover text-md flex items-center" 
                aria-label="Visit our YouTube channel"
              >
               <i class="icon-youtube"></i>
              </a>
            </div>
          </div>
      </div>
    </footer>
  );
}