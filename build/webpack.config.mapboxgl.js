var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pkg = require('../package.json');
var packageName = "iclient9-mapboxgl";
var banner = `
    iclient9-mapboxgl.(${pkg.homepage})
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
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()',
        'three': 'function(){try{return THREE}catch(e){return {}}}()',
        'mapbox-gl': 'mapboxgl',
        'mapv': "function(){try{return mapv}catch(e){return {}}}()",
        'elasticsearch': 'function(){try{return elasticsearch}catch(e){return {}}}()'
    },

    module: {
        noParse: /[\/\\]node_modules[\/\\]mapbox-gl[\/\\]dist[\/\\]mapbox-gl\.js$/,
        rules: [{
            //图片小于80k采用base64编码
            test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 80000
                }
            }]
        }, {
            test: [/\.js$/],
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
                failOnError: true
            }
        }, {
            test: /\.js/,
            exclude: /node_modules[\/\\]proj4|classic/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: {
                    loader: 'css-loader'
                }
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new ExtractTextPlugin('/../dist/' + packageName + ".css"),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};