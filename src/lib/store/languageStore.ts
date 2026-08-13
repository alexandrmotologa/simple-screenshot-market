import { create } from "zustand";

// ISO 639-1 language codes with native names and flags
export interface SupportedLanguage {
  code: string;
  name: string;       // English name
  nativeName: string; // Name in the language itself
  flag: string;       // Emoji flag
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "en", name: "English",    nativeName: "English",    flag: "🇺🇸" },
  { code: "ro", name: "Romanian",   nativeName: "Română",     flag: "🇷🇴" },
  { code: "de", name: "German",     nativeName: "Deutsch",    flag: "🇩🇪" },
  { code: "fr", name: "French",     nativeName: "Français",   flag: "🇫🇷" },
  { code: "es", name: "Spanish",    nativeName: "Español",    flag: "🇪🇸" },
  { code: "it", name: "Italian",    nativeName: "Italiano",   flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português",  flag: "🇵🇹" },
  { code: "nl", name: "Dutch",      nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polish",     nativeName: "Polski",     flag: "🇵🇱" },
  { code: "ru", name: "Russian",    nativeName: "Русский",    flag: "🇷🇺" },
  { code: "uk", name: "Ukrainian",  nativeName: "Українська", flag: "🇺🇦" },
  { code: "tr", name: "Turkish",    nativeName: "Türkçe",     flag: "🇹🇷" },
  { code: "ar", name: "Arabic",     nativeName: "العربية",    flag: "🇸🇦" },
  { code: "he", name: "Hebrew",     nativeName: "עברית",      flag: "🇮🇱" },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "中文（简体）", flag: "🇨🇳" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "中文（繁體）", flag: "🇹🇼" },
  { code: "ja", name: "Japanese",   nativeName: "日本語",      flag: "🇯🇵" },
  { code: "ko", name: "Korean",     nativeName: "한국어",      flag: "🇰🇷" },
  { code: "hi", name: "Hindi",      nativeName: "हिन्दी",      flag: "🇮🇳" },
  { code: "bn", name: "Bengali",    nativeName: "বাংলা",       flag: "🇧🇩" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "Thai",       nativeName: "ภาษาไทย",    flag: "🇹🇭" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Malay",      nativeName: "Bahasa Melayu",   flag: "🇲🇾" },
  { code: "sv", name: "Swedish",    nativeName: "Svenska",    flag: "🇸🇪" },
  { code: "no", name: "Norwegian",  nativeName: "Norsk",      flag: "🇳🇴" },
  { code: "da", name: "Danish",     nativeName: "Dansk",      flag: "🇩🇰" },
  { code: "fi", name: "Finnish",    nativeName: "Suomi",      flag: "🇫🇮" },
  { code: "cs", name: "Czech",      nativeName: "Čeština",    flag: "🇨🇿" },
  { code: "sk", name: "Slovak",     nativeName: "Slovenčina", flag: "🇸🇰" },
  { code: "hu", name: "Hungarian",  nativeName: "Magyar",     flag: "🇭🇺" },
  { code: "el", name: "Greek",      nativeName: "Ελληνικά",   flag: "🇬🇷" },
  { code: "bg", name: "Bulgarian",  nativeName: "Български",  flag: "🇧🇬" },
  { code: "hr", name: "Croatian",   nativeName: "Hrvatski",   flag: "🇭🇷" },
  { code: "sr", name: "Serbian",    nativeName: "Српски",     flag: "🇷🇸" },
  { code: "ca", name: "Catalan",    nativeName: "Català",     flag: "🏴" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių",   flag: "🇱🇹" },
  { code: "lv", name: "Latvian",    nativeName: "Latviešu",   flag: "🇱🇻" },
  { code: "et", name: "Estonian",   nativeName: "Eesti",      flag: "🇪🇪" },
  { code: "af", name: "Afrikaans",  nativeName: "Afrikaans",  flag: "🇿🇦" },
];

export function getLang(code: string): SupportedLanguage | undefined {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code);
}

interface LanguageStore {
  /** Active language code in editor preview */
  activeLang: string;
  /** Languages enabled in the current project */
  projectLanguages: string[];

  setActiveLang: (code: string) => void;
  setProjectLanguages: (codes: string[]) => void;
  addLanguage: (code: string) => void;
  removeLanguage: (code: string) => void;

  /** Return the localized text for a layer, with fallback to original content */
  getLocalizedText: (
    layerId: string,
    originalContent: string,
    localizations: Record<string, Record<string, { content?: string }>> | undefined
  ) => string;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  activeLang: "en",
  projectLanguages: ["en"],

  setActiveLang: (code) => set({ activeLang: code }),

  setProjectLanguages: (codes) => {
    const withEn = codes.includes("en") ? codes : ["en", ...codes];
    set({ projectLanguages: withEn });
  },

  addLanguage: (code) => {
    const { projectLanguages } = get();
    if (!projectLanguages.includes(code)) {
      set({ projectLanguages: [...projectLanguages, code] });
    }
  },

  removeLanguage: (code) => {
    if (code === "en") return; // Cannot remove English (base language)
    set((state) => ({
      projectLanguages: state.projectLanguages.filter((l) => l !== code),
      activeLang: state.activeLang === code ? "en" : state.activeLang,
    }));
  },

  getLocalizedText: (layerId, originalContent, localizations) => {
    const { activeLang } = get();
    if (activeLang === "en" || !localizations) return originalContent;
    const langMap = localizations[activeLang];
    if (!langMap) return originalContent;
    return langMap[layerId]?.content ?? originalContent;
  },
}));
