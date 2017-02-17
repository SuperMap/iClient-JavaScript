var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {


    //页面入口文件配置
    entry: {},
    //入口文件输出配置
    output: {
        path: './dist/',
        filename: 'SuperMapiClient9 for OL3.js'
    },

    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.css']
    },

    module: {
        //加载器配置
        loaders: [
            // {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(png|jpg)$/, loader: "file-loader?name=images/[name].[ext]"}
        ],
        noParse: '/node_modules/openlayers/dist/ol.js'
    },

    //插件项
    plugins: [
        new ExtractTextPlugin("SuperMapiClient9 for OL3.css")
    ]
};