module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: `.env.${process.env.APP_ENV || 'development'}`,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@pages': './src/pages',
          '@ui': './src/ui',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@theme': './src/theme',
          '@redux': './src/redux',
          '@dtos': './src/dtos',
          '@routes': './src/routes',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
