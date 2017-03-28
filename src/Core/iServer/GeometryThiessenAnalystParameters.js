require('../base');
require('./ThiessenAnalystParameters');
/**
 * Class: GeometryThiessenAnalystParameters
 * 几何对象泰森多边形分析参数类
 * 对指定的某个几何对象做泰森多边形分析。通过该类可以指定要做泰森多边形分析的几何对象、返回数据集名称等。
 *
 * Inherits from:
 *  - <ThiessenAnalystParameters>
 */
GeometryThiessenAnalystParameters = SuperMap.Class(ThiessenAnalystParameters, {

    /**
     * Property: points
     * {Array(<Point||Array>)}
     * 使用点数组进行分析时使用的几何对象。
     */
    points: null,

    /**
     * Constructor: GeometryThiessenAnalystParameters
     * 几何对象泰森多边形分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * points - {Array(<Point||Array>)} 使用点数组进行分析时使用的几何对象。
     */
    initialize: function (options) {
        ThiessenAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        ThiessenAnalystParameters.prototype.destroy.apply(this, arguments);

        var me = this;
        if (me.points) {
            for (var i = me.points.length - 1; i >= 0; i--) {
                me.points[i].destroy();
            }
            me.points = null;
        }
    },

    CLASS_NAME: "GeometryThiessenAnalystParameters"
});

GeometryThiessenAnalystParameters.toObject = function (geometryThiessenAnalystParameters, tempObj) {
    for (var name in geometryThiessenAnalystParameters) {
        if (name === "clipRegion") {
            tempObj.clipRegion = SuperMap.REST.ServerGeometry.fromGeometry(geometryThiessenAnalystParameters.clipRegion);
        } else {
            tempObj[name] = geometryThiessenAnalystParameters[name];
        }
    }
};

module.exports = function (options) {
    return new GeometryThiessenAnalystParameters(options);
};