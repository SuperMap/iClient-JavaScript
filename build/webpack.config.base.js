const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const LintExportWebpackPlugin = require('./lint-export-webpack-plugin');
const pkg = require('../package.json');

//包版本(ES6或者ES5)
let moduleVersion = process.env.moduleVersion || 'es5';

//打包公共配置
module.exports = {
    target:  moduleVersion === 'es5' ? ['es5'] : undefined,
    moduleVersion: moduleVersion,

    mode: 'production',
    //页面入口文件配置
    entry: {},

    output: function (libName, productName) {
        let fileName = moduleVersion === 'es6' ? `${productName}-${moduleVersion}` : `${productName}`;
        return {
            path: `${__dirname}/../dist/${libName}/`,
            filename: `${fileName}.js`,
            chunkFormat :'commonjs'
        };
    },

    //是否启用压缩
    optimization: {
        minimize: false,
        emitOnErrors: false
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
        echarts: 'function(){try{return echarts}catch(e){return {}}}()',
        mapv: 'function(){try{return mapv}catch(e){return {}}}()',
        elasticsearch: 'function(){try{return elasticsearch}catch(e){return {}}}()',
        '@tensorflow/tfjs': 'function(){try{return tf}catch(e){return {}}}()'
    },

    module: {
        rules: {
            img: {
                //图片小于80k采用base64编码
                test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 150000
                        }
                    }
                ]
            },
            css: {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        }
    },

    bannerInfo: function (libName) {
        return `
         ${libName}.(${pkg.homepage})
         Copyright© 2000 - 2022 SuperMap Software Co.Ltd
         license: ${pkg.license}
         version: v${pkg.version}
        `;
    },

    plugins: function (libName, productName) {
        return [
            new LintExportWebpackPlugin(libName),
            new webpack.BannerPlugin(this.bannerInfo(productName)),
            new MiniCssExtractPlugin({filename:`./${productName}.css`}),
            new ESLintPlugin({ failOnError: true, files: 'src' })
        ];
    }
};
