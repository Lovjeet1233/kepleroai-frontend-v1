"use client";

import { useLanguage, languageNames, Language } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useState } from "react";

interface LanguageSwitcherProps {
  showLabel?: boolean;
  className?: string;
}

export function LanguageSwitcher({ showLabel = false, className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-accent border border-border transition-colors"
      >
        <Globe className="w-4 h-4" />
        {showLabel && <span className="text-sm">{languageNames[language]}</span>}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 z-50 min-w-[200px] bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            {(Object.keys(languageNames) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-accent transition-colors ${
                  language === lang ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{languageNames[lang]}</span>
                  {language === lang && (
                    <span className="text-primary">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Compact version for mobile
export function LanguageSwitcherCompact() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-secondary border border-border rounded-lg px-2 py-1 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
      >
        {(Object.keys(languageNames) as Language[]).map((lang) => (
          <option key={lang} value={lang}>
            {languageNames[lang]}
          </option>
        ))}
      </select>
    </div>
  );
}

