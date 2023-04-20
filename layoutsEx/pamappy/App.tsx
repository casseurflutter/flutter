import "expo-dev-client";
import "intl-pluralrules";

// import { LogBox } from "react-native";
// LogBox.ignoreLogs([
//   "Setting a timer",
//   "Require cycle",
//   "Require cycles are allowed",
// ]);
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "pearl-ui";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { Platform } from "react-native";
import OneSignal from "react-native-onesignal";
import { Host } from "react-native-portalize";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import { useCachedResources, useColorScheme } from "~hooks";

import i18n from "./i18n/i18n";
import Navigation from "./src/navigation/Navigator";
import { theme } from "./src/theme";

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId("9547eb29-7581-481a-a879-75aec41c6f28");

let isToday = require("dayjs/plugin/isToday");
let localizedFormat = require("dayjs/plugin/localizedFormat");
var calendar = require("dayjs/plugin/calendar");

require("dayjs/locale/fr");

import dayjsRecur from "dayjs-recur";
import Purchases from "react-native-purchases";

import SubscriptionCheck from "./src/components/SubscriptionCheck";

dayjs.extend(localizedFormat);
dayjs.extend(isToday);
dayjs.extend(dayjsRecur);
dayjs.extend(calendar);

const APIKeys = {
  apple: "appl_oTHhDobJEsEFXtNspNwSEIHvDBg",
  google: "goog_tWrciFSPOovnRvNSjhZZqimJtlU",
};

Purchases.setDebugLogsEnabled(true);

if (Platform.OS == "android") {
  Purchases.configure({ apiKey: APIKeys.google });
} else {
  Purchases.configure({ apiKey: APIKeys.apple });
}

const queryClient = new QueryClient();
// initOneSignalClient();
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <ActionSheetProvider>
          <RecoilRoot>
            <QueryClientProvider client={queryClient}>
              <I18nextProvider i18n={i18n}>
                <Host>
                  <RootSiblingParent>
                    <SafeAreaProvider>
                      <StatusBar backgroundColor="#2FB0ED" />

                      <Navigation colorScheme={colorScheme} />
                      <SubscriptionCheck />
                    </SafeAreaProvider>
                  </RootSiblingParent>
                </Host>
              </I18nextProvider>
            </QueryClientProvider>
          </RecoilRoot>
        </ActionSheetProvider>
      </ThemeProvider>
    );
  }
}
