"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { googleTranslate } from "@/lib/googleTranslate";

/**
 * AutoTranslate Component
 * Automatically translates all text content on the page using Google Translate API
 * Uses caching and batch translation for performance
 */
export function AutoTranslate() {
  const { language } = useLanguage();

  useEffect(() => {
    if (language === "en") {
      return; // No translation needed for English
    }

    const translatePage = async () => {
      // Find all text nodes that need translation
      const textNodes: { node: Text; originalText: string }[] = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const text = node.textContent?.trim();
            if (!text) return NodeFilter.FILTER_REJECT;

            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            // Skip script, style, code, pre elements
            const tagName = parent.tagName.toLowerCase();
            if (
              tagName === "script" ||
              tagName === "style" ||
              tagName === "code" ||
              tagName === "pre" ||
              parent.hasAttribute("data-no-translate") ||
              parent.closest("[data-no-translate]")
            ) {
              return NodeFilter.FILTER_REJECT;
            }

            // Skip if parent is contenteditable
            if (parent.isContentEditable) {
              return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      let node;
      while ((node = walker.nextNode())) {
        const textNode = node as Text;
        const originalText = textNode.textContent?.trim();
        if (originalText) {
          textNodes.push({ node: textNode, originalText });
        }
      }

      if (textNodes.length === 0) return;

      // Batch translate all texts
      const textsToTranslate = textNodes.map((item) => item.originalText);
      
      try {
        const translations = await googleTranslate.translateBatch(
          textsToTranslate,
          language
        );

        // Apply translations
        textNodes.forEach((item, index) => {
          if (translations[index] && item.node.textContent) {
            // Preserve leading/trailing whitespace
            const leadingSpace = item.node.textContent.match(/^\s*/)?.[0] || "";
            const trailingSpace = item.node.textContent.match(/\s*$/)?.[0] || "";
            item.node.textContent = leadingSpace + translations[index] + trailingSpace;
          }
        });
      } catch (error) {
        console.error("Translation failed:", error);
      }
    };

    // Small delay to ensure DOM is fully loaded
    const timeout = setTimeout(translatePage, 300);

    return () => clearTimeout(timeout);
  }, [language]);

  return null;
}

