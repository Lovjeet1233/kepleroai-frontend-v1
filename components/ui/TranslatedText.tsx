"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import React from "react";

interface TranslatedTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
}

export function TranslatedText({ children, className, as: Component = "span" }: TranslatedTextProps) {
  const { language, translateAsync } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);

  useEffect(() => {
    if (language === "en") {
      setTranslatedText(children);
      return;
    }

    // Translate asynchronously
    translateAsync(children).then(setTranslatedText);
  }, [children, language, translateAsync]);

  return <Component className={className}>{translatedText}</Component>;
}

// Hook for translating text in components
export function useTranslate() {
  const { language, t, translateAsync } = useLanguage();
  
  return { t, translateAsync, language };
}

