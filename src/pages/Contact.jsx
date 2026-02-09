import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <div className="hero relative">
        <img src="/images/hero/contact-hero.png" className="object-cover w-full" alt="About Us" />
        <h2 className="text-white z-1">Contact</h2>      
        <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
      </div>
      <div className="app-container pt-10 lg:pt-32">
          <div className="grid md:grid-cols-2 gap-y-10">
              <div>
                <h2 className="mb-5 leading-tight">Ready to Explore <br />New Opportunities?</h2>
                <p>Let’s start a conversation about your global ambitions.</p>
                <div className="grid gap-9 mt-12">
                  <div className="flex gap-12">
                    <i className="icon-phone text-5xl"></i>
                    <div>
                      <p className="text-neutral font-medium mb-1.5">Our Office:</p>
                      <p>BNG Arabia Company, Shara Al Asar, Ishbilyah Dist. <br />Riyadh 13226, Saudi Arabia</p>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <i className="icon-map-marker text-5xl"></i>
                    <div>
                      <p className="text-neutral font-medium mb-1.5">Phone:</p>
                      <p>Sunday – Thursday: 9:00 AM – 6:00 PM </p>
                      <p>+966 XX XXX XXXX, +966 XX XXX XXXX</p>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <i className="icon-email text-5xl"></i>
                    <div>
                      <p className="text-neutral font-medium mb-1.5">Email:</p>
                      <p>General Inquiry: <a href="mailto:info@bngglobal.net">info@bngglobal.net</a></p>
                      <p>Sales Inquiry: <a href="mailto:sejal.hule@bngglobal.net">sejal.hule@bngglobal.net</a></p>
                    </div>
                  </div>
                </div>
              </div> 
              <div className="w-full">
                <div className="card bg-primary w-full md:max-w-123 rounded-4xl lg:ms-auto">
                  <div className="card-body px-9.5 pt-15 pb-9.5">
                    <fieldset className="fieldset p-0">
                      <label className="label text-[18px] text-white ps-3">Name</label>
                      <input type="text" className="input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12 mb-3" placeholder="" />
                      <label className="label text-[18px] text-white ps-3">Email</label>
                      <input type="text" className="input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12 mb-3" placeholder="" />
                      <label className="label text-[18px] text-white ps-3">Company name</label>
                      <input type="text" className="input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12 mb-3" placeholder="" />
                      <label className="label text-[18px] text-white ps-3">Message</label>                      
                      <textarea rows={6} className="textarea bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-37.5" placeholder="Tell us about your project or inquiry"></textarea>
                      <button className="btn btn-lg btn-light mt-4 w-33 ms-auto">Submit</button>
                    </fieldset>
                  </div>
                </div>
              </div>             
          </div>
      </div>
      <iframe className="-mt-12" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d115904.06026576413!2d46.71875263029706!3d24.79538903827833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBNG%20Arabia%20Company%2C%20Shara%20Al%20Asar%2C%20Ishbilyah%20Dist.%20Riyadh%2013226%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sin!4v1765455398467!5m2!1sen!2sin" width="100%" height="507" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <Footer />
    </>
  );
}