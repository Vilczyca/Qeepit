module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ["./"],
                    alias: {
                        '@shared': '../shared',
                        '@platform': './platform',
                    },
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
                }
            ],
            [
                'dotenv-import',
                {
                    moduleName: '@env',
                    path: '.env',
                }
            ]
        ],
    };
};
