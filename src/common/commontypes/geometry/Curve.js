import SuperMap from '../../SuperMap';
import MultiPoint from './MultiPoint';
import Projection from '../Projection';
import {Util} from '../Util';

/**
 * @class SuperMap.Geometry.Curve
 * @classdesc 几何对象曲线类。
 * @extends SuperMap.Geometry.MultiPoint
 * @param components - {Array<SuperMap.Geometry.Point>}几何对象数组。
 * @example
 * var point1 = new SuperMap.Geometry.Point(10,20);
 * var point2 = new SuperMap.Geometry.Point(30,40);
 * var curve = new SuperMap.Geometry.Curve([point1,point2]);
 */
export default class Curve extends MultiPoint {

    /**
     * @member SuperMap.Geometry.Curve.prototype.componentTypes -{Array<string>}
     * @description components存储的的几何对象所支持的几何类型数组,为空表示类型不受限制。
     * @readonly
     * @default ["{@link SuperMap.Geometry.Point}", "{@link SuperMap.PointWithMeasure}"]
     */
    componentTypes = ["SuperMap.Geometry.Point", "SuperMap.PointWithMeasure"];

    constructor(points) {
        super(points);
    }

    /**
     * @function SuperMap.Geometry.Curve.prototype.getLength
     * @description 获取曲线的总长度。
     * @returns {number} 曲线对象的长度。
     */
    getLength() {
        var length = 0.0;
        if (this.components && (this.components.length > 1)) {
            for (var i = 1, len = this.components.length; i < len; i++) {
                length += this.components[i - 1].distanceTo(this.components[i]);
            }
        }
        return length;
    }

    /**
     * @function SuperMap.Geometry.Curve.prototype.getGeodesicLength
     * @description 计算几何对象投影到球面上的近似大地测量长度。
     * @param projection - {SuperMap.Projection} 空间参考系统的几何坐标。如果没有设置，默认 WGS84。
     * @returns {number} 几何图形的近似大地测量长度，单位：meters。
     */
    getGeodesicLength(projection) {
        var geom = this;  // so we can work with a clone if needed
        if (projection) {
            var gg = new Projection("EPSG:4326");
            if (!gg.equals(projection)) {
                geom = this.clone().transform(projection, gg);
            }
        }
        var length = 0.0;
        if (geom.components && (geom.components.length > 1)) {
            var p1, p2;
            for (var i = 1, len = geom.components.length; i < len; i++) {
                p1 = geom.components[i - 1];
                p2 = geom.components[i];
                // this returns km and requires lon/lat properties
                length += Util.distVincenty(
                    {lon: p1.x, lat: p1.y}, {lon: p2.x, lat: p2.y}
                );
            }
        }
        // convert to m
        return length * 1000;
    }

    CLASS_NAME = "SuperMap.Geometry.Curve"
}
SuperMap.Geometry.Curve = Curve;