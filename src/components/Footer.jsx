import { Link } from "react-router-dom";
import logo from '/logo-light.svg'

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="app-container">
          <div className="grid grid-cols-6 gap-0">
              <nav className="inline-flex gap-2.5 items-start">
                <Link to="/"><img src={logo} alt="Logo" /></Link>
              </nav>
              <nav className="flex flex-col gap-2.5">
                <p className="text-white font-medium mb-4">Our Expertise</p>
                <a className="link link-hover text-sm">Strategy Development</a>
                <a className="link link-hover text-sm">Go To Market</a>
                <a className="link link-hover text-sm">B2B Consulting</a>
                <a className="link link-hover text-sm">Event & Delegations</a>
                <a className="link link-hover text-sm">FDI</a>
              </nav>
              <nav className="flex flex-col gap-2.5 items-start">
                <h6 className="text-white font-medium mb-4">About Us</h6>
                <a className="link link-hover text-sm">Who we are</a>
                <a className="link link-hover text-sm">Our Mission</a>
                <a className="link link-hover text-sm">Our Team</a>
              </nav>
              <nav className="flex flex-col gap-2.5">
                <h6 className="text-white font-medium mb-4">Others</h6>
                <a className="link link-hover text-sm">Industries</a>
                <a className="link link-hover text-sm">Insights / Blogs</a>
                <a className="link link-hover text-sm">Terms & Conditions</a>
                <a className="link link-hover text-sm">Privacy Policy</a>
              </nav>
              <nav className="grid gap-2.5 col-span-2">
                <p className="text-white text-sm">BNG is your strategic partner that strengthen industries, and create lasting impacts empowers enterprises to unlock international opportunities through strategic FDI advisory and trade consulting services.</p>
              </nav>          
          </div>
          <hr class="h-px mt-20 bg-base-200 opacity-40 border-0 w-full"></hr>
          <div className="flex justify-between pt-10">
            <p className="text-white">Copyright ©2026 BNG Arabia Company, All rights reserved</p>
            <div className="flex gap-12">
              <a className="link link-hover text-sm"><i className="icon-linkedin"></i></a>
              <a className="link link-hover text-sm"><i className="icon-x"></i></a>
              <a className="link link-hover text-sm"><i className="icon-email"></i></a>
            </div>
          </div>
      </div>
    </footer>
  );
}