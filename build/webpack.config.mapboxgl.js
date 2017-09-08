var webpack = require('webpack');
var pkg = require('../package.json');
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
        filename: 'iclient9-mapboxgl.js'
    },

    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    externals: {
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()',
        'mapbox-gl': 'mapboxgl',
        'mapv':  "function(){try{return mapv}catch(e){return {}}}()",
        'elasticsearch': 'function(){try{return elasticsearch}catch(e){return {}}}()'
    },

    module: {
        noParse: /[\/\\]node_modules[\/\\]mapbox-gl[\/\\]dist[\/\\]mapbox-gl\.js$/,
        rules: [{
            //图片小于30k采用base64编码
            test: /\.(png|jpg|jpeg|gif|woff)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 30000
                }
            }]
        },{
            test: /\.js/,
            exclude: /node_modules[\/\\]proj4|classic/,
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