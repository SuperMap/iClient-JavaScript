import { isString } from '../../util/BaseUtil';
import municipalCenterData from '../config/MunicipalCenter.json'; // eslint-disable-line import/extensions
import provincialCenterData from '../config/ProvinceCenter.json'; // eslint-disable-line import/extensions

export function createLinesData(layerInfo, properties) {
  const data = [];
  if (properties && properties.length) {
    // 重新获取数据
    const from = layerInfo.from;
    const to = layerInfo.to;
    let fromCoord;
    let toCoord;
    if (from.type === 'XY_FIELD' && from.xField && from.yField && to.xField && to.yField) {
      properties.forEach((property) => {
        const fromX = property[from.xField];
        const fromY = property[from.yField];
        const toX = property[to.xField];
        const toY = property[to.yField];
        if (!fromX || !fromY || !toX || !toY) {
          return;
        }

        fromCoord = [property[from.xField], property[from.yField]];
        toCoord = [property[to.xField], property[to.yField]];
        data.push({
          coords: [fromCoord, toCoord]
        });
      });
    } else if (from.type === 'PLACE_FIELD' && from.field && to.field) {
      const centerDatas = provincialCenterData.concat(municipalCenterData);

      properties.forEach((property) => {
        const fromField = property[from.field];
        const toField = property[to.field];
        fromCoord = centerDatas.find((item) => {
          return isMatchAdministrativeName(item.name, fromField);
        });
        toCoord = centerDatas.find((item) => {
          return isMatchAdministrativeName(item.name, toField);
        });
        if (!fromCoord || !toCoord) {
          return;
        }
        data.push({
          coords: [fromCoord.coord, toCoord.coord]
        });
      });
    }
  }
  return data;
}

export function isMatchAdministrativeName(featureName, fieldName) {
  if (isString(fieldName)) {
    let shortName = featureName.substr(0, 2);
    // 张家口市和张家界市 特殊处理
    if (shortName === '张家') {
      shortName = featureName.substr(0, 3);
    }
    return !!fieldName.match(new RegExp(shortName));
  }
  return false;
}

export function transformServerUrl(serverUrl) {
  return !serverUrl || serverUrl.slice(-1) === '/' ? serverUrl : `${serverUrl}/`;
}

 /**
   * @description url 拼接代理或者凭证信息
   * @param {string} point - 待转换的 url
   * @returns {string} 转换后的 url
   */
 export function transformUrl({ url, server, excludePortalProxyUrl, credentialValue, credentialKey }) {
  let mapUrl = url.indexOf('.json') === -1 ? `${url}.json` : url;
  let filter = 'getUrlResource.json?url=';
  if (excludePortalProxyUrl && server.indexOf(filter) > -1) {
    //大屏需求,或者有加上代理的
    let urlArray = server.split(filter);
    if (urlArray.length > 1) {
      mapUrl = urlArray[0] + filter + mapUrl;
    }
  }
  if (credentialValue && credentialKey) {
    mapUrl += '?' + credentialKey + '=' + credentialValue;
  }
  return mapUrl;
}

 /**
     * 检测数据是否为number
     * @param value 值，未知数据类型
     * @returns {boolean}
     */
 export function isNumber(value) {
  if (value === "") {
      return false;
  }
  let mdata = Number(value);
  if (mdata === 0) {
      return true;
  }
  return !isNaN(mdata);
}

export function mergeFeatures({ sourceId, features, mergeByField, map }) {
  if (!(features instanceof Array)) {
    return features;
  }
  features = features.map((feature, index) => {
    if (!Object.prototype.hasOwnProperty.call(feature.properties, 'index')) {
      feature.properties.index = index;
    }
    return feature;
  });
  if (!features.length || !mergeByField && features[0].geometry) {
    return features;
  }
  const source = map.getSource(sourceId);
  if ((!source || !source._data.features) && features[0].geometry) {
    return features;
  }
  const prevFeatures = source && source._data && source._data.features;
  const nextFeatures = [];
  if (!mergeByField && prevFeatures) {
    return prevFeatures;
  }
  features.forEach((feature) => {
    const prevFeature = prevFeatures.find((item) => {
      if (isNaN(+item.properties[mergeByField]) && isNaN(+feature.properties[mergeByField])) {
        return (
          JSON.stringify(item.properties[mergeByField] || '') ===
          JSON.stringify(feature.properties[mergeByField] || '')
        );
      } else {
        return +item.properties[mergeByField] === +feature.properties[mergeByField];
      }
    });
    if (prevFeature) {
      nextFeatures.push({
        ...prevFeature,
        ...feature
      });
    } else if (feature.geometry) {
      nextFeatures.push(feature);
    }
  });
  return nextFeatures;
}

export function getLayerInfosFromCatalogs(catalogs, catalogTypeField = 'type') {
  const results = [];
  for (let i = 0; i < catalogs.length; i++) {
    const catalogType = catalogs[i][catalogTypeField];
    if (catalogType !== 'group') {
      results.push(catalogs[i]);
      continue;
    }
    const { children } = catalogs[i];
    if (children && children.length > 0) {
      const result = getLayerInfosFromCatalogs(children, catalogTypeField);
      results.push(...result);
    }
  }
  return results;
}

function isSameRasterUrl(urlA, urlB) {
  if (urlA === urlB) {
    return true;
  }
  const uriA = new URL(urlA);
  const uriB = new URL(urlB);
  if (uriA.origin !== uriB.origin) {
    return false;
  }
  const regex = /\/([^/?#]+\.\w+)$/;
  const pathA = uriA.pathname.replace(regex, '');
  const pathB = uriB.pathname.replace(regex, '');

  // 3. 判断子路径关系
  return pathA === pathB || pathA.startsWith(pathB + (pathB.endsWith('/') ? '' : '/'));
}

export function isSameRasterLayer(sourceInfo, compareSource) {
  const { type, tiles } = sourceInfo;
  if (type === 'raster') {
    return type === compareSource.type && tiles && compareSource.tiles && isSameRasterUrl(tiles[0], compareSource.tiles[0]);
  }
  return false;
}

export function createAppreciableLayerId(layer) {
  // 针对传入 layers
  if (layer.layerInfo && layer.layerInfo.id) {
    return layer.layerInfo.id;
  }
  // 往空地图上追加图层 且 只有一个webmap this.layers是空
  if (layer.metadata && layer.metadata.SM_Layer_Id) {
    return layer.metadata.SM_Layer_Id;
  }
  // 针对 MapboxStyle 或者其它额外的 layer
  // type: background 和某些 overlaymanager layers 只有 id
  return layer.sourceLayer || layer.source || layer.id;
}

export function getLayerCatalogRenderLayers(parts, catalogId, layersOnMap) {
  // ms 3.0.5以下的版本 layerCatalogs layersContent/parts 不包括自身的上图layerid 只包含复合图层的id
  const renderLayers = layersOnMap.some(item => item.id === catalogId) ? [catalogId] : [];
  if (parts) {
    renderLayers.push(...parts);
  }
  return Array.from(new Set(renderLayers)).filter(item => !!item);
}

export function getMainLayerFromCatalog(layerParts, catalogId, layersOnMap) {
  const renderLayers = getLayerCatalogRenderLayers(layerParts, catalogId, layersOnMap);
  return layersOnMap.find(item => item.id === renderLayers[0]);
}