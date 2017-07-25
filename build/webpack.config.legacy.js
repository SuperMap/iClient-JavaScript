var webpack = require('webpack');
var pkg = require('../package.json');
var banner = `
    iclient9-legacy.(${pkg.homepage})
    Copyright© 2000-2017 SuperMap Software Co. Ltd
    license: ${pkg.license}
    version: v${pkg.version}
`;

module.exports = {
    //页面入口文件配置
    entry: {},
    //入口文件输出配置
    output: {
        path: __dirname + '/../dist',
        filename: 'iclient9-legacy.js'
    },

    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    externals: {
        'echarts': 'echarts',
        'mapv': 'mapv',
        'elasticsearch': 'elasticsearch',
        '../legacy/libs/SuperMap_Basic-8.1.1-14426.js': 'SuperMap',
        '../legacy/libs/SuperMap_Visualization-8.1.1-14426.js': 'SuperMap'
    },
    module: {
        rules: [{
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]

};