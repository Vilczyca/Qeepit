const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    ...defaultConfig,
    transformer: {
        ...defaultConfig.transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'), // Only if using SVG
    },
    resolver: {
        ...defaultConfig.resolver,
        assetExts: [
            ...defaultConfig.resolver.assetExts,
            'bin', 'mp4', 'jpg', 'jpeg', 'png', 'svg', // Add your custom extensions
        ],
        sourceExts: [
            ...defaultConfig.resolver.sourceExts,
            'js', 'jsx', 'ts', 'tsx', 'mjs', 'svg', // Ensure all extensions are included
        ],
        extraNodeModules: new Proxy({}, {
            get: (target, name) => {
                if (name === 'react' || name === 'react-native') {
                    return path.resolve(__dirname, 'node_modules', name);
                }
                return path.join(process.cwd(), 'node_modules', name);
            },
        }),
    },
    watchFolders: [
        path.resolve(__dirname, '../shared'), // Only if you have a shared folder
    ],
};