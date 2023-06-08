var configBase = require('./webpack.config.base');
//端名
var libName = 'openlayers';
//产品包名
var productName = 'iclient-openlayers';

let origin;
if (process.env['npm_config_argv']) {
  var argv = JSON.parse(process.env['npm_config_argv']);
  origin = argv.original;
} else {
  origin = process.env['npm_lifecycle_event'];
}
if (origin && origin.includes('deploy-ol')) {
    libName = 'ol';
    productName = 'iclient-ol';
}
var externals = [
    Object.assign({}, configBase.externals, {
        '@turf/turf': 'function(){try{return turf}catch(e){return {}}}()',
        'ol-mapbox-style': 'function(){try{return olms}catch(e){return {}}}()',
        'ol-mapbox-style/stylefunction': 'function(){try{return olms.stylefunction}catch(e){return {}}}()',
        'deck.gl': '(function(){try{return DeckGL}catch(e){return {}}})()',
        'luma.gl': '(function(){try{return luma}catch(e){return {}}})()',
        'webgl-debug': '(function(){try{return webgl-debug}catch(e){return {}}})()',
        xlsx: 'function(){try{return XLSX}catch(e){return {}}}()',
        canvg: 'function(){try{return canvg}catch(e){return {}}}()',
        jsonsql: 'function(){try{return jsonsql}catch(e){return {}}}()'
    }),
    function(context, request, callback) {
        if (/^ol\//.test(request)) {
            return callback(null, request.replace(/\//g, '.'));
        }
        callback();
    }
];

module.exports = {
    target: configBase.target,
    mode: configBase.mode,
    //页面入口文件配置
    entry: [...configBase.entry, `${__dirname}/../src/openlayers/namespace.js`, `${__dirname}/../src/openlayers/css/index.js`],
    //入口文件输出配置
    output: configBase.output(libName, productName),
    //是否启用压缩
    optimization: configBase.optimization,
    //不显示打包文件大小相关警告
    performance: configBase.performance,
    //其它解决方案配置
    resolve: configBase.resolve,
    externals: externals,
    module: {
        noParse: /[\/\\]node_modules[\/\\]openlayers[\/\\]dist[\/\\]ol\.js$/,
        rules: (function() {
            let moduleRules = [];
            moduleRules.push(configBase.module.rules.img);
            const babelConfig = {
              test: [/\.js$/],
                    exclude: /classic | webgl-debug/,
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
            configBase.moduleVersion === "es6" && (babelConfig.include = /FGB|flatgeobuf/);
            moduleRules.push(babelConfig);
            moduleRules.push(configBase.module.rules.css);
            return moduleRules;
        })()
    },
    plugins: configBase.plugins(libName, productName)
};
