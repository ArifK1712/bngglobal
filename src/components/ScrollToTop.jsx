import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    // This forces the window to the top whenever the URL path or language changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" to prevent a weird sliding effect during page transitions
    });
  }, [pathname, language]);

  return null;
};

export default ScrollToTop;