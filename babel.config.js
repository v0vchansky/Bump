module.exports = {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-env'],
    plugins: [
        [
            'babel-plugin-root-import',
            {
                rootPathPrefix: '~',
                rootPathSuffix: 'src',
            },
        ],
        'react-native-reanimated/plugin',
        'date-fns',
    ],
};
