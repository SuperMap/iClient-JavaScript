/**
 * Class:  SuperMap.GeometryBufferAnalystParameters
 * 几何对象缓冲区分析参数类
 * 对指定的某个几何对象做缓冲区分析。通过该类可以指定要做缓冲区分析的几何对象、缓冲区参数等。
 *
 * Inherits from:
 *  - <SuperMap.BufferAnalystParameters>
 */

require('./BufferAnalystParameters');
 SuperMap.GeometryBufferAnalystParameters = SuperMap.Class(SuperMap.BufferAnalystParameters, {

    /**
     * Property: sourceGeometry
     * {<Object>} 要做缓冲区分析的几何对象(支持Point、LineString、LinearRing、Polygon)。必设字段。
     */
    sourceGeometry: null,

    /**
     * Constructor:  SuperMap.GeometryBufferAnalystParameters
     * 几何对象缓冲区分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * sourceGeometry - {<Object>} 要做缓冲区分析的几何对象。必设字段。
     * bufferSetting - {<SuperMap.BufferSetting>} 设置缓冲区通用参数。
     */
    initialize: function (options) {
        SuperMap.BufferAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.BufferAnalystParameters.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }
    },

    CLASS_NAME: " SuperMap.GeometryBufferAnalystParameters"
});

 SuperMap.GeometryBufferAnalystParameters.toObject = function (geometryBufferAnalystParameters, tempObj) {
    for (var name in geometryBufferAnalystParameters) {
        if (name === "bufferSetting") {
            var tempBufferSetting = {};
            for (var key in geometryBufferAnalystParameters.bufferSetting) {
                tempBufferSetting[key] = geometryBufferAnalystParameters.bufferSetting[key];
            }
            delete tempBufferSetting.radiusUnit;
            tempObj.analystParameter = tempBufferSetting;
        }
        else if (name === "sourceGeometry") {
            tempObj.sourceGeometry = SuperMap.REST.ServerGeometry.fromGeometry(geometryBufferAnalystParameters.sourceGeometry);
        }
        else {
            tempObj[name] = geometryBufferAnalystParameters[name];
        }
    }
};

module.exports = function (options) {
    return new  SuperMap.GeometryBufferAnalystParameters(options);
};