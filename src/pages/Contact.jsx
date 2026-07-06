import React, { useState } from "react";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import contactHero from "../assets/images/hero/contact-hero.webp";

export default function Contact() {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const t = translations[language];

  const contactDetails = [
    {
      id: "office",
      icon: "icon-map-marker",
      title: t.contactOfficeTitle,
      content: t.contactOfficeContent,
    },
    {
      id: "phone",
      icon: "icon-phone",
      title: t.contactPhoneTitle,
      content: (
        <>
          {t.contactPhoneContent} <br />
          <a
            href="tel:966509877960"
            dir="ltr"
            className="hover:underline text-primary dark:text-warning font-medium"
          >
            +966 50 987 7960
          </a>
        </>
      ),
    },
  ];

  const formFields = [
    { id: "name", label: t.contactFormFieldName, type: "text" },
    { id: "email", label: t.contactFormFieldEmail, type: "email" },
    { id: "company", label: t.contactFormFieldCompany, type: "text" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // The validation shield

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Drop the shield and clear messages the moment they start a new message
    if (isSuccess) setIsSuccess(false);
    if (status) setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setIsSuccess(false); // Reset shield on new attempt

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true); // Raise the validation shield!
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <>
      <div className="hero relative">
        <img
          src={contactHero}
          className="object-cover w-full h-full"
          alt={t.contactHeroTitle}
        />
        <h2 className="text-white z-10 relative">{t.contactHeroTitle}</h2>
        <div className="bg-black opacity-20 absolute inset-0 pointer-events-none"></div>
      </div>
      <div
        className="app-container pt-10 lg:py-20"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="grid md:grid-cols-2 gap-y-10">
          <div>
            <h2
              className="mb-5 leading-tight text-start"
              dangerouslySetInnerHTML={{ __html: t.contactHeading }}
            ></h2>
            <p className="text-start">{t.contactSubheading}</p>

            <div className="grid gap-9 mt-12 text-start">
              {contactDetails.map((detail) => (
                <div key={detail.id} className="flex gap-10 items-start">
                  <i className={`${detail.icon} text-5xl shrink-0`}></i>
                  <div>
                    <p className="text-neutral font-medium mb-1.5 text-start">
                      {detail.title}
                    </p>
                    <p className="text-start">{detail.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Email Enquiries Section */}
            <div className="mt-9 text-start flex gap-10 items-start">
              <div className="flex gap-10 items-center mb-4">
                <i className="icon-email text-5xl shrink-0"></i>
              </div>
              <div>
                <p className="text-neutral font-medium mb-1.5 text-start">
                  {t.contactEmailTitle.replace(":", "")}
                </p>
                <div className="grid lg:grid-cols-2 gap-6 bg-info rounded-2xl p-5">
                  <div>
                    <span className="font-semibold  text-primary/75 dark:text-warning/80  block mb-2 border-b border-slate-200/50 dark:border-white/5 pb-2">
                      {t.contactEmailFabrication.replace(":", "")}
                    </span>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral dark:text-white">
                          {t.contactNameOvais}
                        </span>
                        <a
                          href="mailto:mohammad.ovais@bngglobal.net"
                          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-warning transition-colors break-all mt-1"
                        >
                          <span className="underline decoration-dotted hover:decoration-solid">
                            mohammad.ovais@bngglobal.net
                          </span>
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral dark:text-white">
                          {t.contactNameHemdan}
                        </span>
                        <a
                          href="mailto:khaled.hemdan@bngglobal.net"
                          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-warning transition-colors break-all mt-1"
                        >
                          <span className="underline decoration-dotted hover:decoration-solid">
                            khaled.hemdan@bngglobal.net
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-primary/75 dark:text-warning/80  block mb-2 border-b border-slate-200/50 dark:border-white/5 pb-2">
                      {t.contactEmailConsulting.replace(":", "")}
                    </span>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral dark:text-white ">
                          {t.contactNameSejal}
                        </span>
                        <a
                          href="mailto:sejal.hule@bngglobal.net"
                          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-warning transition-colors break-all mt-1"
                        >
                          <span className="underline decoration-dotted hover:decoration-solid">
                            sejal.hule@bngglobal.net
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="card bg-primary w-full md:max-w-123 rounded-4xl lg:ms-auto">
              <div className="card-body px-9.5 pt-15 pb-9.5">
                <form onSubmit={handleSubmit} className="flex flex-col">
                  {formFields.map((field) => (
                    <div key={field.id} className="mb-4">
                      <label
                        htmlFor={field.id}
                        className="label text-[18px] text-white ps-3 block mb-1 text-start"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className={`input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12 text-start ${isSuccess ? "" : "validator"}`}
                        required={!isSuccess}
                      />
                      <span className="validator-hint hidden text-start">
                        {t.contactFormRequired}
                      </span>
                    </div>
                  ))}

                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="label text-[18px] text-white ps-3 block mb-1 text-start"
                    >
                      {t.contactFormFieldMessage}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`textarea bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-37.5 resize-none text-start ${isSuccess ? "" : "validator"}`}
                      placeholder={t.contactFormPlaceholder}
                      required={!isSuccess}
                    ></textarea>
                  </div>

                  {status && (
                    <div className="mt-2 text-start">
                      {status === "success" ? (
                        <div className="alert alert-success alert-outline justify-between flex">
                          <span>{t.contactFormSuccess}</span>
                          <a
                            href="javascript:void(0)"
                            onClick={(e) => {
                              e.preventDefault();
                              setStatus("");
                            }}
                          >
                            <i className="icon-close-flat"></i>
                          </a>
                        </div>
                      ) : status === "sending" ? (
                        <div className="alert alert-info alert-outline">
                          <span>{t.contactFormSending}</span>
                        </div>
                      ) : (
                        <div className="alert alert-error alert-outline">
                          <span>
                            {status === "failed"
                              ? t.contactFormFailed
                              : t.contactFormError}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-lg btn-light dark:btn-warning py-2 text-[18px] mt-4 w-33 ms-auto"
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? t.contactFormSending
                      : t.contactFormSubmit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d115904.06026576413!2d46.71875263029706!3d24.79538903827833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBNG%20Arabia%20Company%2C%20Shara%20Al%20Asar%2C%20Ishbilyah%20Dist.%20Riyadh%2013226%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sin!4v1765455398467!5m2!1sen!2sin"
        width="100%"
        height="507"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <Footer />
    </>
  );
}
