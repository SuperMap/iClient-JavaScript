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
  let urlArr = serverUrl.split('');
  if (urlArr[urlArr.length - 1] !== '/') {
    serverUrl += '/';
  }
  return serverUrl;
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
