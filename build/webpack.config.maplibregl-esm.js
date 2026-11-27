/* MapLibre 端 ESM 构建：产出唯一一份 iclient-maplibregl.mjs（含 .min.mjs）。
 * 核心 maplibre-gl 始终以【裸名】'maplibre-gl' 模块 external，不打入产物：
 * - 浏览器直引：页面用 import map 把裸名映到核心的真实 URL（CDN / 自托管 / 本地均可）；
 * - npm + 打包器（webpack5/vite/rollup）：按裸名从 node_modules 解析，与应用核心去重单例。
 * 浏览器与 npm 消费的是同一份 mjs，不再产出相对路径版 / global 版，也不随产物分发核心文件，
 * 核心三件套（maplibre-gl.mjs / -worker.mjs / .css）由使用方按核心版本自行部署。
 * 可选可视化库沿用页面全局访问（try/catch 兜底为 {}），未引入可选库不阻断基础导入；
 * 例外：L7 渲染库（maplibregl-l7-render）不做静态 module external——v6 用 var external 指向一个
 * 懒读全局 L7 的 Proxy（见下方 externals），不用 L7 的页面 import map 无需映射该裸名、也不下载 render；
 * L7 页面在业务 module 中先 import render mjs 并赋给 window.L7 即可（ESM 导入先于业务代码求值，
 * Proxy 在真正 new L7Layer 时才读全局）；传统 .js 构建走 webpack.config.maplibregl.js，互不影响。 */
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const configBase = require('./webpack.config.base');
const LintExportWebpackPlugin = require('./lint-export-webpack-plugin');

const libName = 'maplibregl';
const productName = 'iclient-maplibregl';
const distDir = `${__dirname}/../dist/${libName}/`;

// 可选依赖：与传统构建一致的页面全局表达式 external（含 base externals）。
// L7 特殊：表达式不是直接读全局，而是返回一个懒读 globalThis.L7 的 Proxy——
// 产物求值阶段（业务 module 的 import 阶段）全局 L7 尚不存在也无妨，真正用到时（new L7Layer）
// 才穿透读取；不使用 L7 的页面从不访问该 Proxy。
const optionalVarExternals = Object.assign({}, configBase.externals, {
  three: 'function(){try{return THREE}catch(e){return {}}}()',
  'deck.gl': '(function(){try{return DeckGL}catch(e){return {}}})()',
  'webgl-debug': '(function(){try{return webgl-debug}catch(e){return {}}})()',
  'luma.gl': '(function(){try{return luma}catch(e){return {}}})()',
  xlsx: 'function(){try{return XLSX}catch(e){return {}}}()',
  jsonsql: 'function(){try{return jsonsql}catch(e){return {}}}()',
  'xml-js': 'function(){try{return convert}catch(e){return {}}}()',
  '@antv/g2': 'function(){try{return G2}catch(e){return {}}}()',
  './L7/l7-render':
    '(function(){var g=typeof globalThis!=="undefined"?globalThis:(typeof window!=="undefined"?window:self);return new Proxy({},{get:function(o,p){if(!g.L7){return o[p]}if(p==="__esModule"){return true}if(p==="default"){return g.L7}return g.L7[p]}})})()'
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
  // 核心走静态裸名 module external；L7 渲染库走 var external（懒 Proxy，见 optionalVarExternals）：
  // 不映 import map、不挂全局都不影响非 L7 页面；L7 页面先 import render mjs 并赋给 window.L7。
  // 其余可选库同样以 var 读页面全局，缺失时 try/catch 兜底为 {}。
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
    // ESM 产物不打入 L7 render：用占位模块替换，页面导入 render 后显式调用 setL7Render 注入。
    // 不在 externals 里写顶层 await import，避免所有页面等待 L7 解析、也避免 ES2019 目标冲突。
    new webpack.NormalModuleReplacementPlugin(
      /(^|\/)L7\/l7-render\.mjs$/,
      path.resolve(__dirname, '../src/maplibregl/overlay/L7/l7-render-stub.mjs')
    ),
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
