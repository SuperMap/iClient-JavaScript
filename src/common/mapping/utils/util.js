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
// 要判断一下是否是二维数组的filter
function isSimpleComparison(filter) {
    if (!filter || !Array.isArray(filter)) {
        return false;
    }
    const [operator, ...operands] = filter;

    const simpleOps = ['==', '!=', '>', '>=', '<', '<=', 'in', '!in', 'has', '!has'];
    const logicalOps = ['all', 'any', 'none'];
    if (simpleOps.includes(operator)) {
        // has / !has：只要求一个字段名
        if (operator === 'has' || operator === '!has') {
            // 排除这种： ['has', ['get', 'name']]
            return typeof operands[0] === 'string';
        }
        // in / !in：field + 至少一个值
        if (operator === 'in' || operator === '!in') {
            if (typeof operands[0] !== 'string') { return false; }
            return operands.length > 1;
        }
        // 普通比较：field + value
        return operands.length === 2 && typeof operands[0] === 'string';
    }
    if (logicalOps.includes(operator)) {
        if (operands.length === 0) { return false; }
        return operands.every((item) => isSimpleComparison(item));
    }
    return false;
}

// 处理类似"O'Reilly"这种字符串，在SQL语句中需要转，单引号需要处理
function formatValue(value) {
    if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
    }
    return String(value);
}

// 判断空值
function isNullvalue(value) {
    return [null, '', undefined].includes(value);
}

function mapboxFilterToCqlFilter(filter) {
    if (!isSimpleComparison(filter)) {
        return '';
    }
    const [operator, ...operands] = filter;
    const field = operands[0];
    let value;
    switch (operator) {
        case '>':
        case '>=':
        case '<':
        case '<=': {
            value = operands[1];
            return `${field} ${operator} ${formatValue(value)}`;
        }
        case '==': {
            value = operands[1];
            if (isNullvalue(value)) {
                return `${field} IS NULL`;
            }
            return `${field} == ${formatValue(value)}`;
        }
        case '!=': {
            value = operands[1];
            if (isNullvalue(value)) {
                return `${field} IS NOT NULL`;
            }
            return `${field} <> ${formatValue(value)}`;
        }
        case 'in': {
            const values = operands.slice(1);
            return `${field} IN (${values.map((v) => formatValue(v)).join(', ')})`;
        }
        case '!in': {
            const values = operands.slice(1);
            return `${field} NOT IN (${values.map((v) => formatValue(v)).join(', ')})`;
        }
        // TODO
        // case 'has': {
        //     const field = operands[0];
        //     return tableFieldNames?.includes(field) ? '1=1' : '1=0';
        // }
        // case '!has': {
        //     const field = operands[0];
        //     return tableFieldNames?.includes(field) ? '1=0' : '1=1';
        // }
        case 'all': {
            return operands
                .map((item) => mapboxFilterToCqlFilter(item))
                .filter(Boolean)
                .map((item) => `${item}`)
                .join(' AND ');
        }
        case 'any': {
            return operands
                .map((item) => mapboxFilterToCqlFilter(item))
                .filter(Boolean)
                .map((item) => `(${item})`)
                .join(' OR ');
        }
        case 'none': {
            return operands
                .map((item) => mapboxFilterToCqlFilter(item))
                .filter(Boolean)
                .map((item) => `NOT (${item})`)
                .join(' AND ');
        }
        default:
            return '';
    }
}

// none的情况下，全部用Not一个一个包裹，会报错（应该是接口问题），反转即可
function negateComparison(filter) {
    const op = filter[0];
    const args = filter.slice(1);
    switch (op) {
        case '==':
            return mapboxFilterToWfsFilter(['!=', ...args]);
        case '!=':
            return mapboxFilterToWfsFilter(['==', ...args]);
        case '>':
            return mapboxFilterToWfsFilter(['<=', ...args]);
        case '>=':
            return mapboxFilterToWfsFilter(['<', ...args]);
        case '<':
            return mapboxFilterToWfsFilter(['>=', ...args]);
        case '<=':
            return mapboxFilterToWfsFilter(['>', ...args]);
        case 'in':
            return mapboxFilterToWfsFilter(['!in', ...args]);
        case '!in':
            return mapboxFilterToWfsFilter(['in', ...args]);
        // case 'has':
        //     return mapboxFilterToWfsFilter(['!has', ...args], fieldNames, tableFieldNames);
        // case '!has':
        //     return mapboxFilterToWfsFilter(['has', ...args], fieldNames, tableFieldNames);
        default:
            return '';
    }
}

function mapboxFilterToWfsFilterBody(filter) {
    if (!isSimpleComparison(filter)) {
        return '';
    }
    const [operator, ...operands] = filter;
    const fieldRef = (field) => `<fes:ValueReference>${field}</fes:ValueReference>`;
    const literal = (value) => `<fes:Literal>${value}</fes:Literal>`;
    switch (operator) {
        case '==': {
            const [field, value] = operands;
            if (isNullvalue(value)) {
                return `
<fes:PropertyIsNull>
  ${fieldRef(field)}
</fes:PropertyIsNull>`;
            }
            return `
<fes:PropertyIsEqualTo>
  ${fieldRef(field)}
  ${literal(value)}
</fes:PropertyIsEqualTo>`;
        }
        case '!=': {
            const [field, value] = operands;
            if (isNullvalue(value)) {
                return `
<fes:PropertyIsNotNull>
  ${fieldRef(field)}
</fes:PropertyIsNotNull>`;
            }
            return `
<fes:PropertyIsNotEqualTo>
  ${fieldRef(field)}
  ${literal(value)}
</fes:PropertyIsNotEqualTo>`;
        }
        case '>':
            return `
<fes:PropertyIsGreaterThan>
  ${fieldRef(operands[0])}
  ${literal(operands[1])}
</fes:PropertyIsGreaterThan>`;
        case '>=':
            return `
<fes:PropertyIsGreaterThanOrEqualTo>
  ${fieldRef(operands[0])}
  ${literal(operands[1])}
</fes:PropertyIsGreaterThanOrEqualTo>`;
        case '<':
            return `
<fes:PropertyIsLessThan>
  ${fieldRef(operands[0])}
  ${literal(operands[1])}
</fes:PropertyIsLessThan>`;
        case '<=':
            return `
<fes:PropertyIsLessThanOrEqualTo>
  ${fieldRef(operands[0])}
  ${literal(operands[1])}
</fes:PropertyIsLessThanOrEqualTo>`;
        case 'in': {
            const field = operands[0];
            const values = operands.slice(1);
            return `
<fes:Or>${values
                .map(
                    (v) => `
  <fes:PropertyIsEqualTo>
    ${fieldRef(field)}
    ${literal(v)}
  </fes:PropertyIsEqualTo>`
                )
                .join('')}</fes:Or>`;
        }
        case '!in': {
            const field = operands[0];
            const values = operands.slice(1);
            return `
<fes:Not><fes:Or>${values
                .map(
                    (v) => `
    <fes:PropertyIsEqualTo>
      ${fieldRef(field)}
      ${literal(v)}
    </fes:PropertyIsEqualTo>`
                )
                .join('')}</fes:Or></fes:Not>`;
        }
        // TODO,has条件暂时是用null判断，不准确
        // case 'has': { ... }
        // case '!has': { ... }
        case 'all': {
            const children = operands
                .map((item) => mapboxFilterToWfsFilterBody(item).trim())
                .filter(Boolean);
            return children.length
                ? `
<fes:And>
  ${children.join('')}
</fes:And>`
                : '';
        }
        case 'any': {
            const children = operands
                .map((item) => mapboxFilterToWfsFilterBody(item).trim())
                .filter(Boolean);
            return children.length
                ? `
<fes:Or>
  ${children.join('')}
</fes:Or>`
                : '';
        }
        case 'none': {
            const children = operands.map((item) => negateComparison(item).trim()).filter(Boolean);
            return children.length
                ? `
<fes:And>
  ${children.join('')}
</fes:And>`
                : '';
        }
        default:
            return '';
    }
}

function mapboxFilterToWfsFilter(filter) {
    const body = mapboxFilterToWfsFilterBody(filter);
    if (!body) { return ''; }
    return `<fes:Filter>${body}
</fes:Filter>`;
}

export function mapboxFilterToQueryFilter(filter, type = 'SQL') {
    if (type === 'SQL') {
        return mapboxFilterToCqlFilter(filter);
    }
    if (type === 'XML') {
        return mapboxFilterToWfsFilter(filter);
    }
    return '';
}
