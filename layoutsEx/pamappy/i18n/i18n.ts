import dayjs from "dayjs";
import * as Localization from "expo-localization";
import i18n, { BackendModule, LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import { LocaleConfig } from "react-native-calendars";
import { setLocale } from "yup";
import { fr } from "yup-locales";
require("dayjs/locale/en");
require("dayjs/locale/fr");
require("dayjs/locale/nl");
let utc = require("dayjs/plugin/utc");

import calendar from "dayjs/plugin/calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

dayjs.extend(localizedFormat);
dayjs.extend(calendar);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(utc);

import { load, save } from "../src/utils";
const namespacesFiles = {
  en: {
    common: require("../locales/en/common.json"),
  },
  fr: {
    common: require("../locales/fr/common.json"),
  },
  nl: {
    common: require("../locales/nl/common.json"),
  },
};
const LANGUAGE_KEY = "lang";

const translationFileLoader = (
  local: "en" | "fr" | "nl",
  ns: "common"
): any => {
  return namespacesFiles[local][ns];
};
const languageDetectorPlugin: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async function (callback) {
    try {
      let language = await load(LANGUAGE_KEY);
      dayjs.locale(language);

      console.log("language", language);
      if (language) {
        //if language was stored before, use this language in the app
        return callback(language);
      } else {
        //if language was not stored yet, use device's locale
        return callback(
          Localization.locale.search(/-|_/) != -1
            ? Localization.locale.slice(0, 2)
            : Localization.locale
        );
      }
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  init: () => {
    dayjs.locale("fr");
  },

  cacheUserLanguage: function (language: string) {},
};

export const changeLanguage = (v: string) => {
  i18n.changeLanguage(v);
  loadlocalDate(v);

  save(LANGUAGE_KEY, v);
};
const loadlocalDate = (lng: string) => {
  dayjs.locale(lng);
  let calendar: any = {
    fr: {
      lastDay: "[Hier]",
      sameDay: "[Aujourd'hui]",
      nextDay: "[Demain]",
      nextWeek: "LL",
      sameElse: "ll",
    },
    en: {
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "LL",
      sameElse: "ll",
    },
  };
  dayjs.updateLocale(i18n.language, {
    calendar: calendar[i18n.language],
    formats: {
      // abbreviated format options allowing localization
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A",
      // lowercase/short, optional formats for localization
      l: "D/M/YYYY",
      ll: "D MMM YYYY",
      lll: "D MMM YYYY - h:mm",
      llll: "ddd, MMM D, YYYY h:mm A",
    },
  });
};
const translationLoader: BackendModule = {
  type: "backend",
  init: () => {},
  create: () => {},
  read: function (language, namespace, callback) {
    let resource,
      error = null;
    console.log("language", language);
    try {
      resource = translationFileLoader(language, namespace);
    } catch (_error) {
      error = _error;
      // console.error(error);
    }

    callback(error, resource);
  },
};
i18n
  .use(languageDetectorPlugin)
  .use(translationLoader)
  .use(initReactI18next)
  .init(
    {
      debug: false,
      fallbackLng: "en",
      ns: ["common"],
      defaultNS: "common",
      fallbackNS: ["common"],

      interpolation: {
        escapeValue: false,
      },
      cleanCode: true,
      lowerCaseLng: true,
      keySeparator: false,
      nonExplicitSupportedLngs: true,
    },
    (error) => {
      console.log("error", error);
      if (error) {
        console.log("error i18next", error);
      }
      if (i18n.language == "fr") {
        setLocale(fr);
      }
      loadlocalDate(i18n.language);
    }
  );

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";
export default i18n;
