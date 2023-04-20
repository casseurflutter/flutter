module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "~screens": "./src/screens/index.ts",
            "~api": "./src/api/index.ts",
            "~navigation": "./src/navigation/index.ts",
            "~models": "./src/models/index.ts",
            "~utils": "./src/utils/index.ts",
            "~hooks": "./src/hooks/index.ts",
            "~components": "./src/components/index.ts",
            "~constants": "./src/constants/index.ts",
          },
        },
      ],
    ],
  };
};
