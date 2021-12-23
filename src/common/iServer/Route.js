/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {LinearRing} from '../commontypes/geometry/LinearRing';
import {LineString} from '../commontypes/geometry/LineString';
import {PointWithMeasure} from './PointWithMeasure';
import {Collection} from '../commontypes/geometry/Collection';

/**
 * @class SuperMap.Route
 * @category  iServer SpatialAnalyst
 * @classdesc 路由对象类。路由对象为一系列有序的带有属性值 M 的 x，y 坐标对，其中 M 值为该结点的距离属性（到已知点的距离）。
 * @param {Array.<SuperMap.Geometry>} points - 形成路由对象的线数组。
 * @param {Object} options - 参数。
 * @param {number} options.id - 路由对象在数据库中的 id。
 * @param {number} options.length - 路由对象的长度。单位与数据集的单位相同。
 * @param {number} [options.maxM] - 最大线性度量值，即所有结点到起始点的量算距离中最大值。
 * @param {number} [options.minM] - 最小线性度量值，即所有结点到起始点的量算距离中最小值。
 * @param {string} [options.type] - 数据类型，如："LINEM"。
 * @extends {SuperMap.Geometry.Collection}
 */
export class Route extends Collection {

    constructor(points, options) {
        super(points, options);

        /**
         * @member {number} SuperMap.Route.prototype.id
         * @description 路由对象在数据库中的 ID。
         */
        this.id = null;

        /**
         * @member {number} SuperMap.Route.prototype.center
         * @description 路由对象的中心点。
         */
        this.center = null;

        /**
         * @member {string} SuperMap.Route.prototype.style
         * @description 路由对象的样式。
         */
        this.style = null;

        /**
         * @member {number} SuperMap.Route.prototype.length
         * @description 路由对象的长度。单位与数据集的单位相同。
         */
        this.length = null;

        /**
         *  @member {number} SuperMap.Route.prototype.maxM
         *  @description 最大线性度量值，即所有结点到起始点的量算距离中最大值。
         */
        this.maxM = null;

        /**
         * @member {number} SuperMap.Route.prototype.minM
         * @description 最小线性度量值，即所有结点到起始点的量算距离中最小值。
         */
        this.minM = null;

        /**
         * @member {Array.<number>} SuperMap.Route.prototype.parts
         * @description 服务端几何对象中各个子对象所包含的节点个数。
         */
        this.parts = null;

        /**
         * @member {Array.<Object>} SuperMap.Route.prototype.points
         * @description 路由对象的所有路由点。
         * @example
         * (start code)
         * [
         *  {
         *      "measure": 0,
         *      "y": -4377.027184298267,
         *      "x": 4020.0045221720466
         *  },
         *  {
         *      "measure": 37.33288381391519,
         *      "y": -4381.569363260499,
         *      "x": 4057.0600591960642
         *  }
         * ]
         * (end)
         */
        this.points = null;

        /**
         * @member {string} SuperMap.Route.prototype.type
         * @description 服务端几何对象类型。
         */
        this.type = null;

        /**
         * @member {Array.<string>} [SuperMap.Route.prototype.componentTypes=SuperMap.Geometry.LineString]
         * @description components 存储的的几何对象所支持的几何类型数组。
         */
        this.componentTypes = ["SuperMap.Geometry.LinearRing", "SuperMap.Geometry.LineString"];

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.Route";
        this.geometryType = "LINEM";
    }

    /**
     *
     * @function SuperMap.Route.prototype.toJson
     * @description 转换为 JSON 对象。
     * @returns {Object} JSON 对象。
     */
    toJson() {
        var result = "{";
        if (this.id != null && this.id != undefined) {
            result += "\"id\":" + this.id + ",";
        }
        if (this.center != null && this.center != undefined) {
            result += "\"center\":" + this.center + ",";
        }
        if (this.style != null && this.style != undefined) {
            result += "\"style\":" + this.style + ",";
        }
        if (this.length != null && this.length != undefined) {
            result += "\"length\":" + this.length + ",";
        }
        if (this.maxM != null && this.maxM != undefined) {
            result += "\"maxM\":" + this.maxM + ",";
        }
        if (this.minM != null && this.minM != undefined) {
            result += "\"minM\":" + this.minM + ",";
        }
        if (this.type != null && this.type != undefined) {
            result += "\"type\":\"" + this.type + "\",";
        }
        if (this.parts != null && this.parts != undefined) {
            result += "\"parts\":[" + this.parts[0];

            for (var i = 1; i < this.parts.length; i++) {
                result += "," + this.parts[i];
            }
            result += "],";
        }
        if (this.components != null && this.components.length > 0) {
            result += "\"points\":[";
            for (var j = 0, len = this.components.length; j < len; j++) {
                for (var k = 0, len2 = this.components[j].components.length; k < len2; k++) {
                    result += this.components[j].components[k].toJson() + ",";
                }
            }
            result = result.replace(/,$/g, '');
            result += "]";
        }
        result = result.replace(/,$/g, '');
        result += "}";
        return result;
    }


    /**
     * @function SuperMap.Route.prototype.destroy
     * @override
     */
    destroy() {
        var me = this;
        me.id = null;
        me.center = null;
        me.style = null;
        me.length = null;
        me.maxM = null;
        me.minM = null;
        me.type = null;
        me.parts = null;
        me.components.length = 0;
        me.components = null;
        me.componentTypes = null;
    }


    /**
     * @function SuperMap.Route.fromJson
     * @description 将 JSON 对象转换为 SuperMap.Route 对象。
     * @param {Object} [jsonObject] - JSON 对象表示的路由对象。
     * @returns {SuperMap.Route} 转化后的 Route 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }

        var geoParts = jsonObject.parts || [],
            geoPoints = jsonObject.points || [],
            len = geoParts.length,
            lineList = [];
        if (len > 0) {
            for (var i = 0, pointIndex = 0, pointList = []; i < len; i++) {
                for (var j = 0; j < geoParts[i]; j++) {
                    pointList.push(PointWithMeasure.fromJson(geoPoints[pointIndex + j]));
                }
                pointIndex += geoParts[i];
                //判断线是否闭合，如果闭合，则返回LinearRing，否则返回LineString
                if (pointList[0].equals(pointList[geoParts[i] - 1])) {
                    lineList.push(new LinearRing(pointList));
                } else {
                    lineList.push(new LineString(pointList));
                }
                pointList = [];
            }

        } else {
            return null;
        }

        return new Route(lineList, {
            id: jsonObject.id,
            center: jsonObject.center,
            style: jsonObject.style,
            length: jsonObject.length,
            maxM: jsonObject.maxM,
            minM: jsonObject.minM,
            type: jsonObject.type,
            parts: jsonObject.parts
        });
    }

}

SuperMap.Route = Route;