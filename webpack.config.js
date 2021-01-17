const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
        }
    },
    plugins: [
    ]
};