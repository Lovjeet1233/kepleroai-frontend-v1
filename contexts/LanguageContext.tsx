"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getTranslation, Language } from "@/lib/translations";
import { googleTranslate } from "@/lib/googleTranslate";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
  translateAsync: (text: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language names in their native form
export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  it: "Italiano",
  tr: "Türkçe",
  ar: "العربية",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && languageNames[savedLanguage]) {
      setLanguageState(savedLanguage);
      updateDocumentLanguage(savedLanguage);
    }
  }, []);

  const updateDocumentLanguage = (lang: Language) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      // Don't change direction - keep UI layout consistent
      document.documentElement.dir = "ltr";
      document.body.style.direction = "ltr";
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    updateDocumentLanguage(lang);
    
    // Trigger a page reload to apply translations
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  // Synchronous translation - tries dictionary first, returns original if not found
  const t = (text: string): string => {
    if (!text || language === "en") {
      return text;
    }
    
    // Try dictionary first for instant translation
    const dictTranslation = getTranslation(text, language);
    if (dictTranslation !== text) {
      return dictTranslation;
    }
    
    // Trigger async translation in background for future use
    googleTranslate.translate(text, language).catch(() => {});
    
    return text;
  };

  // Async translation using Google Translate API
  const translateAsync = async (text: string): Promise<string> => {
    if (!text || language === "en") {
      return text;
    }

    // Try dictionary first
    const dictTranslation = getTranslation(text, language);
    if (dictTranslation !== text) {
      return dictTranslation;
    }

    // Use Google Translate API
    try {
      return await googleTranslate.translate(text, language);
    } catch (error) {
      return text;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateAsync }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export type { Language };
