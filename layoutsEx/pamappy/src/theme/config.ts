import { Platform } from "react-native";

const platform = Platform.OS;

export const newButtonConfig = {
  parts: ["root", "text", "spinner", "icon"],
  baseStyle: {
    root: {
      my: "s",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      alignSelf: "center",
    },
  },
  sizes: {
    xs: {
      root: {
        py: "",
        px: "m",
        borderRadius: "s",
      },
      text: {
        variant: "btn4",
      },
      spinner: {
        my: "2xs",
        size: "s",
      },
      icon: {
        size: "s",
      },
    },
    s: {
      root: {
        py: "xs",
        px: "xs",
        borderRadius: "s",
      },
      text: {
        variant: "btn3",
      },
      spinner: {
        size: "m",
      },
      icon: {
        size: "s",
      },
    },
    m: {
      root: {
        py: "s",
        px: "s",
        borderRadius: "m",
      },
      text: {
        variant: "btn2",
      },
      spinner: {
        size: "m",
      },
      icon: {
        size: "m",
      },
    },
    l: {
      root: {
        py: "m",
        px: "m",
        borderRadius: "l",
      },
      text: {
        variant: "btn1",
      },
      spinner: {
        size: "l",
      },
      icon: {
        size: "m",
      },
    },
  },
  variants: {
    primary: {
      root: {
        activeBackgroundColor: "primaryLight",
        backgroundColor: "primaryLight",
      },
      text: { size: "btn2", color: "white" },
      spinner: {
        color: "neutral.50",
      },
      icon: {
        color: "neutral.50",
      },
    },
    secondary: {
      root: {
        activeBackgroundColor: "buttonBackground",
        backgroundColor: "buttonBackground",
      },
      text: { color: "black", fontWeight: "normal" },
      spinner: {
        color: "danger",
      },
      icon: {
        color: "neutral.900",
      },
    },
    upgrade: {
      root: {
        activeBackgroundColor: "vertLight",
        backgroundColor: "white",
      },
      text: { color: "vert", fontWeight: "semibold" },
      spinner: {
        color: "danger",
      },
      icon: {
        color: "neutral.900",
      },
    },
    outline: {
      root: {
        activeBackgroundColor: {
          light: "primary.50",
          dark: "primary.800",
        },
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        borderWidth: 1,
        borderColor: "gray4",
      },
      text: { color: "brand" },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "primary.500",
      },
    },
    share: {
      root: {
        activeBackgroundColor: {
          light: "vert",
          dark: "vert",
        },
        backgroundColor: {
          light: "vert",
          dark: "vert",
        },
      },
      text: {
        color: "neutral.100",
      },
    },
    danger: {
      root: {
        activeBackgroundColor: {
          light: "danger",
          dark: "primary.800",
        },
        backgroundColor: {
          light: "danger",
          dark: "neutral.800",
        },
        borderWidth: 0,
      },
      text: { color: "white" },
      spinner: {
        color: "neutral.100",
      },
      icon: {
        color: "white",
      },
    },
    success: {
      root: {
        my: "n",
        py: "n",
        px: "s",
        width: 120,
        height: 40,
        borderRadius: "full",
        activeBackgroundColor: {
          light: "success",
          dark: "primary.800",
        },
        backgroundColor: {
          light: "success",
          dark: "neutral.800",
        },
      },
      text: {
        color: "white",
      },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "white",
      },
    },
  },
  defaults: {
    size: "l",
  },
};
export const newTextConfig = {
  baseStyle: {
    color: {
      light: "black",
      dark: "neutral.50",
    },
    scaleFontSize: true,
    letterSpacing: "m",
  },
  variants: {
    h1: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "8xl",
      lineHeight: "12xl",
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "5xl",
      lineHeight: "8xl",
    },
    t1: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "2xl",
      lineHeight: "7xl",
    },
    t2: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "l",
      lineHeight: "3xl",
    },
    st1: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "m",
      lineHeight: "2xl",
    },
    st2: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "s",
      lineHeight: "l",
    },
    st3: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "m",
      lineHeight: "l",
    },
    p1: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "m",
      lineHeight: "xl",
    },
    p2: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "s",
      lineHeight: "l",
    },
    p3: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "xs",
      lineHeight: "l",
    },
    btn1: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "m",
      lineHeight: "2xl",
    },
    btn2: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "s",
      lineHeight: "l",
    },
    btn3: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "xs",
      lineHeight: "m",
    },
    btn4: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "2xs",
      lineHeight: "xs",
    },
    caption: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "xs",
      lineHeight: "m",
    },
    tabLabel: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "2xs",
      lineHeight: "2xs",
    },
  },
  defaults: {
    variant: "p1",
  },
};

export const newInputConfig = {
  parts: ["root", "input", "text", "icon", "errorText"],
  baseStyle: {
    root: {
      flexDirection: "row",
      alignSelf: "flex-start",
      borderColor: "white",
      focusBorderColor: "primary",
      errorBorderColor: "danger",
      errorMessageColor: "danger",
    },
    text: {
      color: {
        light: "black",
        dark: "neutral.50",
      },
      fontFamily: "body",
      fontWeight: "normal",
    },
    icon: {
      alignSelf: "center",
      color: {
        light: "neutral.400",
        dark: "neutral.600",
      },
    },
    input: {
      placeholderTextColor: {
        light: "gray8",
        dark: "gray8",
      },
      selectionColor: "blueNavigation",
    },
    errorText: {
      variant: "caption",
      color: "danger",

      marginLeft: "m",
    },
  },
  sizes: {
    xs: {
      root: {
        py: "2xs",
        px: "xs",
        borderRadius: "s",
      },
      text: {
        variant: "btn4",
      },
      input: {
        mx: "2xs",
      },
      icon: {
        size: "s",
      },
    },
    s: {
      root: {
        py: "xs",
        px: "xs",
        borderRadius: "s",
      },
      input: {
        mx: "2xs",
      },
      text: {
        variant: "btn3",
      },
      icon: {
        size: "s",
      },
    },
    m: {
      root: {
        py: "s",
        px: "s",
        borderRadius: "m",
      },
      input: {
        mx: "xs",
      },
      text: {
        variant: "btn2",
      },
      icon: {
        size: "m",
      },
    },
    l: {
      root: {
        py: "m",
        px: "s",
        borderRadius: "m",
      },
      input: {
        mx: "xs",
      },
      text: {
        variant: "btn1",
      },
      icon: {
        size: "m",
      },
    },
  },
  variants: {
    default: {
      root: {
        backgroundColor: {
          light: "white",
          dark: "neutral.900",
        },
        borderWidth: 0,
      },
    },
    secondary: {
      root: {
        backgroundColor: {
          light: "white",
          dark: "neutral.900",
        },
        borderWidth: 0,
      },
      text: {
        fontFamily: "body",
        fontWeight: "medium",
        root: {
          backgroundColor: "white",
        },

        color: {
          light: "blueNavigation",
          dark: "neutral.50",
        },
      },
    },
    form: {
      root: {
        px: "s",
        py: "m",
        my: "z",
        backgroundColor: "white",
      },
      text: {
        fontFamily: "body",
        fontSize: "m",
        color: {
          light: "black",
          dark: "neutral.50",
        },
      },
      input: {
        backgroundColor: {
          light: "white",
          dark: "neutral.800",
        },
        placeholderTextColor: {
          light: "gray5",
          dark: "neutral.500",
        },
      },
      icon: {
        color: {
          light: "gray5",
          dark: "neutral.500",
        },
      },
    },
  },
  defaults: {
    size: "m",
    variant: "default",
  },
};
export const newTextLinkConfig = {
  parts: ["root", "text"],
  baseStyle: {
    root: {
      activeOpacity: 0.9,
    },
    text: {
      color: "primary.500",
      fontFamily: "body",
      FontSize: "m",
    },
  },
  sizes: {
    xs: {
      root: {},
      text: {
        variant: "h2",
      },
    },
    s: {
      root: {},
      text: {},
    },
    m: {
      root: {},
      text: {},
    },
    l: {
      root: {},
      text: {},
    },
  },
  variants: {
    default: {
      text: {
        color: "gray8",
        marginLeft: "m",
        textDecorationLine: "underline",
      },
    },
    underlined: {
      text: {
        color: "white",
        textDecorationLine: "underline",
      },
    },
    primary: {
      text: {
        color: "blueNavigation",
        inactiveColor: "red",
      },
    },
    secondary: { text: { color: "black", textDecorationLine: "underline" } },
    header: { text: { color: "white" } },
    danger: {
      root: {
        alignItems: "flex-start",
        alignSelf: "center",
      },
      text: {
        my: "m",
        color: "danger",
        textDecorationLine: "underline",
      },
    },
    button: {
      text: {
        my: "s",
        color: "blueNavigation",
        inactiveColor: "red",
      },
    },
    link: {
      text: {
        my: "s",
        color: "blueNavigation",
        textDecorationLine: "underline",
        inactiveColor: "red",
      },
    },
    save: { text: { color: "white" } },
  },
  defaults: {
    size: "m",
    variant: "underlined",
  },
};

export const newIconConfig = {
  baseStyle: {
    color: {
      light: "neutral.900",
      dark: "neutral.50",
    },
  },
  sizes: {
    n: {
      size: 8,
    },
    s: {
      size: 10,
    },
    m: {
      size: 15,
    },
    l: {
      size: 20,
    },
    xl: {
      size: 30,
    },
    xxl: {
      size: 60,
    },
  },
  defaults: {
    size: "m",
  },
};
