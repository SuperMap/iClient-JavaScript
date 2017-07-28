var SuperMap = require('../SuperMap');
SuperMap.PointWithMeasure = SuperMap.Class(SuperMap.Geometry.Point, {
    /**
     * @class SuperMap.PointWithMeasure
     * @constructs SuperMap.PointWithMeasure
     * @classdesc
     * 路由点类。
     * 路由点是指具有线性度量值(Measure)的二维地理坐标点。
     * @extends {SuperMap.Geometry.Point}
     * @api
     */

    /**
     * APIProperty: x
     * {Number} 获取当前点对象在地理坐标系下的 X 坐标值。
     */
    x: null,

    /**
     * APIProperty: y
     * {Number} 获取当前点对象在地理坐标系下的 Y 坐标值。
     */
    y: null,

    /**
     * APIProperty: measure
     * {Number} 度量值，即路由对象属性值 M。
     */
    measure: null,
    /**
     * @method SuperMap.PointWithMeasure.initialize
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * measure - {Number} 度量值，即路由对象属性值 M。</br>
     * x - {Number} 获取当前点对象在地理坐标系下的 X 坐标值。</br>
     * y - {Number} 获取当前点对象在地理坐标系下的 Y 坐标值。</br>
     */
    initialize: function (options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    /**
     * @method SuperMap.PointWithMeasure.equals
     * @description 判断两个路由点对象是否相等。如果两个路由点对象具有相同的坐标以及度量值，则认为是相等的。
     * @param geom - {SuperMap.PointWithMeasure} 需要判断的路由点对象。
     * @return {Boolean} 两个路由点对象是否相等（true为相等，false为不等）。
     */
    equals: function (geom) {
        var equals = false;
        if (geom != null) {
            var isValueEquals = this.x === geom.x && this.y === geom.y && this.measure === geom.measure;
            var isNaNValue = isNaN(this.x) && isNaN(this.y) && isNaN(this.measure);
            var isNaNGeometry = isNaN(geom.x) && isNaN(geom.y) && isNaN(geom.measure);
            equals = ( isValueEquals || ( isNaNValue && isNaNGeometry ));
        }
        return equals;
    },
    /**
     * @method SuperMap.PointWithMeasure.toJson
     * @description 转换为json对象。
     */
    toJson: function () {
        var result = "{";
        if (this.measure != null && this.measure != undefined) {
            result += "\"measure\":" + this.measure + ",";
        }
        result += "\"x\":" + this.x + ",";
        result += "\"y\":" + this.y;
        result += "}";
        return result;
    },
    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.measure = null;
        me.x = null;
        me.y = null;
    },

    CLASS_NAME: "SuperMap.PointWithMeasure"
});

/**
 * @method SuperMap.PointWithMeasure.fromJson
 * @description 将 JSON 对象转换为  SuperMap.PointWithMeasure 对象。
 * @param jsonObject - {Object} JSON 对象表示的路由点。
 * @return {SuperMap.PointWithMeasure} 转化后的 PointWithMeasure 对象。
 */
SuperMap.PointWithMeasure.fromJson = function (jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.PointWithMeasure({
        x: jsonObject.x,
        y: jsonObject.y,
        measure: jsonObject.measure
    });
};

module.exports = SuperMap.PointWithMeasure;