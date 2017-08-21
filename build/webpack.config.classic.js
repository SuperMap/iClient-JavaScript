var webpack = require('webpack');
var pkg = require('../package.json');
var banner = `
    iclient-classic.(${pkg.homepage})
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
        filename: 'iclient-classic.js'
    },

    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    externals: {
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()',
        'mapv': "function(){try{return mapv}catch(e){return {}}}()",
        'elasticsearch': 'function(){try{return elasticsearch}catch(e){return {}}}()',
        '../classic/libs/SuperMap_Basic-8.1.1-15221.js': 'SuperMap',
        '../classic/libs/SuperMap_Visualization-8.1.1-15221.js': 'SuperMap'
    },
    module: {
        rules: [{
            test: /\.js/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: [
                    'transform-class-properties',
                ]
            }
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]

};