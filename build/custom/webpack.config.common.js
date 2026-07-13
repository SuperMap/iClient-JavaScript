// "deploy-common": "webpack --config ./build/webpack.config.common.js --color",
module.exports = {
  target: ['es5'],
  mode: 'production',
  //页面入口文件配置
  entry: [`${__dirname}/common.js`],

  output: {
    path: `${__dirname}/../../custom-dist/iclient-common/`,
    filename: `iclient-common.js`,
    chunkFormat:'commonjs',
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

  plugins: []
};
