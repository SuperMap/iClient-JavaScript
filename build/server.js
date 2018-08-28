const path = require('path');
const express = require('express');
const open = require("open");
const serveIndex = require('serve-index')


const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const product = process.argv[2] || 'leaflet';
const config = require(`./webpack.config.${product}.js`);
const entry = [`./src/${product}/index.js`];
if (['leaflet', 'openlayers'].includes(product)) {
  entry.push(`./src/${product}/css/index.js`);
}
config.mode = 'development';
config.entry = entry;
config.output.filename = `iclient9-${product}-es6.js`
config.devtool = 'cheap-module-eval-source-map';


const compiler = webpack(config);
const app = module.exports = express();
const instance = webpackDevMiddleware(compiler, {
  publicPath: `/dist/${product}`,
  stats: {
    colors: true
  }
});
app.use(instance);

const server = app.listen(9999, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static('web'));
app.use("/examples/template/header.html", express.static('web/template/header.html'));
app.use("/examples", express.static('examples'), serveIndex('examples'));
app.use("/dist", express.static('dist'), serveIndex('dist'));
app.use("/build", express.static('build'), serveIndex('build'));
app.use("/docs", express.static('docs'), serveIndex('docs'));
app.use("/web", express.static('web'), serveIndex('web'));

app.use("/en/examples/template/header.html", express.static('web/en/web/template/header.html'));
app.use("/en/examples", express.static('examples'), serveIndex('examples'));
app.use("/en/docs", express.static('docs'), serveIndex('docs'));
app.use("/en/dist", express.static('dist'), serveIndex('dist'));
app.use("/en/build", express.static('build'), serveIndex('build'));
app.use("/en", express.static('web/en'), serveIndex('web/en'));
instance.waitUntilValid(() => {
  open(`http://localhost:9999/examples/${product}`);
});