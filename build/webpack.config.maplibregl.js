const configBase = require('./webpack.config.base');
//端名
const libName = 'maplibregl';
//产品包名
const productName = 'iclient-maplibregl';

module.exports = {
  target: configBase.target,
  mode: 'development' || configBase.mode,
  devtool: 'inline-cheap-module-source-map',
  //页面入口文件配置
  entry: configBase.entry,
  //入口文件输出配置
  output: configBase.output(libName, productName),
  //是否启用压缩
  optimization: configBase.optimization,
  //不显示打包文件大小相关警告
  performance: configBase.performance,
  //其它解决方案配置
  resolve: configBase.resolve,

  externals: Object.assign({}, configBase.externals, {
    'maplibre-gl': 'maplibregl',
    three: 'THREE',
    'webgl-debug': '(function(){try{return webgl-debug}catch(e){return {}}})()'
  }),

  module: {
    noParse: /[\/\\]node_modules[\/\\]maplibre-gl[\/\\]dist[\/\\]maplibre-gl\.js$/,
    rules: (function () {
      let moduleRules = [];
      moduleRules.push(configBase.module.rules.img);
      const babelConfig = {
        test: [/\.js$/],
        include: /node_modules[\/\\](proj4|maplibre-gl)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                absoluteRuntime: false,
                corejs: false,
                helpers: false,
                regenerator: true,
                useESModules: false
              }
            ],
            '@babel/plugin-proposal-nullish-coalescing-operator'
          ]
        }
      };
      configBase.moduleVersion === 'es6';
      moduleRules.push(babelConfig);
      moduleRules.push(configBase.module.rules.css);
      return moduleRules;
    })()
  },
  plugins: configBase.plugins(libName, productName)
};
