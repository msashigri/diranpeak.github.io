import { applyDomTranslation } from './dictionary';

export interface LanguageItem {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageItem[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
];

export const getLanguageByCodeOrName = (val: string): LanguageItem => {
  if (!val) return SUPPORTED_LANGUAGES[0];
  const lower = val.toLowerCase().trim();
  const match = SUPPORTED_LANGUAGES.find(
    (l) =>
      l.code.toLowerCase() === lower ||
      l.name.toLowerCase() === lower ||
      l.nativeName.toLowerCase() === lower
  );
  return match || SUPPORTED_LANGUAGES[0];
};

let currentActiveLang = 'en';
let observer: MutationObserver | null = null;
let updateTimer: ReturnType<typeof setTimeout> | null = null;

const setupObserver = () => {
  if (typeof window === 'undefined' || observer) return;
  const root = document.getElementById('root');
  if (!root) return;

  observer = new MutationObserver(() => {
    if (currentActiveLang !== 'en') {
      if (updateTimer) clearTimeout(updateTimer);
      updateTimer = setTimeout(() => {
        applyDomTranslation(currentActiveLang);
      }, 30);
    }
  });

  observer.observe(root, { childList: true, subtree: true, characterData: true });
};

export const triggerTranslationUpdate = (): void => {
  if (typeof window === 'undefined') return;
  if (currentActiveLang && currentActiveLang !== 'en') {
    applyDomTranslation(currentActiveLang);
  }
};

/**
 * Initializes the language translator safely
 */
export const initLanguageTranslator = (): void => {
  if (typeof window === 'undefined') return;
  try {
    const savedCode = localStorage.getItem('dpa_language_code') || 'en';
    if (savedCode && savedCode !== 'en') {
      currentActiveLang = savedCode;
      setupObserver();
      setTimeout(() => {
        applyDomTranslation(savedCode);
      }, 20);
    }
  } catch {
    // ignore
  }
};

/**
 * Translates the ENTIRE website into the selected language (Urdu, Arabic, French, German, etc.)
 */
export const translateWholeWebsite = (targetLanguage: string): LanguageItem => {
  const lang = getLanguageByCodeOrName(targetLanguage);
  const langCode = lang.code;
  currentActiveLang = langCode;

  // 1. Update HTML language without altering layout, alignment, or formatting
  if (typeof document !== 'undefined') {
    document.documentElement.lang = langCode;
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('rtl-mode');
  }

  // 2. Persist in localStorage
  try {
    localStorage.setItem('dpa_language_code', langCode);
    localStorage.setItem('dpa_language_name', lang.name);
  } catch {
    // ignore
  }

  // 3. Immediately apply client-side DOM translation
  try {
    setupObserver();
    applyDomTranslation(langCode);
  } catch {
    // ignore
  }

  return lang;
};
