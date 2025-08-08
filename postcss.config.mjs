// postcss.config.js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'color-functional-notation': { preserve: false },
        'oklab-function': { preserve: false }
      }
    }
  },
};

export default config;
