import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle({ className = "text-white bg-white/10 hover:bg-white/20 border border-white/20" }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`btn btn-ghost btn-circle transition-colors relative ${className}`}
      aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <span className="font-semibold text-sm tracking-wider">
        {language === "en" ? "AR" : "EN"}
      </span>
    </button>
  );
}
