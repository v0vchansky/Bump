module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        'nativewind/babel',
        [
            'babel-plugin-root-import',
            {
                rootPathPrefix: '~',
                rootPathSuffix: 'src',
            },
        ],
        ['const-enum', { transform: 'constObject' }],
    ],
};
