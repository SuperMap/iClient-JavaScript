import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Point} from '../commontypes/geometry/Point';

/**
 * @class SuperMap.PointWithMeasure
 * @category  iServer SpatialAnalyst
 * @classdesc 路由点类。路由点是指具有线性度量值(Measure)的二维地理坐标点。
 * @param options - {Object} 可选参数。如:</br>
 *        measure - {number}度量值，即路由对象属性值 M。</br>
 *        x - {number}获取当前点对象在地理坐标系下的 X 坐标值。</br>
 *        y - {number}获取当前点对象在地理坐标系下的 Y 坐标值。</br>
 * @extends SuperMap.Geometry.Point
 */
export class PointWithMeasure extends Point {

    constructor(options) {
        super(options);

        /**
         * @member SuperMap.PointWithMeasure.prototype.measure -{number}
         * @description 度量值，即路由对象属性值 M。
         */
        this.measure = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.PointWithMeasure";
    }

    /**
     * @function SuperMap.PointWithMeasure.prototype.equals
     * @description 判断两个路由点对象是否相等。如果两个路由点对象具有相同的坐标以及度量值，则认为是相等的。
     * @param geom - {SuperMap.PointWithMeasure} 需要判断的路由点对象。
     * @return {boolean} 两个路由点对象是否相等（true为相等，false为不等）。
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
     * @function SuperMap.PointWithMeasure.prototype.toJson
     * @description 转换为json对象。
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
     * @function SuperMap.PointWithMeasure.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.measure = null;
        me.x = null;
        me.y = null;
    }

    /**
     * @function SuperMap.PointWithMeasure.fromJson
     * @description 将 JSON 对象转换为{@link SuperMap.PointWithMeasure} 对象。
     * @param jsonObject - {Object} JSON 对象表示的路由点。
     * @return {SuperMap.PointWithMeasure} 转化后的 PointWithMeasure 对象。
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

SuperMap.PointWithMeasure = PointWithMeasure;
