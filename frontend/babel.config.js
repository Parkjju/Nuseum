module.exports = {
    presets: ['@babel/env'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.js', '.jsx', '.json', '.svg', '.png'],
                // Note: you do not need to provide aliases for same-name paths immediately under /src/
                alias: {
                    '~': './src',
                    '@assets': './src/assets',
                },
            },
        ],
    ],
};
