import { Link } from "react-router-dom";
import logo from '/logo-light.svg'

export default function Footer() {
  const handleLinkClick = (e) => {
    // Finds the closest <details> parent and removes the 'open' attribute
    const detailsElement = e.target.closest('details');
    if (detailsElement) {
      detailsElement.removeAttribute('open');
    }
  };
  return (
    <footer className="bg-primary text-white pt-10 pb-4 md:pt-20 md:pb-10">
      <div className="app-container">
          <div className="flex flex-col gap-y-8 sm:grid grid-cols-3 lg:grid-cols-4 gap-0">
              <nav className="flex flex-col gap-2.5">
                <p className="text-white font-medium mb-0 sm:mb-4">Our Expertise</p>
                <Link className="link link-hover text-sm" to="/our-expertise?tab=0">Business Consulting</Link>
                <Link className="link link-hover text-sm" to="/our-expertise?tab=1">Delegations & Roadshows</Link>
                <Link className="link link-hover text-sm" to="/our-expertise?tab=2">Marketing & Promotion</Link>
                <Link className="link link-hover text-sm" to="/our-expertise?tab=4">Foreign Direct Investment (FDI)</Link>
                <Link className="link link-hover text-sm" to="/services">Event Production</Link>
              </nav>
              <nav className="flex flex-col gap-2.5 items-start">
                <h6 className="text-white font-medium mb-0 sm:mb-4">About Us</h6>
                <Link className="link link-hover text-sm" to="/about#who-we-are" onClick={handleLinkClick}>Who We Are</Link>
                <Link className="link link-hover text-sm" to="/about#mission" onClick={handleLinkClick}>Our Mission</Link>
                <Link className="link link-hover text-sm" to="/about#team" onClick={handleLinkClick}>Our Team</Link>
              </nav>
              <nav className="flex flex-col gap-2.5">
                <h6 className="text-white font-medium mb-0 sm:mb-4">Others</h6>
                <Link to="/industries" className="link link-hover text-sm">Industries</Link>
                <Link to="/blog" className="link link-hover text-sm">Insights / Blogs</Link>
                <a className="link link-hover text-sm">Terms & Conditions</a>
                <Link to="/privacy-policy" className="link link-hover text-sm">Privacy Policy</Link>
              </nav>
              <nav className="grid gap-2.5 col-span-3 lg:col-span-1">
                <p className="text-white text-sm">BNG is your strategic partner that strengthen industries, and create lasting impacts empowers enterprises to unlock international opportunities through strategic FDI advisory and trade consulting services.</p>
              </nav>          
          </div>
          <hr class="h-px mt-8 md:mt-20 bg-base-200 opacity-40 border-0 w-full"></hr>
          <div className="flex flex-col gap-y-5 text-center md:flex-row justify-between pt-4 md:pt-10">
            <p className="text-white">Copyright ©2026 BNG Arabia Company, All rights reserved</p>
            <div className="flex gap-12 justify-center md:justify-start">
              <a className="link link-hover text-sm"><i className="icon-linkedin"></i></a>
              <a className="link link-hover text-sm"><i className="icon-x"></i></a>
              <a className="link link-hover text-sm"><i className="icon-email"></i></a>
            </div>
          </div>
      </div>
    </footer>
  );
}