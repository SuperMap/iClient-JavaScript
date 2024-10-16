/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {Point} from '../commontypes/geometry/Point';

/**
 * @class PointWithMeasure
 * @deprecatedclass SuperMap.PointWithMeasure
 * @category iServer SpatialAnalyst RouteLocator
 * @classdesc 路由点类。路由点是指具有线性度量值 (Measure) 的二维地理坐标点。
 * @param {Object} options - 参数。
 * @param {number} options.measure - 度量值，即路由对象属性值 M。
 * @param {number} options.x - 地理坐标系下的 X 坐标值。
 * @param {number} options.y - 地理坐标系下的 Y 坐标值。
 * @extends {GeometryPoint}
 * @usage
 */
export class PointWithMeasure extends Point {

    constructor(options) {
        super(options);

        /**
         * @member {number} PointWithMeasure.prototype.measure
         * @description 度量值，即路由对象属性值 M。
         */
        this.measure = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.PointWithMeasure";
    }

    /**
     * @function PointWithMeasure.prototype.equals
     * @description 判断两个路由点对象是否相等。如果两个路由点对象具有相同的坐标以及度量值，则认为是相等的。
     * @param {PointWithMeasure} geom - 需要判断的路由点对象。
     * @returns {boolean} 两个路由点对象是否相等（true 为相等，false 为不等）。
     */
    equals(geom) {
        var equals = false;
        if (geom != null) {
            var isValueEquals = this.x === geom.x && this.y === geom.y && this.measure === geom.measure;
            var isNaNValue = isNaN(this.x) && isNaN(this.y) && isNaN(this.measure);
            var isNaNGeometry = isNaN(geom.x) && isNaN(geom.y) && isNaN(geom.measure);
            equals = ( isValueEquals || ( isNaNValue && isNaNGeometry ));
        }
        return equals;
    }


    /**
     * @function PointWithMeasure.prototype.toJson
     * @description 转换为 JSON 对象。
     * */
     toJson() {
        var result = "{";
        if (this.measure != null && this.measure != undefined) {
            result += "\"measure\":" + this.measure + ",";
        }
        result += "\"x\":" + this.x + ",";
        result += "\"y\":" + this.y;
        result += "}";
        return result;
    }


     /**
     * @function PointWithMeasure.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.measure = null;
        me.x = null;
        me.y = null;
    }

    /**
     * @function PointWithMeasure.fromJson
     * @description 将 JSON 对象转换为{@link PointWithMeasure} 对象。
     * @param {Object} jsonObject - JSON 对象表示的路由点。
     * @returns {PointWithMeasure} 转化后的 PointWithMeasure 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        return new PointWithMeasure({
            x: jsonObject.x,
            y: jsonObject.y,
            measure: jsonObject.measure
        });
    }

}

