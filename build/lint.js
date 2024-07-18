const fs = require('fs');
const Plugin = require('@supermapgis/babel-plugin-import/lib/Plugin.js');

// 检测epoxrt * 重名问题， 会在控制台输出
const lintExportRepeat = function (libraryName) {
  const plugin = new Plugin.default('src/' + libraryName, null, true);
  const exportNames = plugin.libraryExportFiles;
  let repeatExportNames = _getRepeatExportNames(exportNames);
  // 输出导出名和类名不一致；
  // const res = _getDiffExportName(exportNames);
  return repeatExportNames;
};

// 检测命名空间重名问题； supermap.xxx和L.supermap.xxx重名
const lintNamespaceRepeat = function (libraryName) {
  const map = { leaflet: 'L', openlayers: 'ol', mapboxgl: 'mapboxgl' };
  let prefix = map[libraryName];
  const libraryContent = fs.readFileSync(`./src/${libraryName}/namespace.js`).toString();
  const commonContent = fs.readFileSync(`./src/common/namespace.js`).toString();
  const libPatt = `${prefix}\\.supermap\\.(\\w+)\\s*=`;
  const libReg = new RegExp(libPatt, 'g');
  const commonReg = /SuperMap\.(\w+)\s*=/g;
  const res = [];

  let libRes = libraryContent.match(libReg);
  let commonRes = commonContent.match(commonReg);
  libRes = libRes.map((item) => item.replace(/=|\s*/g, ''));
  commonRes = commonRes.map((item) => item.replace(/=|\s*/g, ''));

  libRes.forEach((item, index) => {
    const name = item.replace(`${prefix}.supermap.`, '');
    const commonName = 'SuperMap.' + name;
    if (commonRes.includes(commonName)) {
      res.push([libRes[index], commonName]);
    }
  });
  return res;
};

function _getArrRepeat(arr) {
  const map = new Map();
  arr.forEach((item) => {
    if (map.get(item)) {
      let num = map.get(item);
      map.set(item, ++num);
    } else {
      map.set(item, 1);
    }
  });
  const result = [];
  for (let [key, value] of map) {
    if (value > 1) {
      result.push(key);
    }
  }
  return result;
}
function _getDiffExportName(allExports) {
  const res = allExports.filter((item) => item.exportName !== item.exportLocalName);
  return res;
}
function _getRepeatExportNames(allExports) {
  const exportNames = allExports.map((item) => item.exportName);
  const repeatExportNames = _getArrRepeat(exportNames);
  return repeatExportNames;
}
module.exports = { lintExportRepeat, lintNamespaceRepeat };
