var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pkg = require('../package.json');
var packageName = "iclient9-openlayers";
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
        filename: packageName + ".js"
    },

    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    externals: {
        'openlayers/dist/ol-debug': 'ol',
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()',
        'mapv':  "function(){try{return mapv}catch(e){return {}}}()",
        'elasticsearch': 'function(){try{return elasticsearch}catch(e){return {}}}()',
        '@turf/turf':  "function(){try{return turf}catch(e){return {}}}()",
    },

    module: {
        noParse: /[\/\\]node_modules[\/\\]openlayers[\/\\]dist[\/\\]ol\.js$/,
        rules: [{
            //图片小于100k采用base64编码
            test: /\.(png|jpg|jpeg|gif|woff)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 30000
                }
            }]
        }, {
            test: /\.js$/,
            exclude: /classic/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: [
                    'transform-class-properties',
                ]
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: {
                    loader: 'css-loader',
                }
            }),
        }],
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new ExtractTextPlugin('/../dist/' + packageName + ".css")
    ]
};