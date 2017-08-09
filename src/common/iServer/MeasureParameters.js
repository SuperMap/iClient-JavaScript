import SuperMap from '../SuperMap';
import {Unit} from '../REST';

/**
 * @class SuperMap.MeasureParameters
 * @classdesc 量算参数类。
 * @param geometry - {Object} 要量算的几何对象。
 * @param options - {Object} 可选参数。如：<br>
 *         unit - {Unit} 量算单位。<br>
 *         prjCoordSys -{String} 用来指定该量算操作所使用的投影,该项默认值为空。<br>
 *         distanceMode -{String} 用来指定量算的方式为按球面长度'Geodesic'或者平面长度'Planar'来计算，默认为'Geodesic'。
 */
export default class MeasureParameters {

    /**
     * @member SuperMap.MeasureParameters.prototype.geometry -{Object}
     * @description 要量算的几何对象（{Line} 或 {Polygon}），必设属性。
     */
    geometry = null;

    /**
     * @member SuperMap.MeasureParameters.prototype.unit -{Unit}
     * @description 量算单位。默认单位：米，即量算结果以米为单位。
     */
    unit = Unit.METER;

    /**
     * @member SuperMap.MeasureParameters.prototype.prjCoordSys -{String}
     * @description 用来指定该量算操作所使用的投影,该项默认值为空。
     */
    prjCoordSys = null;

    /**
     * @member SuperMap.MeasureParameters.prototype.distanceMode -{String}
     * @description 用来指定量算的方式为按球面长度'Geodesic'或者平面长度'Planar'来计算，默认为'Geodesic'。
     * @example
     * (start code)
     * var param = new SuperMap.MeasureParameters(getmetry,{distanceMode:'Planar'});
     * (end)
     */
    distanceMode = null;

    /*
     * Constructor: SuperMap.MeasureParameters
     * 量算参数类构造函数。
     */
    constructor(geometry, options) {
        if (!geometry) {
            return;
        }
        this.geometry = geometry;
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.geometry = null;
        me.unit = null;
        me.prjCoordSys = null;
    }

    CLASS_NAME = "SuperMap.MeasureParameters"
}

SuperMap.MeasureParameters = MeasureParameters;