var path = require('path');
module.exports = {
    entry: './app/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'diary.js'
    },
    externals: {
        'underscore': '_',
        'bluebird': 'Promise',
        'virtual-dom': 'virtualDom'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader'
            },
            {
                test: /\.tpl/,
                loader: 'tpl-to-vdom-loader'
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            }
        ]
    }
};