/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 1. Initialize language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("bng_language");
    return savedLang === "ar" || savedLang === "en" ? savedLang : "en";
  });

  // 2. Sync language changes to document attributes and localStorage
  useEffect(() => {
    localStorage.setItem("bng_language", language);
    
    const root = document.documentElement;
    if (language === "ar") {
      root.dir = "rtl";
      root.lang = "ar";
      root.classList.add("rtl"); // Optional: for custom RTL utility rules
      root.classList.remove("ltr");
    } else {
      root.dir = "ltr";
      root.lang = "en";
      root.classList.add("ltr");
      root.classList.remove("rtl");
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3. Custom hook to consume language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
