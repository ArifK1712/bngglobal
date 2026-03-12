import { useState } from "react";
import Footer from "../components/Footer";

const contactDetails = [
  {
    id: "office",
    icon: "icon-map-marker",
    title: "Our Office:",
    content: (
      <>
        BNG Arabia Company, Shara Al Asar, Ishbilyah Dist. <br />
        Riyadh 13226, Saudi Arabia
      </>
    ),
  },
  {
    id: "phone",
    icon: "icon-phone",
    title: "Phone:",
    content: (
      <>
        Sunday – Thursday: 9:00 AM – 6:00 PM <br />
        +966 XX XXX XXXX, +966 XX XXX XXXX
      </>
    ),
  },
  {
    id: "email",
    icon: "icon-email",
    title: "Email:",
    content: (
      <>
        General: <a href="mailto:info@bngglobal.net" className="hover:underline">info@bngglobal.net</a> <br />
        Sales: <a href="mailto:sejal.hule@bngglobal.net" className="hover:underline">sejal.hule@bngglobal.net</a>
      </>
    ),
  },
];

const formFields = [
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "company", label: "Company name", type: "text" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form ready to send:", formData);
  };

  return (
    <>
      <div className="hero relative">
        <img src="/images/hero/contact-hero.png" className="object-cover w-full h-full" alt="Contact BNG Global" />
        <h2 className="text-white z-10 relative">Contact</h2>
        <div className="bg-black opacity-20 absolute inset-0 pointer-events-none"></div>
      </div>

      <div className="app-container pt-10 lg:pt-32">
        <div className="grid md:grid-cols-2 gap-y-10">
          <div>
            <h2 className="mb-5 leading-tight">Ready to Explore <br />New Opportunities?</h2>
            <p>Let’s start a conversation about your global ambitions.</p>
            
            <div className="grid gap-9 mt-12">
              {contactDetails.map((detail) => (
                <div key={detail.id} className="flex gap-10 items-start">
                  <i className={`${detail.icon} text-5xl shrink-0`}></i>
                  <div>
                    <p className="text-neutral font-medium mb-1.5">{detail.title}</p>
                    <p className="text-gray-600">{detail.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> 
          <div className="w-full">
            <div className="card bg-primary w-full md:max-w-123 rounded-4xl lg:ms-auto">
              <div className="card-body px-9.5 pt-15 pb-9.5">
                <form onSubmit={handleSubmit} className="flex flex-col">
                  {formFields.map((field) => (
                    <div key={field.id} className="mb-4">
                      <label htmlFor={field.id} className="label text-[18px] text-white ps-3 block mb-1">
                        {field.label}
                      </label>
                      <input 
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className="input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12" 
                        required
                      />
                    </div>
                  ))}

                  <div className="mb-4">
                    <label htmlFor="message" className="label text-[18px] text-white ps-3 block mb-1">
                      Message
                    </label>                      
                    <textarea 
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="textarea bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-37.5 resize-none" 
                      placeholder="Tell us about your project or inquiry"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-lg btn-light py-2 text-[18px] mt-4 w-33 ms-auto">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>             
        </div>
      </div>
      <iframe
        className="-mt-12"
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d115904.06026576413!2d46.71875263029706!3d24.79538903827833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBNG%20Arabia%20Company%2C%20Shara%20Al%20Asar%2C%20Ishbilyah%20Dist.%20Riyadh%2013226%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sin!4v1765455398467!5m2!1sen!2sin"
        width="100%"
        height="507"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <Footer />
    </>
  );
}