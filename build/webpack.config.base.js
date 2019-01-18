var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');

//包版本(ES6或者ES5)
let moduleVersion = process.env.moduleVersion || "es5";

//打包公共配置
module.exports = {

    moduleVersion: moduleVersion,

    mode: "production",
    //页面入口文件配置
    entry: {},

    output: function (libName, productName) {
        let fileName = moduleVersion === 'es6' ? `${productName}-${moduleVersion}` : `${productName}`;
        return {
            path: `${__dirname}/../dist/${libName}/`,
            filename: `${fileName}.js`
        }
    },

    //是否启用压缩
    optimization: {
        minimize: false
    },
    //不显示打包文件大小相关警告
    performance: {
        hints: false
    },

    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },

    externals: {
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()',
        'mapv': "function(){try{return mapv}catch(e){return {}}}()",
        'elasticsearch': 'function(){try{return elasticsearch}catch(e){return {}}}()'
    },

    module: {
        rules: {
            img: {
                //图片小于80k采用base64编码
                test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 150000
                    }
                }]
            },

            eslint: {
                test: [/\.js$/],
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    failOnError: true
                }
            },

            css: {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader'
                    }
                })
            }
        }
    },


    bannerInfo: function (libName) {
        return `
         ${libName}.(${pkg.homepage})
         Copyright© 2000 - 2019 SuperMap Software Co.Ltd
         license: ${pkg.license}
         version: v${pkg.version}
        `;
    },

    plugins: function (libName, productName) {
        return [
            new webpack.BannerPlugin(this.bannerInfo(productName)),
             new ExtractTextPlugin(`./${productName}.css`),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    }
};