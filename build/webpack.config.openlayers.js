var webpack = require('webpack');
var pkg = require('../package.json');
var banner = `
    iclient9-openlayers.(${pkg.homepage})
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
        filename: 'iclient9-openlayers.js'
    },

    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    externals: {
        'echarts': 'echarts',
        'openlayers/dist/ol-debug': 'ol',
        'mapv': 'mapv',
        'elasticsearch': 'elasticsearch'
    },

    module: {
        noParse: /[\/\\]node_modules[\/\\]openlayers[\/\\]dist[\/\\]ol\.js$/,
        rules: [{
            test: /MapvLayer\.js/,
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