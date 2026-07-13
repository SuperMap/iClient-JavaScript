// "deploy-common": "webpack --config ./build/webpack.config.common.js --color",

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  target: ['es6'],
  mode: 'production',
  //页面入口文件配置
  entry: [`${__dirname}/common-webmapv2base.js`],

  output: {
    clean: true,
    path: `${__dirname}/../../custom-dist/iclient-common/`,
    filename: 'iclient-common-webmapv2base.js',
    chunkFormat: 'commonjs',
    libraryTarget: 'umd'
  },

  //是否启用压缩
  optimization: {
    minimize: true,
    emitOnErrors: false
  },
  //不显示打包文件大小相关警告
  performance: {
    hints: false
  },

  //其它解决方案配置
  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: /node_modules[\/\\]proj4/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },

  plugins: []
};
