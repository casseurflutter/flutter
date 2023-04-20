import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";

export const SF_Pro_Rounded_Bold = require("../../assets/fonts/SF-Pro-Rounded-Bold.otf");
export const SF_Pro_Rounded_SemiBold = require("../../assets/fonts/SF-Pro-Rounded-Semibold.otf");
export const SF_Pro_Rounded_Regular = require("../../assets/fonts/SF-Pro-Rounded-Regular.otf");
export const SF_Pro_Rounded_Medium = require("../../assets/fonts/SF-Pro-Rounded-Medium.otf");

export enum FONTS {
  SF_Pro_Rounded_Bold = "SF_Pro_Rounded_Bold",
  SF_Pro_Rounded_SemiBold = "SF_Pro_Rounded_SemiBold",
  SF_Pro_Rounded_Regular = "SF_Pro_Rounded_Regular",
  SF_Pro_Rounded_Medium = "SF_Pro_Rounded_Medium",
}

export const loadFonts = async () => {
  await Font.loadAsync({
    ...FontAwesome.font,
    SF_Pro_Rounded_Bold,
    SF_Pro_Rounded_SemiBold,
    SF_Pro_Rounded_Regular,
    SF_Pro_Rounded_Medium,
  });
};
