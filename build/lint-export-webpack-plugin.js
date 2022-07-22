const { lintExportRepeat, lintNamespaceRepeat } = require('./lint');

class LintExportWebpackPlugin {
  constructor(libName) {
    this.libName = libName === 'ol' ? 'openlayers' : libName;
  }
  apply(compiler) {
    if(this.libName !== 'classic')  {
      compiler.hooks.entryOption.tap('LintExportWebpackPlugin', () => {
        const repeatExportNames = lintExportRepeat(this.libName);
        if(repeatExportNames.length > 0) {
          throw new Error(`${this.libName}导出名重复：${repeatExportNames}`)
        }
        // 当SuperMap.xxx都挂在 xx.supermap时，排查SuperMap和各端的命名空间重复
        // const repeatNamespace = lintNamespaceRepeat(this.libName);
        // console.log(`${this.libName}命名空间重复：`, repeatNamespace);
      });
    }
   
  }
}
module.exports = LintExportWebpackPlugin;
