const mapboxglConfig = require('../webpack.config.mapboxgl');
const { omitExternals, parseOmitList, MAPBOXGL_OMIT, COMMON_OMIT } = require('./externals');
const configBase = require('../webpack.config.base');

// mapboxglConfig.externals[0] = Object.assign({}, configBase.externals, mapboxglExternals)
const [mapboxglExternals] = mapboxglConfig.externals;

module.exports = Object.assign({}, mapboxglConfig, {
  externals: [omitExternals(mapboxglExternals, parseOmitList(MAPBOXGL_OMIT.concat(COMMON_OMIT)))],
  output: Object.assign({}, configBase.output('iclient-mapboxgl', 'iclient-mapboxgl'), {
    path: `${__dirname}/../../custom-dist/iclient-mapboxgl/`,
  }),
});
