const path = require('path');
const express = require('express');
const open = require('open');
const serveIndex = require('serve-index');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const product = process.argv[2];
var dirname = product === 'openlayers' ? 'ol' : product
const app = (module.exports = express());
if (product) {
    const config = require(`./webpack.config.${product}.js`);
    const configBase = require(`./webpack.config.base.js`);
    const entry = [`./src/${product}/${product === 'openlayers' ? 'namespace.js' : 'index.js'}`];
    const filename = `iclient-${dirname}`;
    config.output.filename = `${filename}-es6.min.js`;
    config.output.path = path.resolve(`${__dirname}/../dist/${dirname}`);
    if (['leaflet', 'openlayers'].includes(product)) {
        entry.push(`./src/${product}/css/index.js`);
        config.plugins = configBase.plugins(product, `${filename}.min`);
    }
    config.mode = 'development';
    config.entry = entry;
    config.devtool = 'cheap-module-eval-source-map';

    const compiler = webpack(config);
    const instance = webpackDevMiddleware(compiler, {
        publicPath: `/dist/${product}`,
        stats: {
            colors: true
        }
    });
    app.use(instance);
    instance.waitUntilValid(() => {
        open(`http://localhost:8082/examples/${product}`);
    });
}

const server = app.listen(8082, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static('web'));
app.use('/examples/template/header.html', express.static('web/template/header.html'));
app.use('/examples', express.static('examples'), serveIndex('examples'));
app.use('/examples-bug', express.static('examples-bug'), serveIndex('examples-bug'));
app.use('/dist', express.static('dist'), serveIndex('dist'));
app.use('/build', express.static('build'), serveIndex('build'));
app.use('/docs', express.static('docs'), serveIndex('docs'));
app.use('/web', express.static('web'), serveIndex('web'));

app.use('/en/examples/template/header.html', express.static('web/en/web/template/header.html'));
app.use('/en/examples', express.static('examples'), serveIndex('examples'));
app.use('/en/docs', express.static('docs'), serveIndex('docs'));
app.use('/en/dist', express.static('dist'), serveIndex('dist'));
app.use('/en/build', express.static('build'), serveIndex('build'));
app.use('/en', express.static('web/en'), serveIndex('web/en'));
if (!product) {
    open(`http://localhost:8082`);
}
