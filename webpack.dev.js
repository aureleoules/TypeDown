var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './client/js/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            { test: /\.json$/, loader: "json-loader" },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            }
            
        ]
    },
    output: {
        path: 'dist',
        filename: 'js/bundle.min.js',
        sourceMapFilename: 'bundle.js.map'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
