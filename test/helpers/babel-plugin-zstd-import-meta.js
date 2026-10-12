// Browserify cannot parse import.meta.url. Keep the real Zstd codec and resolve
// its WASM asset through the URL served by Karma instead.
module.exports = function karmaZstdImportMeta({ types }) {
  return {
    name: 'karma-zstd-import-meta',
    visitor: {
      MemberExpression(expression, state) {
        const filename = state.file.opts.filename.replace(/\\/g, '/');
        const node = expression.node;
        if (!filename.endsWith('/@bokuweb/zstd-wasm/dist/web/index.web.js') ||
            !types.isMetaProperty(node.object) ||
            node.object.meta.name !== 'import' || node.object.property.name !== 'meta' ||
            node.computed || !types.isIdentifier(node.property, { name: 'url' })) {
          return;
        }
        expression.replaceWith(types.memberExpression(
          types.newExpression(types.identifier('URL'), [
            types.stringLiteral('/base/'),
            types.memberExpression(types.identifier('document'), types.identifier('baseURI'))
          ]),
          types.identifier('href')
        ));
      }
    }
  };
};
