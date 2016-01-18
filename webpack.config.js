var path = require('path');
module.exports = {
    entry: {
        diary: path.join(__dirname, 'assets', 'diary', 'app.js'),
        rufie: path.join(__dirname, 'assets', 'rufie', 'app.js')
    },
    output: {
        path: path.join(__dirname, 'static', 'js'),
        filename: '[name].js'
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
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015'],
                    //plugins: ['react-transform'],
                    //extra: {
                    //    'react-transform': [{
                    //        target: 'react-transform-hmr',
                    //        imports: ['react'],
                    //        locals: ['module']
                    //    }]
                    //}
                }
            }
        ]
    }
};
