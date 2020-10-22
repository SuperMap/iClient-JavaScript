const configBase = require("./webpack.config.base");
//端名
const libName = "classic";
//产品包名
const productName = "iclient-classic";


module.exports = {
    mode: configBase.mode,
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
        'xlsx': "function(){try{return XLSX}catch(e){return {}}}()",
        'canvg': "function(){try{return canvg}catch(e){return {}}}()",
        'jsonsql': "function(){try{return jsonsql}catch(e){return {}}}()",
        'xml-js': "function(){try{return convert}catch(e){return {}}}()"
    }),
    module: {
        rules: (function () {
            let moduleRules = [];
            if (configBase.moduleVersion === "es5") {
                //打包为es5相关配置
                moduleRules.push({
                    test: /\.js/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                });

            }
            return moduleRules
        })()
    },
    plugins: (function () {
        let plugins = [...configBase.plugins(libName, productName)];
        plugins.splice(1, 1);
        return plugins;
    })()

};