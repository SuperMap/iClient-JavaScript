/**
 * Remove specified keys from externals so those dependencies are bundled.
 * @param {Object} externals
 * @param {string[]} omitList
 * @returns {Object}
 */
function omitExternals(externals, omitList = []) {
  const result = Object.assign({}, externals);
  omitList.forEach((key) => {
    delete result[key];
  });
  return result;
}

/**
 * Parse omit list from env: VUE_ICLIENT_OMIT_EXTERNALS="@antv/g6,@antv/g2"
 * @param {string[]} defaultOmit
 * @returns {string[]}
 */
function parseOmitList(defaultOmit) {
  const env = process.env.VUE_ICLIENT_OMIT_EXTERNALS;
  if (!env) {
    return defaultOmit;
  }
  return env.split(',').map((item) => item.trim()).filter(Boolean);
}

module.exports = {
  omitExternals,
  parseOmitList,
  COMMON_OMIT: ['@antv/g6'],
  MAPBOXGL_OMIT: ['./L7/l7-render', '@antv/g2']
};
