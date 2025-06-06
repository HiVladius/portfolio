import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../translation/en/en.json";
import es from "../translation/es/es.json";

const resources = {
  en: {
    translation: en,
  },

  es: {
    translation: es,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    ns: "translation",
    defaultNS: "translation",
    react: {
      useSuspense: true,
    },
  });

export default i18n;
