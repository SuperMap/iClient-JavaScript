import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { featureFilter, expression } from '@mapbox/mapbox-gl-style-spec';
import spec from '@mapbox/mapbox-gl-style-spec/reference/v8';
import proj4 from 'proj4';
import center from '@turf/center';
import * as G2 from '@antv/g2';
import { Util } from '../../core/Util';
import { L7Layer, L7 } from '../../overlay/L7Layer';
import Color from './Color';
import debounce from 'lodash.debounce';

const SelectStyleTypes = {
  basic: 'base',
  heat: 'heat',
  heat3D: 'heat3D',
  cluster: 'cluster',
  heatGrid: 'heatGrid',
  heatHexagon: 'heatHexagon',
  heat3DHexagon: 'heat3DHexagon',
  heat3DGrid: 'heat3DGrid',
  od: 'od',
  animateLine: 'animateLine',
  column: 'column', // 3D 柱状图
  animatePoint: 'animatePoint',
  radarPoint: 'radarPoint',
  staticChart: 'staticChart',
  bar: 'bar',
  line: 'line',
  pie: 'pie',
  line3D: 'line3D',
  isoline3D: 'isoline3D',
  fillExtrusion: 'fillExtrusion'
};

const MSLayerType = {
  point: 'point',
  line: 'line',
  polygon: 'polygon',
  cluster: 'cluster',
  heat3DHexagon: 'heat3DHexagon',
  heat3DGrid: 'heat3DGrid',
  heatmap: 'heatmap',
  heatGrid: 'heatGrid',
  heatHexagon: 'heatHexagon',
  raster: 'raster',
  image: 'image',
  radar: 'radar'
};

const ANTVL7_LINE_EXTRUSION_STYLE_KEY = {
  'line-extrusion-dasharray': 'dashArray',
  'line-extrusion-opacity': 'opacity',
  'line-extrusion-pattern-interval': 'iconStep',
  'line-extrusion-pattern-blend': 'textureBlend',
  'line-extrusion-pattern-opacity': 'opacity',
  'line-extrusion-base-fixed': 'heightfixed'
};

const ANTVL7_ANIMATE_LINE_EXTRUSION_STYLE_KEY = {
  'line-extrusion-animate-duration': 'duration',
  'line-extrusion-animate-interval': 'interval',
  'line-extrusion-animate-trailLength': 'trailLength'
};

const AntvL7LayerType = {
  MarkerLayer: 'MarkerLayer'
};

const TEXT_MAPBOXGL_ANTVL7_KEY = {
  'text-color': 'color',
  'text-size': 'size',
  'text-opacity': 'opacity',
  'text-translate': 'textOffset',
  'text-z-offset': 'raisingHeight',
  'text-allow-overlap': 'textAllowOverlap',
  'text-anchor': 'textAnchor',
  'text-letter-spacing': 'spacing',
  'text-halo-color': 'stroke',
  'text-halo-width': 'strokeWidth',
  'text-halo-blur': 'halo',
  'text-font': 'fontFamily',
  'text-field': 'shape'
};

const LineLayoutKey = ['line-join', 'line-cap', 'line-miter-limit', 'line-round-limit'];
const PointLayoutKey = [
  'icon-allow-overlap',
  'icon-image',
  'icon-size',
  'fill-sort-key',
  'visibility',
  'icon-anchor',
  'icon-ignore-placement',
  'icon-rotate',
  'symbol-placement',
  'text-justify',
  'text-transform',
  'text-field',
  'text-allow-overlap',
  'text-size',
  'text-font',
  'text-line-height',
  'text-max-width',
  'text-rotate',
  'text-anchor',
  'text-ignore-placement',
  'text-letter-spacing',
  'text-z-offset'
];
const layoutStyleNames = [...PointLayoutKey, ...LineLayoutKey];

const IPortalDataTypes = {
  STRING: 'STRING',
  INT: 'INT',
  LONG: 'LONG',
  DOUBLE: 'DOUBLE',
  BOOLEAN: 'BOOLEAN',
  TEXT: 'TEXT',
  LONGTEXT: 'LONGTEXT',
  POINT: 'POINT',
  LINESTRING: 'LINESTRING',
  POLYGON: 'POLYGON',
  MULTIPOINT: 'MULTIPOINT',
  MULTILINESTRING: 'MULTILINESTRING',
  MULTIPOLYGON: 'MULTIPOLYGON'
};

// rest data  iServer返回的字段类型
const RestDataTypes = {
  BOOLEAN: 'BOOLEAN',
  BYTE: 'BYTE',
  CHAR: 'CHAR',
  DATETIME: 'DATETIME',
  DOUBLE: 'DOUBLE',
  INT16: 'INT16',
  INT32: 'INT32',
  INT64: 'INT64',
  LONGBINARY: 'LONGBINARY',
  SINGLE: 'SINGLE',
  WTEXT: 'WTEXT',
  TEXT: 'TEXT'
};

// 字段属性
const propertyType = {
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN'
};

const StyleRenderType = {
  base: 'base',
  heat: 'heat',
  heat3D: 'heat3D',
  cluster: 'cluster',
  heatGrid: 'heatGrid',
  heatHexagon: 'heatHexagon',
  heat3DGrid: 'heat3DGrid',
  heat3DHexagon: 'heat3DHexagon',
  od: 'od',
  animateLine: 'animateLine',
  column: 'column',
  animatePoint: 'animatePoint',
  radarPoint: 'radarPoint',
  staticChart: 'staticChart',
  bar: 'bar',
  line: 'line',
  pie: 'pie',
  isoline3D: 'isoline3D',
  line3D: 'line3D',
  fillExtrusion: 'fillExtrusion'
};

const L7_WIDTH_MULTIPLE = 0.5;

/**
 * @param {string} url
 * @param {string} [token]
 * @returns {string}
 */
function addCredentialToUrl(url, credential) {
  if (!credential) {
    return url;
  }
  const tokenInfo = `${credential.key || credential.name}=${credential.value}`;
  const newUrl = url.includes('?') ? `${url}&${tokenInfo}` : `${url}?${tokenInfo}`;
  return newUrl;
}

/**
 * @description 获取数据集表头信息
 * @param {string} datasetUrl 数据集地址
 * @param {Object} credential
 * @param {Object} options
 */
function getRestDataFields(datasetUrl, credential, options) {
  const url = addCredentialToUrl(`${datasetUrl}/fields.json?returnAll=true`, credential);
  return FetchRequest.get(url, null, options)
    .then((res) => res.json())
    .then((result) => {
      return result.map((item) => {
        const { caption, name, isSystemField, type, maxLength, isZeroLengthAllowed } = item;
        return {
          name,
          type,
          title: caption,
          visible: true,
          isSystemField,
          maxLength, // MaxLength字节最大长度
          isZeroLengthAllowed // 是否允许零长度
        };
      });
    });
}

/**
 * @description 获取值域
 * @param {string} datasetUrl
 * @param {Object} credential
 * @param {Object} options
 */
function getRestDataDomains(datasetUrl, credential, options) {
  const url = addCredentialToUrl(`${datasetUrl}/domain.json`, credential);
  return FetchRequest.get(url, null, options).then((result) => {
    return result.json();
  });
}

/**
 * restdata字段排序，系统字段放在最前面
 * @param fieldInfos 需要排序的
 */
function sortRestdataField(fieldInfos) {
  const systemFields = [];
  const nonsystemFields = [];
  fieldInfos.forEach((fieldInfo) => {
    if (fieldInfo.isSystemField) {
      systemFields.push(fieldInfo);
    } else {
      nonsystemFields.push(fieldInfo);
    }
  });
  return systemFields.concat(nonsystemFields);
}

async function requestRestDataFieldsInfo(datasetUrl, credential, options) {
  const [fields, domains] = await Promise.all([
    getRestDataFields(datasetUrl, credential, options),
    getRestDataDomains(datasetUrl, credential, options)
  ]);
  domains.forEach((domain) => {
    const { fieldName, type, rangeInfos, codeInfos } = domain;
    const field = fields.find((item) => item.name === fieldName);
    if (!field) {
      return;
    }
    field.domain = {
      type,
      infos:
        type === 'RANGE'
          ? rangeInfos.map((rangeInfo) => pickAttrs(rangeInfo, ['max', 'min', 'type']))
          : codeInfos.map(({ value }) => value)
    };
  });
  return sortRestdataField(fields);
}

/**
 * 获取restDatafield
 * @param datasetUrl
 * @param credential
 * @param options
 */
async function getRestDataFieldInfo(datasetUrl, credential, options) {
  const fieldsInfos = await requestRestDataFieldsInfo(datasetUrl, credential, options);
  return {
    fieldNames: fieldsInfos.map((el) => el.name),
    fieldTypes: fieldsInfos.map((el) => el.type)
  };
}

/**
 * featureResults中的字段名称为全部大写
 * field中的字段名称为首字母大写
 * @param properties
 * @param fields
 */
function transformFeatureField(properties, fields) {
  return Object.keys(properties).reduce((result, k) => {
    const newKey = fields.find((f) => f.toUpperCase() === k.toUpperCase());
    newKey && (result[newKey] = properties[k]);
    return result;
  }, {});
}

/**
 * 将字段和字段类型组装成对象
 * @param fields
 * @param fieldTypes
 */
function getFieldTypeInfo(fields, fieldTypes) {
  return (
    fields &&
    fields.reduce((pre, cur, idx) => {
      pre[cur] = fieldTypes[idx];
      return pre;
    }, {})
  );
}
/**
 * 是否Iportal数值字段
 * @param type
 */
function isPortalNumberData(type) {
  return [IPortalDataTypes.INT, IPortalDataTypes.LONG, IPortalDataTypes.DOUBLE].includes(type);
}

/**
 * 是否Iportal数值字段
 * @param type
 */
function isRestDataNumberData(type) {
  return [
    RestDataTypes.DOUBLE,
    RestDataTypes.INT16,
    RestDataTypes.INT32,
    RestDataTypes.INT64,
    RestDataTypes.SINGLE
  ].includes(type);
}

function isNumberType(type) {
  return isPortalNumberData(type) || isRestDataNumberData(type);
}

function transformDataType(type, value) {
  const isNumber = isNumberType(type);
  if (isNumber) {
    return Number(value);
  }
  const isBoolean = type === propertyType.BOOLEAN;
  if (isBoolean) {
    return Boolean(value);
  }
  return value;
}

/**
 * iServer返回的feature属性值都是字符串，这里按照字段类型，将属性值转换成类型正确的值
 * @param features
 * @param fieldTypesInfo
 * @returns
 */
function formatFeatures(features, fieldTypesInfo) {
  return features.map((feature) => {
    if (feature) {
      for (const key in feature.properties) {
        feature.properties[key] = transformDataType((fieldTypesInfo || {})[key], (feature.properties || {})[key]);
      }
    }
    return feature;
  });
}

/**
 * 将featureResult的feature按feild中的名称和类型进行转换
 * @param originFeatures
 * @param fieldNames
 * @param fieldTypes
 */
function transformFeaturesNameAndType(originFeatures, fieldNames, fieldTypes) {
  const features = originFeatures.map((f) => {
    return { ...f, properties: transformFeatureField(f.properties || {}, fieldNames) };
  });
  const fieldInfo = getFieldTypeInfo(fieldNames, fieldTypes);
  return formatFeatures(features, fieldInfo);
}

function isIportalProxyServiceUrl(url, options) {
  return options.iportalServiceProxyUrl && url.indexOf(options.iportalServiceProxyUrl) >= 0;
}

function handleWithRequestOptions(url, options) {
  if (isIportalProxyServiceUrl(url, options)) {
    return { ...options, withCredentials: true };
  }
  return { ...options, withCredentials: undefined };
}

/**
 * 通过webMapsource获取restData-geojson
 * @param data
 * @param options
 */
async function getRestDataGeojsonByWebMap(data, options) {
  const { url, dataSourceName, datasetName, credential } = data;
  const SQLParams = {
    datasetNames: [dataSourceName + ':' + datasetName],
    getFeatureMode: 'SQL',
    targetEpsgCode: '4326',
    queryParameter: { name: datasetName + '@' + dataSourceName }
  };
  const datasetUrl = `${url.split('featureResults')[0]}datasources/${dataSourceName}/datasets/${datasetName}`;
  const nextOptions = handleWithRequestOptions(datasetUrl, options);
  const { fieldNames, fieldTypes } = await getRestDataFieldInfo(datasetUrl, credential, nextOptions);
  const nextUrl = addCredentialToUrl(url, credential);
  const attrDataInfo = await FetchRequest.post(nextUrl, JSON.stringify(SQLParams), nextOptions);
  const featuresRes = await attrDataInfo.json();

  return {
    type: 'FeatureCollection',
    features: transformFeaturesNameAndType((featuresRes || {}).features || [], fieldNames, fieldTypes)
  };
}

/**
 * 获取单条item
 * @param href
 * @param option
 */
function getStructDataItemJson(href, option) {
  return FetchRequest.get(href, null, option)
    .then((res) => res.json())
    .then((data) => {
      if (data.succeed === false) {
        throw data.error.errorMsg;
      }
      return data;
    });
}

/**
 * 通过返回的links递归请求所有item
 * @param href
 * @param options
 */
async function getStructDataItem(href, options) {
  const data = await getStructDataItemJson(href, options);
  const { features, links = [] } = data || {};
  const nextInfo = links.find((l) => l.rel === 'next');
  if (nextInfo) {
    return features.concat(await getStructDataItem(nextInfo.href, options));
  } else {
    return features;
  }
}

/**
 * 请求结构化数据的所有Feature
 * @param datasetId iportal结构化数据id
 * @param options
 */
async function getStructDataGeojson(datasetId, options) {
  const href = `${options.server}web/datas/${datasetId}/structureddata/ogc-features/collections/all/items.json?limit=10000&offset=0`;
  const allFeature = await getStructDataItem(href, options);
  return {
    type: 'FeatureCollection',
    features: allFeature
  };
}

/**
 * 坐标转换坐标点
 * @param fromProjection 源坐标系
 * @param toProjection 目标坐标系
 * @param coordinates 坐标点
 */
function transformCoordinate(fromProjection, toProjection, coordinates) {
  if (fromProjection === toProjection) {
    return coordinates;
  }
  // proj4缺陷，EPSG:4214的坐标x为180，转换后变成-179.
  if (fromProjection === 'EPSG:4214' && toProjection === 'EPSG:4326' && coordinates[0] === 180) {
    const newCoordinate = proj4(fromProjection, toProjection, coordinates);
    newCoordinate[0] = 180;
    return newCoordinate;
  }
  return proj4(fromProjection, toProjection, coordinates);
}

/**
 * 坐标转换坐标---点线面，多点，多线，多面
 * @param fromProjection 源坐标系
 * @param toProjection 目标坐标系
 * @param geometry 坐标点
 */
function transformGeometryCoordinatesUtil(fromProjection, toProjection, geometry) {
  if (geometry.type === 'MultiPolygon') {
    const coordinates = geometry.coordinates;
    const newGeometry = {
      type: geometry.type,
      coordinates: coordinates.map((items) => {
        return items.map((item) => {
          return item.map((c) => {
            return transformCoordinate(fromProjection, toProjection, c);
          });
        });
      })
    };
    return newGeometry;
  }
  if (geometry.type === 'Polygon' || geometry.type === 'MultiLineString') {
    const coordinates = geometry.coordinates;
    const newGeometry = {
      type: geometry.type,
      coordinates: coordinates.map((items) => {
        return items.map((item) => {
          return transformCoordinate(fromProjection, toProjection, item);
        });
      })
    };
    return newGeometry;
  }
  if (geometry.type === 'MultiPoint' || geometry.type === 'LineString') {
    const coordinates = geometry.coordinates;
    const newGeometry = {
      type: geometry.type,
      coordinates: coordinates.map((item) => {
        return transformCoordinate(fromProjection, toProjection, item);
      })
    };
    return newGeometry;
  }
  if (geometry.type === 'Point') {
    const newGeometry = {
      type: geometry.type,
      coordinates: transformCoordinate(fromProjection, toProjection, geometry.coordinates)
    };
    return newGeometry;
  }
}

/**
 * @description 由于绘制插件只支持4326,所以需要将feature的坐标进行转换
 * @param datasetId 选择要素
 * @param featureIds 选择要素对应的图层（从reducer中获取的）
 */
function transformGeometryCoordinates(features, fromProjection, toProjection = 'EPSG:4326') {
  if (!features || !features.length || !fromProjection) {
    return;
  }
  if (fromProjection === toProjection) {
    return features;
  }
  return features.map((f) => {
    const geometry = transformGeometryCoordinatesUtil(fromProjection, toProjection, f.geometry);
    const newFeature = { ...f };
    geometry && Object.assign(newFeature, { geometry });
    return newFeature;
  });
}

/**
 * 通过webMapsource获取StructuredData-geojson
 * @param data
 * @param options
 */
async function getStructuredDataGeojsonByWebMap(data, options) {
  const allFeature = await getStructDataGeojson(data.dataId, options);
  const resultRes = await FetchRequest.get(
    `${options.server}web/datas/${data.dataId}/structureddata.json`,
    null,
    options
  );
  const result = await resultRes.json();
  const projection = `EPSG:${result.epsgCode}`;
  if (projection !== 'EPSG:4326') {
    const newFeatures = transformGeometryCoordinates(allFeature.features, projection);
    newFeatures && (allFeature.features = newFeatures);
  }
  return allFeature;
}

function webmapODToParser(data) {
  const { originX, originY, destinationX, destinationY } = data;
  return {
    type: 'json',
    x: originX,
    y: originY,
    x1: destinationX,
    y1: destinationY
  };
}

function webmapClusterToTransform(data) {
  const { clusterField, clusterMethod, clusterRadius, clusterType } = data;
  const methodRules = {
    avg: 'mean'
  };
  return [
    {
      type: clusterType,
      field: clusterField,
      method: (clusterMethod && methodRules[clusterMethod]) || clusterMethod,
      size: clusterRadius
    }
  ];
}

/**
 * 构造L7 geojsonsource
 * @param source
 * @param sourceLayer
 * @param options
 */
async function geoJSONSourceToL7Source(source, sourceLayer, options) {
  const { data, od, cluster } = source;

  if (data && data.type === 'FeatureCollection') {
    return {
      data
    };
  }
  const rules = {
    'supermap-rest-data': getRestDataGeojsonByWebMap,
    'supermap-structured-data': getStructuredDataGeojsonByWebMap
  };
  const parser = od && webmapODToParser(source);
  const transforms = cluster && webmapClusterToTransform(source);
  return {
    data: rules[data.type] && (await rules[data.type](source.data, options)),
    parser,
    transforms
  };
}

/**
 * 构造L7mvt-source
 * @param source
 * @returns {Object} L7 mvt source
 */
function vectorSourceToL7Source(source, sourceLayer, options) {
  const result = {
    data: ((source || {}).tiles || [])[0],
    parser: {
      type: 'mvt',
      extent: source.bounds,
      sourceLayer
    }
  };
  if (isIportalProxyServiceUrl(result.data, options)) {
    Object.assign(result.parser, {
      requestParameters: {
        credentials: 'include'
      }
    });
  }
  return result;
}

/**
 * WebMapsource TO L7 source
 * @param source
 * @param sourceLayer mvt才有此参数
 * @param options
 */
function WebMapSourceToL7Source(source, sourceLayer, options) {
  const type = source.type;
  const rules = {
    vector: vectorSourceToL7Source,
    geojson: geoJSONSourceToL7Source
  };
  return rules[type] && rules[type](source, sourceLayer, options);
}

function getFilterFields(filter) {
  const result = [];
  for (const exp of filter) {
    if (exp instanceof Array && exp[1] && typeof exp[1] === 'string') {
      result.push(exp[1]);
      continue;
    }
    if (exp instanceof Array) {
      const subResult = getFilterFields(exp);
      if (subResult && subResult.length > 0) {
        result.push(...subResult);
      }
    }
  }
  return result;
}

export function getL7Filter(filter) {
  if (!filter) {
    return;
  }
  const [condition, ...expressions] = filter;
  const newExpressions = expressions.filter((exp) => {
    const [, f] = exp;
    if (['$type', '$id'].includes(f)) {
      return false;
    }
    return true;
  });
  const field = Array.from(new Set(getFilterFields(newExpressions)));
  const fFilter = featureFilter([condition, ...newExpressions]);
  const filterFunc = fFilter.filter.bind(fFilter);
  return {
    field,
    values: (...args) => {
      const properties = {};
      field.forEach((f, idx) => {
        properties[f] = args[idx];
      });
      const result = filterFunc(
        {},
        {
          properties
        }
      );
      return result;
    }
  };
}

/**
 * 获取L7图层所需要的共有的图层信息
 * @param layer
 */
function getL7LayerCommonInfo(layer) {
  const { type, id, minzoom, maxzoom, layout, paint, filter, source } = layer;
  return {
    id,
    options: {
      type,
      name: layer.id,
      sourceLayer: layer['source-layer'],
      source,
      layout,
      paint,
      filter,
      minZoom: minzoom,
      maxZoom: maxzoom,
      visible: layout.visibility === 'none' ? false : true
    },
    filter: getL7Filter(filter)
  };
}

function expressionToFunction({ value, property, multiple, map }) {
  if (!expression.isExpression(value)) {
    return {
      values: multiple ? value * multiple : value
    };
  }
  const typeRules = {
    size: 'paint_circle',
    color: 'paint_circle',
    shape: 'layout_symbol'
  };
  const rules = {
    size: 'circle-radius',
    color: 'circle-color',
    shape: 'icon-image'
  };
  const fieldRules = {
    interpolate: (compiledExpression) => {
      return compiledExpression.value._styleExpression.expression.input.args[0].args[0].evaluate(
        compiledExpression.value._styleExpression._evaluator
      );
    },
    match: (compiledExpression) => {
      return compiledExpression.value._styleExpression.expression.input.args[0].evaluate(
        compiledExpression.value._styleExpression._evaluator
      );
    },
    case: (compiledExpression) => {
      const branches = compiledExpression.value._styleExpression.expression.branches[0][0];
      // args[0]适用于分段，arg.lhs适用于单值转换成case表达式
      if (branches && branches.args) {
        return branches.args[0].lhs.args[0].args[0].evaluate(compiledExpression.value._styleExpression._evaluator);
      }
      return branches.lhs.args[0].evaluate();
    }
  };
  const propertySpec = spec[typeRules[property]][rules[property]];
  const compiledExpression = expression.createPropertyExpression(value, propertySpec);
  const field = fieldRules[value[0]] && fieldRules[value[0]](compiledExpression);
  const newFunc = compiledExpression.value.evaluate.bind(compiledExpression.value);
  const callback = (v) => {
    const f = {
      properties: { [field]: v },
      type: 'point'
    };
    const result = newFunc({ zoom: map.getZoom() }, f);
    return property === 'shape' ? result.toString() : multiple ? result * multiple : result;
  };
  return {
    field,
    values: callback
  };
}

function getLineCurveStyleKey(type, key) {
  const ANTVL7_LINE_CURVE_STYLE_KEY = {
    [`${type}-dasharray`]: 'dashArray',
    [`${type}-opacity`]: 'opacity',
    [`${type}-pattern-color`]: 'textureColor',
    [`${type}-pattern-opacity`]: 'opacity',
    [`${type}-pattern-interval`]: 'iconStep',
    [`${type}-pattern-blend`]: 'textureBlend',
    [`${type}-segment`]: 'segmentNumber',
    [`${type}-pattern-rotate`]: 'textureRotate'
  };
  return ANTVL7_LINE_CURVE_STYLE_KEY[key];
}

function getLineCurveAnimateKey(type, key) {
  const ANTVL7_ANIMATE_LINE_CURVE_STYLE_KEY = {
    [`${type}-animate-duration`]: 'duration',
    [`${type}-animate-interval`]: 'interval',
    [`${type}-animate-trailLength`]: 'trailLength'
  };
  return ANTVL7_ANIMATE_LINE_CURVE_STYLE_KEY[key];
}

/**
 * 返回L7函数需要的字段
 * 动画线：宽高
 * 3D柱状图：长宽高
 * @param args
 */
function getCompositeField(...args) {
  return args
    .filter((a) => a.field)
    .map((a) => {
      return a.field;
    })
    .join('*');
}

/**
 * 返回L7函数
 * args为
 * 动画线：宽高
 * 3D柱状图：长宽高
 * @param valueArgs
 * @param args
 */
function getCompositeCallback(valueArgs, args) {
  const newValueArgs = [...valueArgs];
  return args.map((attr) => {
    const multiple = attr.multiple;
    if (attr.field) {
      const value = newValueArgs[0];
      newValueArgs.unshift();
      const result = attr && attr.values ? attr.values(value) : value;
      return multiple && Util.isNumber(result) ? result * multiple : result;
    }
    return multiple && Util.isNumber(attr.values) ? attr.values * multiple : attr.values;
  });
}

/**
 * 将表达式转换成L7支持的function
 * @param value
 * @param property
 */
function expressionMultiToFunction(map, ...size) {
  const functions = size.map(({ value, multiple }) => expressionToFunction({ value, property: 'size', multiple, map }));
  const field = getCompositeField(...functions);
  let values;
  if (field !== '') {
    values = (...valueArgs) => {
      // valueArgs的个数由field来决定
      return getCompositeCallback(valueArgs, functions);
    };
  } else {
    values = size.map((v, idx) => {
      const multiple = size[idx].multiple || 1;
      return v.value * multiple;
    });
  }

  return {
    field: field !== '' ? field : undefined,
    values
  };
}

function webmapAttibutesToChartBarFields(attributes) {
  return attributes.reduce((result, [field, color]) => {
    result[field] = color;
    return result;
  }, {});
}

function webmapAttibutesToChartLineFields(attributes) {
  return attributes.map(([field]) => field);
}

/**
 * 表达式转换为rampColors
 * @param color
 */
function colorExpressionToRampColors(color) {
  const propertySpec = spec[`paint_heatmap`]['heatmap-color'];
  const compiledExpression = expression.createPropertyExpression(color, propertySpec);
  const positions = compiledExpression.value._styleExpression.expression.labels;
  const colors = compiledExpression.value._styleExpression.expression.outputs.map((v) => {
    return v.value;
  });
  return {
    positions,
    colors
  };
}

function getSelectType(currentLayer) {
  const layout = currentLayer.layout || {};
  if (
    currentLayer.type === 'heatmap' &&
    layout['heatmap-shape'] &&
    ['square', 'hexagon'].includes(layout['heatmap-shape'])
  ) {
    return SelectStyleTypes.heatGrid;
  }
  if (
    currentLayer.type === 'heatmap-extrusion' &&
    layout['heatmap-extrusion-shape'] &&
    ['squareColumn', 'hexagonColumn'].includes(layout['heatmap-extrusion-shape'])
  ) {
    return SelectStyleTypes.heat3DGrid;
  }
  if (currentLayer.type === 'heatmap-extrusion') {
    return SelectStyleTypes.heat3D;
  }
  if (currentLayer.type === 'chart' && ['bar', 'line'].includes(layout['chart-type'])) {
    return SelectStyleTypes.bar;
  }
  if (currentLayer.type === 'chart' && layout['chart-type'] === 'pie') {
    return SelectStyleTypes.pie;
  }
  if (currentLayer.type === 'radar') {
    return SelectStyleTypes.radarPoint;
  }
  if (currentLayer.type === 'point-extrusion') {
    return SelectStyleTypes.column;
  }
  if (['line-curve', 'line-curve-extrusion'].includes(currentLayer.type)) {
    return SelectStyleTypes.od;
  }
  if (currentLayer.type === 'line-extrusion') {
    return SelectStyleTypes.line;
  }
  if (layout['circle-animate-rings'] !== undefined) {
    return SelectStyleTypes.animatePoint;
  }
  return '';
}

function getPaintOrLayutByStyleName(styleName) {
  return layoutStyleNames.includes(styleName) ? 'layout' : 'paint';
}

function omitAttrs(obj, excludeKeys) {
  const nextObj = {};
  for (const key in obj) {
    if (!excludeKeys.includes(key)) {
      nextObj[key] = obj[key];
    }
  }
  return obj;
}

function pickAttrs(obj, includeKeys) {
  const nextObj = {};
  for (const key in obj) {
    if (includeKeys.includes(key)) {
      nextObj[key] = obj[key];
    }
  }
  return obj;
}

function isSolidDasharray(dasharray) {
  return dasharray.length === 2 && dasharray[0] === 1 && dasharray[1] === 0;
}

/**
 * 根据dasharray获取线型
 * @param dasharray
 */
function getLineTypeByDashArray(dasharray) {
  if (dasharray && dasharray.length > 1 && !isSolidDasharray(dasharray)) {
    return 'dash';
  }
  return 'solid';
}

/**
 * WebMap动画点 转换成sceneLayer
 * @param layer
 * @param source
 * @param map
 */
function transformCircleLayerToSceneLayer(layer, source, map) {
  const { paint, layout } = layer;
  const color = paint['circle-color'] || '#EE4D5A',
    radius = paint['circle-radius'] || 30,
    opacity = paint['circle-opacity'],
    speed = layout['circle-animate-speed'],
    rings = layout['circle-animate-rings'];
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.point,
    source,
    color: expressionToFunction({ value: color, property: 'color', map }),
    size: expressionToFunction({ value: radius, property: 'size', multiple: 2, map }),
    shape: {
      values: 'circle'
    },
    style: {
      opacity
    },
    animate: {
      enable: true,
      speed: speed,
      rings: rings
    }
  };
  return newLayer;
}

/**
 * webmap RadarLayer 转换成sceneLayer
 * @param layer
 * @param source
 * @param map
 */
function transformWebmapRadarLayerToSceneLayer(layer, source, map) {
  const { paint, layout } = layer;
  const color = paint['radar-color'] || '#EE4D5A',
    radius = paint['radar-radius'] || 30,
    opacity = paint['radar-opacity'],
    speed = layout['radar-animate-speed'];
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.point,
    source,
    color: expressionToFunction({ value: color, property: 'color', map }),
    size: expressionToFunction({ value: radius, property: 'size', map }),
    shape: {
      values: 'radar'
    },
    style: {
      opacity,
      speed: speed
    },
    animate: {
      enable: true
    }
  };
  return newLayer;
}

/**
 * webmap ODLayer 转换成sceneLayer
 * @param layer
 * @param source
 * @param map
 */
function transformWebmapODLayerToSceneLayer(layer, source, map) {
  const { paint, layout } = layer;
  const shape = layout['line-curve-shape'] || layout['line-curve-extrusion-shape'];
  const type = shape === 'arc3d' ? 'line-curve-extrusion' : 'line-curve';
  const color = paint[`${type}-color`] || '#ff6b34',
    width = paint[`${type}-width`] || 1,
    dashArray = paint[`${type}-dasharray`],
    texture = paint[`${type}-pattern`];
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.line,
    source: {
      data: source.data.features.map((f) => f.properties),
      parser: source.parser
    },
    color: expressionToFunction({ value: color, property: 'color', map }),
    size: expressionToFunction({ value: width, property: 'size', map }),
    shape: {
      values: shape
    },
    style: {
      lineType: getLineTypeByDashArray(dashArray)
    }
  };
  for (const key in paint) {
    const styleKey = getLineCurveStyleKey(type, key);
    if (styleKey) {
      Object.assign(newLayer.style || {}, {
        [styleKey]: paint[key]
      });
    }
  }
  for (const key in layout) {
    const styleKey = getLineCurveStyleKey(type, key);
    if (styleKey) {
      Object.assign(newLayer.style || {}, {
        [styleKey]: layout[key]
      });
    }

    const animateKey = getLineCurveAnimateKey(type, key);
    if (animateKey) {
      if (!newLayer.animate) {
        newLayer.animate = {};
      }
      Object.assign(newLayer.animate, {
        [animateKey]: layout[key]
      });
    }
  }
  if (texture) {
    newLayer.texture = { values: texture };
    Object.assign(newLayer.style || {}, {
      lineTexture: true
    });
  }
  return newLayer;
}

/**
 * 创建3D柱状图层
 * @param layer
 * @param source
 * @param map
 */
function transfromPointExtrusionLayerToSceneLayer(layer, source, map) {
  const { paint, layout } = layer;
  const color = paint['point-extrusion-color'] || '#EE4D5A',
    width = paint['point-extrusion-width'] || 12,
    length = paint['point-extrusion-length'] || 12,
    height = paint['point-extrusion-height'] || 12,
    opacity = paint['point-extrusion-opacity'],
    sourceColor = paint['point-extrusion-source-color'],
    targetColor = paint['point-extrusion-target-color'],
    opacityLinearDir = paint['point-extrusion-opacity-linear-direction'],
    shape = layout['point-extrusion-shape'] || 'cylinder';
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.point,
    source,
    color: expressionToFunction({ value: color, property: 'color', map }),
    size: expressionMultiToFunction(
      map,
      { value: width, multiple: 0.5 },
      { value: length, multiple: 0.5 },
      { value: height }
    ),
    shape: expressionToFunction({ value: shape, property: 'shape', map }),
    style: {
      opacity,
      sourceColor: sourceColor,
      targetColor: targetColor,
      opacityLinear: {
        enable: !!opacityLinearDir,
        dir: opacityLinearDir
      }
    }
  };
  return newLayer;
}

/**
 * webmap LineLayer 转换成sceneLayer
 * @param layer
 * @param source
 * @param map
 */
function transformWebmapLineLayerToSceneLayer(layer, source, map) {
  const { paint, layout } = layer;
  const color = paint['line-extrusion-color'] || '#ff6b34',
    width = paint['line-extrusion-width'] || 12,
    height = paint['line-extrusion-base'] || 0,
    dashArray = paint['line-extrusion-dasharray'],
    texture = paint['line-extrusion-pattern'];
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.line,
    source,
    color: expressionToFunction({ value: color, property: 'color', map }),
    size: expressionMultiToFunction(map, { value: width, multiple: L7_WIDTH_MULTIPLE }, { value: height }),
    shape: {
      values: 'line'
    },
    style: {
      lineType: getLineTypeByDashArray(dashArray)
    }
  };
  for (const key in paint) {
    const styleKey = ANTVL7_LINE_EXTRUSION_STYLE_KEY[key];
    if (styleKey) {
      Object.assign(newLayer.style || {}, {
        [styleKey]: paint[key]
      });
    }
  }
  for (const key in layout) {
    const styleKey = ANTVL7_LINE_EXTRUSION_STYLE_KEY[key];
    if (styleKey) {
      Object.assign(newLayer.style || {}, {
        [styleKey]: layout[key]
      });
    }

    const animateKey = ANTVL7_ANIMATE_LINE_EXTRUSION_STYLE_KEY[key];
    if (animateKey) {
      if (!newLayer.animate) {
        newLayer.animate = {};
      }
      Object.assign(newLayer.animate, {
        [animateKey]: layout[key]
      });
    }
  }
  if (texture) {
    newLayer.texture = { values: texture };
    Object.assign(newLayer.style || {}, {
      lineTexture: true
    });
  }
  return newLayer;
}

/**
 * webmap LineLayer 转换成sceneLayer
 * @param layer
 * @param source
 */
function transformWebmapChartLineLayerToSceneLayer(layer, source) {
  const { paint, layout } = layer;
  const background = paint['chart-background-color'],
    width = paint['chart-width'],
    height = paint['chart-height'],
    xAxis = {
      grid: paint['chart-xAxis-grid'],
      label: paint['chart-xAxis-label'],
      line: paint['chart-xAxis-line']
    },
    yAxis = {
      grid: paint['chart-yAxis-grid'],
      label: paint['chart-yAxis-label'],
      line: paint['chart-yAxis-line']
    },
    chartType = layout['chart-type'],
    attributes = layout['chart-attribute-color'];
  const color = chartType === 'line' &&
    attributes.length > 0 && {
      values: attributes[0][1]
    };
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.point,
    id: layer.id,
    source,
    layerType: AntvL7LayerType.MarkerLayer,
    chartType: chartType,
    fields: {
      values:
        chartType === 'bar' ? webmapAttibutesToChartBarFields(attributes) : webmapAttibutesToChartLineFields(attributes)
    },
    width: {
      values: width
    },
    height: {
      values: height
    },
    background: {
      values: background
    },
    xAxis: {
      values: xAxis
    },
    yAxis: {
      values: yAxis
    },
    color
  };
  return newLayer;
}
/**
 * webmap LineLayer 转换成sceneLayer
 * @param layer
 * @param source
 */
function transformWebmapChartPieLayerToSceneLayer(layer, source) {
  const { paint, layout } = layer;
  const radius = paint['chart-radius'],
    innerRadius = paint['chart-inner-radius'],
    chartType = layout['chart-type'],
    attributes = layout['chart-attribute-color'];
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.point,
    id: layer.id,
    source,
    layerType: AntvL7LayerType.MarkerLayer,
    chartType: chartType,
    fields: {
      values: webmapAttibutesToChartBarFields(attributes)
    },
    radius: {
      values: radius
    },
    innerRadius: {
      values: innerRadius
    }
  };
  return newLayer;
}

/**
 * webmap HeatLayer 转换成sceneLayer
 * @param layer
 * @param source
 * @param map
 */
function transformWebmapHeatLayerToSceneLayer(layer, source, map) {
  const { paint, layout } = layer;
  const color = paint['heatmap-color'] || '#EE4D5A',
    opacity = paint['heatmap-opacity'],
    shape = layout['heatmap-shape'],
    angle = layout['heatmap-rotate'],
    coverage = layout['heatmap-coverage'];
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.heatmap,
    id: layer.id,
    source,
    shape: { values: shape },
    color: expressionToFunction({ value: color, property: 'color', map }),
    style: {
      opacity,
      coverage,
      angle
    }
  };
  return newLayer;
}
/**
 * webmap HeatExtrusionLayer 转换成sceneLayer
 * @param layer
 * @param source
 * @param map
 */
function transformWebmapHeatExtrusionLayerToSceneLayer(layer, source, map) {
  const { paint, layout } = layer;
  const color = paint['heatmap-extrusion-color'] || '#EE4D5A',
    opacity = paint['heatmap-extrusion-opacity'],
    height = paint['heatmap-extrusion-height'],
    shape = layout['heatmap-extrusion-shape'],
    angle = layout['heatmap-extrusion-rotate'],
    coverage = layout['heatmap-extrusion-coverage'];
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.heatmap,
    id: layer.id,
    source,
    shape: { values: shape },
    size: expressionToFunction({ value: height, property: 'size', map }),
    color: expressionToFunction({ value: color, property: 'color', map }),
    style: {
      opacity,
      coverage,
      angle
    }
  };
  return newLayer;
}

/**
 * webmap HeatExtrusionLayer 转换成sceneLayer
 * @param layer
 * @param source
 */
function transformWebmapHeatExtrusionBasicLayerToSceneLayer(layer, source) {
  const { paint } = layer;
  const color = paint['heatmap-extrusion-color'],
    opacity = paint['heatmap-extrusion-opacity'],
    intensity = paint['heatmap-extrusion-intensity'],
    radius = paint['heatmap-extrusion-radius'],
    weight = paint['heatmap-extrusion-weight'];
  const newLayer = {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.heatmap,
    id: layer.id,
    source,
    size: { field: weight, values: [0, 1] },
    shape: {
      values: 'heatmap3D'
    },
    style: {
      rampColors: colorExpressionToRampColors(color),
      opacity,
      intensity,
      radius
    }
  };
  return newLayer;
}

/**
 * 将Webmaplayer中的文本图层转换成sceneLayer
 * @param layer
 * @param source
 * @param visible
 * @returns
 */
function transformWebmapTextLayerToSceneLayer(layer, source, visible, map) {
  const { paint, layout } = layer;
  const field = layout['text-field'].split('{')[1].split('}')[0];
  const style = {};
  Object.keys(omitAttrs(TEXT_MAPBOXGL_ANTVL7_KEY, ['text-color', 'text-size', 'text-field'])).forEach((k) => {
    const value = (layer[getPaintOrLayutByStyleName(k)] || {})[k];
    value !== undefined && (style[TEXT_MAPBOXGL_ANTVL7_KEY[k]] = value);
  });
  return {
    ...getL7LayerCommonInfo(layer),
    type: MSLayerType.point,
    id: layer.id,
    source,
    color: expressionToFunction({ value: paint['text-color'], property: 'color', map }),
    size: expressionToFunction({ value: layout['text-size'], property: 'size', map }),
    shape: {
      field,
      values: 'text'
    },
    style
  };
}

async function restoreL7Layers({ layers, sources, map, options }) {
  const result = [];
  for (const currentLayer of layers) {
    try {
      const originSource = sources[currentLayer.source];
      const rules = {
        [SelectStyleTypes.animatePoint]: transformCircleLayerToSceneLayer,
        [SelectStyleTypes.radarPoint]: transformWebmapRadarLayerToSceneLayer,
        [SelectStyleTypes.od]: transformWebmapODLayerToSceneLayer,
        [SelectStyleTypes.column]: transfromPointExtrusionLayerToSceneLayer,
        [SelectStyleTypes.line]: transformWebmapLineLayerToSceneLayer,
        [SelectStyleTypes.bar]: transformWebmapChartLineLayerToSceneLayer,
        [SelectStyleTypes.pie]: transformWebmapChartPieLayerToSceneLayer,
        [SelectStyleTypes.heatGrid]: transformWebmapHeatLayerToSceneLayer,
        [SelectStyleTypes.heat3DGrid]: transformWebmapHeatExtrusionLayerToSceneLayer,
        [SelectStyleTypes.heat3D]: transformWebmapHeatExtrusionBasicLayerToSceneLayer
      };
      const source = await WebMapSourceToL7Source(originSource, currentLayer['source-layer'], options);
      const selectedType = getSelectType(currentLayer);
      result.push(
        (rules[selectedType] && rules[selectedType](currentLayer, source, map)) ||
          transformWebmapTextLayerToSceneLayer(currentLayer, source, (currentLayer || {}).visible, map)
      );
    } catch (error) {
      console.error(error);
      options.emitterEvent('getlayersfailed', { error, map });
    }
  }
  return result;
}

/**
 * 获取scene
 * @param map
 */
async function getScene(map) {
  return new Promise((resolve) => {
    map.getL7Scene().then((s) => {
      resolve(s);
    });
  });
}

/**
 * 利用图片信息生成ImageData
 * @param imageInfo spriteJSON中指定id获取到的图标信息
 * @param image image
 */
function getPartImageDataFromImage(imageInfo, image) {
  if (!image) {
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  ctx.drawImage(image, 0, 0);
  const oImgData = ctx.getImageData(imageInfo.x, imageInfo.y, imageInfo.width, imageInfo.height);
  return oImgData;
}

/**
 * 将字符串颜色值转换成rgba对象
 * @param color
 */
function string2RGBAData(color) {
  const data = Color.getData(Color.toRGBA(color));
  const [r, g, b, a] = data;
  return { r, g, b, a };
}

async function getChangedImageUrl(url, iconStyle) {
  const img = await loadImage(url);
  const { color, rotate } = iconStyle;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  rotate !== 0 && ctx.rotate((rotate * Math.PI) / 180);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  if (color) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const { r, g, b, a } = string2RGBAData(color);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = Math.round(data[i + 3] * a);
    }
    ctx.putImageData(imageData, 0, 0);
  }
  return canvas.toDataURL();
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject();
    };
    img.src = url;
  });
}

async function processImage(url, iconStyle) {
  const changeedUrl = await getChangedImageUrl(url, iconStyle);
  const modifiedImg = await loadImage(changeedUrl);
  return modifiedImg;
}

function imgDataToBlob(imagedata) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx && ctx.putImageData(imagedata, 0, 0);

  const image = new Image();
  image.src = canvas.toDataURL();
  return image.src;
}

/**
 * 将雪碧图1倍地址替换成2x的
 */
function replaceSprite2X(url) {
  const arrs = url.split('/');
  const lastSprite = arrs.slice(-1)[0];
  if (!lastSprite) {
    return url;
  }
  const newLastSprite = lastSprite.replace('sprite', 'sprite@2x');
  arrs.splice(arrs.length - 1, 1, newLastSprite);
  return arrs.join('/');
}

/**
 * 根据设备比返回对应的Url
 * @param url sprite url
 */
function getPixelRatioSpriteUrl(url) {
  if (window.devicePixelRatio > 1 && !url.includes('/sprite@2x')) {
    return replaceSprite2X(url);
  }
  return url;
}

function getSpritePngUrl(spriteUrl) {
  const [url, token] = spriteUrl.split('?token=');
  let pngUrl = getPixelRatioSpriteUrl(url) + '.png';
  token && (pngUrl += `?token=${token}`);
  return pngUrl;
}

/**
 * 将雪碧图png转换为Image
 * ps: image src 设置request的header是为了使用ipt代理地址的服务，点击地图时，选择 restmap，symbol图层，雪碧图{url}.png请求 报错401
 * @param spriteUrl sprite url
 * @param options
 */
function getSpriteImage(spriteUrl, options) {
  return new Promise((resolve) => {
    const url = getSpritePngUrl(spriteUrl);
    const request = new XMLHttpRequest();
    const image = new Image();
    image.crossOrigin = '';
    request.responseType = 'blob';
    request.open('get', url, true);
    request.withCredentials = options.withCredentials;
    request.setRequestHeader('accept', 'image/webp,*/*');
    request.onreadystatechange = () => {
      // 请求状态结束时： XMLHttpRequest.DONE === 4;
      if (request.readyState === 4 && request.status === 200) {
        image.src = URL.createObjectURL(request.response);
        image.onload = () => {
          resolve(image);
        };
        image.onerror = () => {
          resolve(null);
        };
      }
    };
    request.send(null);
  });
}

async function changeSpriteIconToImgData(spriteUrl, iconJsonInfo, options) {
  const spriteImage = await getSpriteImage(spriteUrl, options);
  if (!spriteImage) {
    return;
  }
  return getPartImageDataFromImage(iconJsonInfo, spriteImage);
}

/**
 * 批量添加L7texture使用到的图片，从雪碧图上裁剪
 * @param layers
 * @param sprite
 * @param scene
 */
async function addTextures({ layers, sprite, spriteJson, scene, options }) {
  const timestamp = +new Date();
  for (let index = 0; index < layers.length; index++) {
    const l = layers[index];
    const texture = (l.texture || {}).values;
    const iconInfo = spriteJson[texture];
    if (iconInfo) {
      const image = await changeSpriteIconToImgData(sprite, { ...iconInfo, id: texture }, options);
      const style = l.style || {};
      const color = style.textureColor,
        rotate = style.textureRotate;
      if (color || rotate) {
        const modifiedImg = await processImage(imgDataToBlob(image), {
          color,
          rotate
        });
        const newImageId = `${texture}_${timestamp}_${index}`;
        Object.assign(l.texture || {}, { values: newImageId });
        scene.addImage(newImageId, modifiedImg);
      } else if (!scene.hasImage(texture)) {
        scene.addImage(texture, imgDataToBlob(image));
      }
    }
  }
}

/**
 * 过滤统计图表数据
 * @param data
 * @param filter
 */
function filterMarkerData(data, filter) {
  const features = data.features;
  const { field, values } = filter;
  const result = features.filter((feature) => {
    const args = field.map((v) => (feature.properties || {})[v]);
    return values(...args);
  });
  return {
    type: 'FeatureCollection',
    features: result
  };
}

const ChartController = {
  // 用于显示后恢复统计专题图
  sceneChartLayers: {},
  // 用于隐藏后删除统计专题图
  markerLayers: {},
  setSceneChartLayer(id, layer) {
    this.sceneChartLayers[id] = layer;
  },
  getSceneChartLayer(id) {
    return this.sceneChartLayers[id];
  },
  setMarkerLayer(id, layer) {
    this.markerLayers[id] = layer;
  },
  getMarkerLayer(id) {
    return this.markerLayers[id];
  },
  removeMarkerLayer(id) {
    delete this.markerLayers[id];
  }
};

/**
 *
 * 获取统计图表的x y轴参数
 * @param {object} axis
 */
function getG2ChartAxisSetting(axis) {
  const lineStyle = {
    style: {
      lineWidth: 1,
      stroke: 'gray'
    }
  };
  const axisSetting = {
    grid: {
      line: lineStyle
    },
    line: lineStyle,
    label: {
      autoRotate: true,
      autoEllipsis: true
    }
  };
  for (const key in axis) {
    if (!axis[key]) {
      axisSetting[key] = null;
    }
  }
  return axisSetting;
}

function getFeatureCenter(feature) {
  const coordinates = ((feature || {}).geometry || {}).coordinates;
  const featureType = feature.geometry.type;
  const coordinatesMidIndex = Math.floor(coordinates.length / 2);
  let centerPoint;
  if (featureType === 'LineString') {
    centerPoint = coordinates[coordinatesMidIndex];
  } else if (featureType === 'MultiLineString') {
    const coord = coordinates[coordinatesMidIndex];
    centerPoint = coord[Math.floor(coord.length / 2)];
  } else {
    centerPoint = ((center(feature) || {}).geometry || {}).coordinates;
  }
  const [lng, lat] = centerPoint || [];
  return {
    lng,
    lat
  };
}

/**
 *
 * 获取统计图表数据
 * @param {string[]} fields
 * @param {GeoJSON.Feature} feature
 * @param {boolean} hasPercent
 */
function createG2ChartDataByFeature(fields, feature, hasPercent = false) {
  const itemData = [];
  const { properties } = feature;
  let total = 0;

  if (hasPercent) {
    fields.forEach((field) => {
      const count = properties ? properties[field] : 0;
      total = total + count;
    });
  }

  fields.forEach((field) => {
    const count = properties ? properties[field] : 0;
    const item = { x: field, y: count };
    if (hasPercent) {
      item.percent = count / total;
    }
    itemData.push(item);
  });
  return itemData;
}

/**
 *
 * 创建统计图表
 * @param {HTMLElement} el
 * @param {number} width
 * @param {number} height
 * @param {g2ChartItemData[]} itemData
 */
function createG2Chart(el, width, height, itemData) {
  if (!G2) {
    const errorMsg = 'G2 is not define';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  const chart = new G2.Chart({
    container: el,
    width,
    height,
    autoFit: true
  });
  chart.legend(false);
  chart.data(itemData);
  return chart;
}

/**
 *
 * 创建L7Marker
 * @param {HTMLElement} el
 * @param {GeoJSON.Feature} feature
 * @param {object} coordinates
 */
function createL7Marker(el, coordinates) {
  const marker = new L7.Marker({
    element: el
  }).setLnglat(coordinates);
  return marker;
}

function getL7ChartLineMarkerLayer(fields, chartSettings, data) {
  const { color, width, height, background, xAxis, yAxis } = chartSettings;
  const features = data.features;
  const xAxisSetting = getG2ChartAxisSetting(xAxis);
  const yAxisSetting = getG2ChartAxisSetting(yAxis);
  const dom = document.createElement('div');
  dom.style.background = background;
  const markers = features.map((feature) => {
    const el = dom.cloneNode();
    const coordinates = getFeatureCenter(feature);
    const itemData = createG2ChartDataByFeature(fields, feature);
    const chart = createG2Chart(el, width, height, itemData);
    chart.axis('x', xAxisSetting);
    chart.axis('y', yAxisSetting);
    chart.line().position('x*y').color(color);
    chart.render();
    return createL7Marker(el, coordinates);
  });
  return markers;
}

function getL7ChartBarMarkerLayer(fieldColors, chartSettings, data) {
  const { width, height, background, xAxis, yAxis } = chartSettings;
  const features = data.features;
  const fields = Object.keys(fieldColors);
  const colors = Object.values(fieldColors);
  const xAxisSetting = getG2ChartAxisSetting(xAxis);
  const yAxisSetting = getG2ChartAxisSetting(yAxis);
  const dom = document.createElement('div');
  dom.style.backgroundColor = background;

  const markers = features.map((feature) => {
    const el = dom.cloneNode();
    const coordinates = getFeatureCenter(feature);
    const itemData = createG2ChartDataByFeature(fields, feature);
    const chart = createG2Chart(el, width, height, itemData);
    chart.axis('x', xAxisSetting);
    chart.axis('y', yAxisSetting);
    chart.interval().position('x*y').color('x', colors);
    chart.render();
    return createL7Marker(el, coordinates);
  });
  return markers;
}

function getL7ChartPieMarkerLayer(fieldColors, chartSettings, data) {
  const features = data.features;
  const fields = Object.keys(fieldColors);
  const colors = Object.values(fieldColors);
  const { radius, innerRadius } = chartSettings;
  const dom = document.createElement('div');
  const markers = features.map((feature) => {
    const el = dom.cloneNode();
    const coordinates = getFeatureCenter(feature);
    const itemData = createG2ChartDataByFeature(fields, feature, true);
    const chart = createG2Chart(el, radius, radius, itemData);
    chart.coord('theta', {
      innerRadius
    });
    chart.interval().adjust('stack').position('percent').color('x', colors).shape('sliceShape');
    chart.render();
    return createL7Marker(el, coordinates);
  });
  return markers;
}

function createL7MarkerLayerByMarkers(markers) {
  const markerLayer = new L7.MarkerLayer();
  markers.forEach((marker) => {
    markerLayer.addMarker(marker);
  });
  return markerLayer;
}

function removeL7MarkerLayer(markerLayerId, scene) {
  const originalLayer = ChartController.getMarkerLayer(markerLayerId);
  if (originalLayer) {
    scene.removeMarkerLayer(originalLayer);
    ChartController.removeMarkerLayer(markerLayerId);
  }
}

function addL7MarkerLayer(actionLayer, scene) {
  const { source, id: markerLayerId, chartType } = actionLayer;
  let data = source.data;
  if (actionLayer.filter) {
    data = filterMarkerData(source.data, actionLayer.filter);
  }
  removeL7MarkerLayer(markerLayerId, scene);
  let markers = [];
  if (chartType === StyleRenderType.bar) {
    const { fields, width, height, background, xAxis, yAxis } = actionLayer;
    const chartSettings = {
      width: width.values,
      height: height.values,
      background: background.values,
      xAxis: xAxis.values,
      yAxis: yAxis.values
    };
    markers = getL7ChartBarMarkerLayer(fields.values, chartSettings, data);
  }
  if (chartType === StyleRenderType.line) {
    const { color, fields, width, height, background, xAxis, yAxis } = actionLayer;
    const chartSettings = {
      width: width.values,
      height: height.values,
      background: background.values,
      xAxis: xAxis.values,
      yAxis: yAxis.values,
      color: color.values
    };
    markers = getL7ChartLineMarkerLayer(fields.values, chartSettings, data);
  }
  if (chartType === StyleRenderType.pie) {
    const { fields, radius, innerRadius } = actionLayer;
    const chartSettings = {
      radius: radius.values,
      innerRadius: innerRadius.values
    };
    markers = getL7ChartPieMarkerLayer(fields.values, chartSettings, data);
  }
  const layer = createL7MarkerLayerByMarkers(markers);
  scene.addMarkerLayer(layer);
  ChartController.setMarkerLayer(markerLayerId, layer);
  return layer;
}

function getL7Layer(l, sourceInfo) {
  const typeRule = {
    [MSLayerType.line]: 'LineLayer',
    [MSLayerType.point]: 'PointLayer',
    [MSLayerType.polygon]: 'PolygonLayer',
    [MSLayerType.heatmap]: 'HeatmapLayer'
  };
  const source = l.source || {};
  // 解决L7结构化数据监听click事件会返回多个features问题
  let promoteId = sourceInfo.promoteId;
  if (!promoteId) {
    promoteId = sourceInfo.tiles && sourceInfo.tiles[0].includes('/structureddata/') ? 'smpid' : undefined;
  }
  const layer = new L7Layer({
    type: typeRule[l.type],
    options: {
      ...l.options,
      layerID: (l.options || {}).name,
      featureId: promoteId
    }
  });
  // getL7Layer返回原生antv l7 layer的实例
  const l7Layer = layer.getL7Layer();
  // 调用原生antv l7 layer的方法，构建图层
  const sourceOptions = {};
  const shape = l.shape || {};
  if (source.parser) {
    sourceOptions.parser = l.source.parser;
  }
  if (source.transforms) {
    sourceOptions.transforms = l.source.transforms;
  }
  l7Layer.source(source.data, sourceOptions);

  shape.field ? l7Layer.shape(shape.field, shape.values) : l7Layer.shape(shape.values);
  if (l.texture) {
    l7Layer.texture(l.texture.values);
  }
  if (l.size) {
    l.size.field ? l7Layer.size(l.size.field, l.size.values) : l7Layer.size(l.size.values);
  }
  if (l.color) {
    l.color.field ? l7Layer.color(l.color.field, l.color.values) : l7Layer.color(l.color.values);
  }
  if (l.style) {
    l7Layer.style(l.style);
  }
  if (l.animate) {
    l7Layer.animate(l.animate);
  }
  if (l.filter) {
    const refresh = debounce(function () {
      layer.reRender();
    }, 500);
    l7Layer.filter(l.filter.field, (...args) => {
      const result = l.filter.values(...args);
      if (result) {
        refresh();
      }
      return result;
    });
  }
  return layer;
}

/**
 * mapboxgl setStyle之后
 * @param options
 */
export async function addL7Layers({ map, webMapInfo, l7Layers, spriteDatas, options }) {
  // 添加L7图层
  const { layers, sources, sprite } = webMapInfo;
  const formateL7Layers = await restoreL7Layers({
    layers: l7Layers,
    sources,
    map,
    options: Object.assign({ withoutFormatSuffix: true }, options)
  });
  // 批量处理L7纹理
  const scene = await getScene(map);
  if (Object.keys(spriteDatas).length > 0) {
    try {
      await addTextures({
        layers: formateL7Layers.filter((l) => !!l.texture),
        spriteJson: spriteDatas,
        sprite,
        scene,
        options
      });
    } catch (error) {
      console.error(error);
      options.emitterEvent('getlayersfailed', { error, map });
    }
  }
  for (const l of formateL7Layers) {
    const layerIndex = layers.findIndex((wLayer) => wLayer.id === l.id);
    // 从剩下的图层中找到第一个通过setStyle已经添加过的mapboxgl图层
    const beforeLayer = layers.slice(layerIndex + 1).find((r) => !isL7Layer(r));
    if (l.layerType === AntvL7LayerType.MarkerLayer) {
      const actionLayer = l;
      (l.options || {}).visible !== false && addL7MarkerLayer(actionLayer, scene);
      ChartController.setSceneChartLayer(l.id, actionLayer);
    } else {
      const layer = getL7Layer(l, sources[layers[layerIndex].source]);
      if (!map.getLayer(layer.id)) {
        map.addLayer(layer, beforeLayer && beforeLayer.id);
      }
    }
  }
}

/**
 * mapboxgl不支持渲染的图层类型
 * @param layer
 */
export function isL7Layer(layer) {
  const layout = layer.layout || {};
  return (
    (layer.type === 'circle' && layout['circle-animate-rings']) || // 动画点
    layer.type === 'radar' || // 雷达图
    layer.type === 'point-extrusion' || // 3D柱状图
    layer.type === 'line-curve' || // OD
    layer.type === 'line-curve-extrusion' || // OD-3D
    layer.type === 'line-extrusion' || // 3D线
    layer.type === 'chart' || // 统计专题图
    (layer.type === 'heatmap' && layout['heatmap-shape']) || // L7-2D热力图
    layer.type === 'heatmap-extrusion' || // L7-3D热力图
    (layer.type === 'symbol' && layout['text-z-offset'] > 0)
  );
}

export function getL7MarkerLayers() {
  return ChartController.markerLayers;
}
