import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../content/en/common.json";
import hi from "../content/hi/common.json";

const STORAGE_KEY = "eb-lang";
const storedLang = localStorage.getItem(STORAGE_KEY);

i18next.use(initReactI18next).init({
  resources: {
    en: { common: en },
    hi: { common: hi },
  },
  lng: storedLang === "hi" ? "hi" : "en",
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

document.documentElement.lang = i18next.language;

i18next.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  document.documentElement.lang = lng;
});

export default i18next;
