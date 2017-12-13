import L from "leaflet"
import './Base';
import {Bounds} from '@supermap/iclient-common';

/**
 * @class L.supermap.CommontypesConversion
 * @classdesc Leaflet对象和SuperMap对象转换工具
 */
export class CommontypesConversion {
    /**
     * @function L.supermap.CommontypesConversion.toSuperMapBounds
     * @description 将Leaflet对象得bounds转成SuperMap 的bounds对象
     * @param bounds - {L.Bounds|L.LatLngBounds} 图层显示范围
     * @return {SuperMap.Bounds} SuperMap的bounds对象
     */
    static toSuperMapBounds(bounds) {
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
        if (this.isArray(bounds)) {
            return new Bounds(
                bounds[0],
                bounds[1],
                bounds[2],
                bounds[3]
            );
        }
        return new Bounds();
    }

    /**
     * @function L.supermap.Util.isArray
     * @description 判断是否为数组格式
     * @param obj - {Object} 待判断对象
     * @return {boolean} 是否是数组
     */
    static isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }

    /**
     * @function L.supermap.CommontypesConversion.toProcessingParam
     * @description 将Region节点数组转为Processing服务需要的分析参数
     * @param points - Region各个节点数组
     * @return processing服务裁剪、查询分析的分析参数
     */
    static toProcessingParam(points) {
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

L.supermap.CommontypesConversion = CommontypesConversion;