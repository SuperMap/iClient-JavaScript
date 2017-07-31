require('./SurfaceAnalystParameters');
SuperMap.GeometrySurfaceAnalystParameters = SuperMap.Class(SuperMap.SurfaceAnalystParameters, {
    /**
     * @class SuperMap.GeometrySurfaceAnalystParameters
     * @constructs SuperMap.GeometrySurfaceAnalystParameters
     * @classdesc
     * 几何对象表面分析参数类。
     * 该类对几何对象表面分析所用到的参数进行设置。
     * @extends {SuperMap.SurfaceAnalystParameters}
     * @api
     */

    /**
     * APIProperty: points
     * {Array(<SuperMap.Geometry.Point>)} 获取或设置用于表面分析的坐标点数组。
     */
    points: null,

    /**
     * APIProperty: zValues
     * {Array(Number)} 获取或设置用于提取操作的值。提取等值线时，将使用该数组中的值，
     * 对几何对象中的坐标点数组进行插值分析，得到栅格数据集（中间结果），接着从栅格数据集提取等值线。
     */
    zValues: null,

    /**
     *
     * @method SuperMap.GetFeaturesByBufferService.initialize
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * points - {Array(<SuperMap.Geometry.Point>)} 表面分析的坐标点数组。</br>
     * zValues - {Array(Number)} 表面分析的坐标点的 Z 值数组。</br>
     * resolution - {Number} 获取或设置指定中间结果（栅格数据集）的分辨率。</br>
     * resultSetting - {SuperMap.DataReturnOption} 结果返回设置类。</br>
     * extractParameter - {SuperMap.SurfaceAnalystParametersSetting} 获取或设置表面分析参数。</br>
     * surfaceAnalystMethod - {SuperMap.SurfaceAnalystMethod} 获取或设置表面分析的提取方法，提取等值线和提取等值面。</br>
     */
    initialize: function (options) {
        SuperMap.SurfaceAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.SurfaceAnalystParameters.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.points) {
            for (var i = 0, points = me.points, len = points.length; i < len; i++) {
                points[i].destroy();
            }
            me.points = null;
        }
        me.zValues = null;
    },

    CLASS_NAME: "SuperMap.GeometrySurfaceAnalystParameters"
});

module.exports = SuperMap.GeometrySurfaceAnalystParameters;
