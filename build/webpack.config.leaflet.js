var webpack = require('webpack');
module.exports = {
    //页面入口文件配置
    entry: {},
    //入口文件输出配置
    output: {
        path: './dist/',
        filename: 'iclient9-leaflet.js'
    },

    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.css']
    },
    externals: {
        'echarts': 'echarts',
        'leaflet': 'L'
    },
    module: {
        //加载器配置
        loaders: [
            // {test: /\.css$/, loader: 'style-loader!css-loader'},
            //{test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader")},
            //{test: /\.(png|jpg)$/, loader: "file-loader?name=images/[name].[ext]"}
        ]
    },

};