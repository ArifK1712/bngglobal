import { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";

const CheckIcon = () => (
  <i className="icon-checkmark bg-warning rounded-full p-1.5 text-[12px] mr-1"></i>
);

const policyData = [
  {
    id: "section-1",
    label: "1. Introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>BNG Company (we, us, or our) is committed to protecting the privacy and security of personal data collected from clients, partners, event participants, and website visitors.</p>
        <p>This Privacy Policy outlines how we collect, use, disclose, and safeguard personal data in compliance with:</p>
        <ul className="space-y-2">
          <li><CheckIcon /> Saudi Arabia’s Personal Data Protection Law (PDPL)</li>
          <li><CheckIcon /> EU General Data Protection Regulation (GDPR)</li>
          <li><CheckIcon /> Other applicable regional and international data protection laws</li>
        </ul>
        <h5 className="text-neutral">This policy applies to:</h5>
        <ul className="space-y-2">
          <li><CheckIcon /> Clients & Partners (businesses, sponsors, exhibitors, associations)</li>
          <li><CheckIcon /> Event Participants (attendees, speakers, delegates, travelers)</li>
          <li><CheckIcon /> Website & App Users</li>
          <li><CheckIcon /> Service Providers & Third Parties</li>
        </ul>
        <p className="mt-4">By using our services, you consent to the practices described below.</p>
      </>
    )
  },
  {
    id: "section-2",
    label: "2. Scope of Services",
    title: "2. Scope of Services",
    content: (
      <>
        <h5 className="text-neutral">BNG Company provides:</h5>
        <ul className="space-y-2">
          <li><CheckIcon /> Event Management & Production</li>
          <li><CheckIcon /> Business Delegation & FDI Consulting</li>
          <li><CheckIcon /> Destination & Travel Management</li>
          <li><CheckIcon /> Product Launches & Marketing Services</li>
          <li><CheckIcon /> End-to-End Event Consultations</li>
        </ul>
        <p className="mt-4"> We operate in Saudi Arabia, GCC, and globally, requiring adherence to PDPL, GDPR, and cross-border data transfer laws. </p>
      </>
    )
  },
  {
    id: "section-3",
    label: "3. Types of Personal Data Collected",
    title: "3. Types of Personal Data Collected",
    content: (
      <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex-1 bg-base-100 p-3 rounded-md">
            <h5>Client & Partner Data</h5>
            <ul className="list-disc ps-3">
              <li>Contact Details: Name, email, phone, company, job title</li>
              <li>Financial Data: Payment details, invoices, tax/VAT information</li>
              <li>Business Records: Contracts, agreements, correspondence</li>
            </ul>
        </div>

        <div className="flex-1 bg-base-100 p-3 rounded-md">
            <h5>Event Participant Data</h5>
            <ul className="list-disc ps-3">
              <li>Registration Data: Name, nationality, passport/visa details, dietary/accessibility needs</li>
              <li>Professional Data: Job title, employer, industry expertise</li>
              <li>Travel & Accommodation: Flight/hotel bookings, special requests</li>
              <li>Event Engagement: Session attendance, networking preferences</li>
            </ul>
        </div>

        <div className="flex-1 bg-base-100 p-3 rounded-md">
            <h5>Website & Technical Data</h5>
            <ul className="list-disc ps-3">
              <li>Device & Usage: IP address, browser type, cookies, session recordings</li>
              <li>Marketing Preferences: Opt-ins for newsletters, promotions</li>
            </ul>
        </div>

        <div className="flex-1 bg-base-100 p-3 rounded-md">
            <h5>Sensitive Data (Processed Only with Consent)</h5>
            <ul className="list-disc ps-3">
              <li>Health Data: Disabilities, allergies (for event accommodations)</li>
              <li>Biometric Data: Facial recognition (for secure access)</li>
              <li>Religious/Dietary Preferences (if required)</li>
            </ul>
        </div>

      </div>
      </>
    )
  },
  {
    id: "section-4",
    label: "4. Legal Basis for Processing",
    title: "4. Legal Basis for Processing",
    content: (
      <>
        <h5 className="text-neutral">We process data under:</h5>
        <ul className="space-y-2">
          <li><CheckIcon /> <strong>Contractual Necessity</strong> (fulfilling service agreements)</li>
          <li><CheckIcon /> <strong>Legal Compliance</strong> (visa processing, tax laws)</li>
          <li><CheckIcon /> <strong>Explicit Consent</strong> (for sensitive data or promotions)</li>
        </ul>
      </>
    )
  },
  {
    id: "section-5",
    label: "5. How We Use Personal Data",
    title: "5. How We Use Personal Data",
    content: (
      <>
        <ul className="space-y-2">
          <li><CheckIcon /> <strong>Service Delivery:</strong> Event coordination, travel logistics, consulting</li>
          <li><CheckIcon /> <strong>Client Communication:</strong> Updates, confirmations, support</li>
          <li><CheckIcon /> <strong>Marketing & Analytics:</strong> Personalized promotions (opt-out available)</li>
          <li><CheckIcon /> <strong>Security & Compliance:</strong> Fraud prevention, legal obligations</li>
          <li><CheckIcon /> <strong>Event Recordings:</strong> Photos/videos may be used for marketing (with consent)</li>
        </ul>
      </>
    )
  },
  {
    id: "section-6",
    label: "6. Data Sharing & Third Parties",
    title: "6. Data Sharing & Third Parties",
    content: (
      <>
        <h5 className="text-neutral">We may share data with:</h5>
        <ul className="space-y-2">
          <li><CheckIcon /> <strong>Service Providers:</strong> Hotels, airlines, payment processors</li>
          <li><CheckIcon /> <strong>Government Authorities:</strong> Visa/immigration, tax agencies</li>
          <li><CheckIcon /> <strong>Event Partners:</strong> Co-organizers, sponsors (with consent)</li>
          <li><CheckIcon /> <strong>Legal Bodies:</strong> If required by law (e.g., court orders)</li>
        </ul>
        <p className="mt-4">International Transfers: Data may be transferred globally under PDPL/GDPR safeguards (e.g., Standard Contractual Clauses).</p>
      </>
    )
  },
  {
    id: "section-7",
    label: "7. Data Retention",
    title: "7. Data Retention",
    content: (
      <>
        <h5 className="text-neutral">We retain data:</h5>
        <ul className="space-y-2">
          <li><CheckIcon /> As long as necessary for service delivery</li>
          <li><CheckIcon /> As required by law (e.g., financial records for 5+ years)</li>
          <li><CheckIcon /> Until consent is withdrawn (for marketing)</li>
        </ul>
      </>
    )
  },
  {
    id: "section-8",
    label: "8. Cookies & Tracking Technologies",
    title: "8. Cookies & Tracking Technologies",
    content: (
      <>
        <h5 className="text-neutral">We use: </h5>
        <ul className="space-y-2">
          <li><CheckIcon /> <strong>Essential Cookies</strong> (for website functionality)</li>
          <li><CheckIcon /> <strong>Analytics Cookies</strong> (Google Analytics)</li>
          <li><CheckIcon /> <strong>Marketing Cookies</strong> (retargeting ads)</li>
        </ul>
        <p className="mt-4">Users can manage preferences via browser settings or our Cookie Consent Banner. </p>
      </>
    )
  },
  {
    id: "section-9",
    label: "9. Data Subject Rights",
    title: "9. Data Subject Rights",
    content: (
      <>
        <h5 className="text-neutral">Under PDPL & GDPR, you may:</h5>
        <ul className="space-y-2">
          <li><CheckIcon /> Access, Correct, or Delete your data</li>
          <li><CheckIcon /> Restrict or Object to processing</li>
          <li><CheckIcon /> Withdraw Consent (for marketing)</li>
          <li><CheckIcon /> Data Portability (EU residents)</li>
        </ul>
        <p className="mt-4"><strong>Submit requests to:</strong> <a href="mailto:connect@bngglobal.net" className="text-neutral-950">connect@bngglobal.net</a> | Response within 60 days.</p>
      </>
    )
  },
  {
    id: "section-10",
    label: "10. Security Measures",
    title: "10. Security Measures",
    content: (
      <>
        <h5 className="text-neutral">We implement:</h5>
        <ul className="space-y-2">
          <li><CheckIcon /> Encryption (TLS/SSL) for data transfers</li>
          <li><CheckIcon /> Access Controls (role-based permissions)</li>
          <li><CheckIcon /> Regular Security Audits</li>
          <li><CheckIcon /> Employee Training on data protection</li>
        </ul>
      </>
    )
  },
  {
    id: "section-11",
    label: "11. Children’s Privacy",
    title: "11. Children’s Privacy",
    content: (
      <>
        <h5 className="text-neutral">We do not knowingly collect data from children under 13.</h5>
      </>
    )
  },
  {
    id: "section-12",
    label: "12. Updates & Contact",
    title: "12. Updates & Contact",
    bgClass: "bg-primary text-white",
    content: (
      <>
        <ul className="space-y-2">
          <li><CheckIcon /> Policy Changes: Posted on our website with updated Effective Date.</li>
          <li><CheckIcon /> Questions? Contact us for Data Protection Queries:</li>
        </ul>
        <div className="grid grid-cols-3 pt-4">
          <div>
            <p className="uppercase text-sm text-info opacity-50 font-medium">Email</p>
            <a href="mailto:connect@bngglobal.net" className="underline">connect@bngglobal.net</a>
          </div>
          <div>
            <p className="uppercase text-sm text-info opacity-50 font-medium">Phone</p>
            <a href="mailto:connect@bngglobal.net" className="underline">connect@bngglobal.net</a>
          </div>
          <div>
            <p className="uppercase text-sm text-info opacity-50 font-medium">Location</p>
            <a href="mailto:connect@bngglobal.net" className="underline">+966 509877960</a>
          </div>
        </div>
      </>
    )
  }
];

export default function Privacy() {
  const [activeId, setActiveId] = useState(policyData[0].id);
  const observer = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-114px 0px -70% 0px",
      threshold: 0,
    };

    observer.current = new IntersectionObserver((entries) => {
      const intersectingEntry = entries.find(entry => entry.isIntersecting);
      if (intersectingEntry) {
        setActiveId(intersectingEntry.target.id);
      }
    }, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.current.observe(section));

    return () => observer.current.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="hero relative">
        <img src="/images/hero/privacy-policy.jpg" className="object-cover w-full" alt="Privacy Policy" />
        <h2 className="text-white z-1">Privacy Policy</h2>      
        <div className="bg-black opacity-20 absolute right-0 left-0 bottom-0 top-0"></div>
      </div>
      
      <div className="app-container py-12">
        <div className="flex flex-wrap justify-between items-center mb-16">
          <h2>Privacy Policy</h2>
          <div class="badge badge-primary rounded-full bg-info border-info text-neutral-900 p-2.5 font-bold">Effective Date: 1st January 2026 | Last Updated: 1st January 2026</div>
        </div>
        <div className="flex flex-row gap-10">
          <aside className="sticky top-30 h-fit hidden md:block">
            <ul id="scrollspy-nav" className="flex flex-col items-start w-50 lg:w-93 sticky">
              {policyData.map((item) => (
                <li key={item.id} className="w-full">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    aria-current={activeId === item.id ? "true" : "false"}
                    className={`text-left py-3.5 px-3 w-full cursor-pointer border-s-3 border-info transition-all 
                      ${activeId === item.id ? "border-neutral bg-info/10 font-bold" : ""}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <main className="flex-1">
            {policyData.map((section) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-28 mb-5"
              >
                <div className={`${section.bgClass || 'bg-info'} p-5 rounded-2xl space-y-4`}>
                  <h4 className="font-medium mb-2">{section.title}</h4>
                  {section.content}
                </div>
              </section>
            ))}
          </main>
        </div>

      </div>
      <Footer />
    </>
  );
}