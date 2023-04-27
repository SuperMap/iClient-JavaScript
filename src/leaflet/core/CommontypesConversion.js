/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import './Base';
 import { Bounds } from '@supermap/iclient-common/commontypes/Bounds';

 const isArray = function(obj) {
  return Object.prototype.toString.call(obj) == '[object Array]';
}
/**
 * @class CommontypesConversion
 * @category BaseTypes Util
 * @classdesc Leaflet 对象和 SuperMap 对象转换工具。
 * @usage
 */
export const CommontypesConversion = {
    /**
     * @function CommontypesConversion.toSuperMapBounds
     * @description 将 Leaflet 对象的 bounds 转成 SuperMap 的 bounds对象。
     * @param {(L.Bounds|L.LatLngBounds)} bounds - 图层显示范围。
     * @returns {Bounds} SuperMap 的 bounds 对象。
     */
    toSuperMapBounds(bounds) {
        if (bounds && ["FeatureCollection", "Feature"].indexOf(bounds.type) !== -1) {
            bounds = L.geoJSON(bounds).getBounds();
        }
        if (bounds instanceof L.LatLngBounds) {
            return new Bounds(
                bounds.getSouthWest().lng,
                bounds.getSouthWest().lat,
                bounds.getNorthEast().lng,
                bounds.getNorthEast().lat
            );
        }
        if (bounds instanceof L.Bounds) {
            return new Bounds(
                bounds.min.x,
                bounds.min.y,
                bounds.max.x,
                bounds.max.y
            );
        }
        if (isArray(bounds)) {
            return new Bounds(
                bounds[0],
                bounds[1],
                bounds[2],
                bounds[3]
            );
        }

        return new Bounds();
    },

    /**
     * @function CommontypesConversion.isArray
     * @description 判断是否为数组格式。
     * @param {Object} obj - 待判断的对象。
     * @returns {boolean} 是否是数组。
     */
    isArray,

    /**
     * @function CommontypesConversion.toProcessingParam
     * @description 将 Region 节点数组转为 Processing 服务需要的分析参数。
     * @param {Array} points - Region 各个节点数组。
     * @returns processing 服务裁剪、查询分析的分析参数。
     */
      toProcessingParam(points) {
        var geometryParam = {};
        if (points.length < 1) {
            geometryParam = "";
        } else {
            var results = [];
            for (var i = 0; i < points.length; i++) {
                var point = {};
                point.x = points[i][0];
                point.y = points[i][1];
                results.push(point);
            }
            geometryParam.type = "REGION";
            geometryParam.points = results;
        }
        return geometryParam;
    }
}

