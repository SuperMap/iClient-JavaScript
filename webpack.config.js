var webpack = require('webpack');
module.exports = {
    //页面入口文件配置
    entry: {},
    //入口文件输出配置
    output: {
        path: __dirname + '/dist',
        filename: 'iclient9.js'
    },
    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    module: {},

    //插件项
    plugins: []
};