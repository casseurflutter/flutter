module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  plugins: [
    "jest",
    "@typescript-eslint",
    "react-hooks",
    "react",
    "simple-import-sort",
    "import",
    "@react-native-community",
    "react-native",
    "unused-imports",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      "babel-module": {},
    },
  },
  env: {
    browser: false,
    node: true,
    jest: true,
    es6: true,
    "react-native/react-native": true,
  },
  rules: {
    "react/prop-types": 0,
    "react/no-multi-comp": 0,
    "react/jsx-filename-extension": 0,
    "react/no-unescaped-entities": 0,
    "react/forbid-foreign-prop-types": 0,
    "react/display-name": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "useRecoilCallback",
      },
    ],
    /*
     * simple-import-sort seems to be the most stable import sorting currently,
     * disable others
     */
    "simple-import-sort/imports": "warn",
    "sort-imports": "off",
    "import/order": "off",

    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/default": 0,

    "import/no-deprecated": "warn",
    "import/no-duplicates": "error",

    "unused-imports/no-unused-imports": "warn",
  },
};
