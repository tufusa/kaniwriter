import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import jaNs1 from "./locales/ja.json";
import enNs1 from "./locales/en.json";

export const defaultNS = "ns1";

i18next.use(initReactI18next).init({
  fallbackLng: ["ja", "en"],
  defaultNS,
  resources: {
    "ja": {
      ns1: jaNs1,
    },
    "en": {
      ns1: enNs1,
    },
  },
});

export default i18next;
