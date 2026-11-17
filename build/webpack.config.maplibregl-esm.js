/* MapLibre 端 ESM 构建：产出唯一一份 iclient-maplibregl.mjs（含 .min.mjs）。
 * 核心 maplibre-gl 始终以【裸名】'maplibre-gl' 模块 external，不打入产物：
 * - 浏览器直引：页面用 import map 把裸名映到核心的真实 URL（CDN / 自托管 / 本地均可）；
 * - npm + 打包器（webpack5/vite/rollup）：按裸名从 node_modules 解析，与应用核心去重单例。
 * 浏览器与 npm 消费的是同一份 mjs，不再产出相对路径版 / global 版，也不随产物分发核心文件，
 * 核心三件套（maplibre-gl.mjs / -worker.mjs / .css）由使用方按核心版本自行部署。
 * 可选可视化库沿用页面全局访问（try/catch 兜底为 {}），未引入可选库不阻断基础导入；
 * 传统 .js 构建走 webpack.config.maplibregl.js / -umd.js，与本文件互不影响。 */
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const configBase = require('./webpack.config.base');
const LintExportWebpackPlugin = require('./lint-export-webpack-plugin');

const libName = 'maplibregl';
const productName = 'iclient-maplibregl';
const distDir = `${__dirname}/../dist/${libName}/`;

// 可选依赖：与传统构建一致的页面全局表达式 external（含 base externals）
const optionalVarExternals = Object.assign({}, configBase.externals, {
  three: 'function(){try{return THREE}catch(e){return {}}}()',
  'deck.gl': '(function(){try{return DeckGL}catch(e){return {}}})()',
  'webgl-debug': '(function(){try{return webgl-debug}catch(e){return {}}})()',
  'luma.gl': '(function(){try{return luma}catch(e){return {}}})()',
  xlsx: 'function(){try{return XLSX}catch(e){return {}}}()',
  jsonsql: 'function(){try{return jsonsql}catch(e){return {}}}()',
  'xml-js': 'function(){try{return convert}catch(e){return {}}}()',
  './L7/l7-render': 'function(){try{return L7}catch(e){return {}}}()',
  '@antv/g2': 'function(){try{return G2}catch(e){return {}}}()'
});

module.exports = {
  experiments: {
    outputModule: true
  },
  // 语法上限 ES2019：webpack4 消费方不转译 node_modules，其 acorn 无法解析 ?? / ?.（ES2020）
  target: ['web', 'es2019'],
  mode: configBase.mode,
  // 数组入口：CSS 在前，具名导出入口 namespace.js 在最后（库导出取最后一个模块的导出）
  entry: [
    `${__dirname}/../src/maplibregl/css/index.js`,
    `${__dirname}/../src/maplibregl/namespace.js`
  ],
  output: {
    path: distDir,
    filename: `${productName}.mjs`,
    module: true,
    library: {
      type: 'module'
    },
    chunkFormat: 'module'
  },
  optimization: configBase.optimization,
  performance: configBase.performance,
  resolve: {
    extensions: ['.js', '.mjs', '.json', '.css']
  },
  // 核心走 module external（裸名，浏览器由 import map 解析、打包器由 node_modules 解析），
  // 可选库仍以 var 读页面全局
  externalsType: 'module',
  externals: [
    { 'maplibre-gl': 'maplibre-gl' },
    function externalOptionalGlobals(data, callback) {
      const request = data.request;
      if (Object.prototype.hasOwnProperty.call(optionalVarExternals, request)) {
        return callback(null, optionalVarExternals[request], 'var');
      }
      callback();
    }
  ],
  module: {
    rules: [
      configBase.module.rules.img,
      {
        // src 全量降级：保留 ESM 模块语法（modules:false），语法目标与模块格式分离配置
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { modules: false, targets: { esmodules: true } }]]
        }
      },
      {
        // 依赖通用语法兜底：无论哪个包（含未来新增依赖），其 ES2020+ 运算符一律降级，
        // 保证产物不超过 webpack4 acorn 的 ES2019 解析上限。
        // 仅挂 4 个运算符插件（非全量 preset-env），不改变模块格式、不造成体积膨胀。
        test: /\.m?js$/,
        include: /node_modules/,
        loader: 'babel-loader',
        options: {
          sourceType: 'unambiguous',
          cacheDirectory: true,
          plugins: [
            '@babel/plugin-transform-nullish-coalescing-operator',
            '@babel/plugin-transform-logical-assignment-operators',
            '@babel/plugin-transform-optional-chaining',
            '@babel/plugin-transform-numeric-separator'
          ]
        }
      },
      configBase.module.rules.css
    ]
  },
  plugins: [
    new LintExportWebpackPlugin(libName),
    new webpack.BannerPlugin(configBase.bannerInfo(productName)),
    new MiniCssExtractPlugin({ filename: `./${productName}.css` }),
    new CopyPlugin({
      patterns: [
        { from: `${__dirname}/../dist/resources/symbols`, to: path.join(distDir, 'resources/symbols') }
      ]
    })
  ]
};
