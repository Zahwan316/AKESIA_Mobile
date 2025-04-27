const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { withNativeWind } = require("nativewind/metro");
const path = require("path")

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  // projectRoot: path.resolve(__dirname),
  // watchFolders: [
  //   path.resolve(__dirname, 'src'),
  //   // tambahkan folder lainnya yang diperlukan
  // ],
  // resolver: {
  //   blockList: /.*\/node_modules\/.*/,
  // },
};

//module.exports = withNativeWind(config);
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
