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

export const pauseTranslationObserver = (): void => {
  if (observer) {
    observer.disconnect();
  }
};

export const resumeTranslationObserver = (): void => {
  if (typeof window === 'undefined') return;
  const root = document.getElementById('root');
  if (!root) return;
  if (!observer) {
    setupObserver();
  } else {
    observer.observe(root, { childList: true, subtree: true });
  }
};

const setupObserver = () => {
  if (typeof window === 'undefined' || observer) return;
  const root = document.getElementById('root');
  if (!root) return;

  observer = new MutationObserver(() => {
    if (currentActiveLang !== 'en') {
      if (updateTimer) clearTimeout(updateTimer);
      updateTimer = setTimeout(() => {
        applyDomTranslation(currentActiveLang);
      }, 50);
    }
  });

  // Observe childList and subtree only (avoid characterData to prevent infinite loop)
  observer.observe(root, { childList: true, subtree: true });
};

export const triggerTranslationUpdate = (): void => {
  if (typeof window === 'undefined') return;
  if (currentActiveLang && currentActiveLang !== 'en') {
    applyDomTranslation(currentActiveLang);
    syncGoogleTranslate(currentActiveLang);
  }
};

const syncGoogleTranslate = (langCode: string): void => {
  if (typeof document === 'undefined') return;
  try {
    const domain = window.location.hostname;
    if (langCode === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      if (domain && domain !== 'localhost') {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
      }
      document.cookie = 'googtrans=/en/en; path=/;';
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      if (domain && domain !== 'localhost') {
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${domain};`;
      }
    }

    // Trigger Google Translate dropdown element with retry attempts
    const tryTriggerCombo = (attempt = 0) => {
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        if (select.value !== langCode) {
          select.value = langCode;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      } else if (attempt < 8) {
        setTimeout(() => tryTriggerCombo(attempt + 1), 250);
      }
    };
    tryTriggerCombo();
  } catch {
    // ignore
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
        syncGoogleTranslate(savedCode);
      }, 100);
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

  // 1. Update HTML language and dir attributes
  if (typeof document !== 'undefined') {
    document.documentElement.lang = langCode;
    document.documentElement.dir = lang.dir;
    if (lang.dir === 'rtl') {
      document.body.classList.add('rtl-mode');
    } else {
      document.body.classList.remove('rtl-mode');
    }
  }

  // 2. Persist in localStorage
  try {
    localStorage.setItem('dpa_language_code', langCode);
    localStorage.setItem('dpa_language_name', lang.name);
  } catch {
    // ignore
  }

  // 3. Immediately apply client-side DOM translation & Google Translate sync
  try {
    setupObserver();
    applyDomTranslation(langCode);
    syncGoogleTranslate(langCode);
  } catch {
    // ignore
  }

  return lang;
};
