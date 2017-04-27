/**
 * Class: SuperMap.MeasureParameters
 * 量算参数类。
 * 客户端要量算的地物间的距离或某个区域的面积是一个 {<Object>}  类型的几何对象（{<Line>} 或 {<Polygon>}），
 * 它将与指定的量算单位一起作为量算参数传到服务端。最终服务端将以指定单位返回得到的距离或面积。
 */
require('../REST');
var SuperMap = require('../SuperMap');
SuperMap.MeasureParameters = SuperMap.Class({

    /**
     * APIProperty: geometry
     * {<Object>} 要量算的几何对象（{<Line>} 或 {<Polygon>}），必设属性。
     */
    geometry: null,

    /**
     * APIProperty: unit
     * {<Unit>}  量算单位。默认单位：米，即量算结果以米为单位。
     */
    unit: SuperMap.Unit.METER,

    /**
     * APIProperty: projection
     * {String} 在 SuperMap.MeasureParameters 的 options 中被设置，用来指定该量算操作所使用的投影。该项默认值为空。
     */
    prjCoordSys: null,

    /**
     * APIProperty: distanceMode
     * {String} 在SuperMap.MeasureParameters的options中设置，用来指定量算的方式为按球面长度'Geodesic'或者平面长度'Planar'来计算，默认为'Geodesic'
     *
     * Exampels:
     * (start code)
     * var param = new SuperMap.MeasureParameters(getmetry,{distanceMode:'Planar'});
     * (end)
     */
    distanceMode: null,

    /**
     * Constructor: SuperMap.MeasureParameters
     * 量算参数类构造函数。
     *
     * Parameters:
     * geometry - {<Object>} 要量算的几何对象。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * unit - {<Unit>} 量算单位。
     */
    initialize: function (geometry, options) {
        if (!geometry) {
            return;
        }
        this.geometry = geometry;
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.geometry = null;
        me.unit = null;
        me.prjCoordSys = null;
    },

    CLASS_NAME: "SuperMap.MeasureParameters"
});
module.exports = SuperMap.MeasureParameters;