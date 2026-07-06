import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesHero from "../assets/images/hero/services-hero.webp";
import fabricationImg from "../assets/images/fabrication-image.webp";
import premiumBoothImg from "../assets/images/premium-booth-design.webp";
import {
  Search,
  ClipboardList,
  PenTool,
  Hammer,
  BadgeCheck,
  Truck,
  Headphones,
  Upload,
  Paperclip,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const media = [
  { type: "image", src: new URL("../assets/images/gallery/1.webp", import.meta.url).href, title: { en: "Premium Event Setup", ar: "تجهيزات الفعاليات المتميزة" } },
  {
    type: "video",
    src: new URL("../assets/images/gallery/philips.mp4", import.meta.url).href,
    title: { en: "Brand Experience", ar: "تجربة العلامة التجارية" },
  },
  {
    type: "image",
    src: new URL("../assets/images/gallery/2.webp", import.meta.url).href,
    title: { en: "Exhibition Production", ar: "إنتاج المعارض" },
  },
  {
    type: "video",
    src: new URL("../assets/images/gallery/jana-marine.mp4", import.meta.url).href,
    title: { en: "Live Activation", ar: "تفعيل مباشر" },
  },
  { type: "image", src: new URL("../assets/images/gallery/3.webp", import.meta.url).href, title: { en: "Custom Booth", ar: "منصة مخصصة" } },
  { type: "image", src: new URL("../assets/images/gallery/4.webp", import.meta.url).href, title: { en: "Conference Setup", ar: "تجهيزات المؤتمرات" } },
  { type: "image", src: new URL("../assets/images/gallery/5.webp", import.meta.url).href, title: { en: "Corporate Event", ar: "فعالية مؤسسية" } },
  { type: "image", src: new URL("../assets/images/gallery/6.webp", import.meta.url).href, title: { en: "Production Detail", ar: "تفاصيل الإنتاج" } },
  {
    type: "image",
    src: new URL("../assets/images/gallery/7.webp", import.meta.url).href,
    title: { en: "Immersive Experience", ar: "تجربة غامرة" },
  },
];

const statsData = [
  {
    number: "100,000+",
    unit: { en: "SQM", ar: "م٢" },
    label: { en: "Fabrication Delivered", ar: "مساحة التصنيع المسلمة" },
    desc: {
      en: "Custom-built exhibition and event structures produced with quality, precision, and attention to detail.",
      ar: "هياكل معارض وفعاليات مبنية خصيصاً بجودة ودقة واهتمام بالتفاصيل."
    },
  },
  {
    number: "70+",
    label: { en: "Project Delivered per Year", ar: "مشروعاً يتم تسليمه سنوياً" },
    desc: {
      en: "Annual projects completed across exhibitions, corporate events, brand activations, and custom builds.",
      ar: "مشاريع سنوية مكتملة تشمل المعارض، والفعاليات المؤسسية، وتنشيط العلامات التجارية، والمنصات المخصصة."
    },
  },
  {
    number: "30+",
    label: { en: "In-house Experts", ar: "خبيراً متخصصاً" },
    desc: {
      en: "A skilled team of designers, fabricators, project managers, and on-site execution specialists.",
      ar: "فريق ماهر من المصممين، والمصنعين، ومديري المشاريع، وأخصائيي التنفيذ في الموقع."
    },
  },
];

const processSteps = [
  {
    step: "01",
    icon: Search,
    title: { en: "Discovery & Understanding", ar: "الاستكشاف والفهم" },
    desc: {
      en: "We clarify your vision, goals, and requirements to align our approach from the start.",
      ar: "نوضح رؤيتك، وأهدافك، ومتطلباتك لتوجيه نهجنا وتوافقه منذ البداية."
    },
  },
  {
    step: "02",
    icon: ClipboardList,
    title: { en: "Planning & Strategy", ar: "التخطيط والاستراتيجية" },
    desc: {
      en: "We develop a clear project plan with defined scope, timelines, resources, and milestones.",
      ar: "نضع خطة مشروع واضحة ذات نطاق، وجداول زمنية، وموارد، ومحطات رئيسية محددة."
    },
  },
  {
    step: "03",
    icon: PenTool,
    title: { en: "Design & Development", ar: "التصميم والتطوير" },
    desc: {
      en: "Concepts and solutions are crafted, refined, and aligned with quality standards and your feedback.",
      ar: "يتم صياغة المفاهيم والحلول وتكريرها ومواءمتها مع معايير الجودة وملاحظاتك."
    },
  },
  {
    step: "04",
    icon: Hammer,
    title: { en: "Fabrication & Execution", ar: "التصنيع والتنفيذ" },
    desc: {
      en: "Using advanced tools and skilled craftsmanship, we bring the design to life with precision and consistency.",
      ar: "باستخدام الأدوات المتقدمة والحرفية الماهرة، نجسد التصميم على أرض الواقع بدقة واتساق."
    },
  },
  {
    step: "05",
    icon: BadgeCheck,
    title: { en: "Quality Assurance", ar: "ضمان الجودة" },
    desc: {
      en: "Every element is rigorously checked to meet industry standards and your expectations.",
      ar: "يتم فحص كل عنصر بدقة لتلبية معايير الصناعة وتوقعاتك."
    },
  },
  {
    step: "06",
    icon: Truck,
    title: { en: "Delivery & Installation", ar: "التسليم والتركيب" },
    desc: {
      en: "We deliver and install on schedule, ensuring a seamless and polished handover.",
      ar: "نقوم بالتسليم والتركيب في الموعد المحدد، مما يضمن تسليماً سلساً ومتميزاً."
    },
  },
  {
    step: "07",
    icon: Headphones,
    title: { en: "Ongoing Support", ar: "الدعم المستمر" },
    desc: {
      en: "We remain available for guidance, adjustments, and long-term support.",
      ar: "نظل متاحين للتوجيه، والتعديلات، والدعم على المدى الطويل."
    },
  },
];

const services = [
  {
    title: { en: "Concept Development & 3D Design", ar: "تطوير المفاهيم والتصميم ثلاثي الأبعاد" },
    desc: {
      en: "<p class='text-white'>We specialize in creating innovative exhibition stand concepts that align seamlessly with your brand guidelines and overall event theme. Our approach combines strategic storytelling with immersive 3D design, ensuring every element—from layout to visual aesthetics—reflects your brand identity. By integrating functionality with creativity, we deliver designs that captivate audiences and enhance engagement.</p>",
      ar: "<p class='text-white text-start'>نحن متخصصون في ابتكار مفاهيم منصات معارض مبتكرة تتماشى بسلاسة مع إرشادات هويتك التجارية والموضوع العام للفعالية. يجمع نهجنا بين سرد القصص الاستراتيجي والتصميم ثلاثي الأبعاد الغامر، مما يضمن أن كل عنصر — من التخطيط إلى المظهر البصري — يعبر عن هوية علامتك التجارية. ومن خلال دمج الوظائف العملية مع الإبداع، نقدم تصاميم تأسر الجماهير وتعزز التفاعل.</p>"
    },
    img: new URL("../assets/images/services/concept-development.webp", import.meta.url).href,
  },
  {
    title: { en: "Event Solutions", ar: "حلول الفعاليات" },
    desc: {
      en: "<p>From Concept to Completion – We’ve Got You Covered</p><p>At BNG Arabia, we deliver a true turnkey solution for all your event needs. From creative design to flawless execution, our team ensures every detail is handled with precision. Whether it’s an indoor conference or an outdoor activation, locally or internationally, we bring your vision to life with expertise and innovation.</p>",
      ar: "<p class='text-start'>من الفكرة إلى الاكتمال — نحن نتولى كل شيء</p><p class='text-start'>في بي إن جي العربية، نقدم حلاً متكاملاً لجميع احتياجات فعالياتك. من التصميم الإبداعي إلى التنفيذ الخالي من العيوب، يضمن فريقنا التعامل مع كل التفاصيل بدقة. سواء كانت مؤتمراً داخلياً أو تفعيلاً خارجياً، محلياً أو دولياً، نجسد رؤيتك على أرض الواقع بخبرة وابتكار.</p>"
    },
    img: new URL("../assets/images/services/event-solutions.webp", import.meta.url).href,
  },
  {
    title: { en: "Logistics & Installation", ar: "الخدمات اللوجستية والتركيب" },
    desc: {
      en: "<p>At BNG Arabia, we manage every aspect of logistics and installation to ensure a seamless experience. From transportation and on-site coordination to precise assembly, our team guarantees timely delivery and flawless execution. With our regional expertise and in-house production capabilities, we handle complex requirements efficiently, so your event runs smoothly from start to finish.</p>",
      ar: "<p class='text-start'>في بي إن جي العربية، ندير جميع جوانب الخدمات اللوجستية والتركيب لضمان تجربة سلسة. من النقل والتنسيق في الموقع إلى التجميع الدقيق، يضمن فريقنا التسليم في الوقت المحدد والتنفيذ المتقن. بفضل خبرتنا الإقليمية وقدراتنا الإنتاجية الداخلية، نتعامل مع المتطلبات المعقدة بكفاءة، لتسير فعاليتك بسلاسة من البداية إلى النهاية.</p>"
    },
    img: new URL("../assets/images/services/logistics-installation.webp", import.meta.url).href,
  },
  {
    title: { en: "On-Site Support & Dismantling", ar: "الدعم في الموقع والتفكيك" },
    desc: {
      en: "<p>At BNG Arabia, we provide comprehensive on-site support to ensure your event runs smoothly from start to finish. Our dedicated team handles every detail during setup, monitors the stand throughout the event, and manages the dismantling process efficiently. With precision and care, we guarantee a hassle-free experience, leaving your venue in perfect condition.</p>",
      ar: "<p class='text-start'>في بي إن جي العربية، نقدم دعماً شاملاً في الموقع لضمان سير فعاليتك بسلاسة من البداية إلى النهاية. يتعامل فريقنا المتخصص مع كل التفاصيل أثناء الإعداد، ويراقب المنصة طوال الفعالية، ويدير عملية التفكيك بكفاءة. بدقة وعناية، نضمن لك تجربة خالية من المتاعب، ونترك موقعك في حالة ممتازة.</p>"
    },
    img: new URL("../assets/images/services/onsite-support-dismantling.webp", import.meta.url).href,
  },
  {
    title: { en: "Custom Made stands", ar: "المنصات المصممة خصيصاً" },
    desc: {
      en: `
        <h4 class="text-xl md:text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#003a86] mb-4 block">Your Trusted Partner for Custom Exhibition Stands</h4>
        <ul>
          <li>At BNG Arabia, we combine creativity, precision, and craftsmanship to create exhibition stands that make your brand stand out.</li>
          <li>Premium & Sustainable Materials</li>
          <li>High-quality, eco-friendly materials that deliver durability without compromising design.</li>
          <li>Innovative Concepts</li>
          <li>Attention-grabbing stand concepts that reflect your brand story and guidelines.</li>
          <li>Regional Expertise</li>
          <li>Strong local knowledge, supplier relationships, and venue experience across the Middle East.</li>
          <li>Integrated Production  </li>
          <li>In-house design, graphics, furniture, and fabrication for better value and consistent quality.</li>
        </ul>`,
      ar: `
        <h4 class="text-xl md:text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#003a86] mb-4 block text-start">شريكك الموثوق لمنصات المعارض المخصصة</h4>
        <ul class="text-start">
          <li>في بي إن جي العربية، نجمع بين الإبداع والدقة والحرفية لإنشاء منصات معارض تجعل علامتك التجارية متميزة.</li>
          <li>مواد ممتازة ومستدامة</li>
          <li>مواد عالية الجودة وصديقة للبيئة توفر المتانة دون المساومة على التصميم.</li>
          <li>مفاهيم مبتكرة</li>
          <li>مفاهيم منصات لافتة للانتباه تعكس قصة علامتك التجارية وإرشاداتها.</li>
          <li>الخبرة الإقليمية</li>
          <li>معرفة محلية قوية، وعلاقات متينة مع الموردين، وخبرة بالمواقع في جميع أنحاء الشرق الأوسط.</li>
          <li>الإنتاج المتكامل</li>
          <li>تصميم ورسومات وأثاث وتصنيع داخلي للحصول على قيمة أفضل وجودة متسقة.</li>
        </ul>`
    },
    img: new URL("../assets/images/services/custom-made-stands.webp", import.meta.url).href,
  },
];

const serviceOptions = [
  { en: "Event Management", ar: "إدارة الفعاليات" },
  { en: "Exhibition Stand Builder", ar: "بناء منصات المعارض" },
  { en: "Indoor & Outdoor Branding", ar: "الهوية البصرية الداخلية والخارجية" },
  { en: "Booth Fabrication", ar: "تصنيع الأجنحة والمنصات" },
  { en: "Vehicle Branding", ar: "ملصقات وهويات السيارات" },
  { en: "Corporate Gifts", ar: "الهدايا المؤسسية والدعائية" },
  { en: "Display Stand Manufacturer", ar: "تصنيع منصات العرض" },
  { en: "Flags, Pop Ups, Roll Ups", ar: "الأعلام، والبوب أب، والرول أب" },
  { en: "Stickers & Banner Printing", ar: "طباعة الملصقات والبنرات" },
];

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language];
  const rootRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const marqueeTweenRef = useRef(null);
  const statsSectionRef = useRef(null);
  const statNumberRefs = useRef([]);
  const [activeProcess, setActiveProcess] = useState(0);
  const [isProcessPaused, setIsProcessPaused] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  
  const [rfpData, setRfpData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceRequest: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // The validation shield
  const [attachment, setAttachment] = useState(null);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const handleUploadZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRfpChange = (e) => {
    const { name, value } = e.target;
    setRfpData((prev) => ({ ...prev, [name]: value }));
    
    // Drop the shield and clear messages the moment they start a new message
    if (isSuccess) setIsSuccess(false);
    if (status) setStatus("");
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const processFile = (file) => {
    setFileError("");

    // Check file extension / MIME type
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    const fileName = file.name.toLowerCase();
    const hasAllowedExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    const hasAllowedMime = allowedMimeTypes.includes(file.type) || file.type.startsWith('image/');
    
    if (!hasAllowedExtension && !hasAllowedMime) {
      setFileError("Unsupported file type. Please upload a PDF, DOCX, or Image file.");
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds 5MB limit.");
      return;
    }

    setIsReadingFile(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      setAttachment({
        name: file.name,
        type: file.type,
        size: formatBytes(file.size),
        data: base64Data
      });
      setIsReadingFile(false);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      setFileError("Error reading file. Please try again.");
      setIsReadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRfpSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsSuccess(false); // Reset shield on new attempt

    try {
      const payload = {
        ...rfpData,
        attachment: attachment
      };

      const response = await fetch("/api/rfp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true); // Raise the validation shield!
        setStatus("Message sent successfully.");
        setRfpData({ fullName: "", email: "", phone: "", serviceRequest: "", message: "" });
        setAttachment(null);
        setFileError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatus(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting RFP:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  const getNumberParts = (value) => {
    const numericValue = parseInt(value.replace(/\D/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");
    return { numericValue, suffix };
  };

  const nextImage = () => {
    setCurrentMedia((prev) => (prev < media.length - 1 ? prev + 1 : prev));
  };

  const prevImage = () => {
    setCurrentMedia((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    if (isProcessPaused) return;

    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % processSteps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isProcessPaused]);

  useGSAP(() => {
    gsap.set(
      ".intro-kicker, .intro-title, .intro-copy, .services-left, .services-stand-card, .service-card, .service-media, .stat-card, .process-card, .gallery-item",
      {
        opacity: 1,
        visibility: "visible",
        clearProps: "filter",
      },
    );

    gsap.fromTo(
      ".process-orbit-node",
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".process-showcase",
          start: "top 70%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".process-card",
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-showcase",
          start: "top 75%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".intro-kicker, .intro-title, .intro-copy",
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 78%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".services-left > *",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-showcase",
          start: "top 75%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".service-card",
      {
        y: 90,
        opacity: 0,
        scale: 0.96,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.14,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".services-showcase",
          start: "top 65%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".service-media",
      {
        scale: 1.22,
      },
      {
        scale: 1,
        duration: 1.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-showcase",
          start: "top 65%",
          once: true,
        },
      },
    );

    const numberElements = gsap.utils.toArray(".stat-number");
    numberElements.forEach((el, index) => {
      if (!el || !statsData[index]) return;

      const { numericValue, suffix } = getNumberParts(
        statsData[index].number,
      );
      const hasCommas = statsData[index].number.includes(",");
      const counter = { value: 0 };

      gsap.to(counter, {
        value: numericValue,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: statsSectionRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          const rollingValue = Math.floor(counter.value);
          const formattedValue = hasCommas ? rollingValue.toLocaleString("en-US") : rollingValue;
          el.textContent = `${formattedValue}${suffix}`;
        },
        onComplete: () => {
          el.textContent = statsData[index].number;
        },
      });
    });

    gsap.fromTo(
      ".stat-card",
      {
        y: 55,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsSectionRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".gallery-item",
      {
        y: 70,
        opacity: 0,
        clipPath: "inset(18% 0% 18% 0% round 32px)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0% round 32px)",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 85%",
          once: true,
        },
      },
    );

    gsap.fromTo(
      ".gallery-media",
      {
        scale: 1.12,
      },
      {
        scale: 1,
        duration: 1.25,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 85%",
          once: true,
        },
      },
    );

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, { dependencies: [language], scope: rootRef });

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    let tween;

    // Reset track position first to prevent visual jumps
    gsap.set(track, { x: 0 });

    const handleInit = () => {
      const totalWidth = track.scrollWidth / 2;
      if (totalWidth <= 0) return;

      const isRtl = language === "ar";
      const targetX = isRtl ? totalWidth : -totalWidth;

      // Kill any previous tween on this ref
      if (marqueeTweenRef.current) {
        marqueeTweenRef.current.kill();
      }

      tween = gsap.to(track, {
        x: targetX,
        duration: totalWidth / 120,
        ease: "none",
        repeat: -1,
      });
      marqueeTweenRef.current = tween;
    };

    // Delay calculation slightly to allow DOM/layout settlement across languages
    const timer = setTimeout(handleInit, 80);

    return () => {
      clearTimeout(timer);
      if (tween) {
        tween.kill();
      }
      if (marqueeTweenRef.current) {
        marqueeTweenRef.current.kill();
      }
    };
  }, [language]);

  return (
    <div ref={rootRef} className="overflow-x-hidden">
      {/* HERO - kept as existing/common hero */}
      <div className="hero relative">
        <img
          src={servicesHero}
          className="object-cover w-full h-full"
          alt=""
          loading="lazy"
        />
        <h2 className="text-white z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          {t.servicesHeroTitle}
        </h2>
        <div className="bg-black opacity-20 absolute inset-0"></div>
      </div>
      {/* INTRO */}
      <section className="intro-section relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,213,0,0.35),transparent_24%),radial-gradient(circle_at_88%_20%,rgba(0,58,134,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] dark:bg-none" />
        <div className="app-container relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold mb-4 text-start">
                {t.servicesIntroHeading}
              </h2>

              <p className="mb-4 text-start">
                {t.servicesIntroP1}
              </p>

              <p className="text-start">
                {t.servicesIntroP2}
              </p>
            </div>
            <img
              src={fabricationImg}
              className="rounded-4xl shadow-2xl shadow-[#003a86]/10"
            />
          </div>
        </div>
      </section>
      {/* SERVICES */}
      <section className="services-showcase relative overflow-hidden py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_45%,#ffffff_100%)] dark:bg-none" />
        <div className="absolute -right-0 top-20 h-105 w-105 rounded-full bg-[#ffd500]/25 blur-3xl dark:bg-none" />

        <div className="app-container relative z-10">
          {/* Header */}
          <div className="services-left mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-[#003a86]/10 bg-white px-5 py-2 text-sm font-bold uppercase tracking-widest text-[#003a86] shadow-lg shadow-[#003a86]/5">
                {t.servicesShowcaseBadge}
              </p>

              <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold text-start">
                {t.servicesShowcaseHeading}
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 text-start">
              {t.servicesBulletPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#003a86] text-sm font-bold text-[#ffd500] transition duration-500 group-hover:bg-[#ffd500] group-hover:text-[#003a86]">
                    ✓
                  </span>

                  <span className="leading-6 transition duration-500 group-hover:text-[#003a86]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Service */}
          {services[0] && (
            <article className="service-card group relative mb-6 overflow-hidden rounded-[2.5rem] bg-[#003a86] shadow-2xl shadow-[#003a86]/25">
              <div className="grid min-h-[560px] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative flex flex-col justify-between overflow-hidden p-8 text-white md:p-10 lg:p-12">
                  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffd500]/30 blur-3xl" />

                  <div className="relative">
                    <h3 className="text-4xl md:text-5xl xl:text-6xl font-semibold mb-4 text-white text-start">
                      {services[0].title[language]}
                    </h3>

                    <div
                      className="mt-7 max-w-xl text-sm leading-8 text-white [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 text-start"
                      dangerouslySetInnerHTML={{ __html: services[0].desc[language] }}
                    />
                  </div>
                </div>

                <div className="relative min-h-[360px] overflow-hidden lg:min-h-full">
                  <img
                    src={services[0].img}
                    className="service-media h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    alt={services[0].title[language]}
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#003a86]/10 to-[#003a86]/35" />

                  <div className="absolute bottom-8 left-8 right-8 overflow-hidden rounded-[2rem] border border-white/15 bg-white/15 p-5 text-white shadow-2xl backdrop-blur-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ffd500]">
                        {t.servicesPremiumExpDesign}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Bento Services */}
          <div className="services-grid grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(1).map((service, index) => {
              const isFirstCard = index === 0;
              const isLastCard = index === services.slice(1).length - 1;

              return (
                <article
                  key={service.title[language]}
                  className={`service-card group relative overflow-hidden rounded-[2rem] border border-[#003a86]/10 p-4 shadow-xl shadow-[#003a86]/10 transition duration-500 hover:-translate-y-2 hover:border-[#ffd500] hover:shadow-2xl hover:shadow-[#003a86]/15
                    ${isFirstCard ? "" : ""}
                    ${isLastCard ? "md:col-span-2 xl:col-span-4" : ""}
                  `}
                >
                  <div
                    className={`grid gap-0 ${
                      isLastCard ? "lg:grid-cols-[0.9fr_1.1fr]" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-[1.5rem] bg-[#003a86] ${
                        isLastCard ? "h-80 lg:h-full" : "h-50"
                      }`}
                    >
                      <img
                        src={service.img}
                        className="service-media h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        alt={service.title[language]}
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#003a86]/95 via-[#003a86]/30 to-transparent" />

                      <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-3xl text-start">
                        {service.title[language]}
                      </h3>
                    </div>

                    <div
                      className={`relative p-4 pt-6 flex items-center ${isLastCard ? "lg:p-10" : ""}`}
                    >
                      <div
                        className={`text-sm leading-7 text-[#003a86]/65 [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 text-start ${
                          isLastCard ? "" : ""
                        }`}
                        dangerouslySetInnerHTML={{ __html: service.desc[language] }}
                      />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#ffd500]/0 blur-3xl transition duration-500 group-hover:bg-[#ffd500]/40" />
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* PREMIUM BOOTH SECTION */}
      <section className="premium-booth-section relative overflow-hidden py-10">
        <div className="app-container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT IMAGE */}
            <div className="booth-visual relative">
              <img
                src={premiumBoothImg}
                className="h-full w-full object-contain"
                alt={t.servicesExhibitionDesignHeading}
                loading="lazy"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="booth-section-content">
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold mb-4 text-start">
                {t.servicesExhibitionDesignHeading}
              </h2>

              <p className="mt-7 max-w-xl text-start">
                {t.servicesExhibitionDesignP}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* STATS */}
      <section ref={statsSectionRef} className="relative py-16">
        <div className="app-container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#003a86] p-5 shadow-2xl shadow-[#003a86]/25 lg:p-10">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffd500]/30 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

            <div className="relative mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd500] text-start">
                  {t.servicesStatsBadge}
                </p>

                <h2 className="max-w-3xl text-4xl font-semibold text-white md:text-5xl text-start">
                  {t.servicesStatsHeading}
                </h2>
              </div>
            </div>

            <div className="relative grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
              {statsData.map((item, index) => (
                <div
                  key={item.label[language]}
                  className="stat-card group rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:bg-transparent hover:backdrop-blur-none"
                >
                  <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#ffd500] transition duration-500 text-start">
                    {item.label[language]}
                  </p>

                  <div className="flex min-h-[70px] flex-wrap items-end gap-3 relative justify-start">
                    <h3
                      className="stat-number text-5xl font-semibold leading-none tracking-[-0.06em] text-white transition duration-500 group-hover:text-[#ffd500] md:text-6xl"
                    >
                      0
                    </h3>

                    {item.unit && (
                      <span className="absolute -right-1 bottom-3 text-sm font-bold uppercase tracking-[0.18em] text-white">
                        {item.unit[language]}
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-sm text-white/70 text-start">{item.desc[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* MARQUEE */}
      <section key={`marquee-${language}`} className="overflow-hidden pb-20" dir={language === "ar" ? "rtl" : "ltr"}>
        <div
          ref={marqueeTrackRef}
          className="flex w-max items-center whitespace-nowrap"
          onMouseEnter={() => marqueeTweenRef.current?.pause()}
          onMouseLeave={() => marqueeTweenRef.current?.resume()}
        >
          {[...t.servicesMarqueeItems, ...t.servicesMarqueeItems].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="group mx-3 flex items-center gap-6 rounded-full border border-[#003a86]/10 bg-white px-8 py-3 text-3xl md:text-4xl font-semibold uppercase text-[#003a86] shadow-lg shadow-[#003a86]/10 transition duration-300 hover:border-[#ffd500] hover:bg-[#ffd500]"
            >
              <span>{item}</span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#003a86]/5 transition group-hover:bg-white/50 md:h-16 md:w-16">
                <img
                  src="/favicon.svg"
                  className="block w-7 md:w-10"
                  alt=""
                  loading="lazy"
                />
              </span>
            </div>
          ))}
        </div>
      </section>
      {/* PROCESS */}
      <section className="process-showcase relative overflow-hidden bg-[#001f4f] py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,213,0,0.22),transparent_28%),radial-gradient(circle_at_82%_80%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#001f4f_0%,#003a86_55%,#001f4f_100%)]" />

        <div className="app-container relative z-10">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#ffd500]">
              {t.servicesProcessBadge}
            </p>

            <h2 className="text-4xl font-semibold text-white md:text-5xl xl:text-6xl">
              {t.servicesProcessHeading}
            </h2>
          </div>

          <div
            className="relative mx-auto max-w-7xl"
            onMouseEnter={() => setIsProcessPaused(true)}
            onMouseLeave={() => setIsProcessPaused(false)}
          >
            <div className="relative">
              <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                {/* LEFT ACTIVE STEP CONTENT */}
                <div className="flex flex-col justify-between rounded-[2.2rem] border border-white/10 bg-[#001f4f]/45 p-7 shadow-xl shadow-black/10">
                  <div>
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#ffd500]">
                        {t.servicesStep} {processSteps[activeProcess].step}
                      </div>

                      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                        {activeProcess + 1} / {processSteps.length}
                      </div>
                    </div>

                    <h3 className="text-4xl font-semibold text-white md:text-5xl xl:text-6xl text-start">
                      {processSteps[activeProcess].title[language]}
                    </h3>

                    <p className="mt-6 text-white/70 text-start">
                      {processSteps[activeProcess].desc[language]}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-2">
                    {processSteps.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveProcess(index)}
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          activeProcess === index
                            ? "w-12 bg-[#ffd500]"
                            : "w-2.5 bg-white/25 hover:bg-white/50"
                        }`}
                        aria-label={language === 'ar' ? `الذهاب إلى خطوة العمل ${index + 1}` : `Go to process step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* RIGHT STEPS INSIDE SAME BOX */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {processSteps.map((item, index) => {
                    const isActive = activeProcess === index;
                    const Icon = item.icon;

                    return (
                      <button
                        type="button"
                        key={item.step}
                        onClick={() => setActiveProcess(index)}
                        onMouseEnter={() => {
                          setIsProcessPaused(true);
                          setActiveProcess(index);
                        }}
                        onMouseLeave={() => setIsProcessPaused(false)}
                        className={`process-mini-step group relative overflow-hidden rounded-[1.5rem] border p-4 text-left transition duration-500 ${
                          isActive
                            ? "border-[#ffd500] bg-[#ffd500] text-[#003a86] shadow-xl shadow-[#ffd500]/20"
                            : "border-white/10 bg-white/10 text-white hover:border-[#ffd500]/60 hover:bg-white/15"
                        }`}
                      >
                        <div className="relative z-10 flex items-center gap-4">
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition duration-500 ${
                              isActive
                                ? "bg-[#003a86] text-[#ffd500]"
                                : "bg-[#ffd500] text-[#003a86] group-hover:scale-110"
                            }`}
                          >
                            <Icon size={22} strokeWidth={2.2} />
                          </span>

                          <h4 className="text-base font-semibold leading-5 text-start">
                            {item.title[language]}
                          </h4>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PORTFOLIO */}
      <section className="relative py-20">
        <div className="app-container">
          <div className="mb-14">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#003a86] text-center">
                {language === 'ar' ? 'معرض أعمالنا' : 'Our Portfolio'}
              </p>
              <h2 className="text-center text-4xl md:text-5xl xl:text-6xl font-semibold mb-4">
                {language === 'ar' ? 'معرض الصور' : 'Gallery'}
              </h2>
          </div>

          <div className="portfolio-grid columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
            {media.map((item, index) => {
              const heights = [360, 460, 320, 520, 380, 440, 330, 500, 360];

              return (
                <div
                  key={`media-item-${index}`}
                  className="gallery-item group relative mb-6 break-inside-avoid overflow-hidden rounded-[2rem] border border-[#003a86]/10 bg-white shadow-xl shadow-[#003a86]/10"
                  style={{ height: `${heights[index % heights.length]}px` }}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      className="gallery-media h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      alt={item.title[language]}
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="gallery-media h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#003a86]/90 via-[#003a86]/20 to-transparent opacity-90" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div className="text-start">
                      <h3 className="text-xl font-semibold text-white">
                        {item.title[language]}
                      </h3>
                    </div>

                    <button
                      onClick={() => setCurrentMedia(index)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-xl text-white backdrop-blur-xl transition hover:bg-[#ffd500] hover:text-[#003a86]"
                      aria-label={language === 'ar' ? `فتح ${item.title[language]}` : `Open ${item.title[language]}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered "Our Projects" button linking to Gallery page */}
          <div className="flex justify-center mt-12 mb-4">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center bg-[#003a86] hover:bg-[#002b66] text-white text-base font-semibold px-8 py-3.5 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {t.servicesProjectsBtn}
            </Link>
          </div>

        {currentMedia !== null && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/85 p-6 backdrop-blur-2xl">
            <button
              onClick={() => setCurrentMedia(null)}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-2xl text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500]"
              aria-label={language === 'ar' ? "إغلاق معاينة الوسائط" : "Close media preview"}
            >
              ×
            </button>

            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500]"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#003a86]/15 bg-white text-[#003a86] shadow-lg shadow-[#003a86]/10 transition hover:bg-[#ffd500]"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            <div className="max-h-[88vh] max-w-[88vw] overflow-hidden rounded-[2rem] border border-[#003a86]/10 bg-white p-3 shadow-2xl shadow-[#003a86]/20">
              {media[currentMedia].type === "image" ? (
                <img
                  src={media[currentMedia].src}
                  className="max-h-[82vh] max-w-[84vw] rounded-[1.4rem] object-contain"
                  alt={media[currentMedia].title[language]}
                  loading="lazy"
                />
              ) : (
                <video
                  src={media[currentMedia].src}
                  controls
                  autoPlay
                  className="max-h-[82vh] max-w-[84vw] rounded-[1.4rem]"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
    {/* RFP SECTION */}
    <section className="rfp-section relative overflow-hidden py-20 pt-0">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_52%,#fff9d8_100%)] dark:bg-none" />
      <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#ffd500]/25 blur-3xl dark:bg-none" />
      <div className="absolute -right-40 bottom-10 h-[520px] w-[520px] rounded-full bg-[#003a86]/10 blur-3xl dark:bg-none" />

      <div className="app-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT CONTENT */}
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#003a86]/10 bg-white px-5 py-2 text-sm font-bold uppercase tracking-widest text-[#003a86] shadow-lg shadow-[#003a86]/5">
              {t.servicesRfpBadge}
            </p>

            <h2 className="max-w-4xl text-4xl md:text-5xl xl:text-6xl font-semibold mb-4 text-start">
              {t.servicesRfpHeading}
            </h2>

            <p className="mt-5 text-start">
              {t.servicesRfpDesc}
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full">
            <div className="card bg-primary w-full rounded-4xl lg:ms-auto">
              <div className="card-body px-9.5 pt-15 pb-9.5">
                <form onSubmit={handleRfpSubmit} className="flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4 text-start">
                      <label
                        htmlFor="fullName"
                        className="label text-[18px] text-white ps-3 block mb-1"
                      >
                        {t.servicesRfpName}
                      </label>

                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={rfpData.fullName}
                        onChange={handleRfpChange}
                        className={`input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12 ${isSuccess ? "" : "validator"}`}
                        required={!isSuccess}
                      />
                      <span className="validator-hint hidden text-start">{t.servicesRfpRequiredHint}</span>
                    </div>

                    <div className="mb-4 text-start">
                      <label
                        htmlFor="email"
                        className="label text-[18px] text-white ps-3 block mb-1"
                      >
                        {t.servicesRfpEmail}
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={rfpData.email}
                        onChange={handleRfpChange}
                        className={`input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12 ${isSuccess ? "" : "validator"}`}
                        required={!isSuccess}
                      />
                      <span className="validator-hint hidden text-start">{t.servicesRfpRequiredHint}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4 text-start">
                      <label
                        htmlFor="phone"
                        className="label text-[18px] text-white ps-3 block mb-1"
                      >
                        {t.servicesRfpPhone}
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={rfpData.phone}
                        onChange={handleRfpChange}
                        className={`input bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12 ${isSuccess ? "" : "validator"}`}
                        required={!isSuccess}
                      />
                      <span className="validator-hint hidden text-start">{t.servicesRfpRequiredHint}</span>
                    </div>

                    <div className="mb-4 text-start">
                      <label
                        htmlFor="serviceRequest"
                        className="label text-[18px] text-white ps-3 block mb-1"
                      >
                        {t.servicesRfpRequest}
                      </label>

                      <select
                        id="serviceRequest"
                        name="serviceRequest"
                        value={rfpData.serviceRequest}
                        onChange={handleRfpChange}
                        className={`select bg-primary border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-12 ${isSuccess ? "" : "validator"}`}
                        required={!isSuccess}
                      >
                        <option value="" disabled>
                          {t.servicesRfpSelect}
                        </option>

                        {serviceOptions.map((service) => (
                          <option
                            key={service.en}
                            value={service.en}
                          >
                            {service[language]}
                          </option>
                        ))}
                      </select>
                      <span className="validator-hint hidden text-start">{t.servicesRfpRequiredHint}</span>
                    </div>
                  </div>

                  <div className="mb-4 text-start">
                    <label
                      className="label text-[18px] text-white ps-3 block mb-1.5"
                    >
                      {t.servicesRfpUpload}
                    </label>
                    
                    {/* Hidden actual file input */}
                    <input
                      ref={fileInputRef}
                      id="attachment-file"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          processFile(e.target.files[0]);
                        }
                      }}
                      disabled={isSuccess || isReadingFile}
                      className="hidden"
                    />

                    {/* Custom Upload Area */}
                    {!attachment ? (
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={handleUploadZoneClick}
                        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all duration-300 cursor-pointer text-center
                          ${isDragActive 
                            ? 'border-warning bg-white/10 scale-[0.99] shadow-inner' 
                            : 'border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10'
                          }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 transition-transform">
                          <Upload className="w-6 h-6 text-warning" />
                        </div>
                        <p className="text-white text-base font-medium mb-1">
                          {isDragActive ? t.servicesRfpUploadDrop : t.servicesRfpUploadDrag}
                        </p>
                        <p className="text-white/60 text-xs">
                          {t.servicesRfpUploadSupport}
                        </p>
                      </div>
                    ) : (
                      /* Beautiful File Preview Card */
                      <div className="flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl p-4 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center text-warning shrink-0">
                          <Paperclip className="w-5 h-5 text-warning" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold truncate">{attachment.name}</p>
                          <p className="text-white/60 text-xs mt-0.5">{attachment.size}</p>
                        </div>
                        {isReadingFile ? (
                          <span className="loading loading-spinner loading-xs text-white"></span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleRemoveAttachment}
                            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
                            title={t.servicesRfpRemove}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                    
                    {isReadingFile && !attachment && (
                      <div className="flex items-center gap-2 mt-2 ps-3">
                        <span className="loading loading-spinner loading-xs text-white"></span>
                        <span className="text-white/70 text-xs">{t.servicesRfpReading}</span>
                      </div>
                    )}

                    {fileError && (
                      <div className="mt-2 text-warning text-sm font-semibold ps-3 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-warning shrink-0" />
                        <span>{fileError}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4 text-start">
                    <label
                      className="label text-[18px] text-white ps-3 block mb-1"
                      htmlFor="message"
                    >
                      {t.servicesRfpRequirement}
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={rfpData.message}
                      onChange={handleRfpChange}
                      className={`textarea bg-transparent border-white/50 focus:border-white/90 text-white rounded-xl w-full focus:outline-none focus:ring-0 h-37.5 resize-none ${isSuccess ? "" : "validator"}`}
                      placeholder={t.servicesRfpPlaceholder}
                      required={!isSuccess}
                    ></textarea>
                    <span className="validator-hint hidden text-start">{t.servicesRfpRequiredHint}</span>
                  </div>

                  {status && (
                    <div className="mt-2">
                      {status === "Message sent successfully." ? (
                        <div className="alert alert-success alert-outline justify-between flex text-white text-start">
                          <span>{t.servicesRfpSent}</span>
                          <a href="javascript:void(0)" onClick={(e) => { e.preventDefault(); setStatus("");}}>
                            <i className="icon-close-flat"></i>
                          </a>
                        </div>
                      ) : status === "Sending..." ? (
                        <div className="alert alert-info alert-outline text-white text-start">
                          <span>{t.servicesRfpSending}</span>
                        </div>
                      ) : (
                        <div className="alert alert-error alert-outline text-white text-start">
                          <span>{status}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-end w-full">
                    <a
                      href="https://wa.me/966590754816"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 justify-center btn-warning bg-warning font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto text-base h-12 cursor-pointer"
                    >
                      <MessageCircle size={20} />
                      <span>{t.servicesRfpWhatsApp}</span>
                    </a>
                    <button
                      type="submit"
                      className="btn btn-lg btn-light dark:btn-warning text-[18px] w-full sm:w-33 h-12 flex items-center justify-center cursor-pointer"
                      disabled={status === "Sending..."}
                    >
                      {status === "Sending..." ? t.servicesRfpSending : t.servicesRfpSubmit}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);
}
