var webpack = require('webpack');
module.exports = {
    //页面入口文件配置
    entry: {},
    //入口文件输出配置
    output: {
        path: './dist/',
        filename: 'iclient9-openlayers.js'
    },

    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.css']
    },
    externals: {
        'echarts': true,
        'openlayers': true
    },

    module: {
        noParse: /[\/\\]node_modules[\/\\]openlayers[\/\\]dist[\/\\]ol\.js$/,
        //加载器配置
        loaders: [
            
            // {test: /\.css$/, loader: 'style-loader!css-loader'},
            //{test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader")},
            //{test: /\.(png|jpg)$/, loader: "file-loader?name=images/[name].[ext]"}
        ],
    },
};