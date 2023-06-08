const configBase = require('./webpack.config.base');
//端名
const libName = 'mapboxgl';
//产品包名
const productName = 'iclient-mapboxgl';

module.exports = {
  target: configBase.target,
  mode: configBase.mode,
  //页面入口文件配置
  entry: [...configBase.entry, `${__dirname}/../src/mapboxgl/namespace.js` ,`${__dirname}/../src/mapboxgl/css/index.js`],
  //入口文件输出配置
  output: configBase.output(libName, productName),
  //是否启用压缩
  optimization: configBase.optimization,
  //不显示打包文件大小相关警告
  performance: configBase.performance,
  //其它解决方案配置
  resolve: configBase.resolve,

  externals: Object.assign({}, configBase.externals, {
    'mapbox-gl': 'mapboxgl',
    three: 'function(){try{return THREE}catch(e){return {}}}()',
    'deck.gl': '(function(){try{return DeckGL}catch(e){return {}}})()',
    'luma.gl': '(function(){try{return luma}catch(e){return {}}})()',
    'webgl-debug': '(function(){try{return webgl-debug}catch(e){return {}}})()',
    xlsx: 'function(){try{return XLSX}catch(e){return {}}}()',
    canvg: 'function(){try{return canvg}catch(e){return {}}}()',
    jsonsql: 'function(){try{return jsonsql}catch(e){return {}}}()',
    'xml-js': 'function(){try{return convert}catch(e){return {}}}()'
  }),

  module: {
    noParse: /[\/\\]node_modules[\/\\]mapbox-gl[\/\\]dist[\/\\]mapbox-gl\.js$/,

    rules: (function() {
      let moduleRules = [];
      moduleRules.push(configBase.module.rules.img);
      const babelConfig = {
        test: [/\.js$/],
        exclude: /node_modules[\/\\]proj4|classic|webgl-debug/,
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
            ]
        ]
        }
      }
      configBase.moduleVersion === "es6" && (babelConfig.include = /FGBLayer|flatgeobuf/);
      moduleRules.push(babelConfig);
      moduleRules.push(configBase.module.rules.css);
      return moduleRules;
    })()
  },
  plugins: configBase.plugins(libName, productName)
};
