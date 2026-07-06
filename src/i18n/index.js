import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../content/en/common.json";
import hi from "../content/hi/common.json";

const STORAGE_KEY = "eb-lang";
const storedLang = localStorage.getItem(STORAGE_KEY);
const hiLoginOverrides = {
  welcome: "वापसी पर स्वागत है!",
  loginSub: "अपनी सीखने की यात्रा जारी रखने के लिए साइन इन करें",
  username: "उपयोगकर्ता नाम",
  usernamePlaceholder: "username दर्ज करें",
  password: "पासवर्ड",
  passwordPlaceholder: "password दर्ज करें",
  showPassword: "पासवर्ड दिखाएं",
  hidePassword: "पासवर्ड छिपाएं",
  signIn: "साइन इन",
  evaluationTitle: "केवल मूल्यांकन एक्सेस",
  evaluationBody: "यह ऐप अभी मूल्यांकन और परीक्षण के लिए उपलब्ध है। साइन इन करने के लिए दिए गए username और password का उपयोग करें।",
  evaluationBodyHi: "यह ऐप अभी मूल्यांकन और परीक्षण के लिए उपलब्ध है। साइन इन करने के लिए दिए गए username और password का उपयोग करें।",
  loginHeroTag: "सीखें। बनाएं। नवाचार करें।",
  loginHeroBody: "शुरुआती लोगों के लिए एक केंद्रित डार्क लैब वातावरण में सरल इलेक्ट्रॉनिक्स सीखना।",
  loginPlatformSubtitle: "इलेक्ट्रॉनिक्स लर्निंग प्लेटफॉर्म",
};

i18next.use(initReactI18next).init({
  resources: {
    en: { common: en },
    hi: { common: { ...hi, ...hiLoginOverrides } },
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
