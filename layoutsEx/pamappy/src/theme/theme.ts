import { extendTheme } from "pearl-ui";

import { colors } from "./colors";
import {
  newButtonConfig,
  newIconConfig,
  newInputConfig,
  newTextConfig,
  newTextLinkConfig,
} from "./config";

export const theme = extendTheme({
  fonts: {
    body: "SF_Pro_Rounded",
    heading: "SF_Pro_Rounded",
    mono: "SF_Pro_Rounded",
  },
  fontConfig: {
    SF_Pro_Rounded: {
      400: {
        normal: "SF_Pro_Rounded_Regular",
      },
      500: {
        normal: "SF_Pro_Rounded_Medium",
      },
      600: {
        normal: "SF_Pro_Rounded_SemiBold",
      },
      700: {
        normal: "SF_Pro_Rounded_Bold",
      },
    },
  },
  fontWeights: {
    hairline: "100",
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  palette: {
    ...colors,
  },
  spacing: {
    z: 0,
    n: 2,
    xs: 6,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 100,
  },
  components: {
    Button: newButtonConfig,
    Text: newTextConfig,
    Input: newInputConfig,
    TextLink: newTextLinkConfig,
    Icon: newIconConfig,
  },
  borderRadii: {
    z: 0,
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    "2xl": 32,
    full: 1000,
  },
});

// // Add this code block to enable typescript support for your theme
// type AppTheme = typeof theme;

// declare module "pearl-ui" {
//   interface CustomPearlTheme extends AppTheme {}
// }
