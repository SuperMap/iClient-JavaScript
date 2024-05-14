const webpack = require('webpack');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const LintExportWebpackPlugin = require('./lint-export-webpack-plugin');
const chalk = require('chalk');
const pkg = require('../package.json');

function compareDependencies(pkgName, dependenciesToCompare, rootDependencies = pkg.dependencies) {
  Object.keys(dependenciesToCompare).forEach(name => {
    if (!rootDependencies[name] || rootDependencies[name] !== dependenciesToCompare[name]) {
      if (rootDependencies[name].includes('file:src/')){
        return;
      }
      console.log(chalk.red(`ERROR [${pkgName}]: The dependency ${name} version can not match in root package.json!\n`));
    }
  });
}

function checkRootDependencies(dependenciesToCompare, rootDependencies = pkg.dependencies) {
  const clientDepsList = Object.values(dependenciesToCompare);
  const clientNames = Object.keys(dependenciesToCompare);
  Object.keys(rootDependencies).forEach(name => {
    if (rootDependencies[name].includes('file:src/')){
      return;
    }
    if (!clientDepsList.some(deps => Object.keys(deps).some(item => item === name))) {
      console.log(chalk.red(`ERROR: The dependency ${name} version can not match in (${clientNames.join('|')}) package.json!\n`));
    }
  });
}

const packageToClients = ['common', 'classic', 'leaflet', 'openlayers', 'mapboxgl', 'maplibregl'];

const clientDepencies = packageToClients.reduce((list, client) => {
  // eslint-disable-next-line import/no-dynamic-require
  const clientPkg = require(`../src/${client}/package.json`);
  list[clientPkg.name] = clientPkg.dependencies;
  return list;
}, {});

for (const clientName in clientDepencies) {
  compareDependencies(clientName, clientDepencies[clientName]);
}

checkRootDependencies(clientDepencies);

//包版本(ES6或者ES5)
let moduleVersion = process.env.moduleVersion || 'es5';

//打包公共配置
module.exports = {
    target:  moduleVersion === 'es5' ? ['es5'] : undefined,
    moduleVersion: moduleVersion,

    mode: 'production',
    //页面入口文件配置
    entry: moduleVersion === "es5" ? [
      `${__dirname}/../node_modules/core-js/actual/symbol/async-iterator.js`, `${__dirname}/../node_modules/core-js/actual/object/assign.js`
    ] : [],

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
        '@antv/g6': 'function(){try{return G6}catch(e){return {}}}()',
        '@tensorflow/tfjs': 'function(){try{return tf}catch(e){return {}}}()',
        'video.js': 'function(){try{return videojs}catch(e){return {}}}()',
        'flv.js': 'function(){try{return flvjs}catch(e){return {}}}()',
        'videojs-flvjs-es6': 'function(){try{return;}catch(e){return {}}}()'
    },

    module: {
        rules: {
            img: {
                //图片小于80k采用base64编码
                test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf)$/,
                type: 'asset',
                parser: {
                  dataUrlCondition: {
                    maxSize: 150000
                  }
                }
            },
            css: {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        }
    },

    bannerInfo: function (libName) {
        return `
         ${libName}
         Copyright© 2000 - 2024 SuperMap Software Co.Ltd
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
