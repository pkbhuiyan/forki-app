
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};


/*

In webcpack we have, 4 things

1. Entry point
2. output
3. loaders
4. plugins


npm run dev (devlopment verison bundling)
npm run prod
npm run start (webpack-dev-server)

'/dist' folder is going for PRODUCTION


*there are fly version which is not going to save on disk
*prod/dev will get minified/bundling js





*/
 
