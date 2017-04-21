/**
 * Class: SuperMap.SurfaceAnalystParameters
 * 表面分析提取操作参数类。
 * 通过该类可以为进行表面分析提供参数信息，包括表面分析的方法提取等值线、提取等值面和中间结果的分辨率，
 * {<SuperMap.DatasetSurfaceAnalystParameters>} 和 {<SuperMap.GeometrySurfaceAnalystParameters>} 继承自该类。
 */

require('./SurfaceAnalystParametersSetting');
require('./DataReturnOption');
SuperMap.SurfaceAnalystParameters = SuperMap.Class({

    /**
     * APIProperty: resolution
     * {Number} 获取或设置指定中间结果（栅格数据集）的分辨率。
     */
    resolution: 0,

    /**
     * APIProperty: extractParameter
     * {<SuperMap.SurfaceAnalystParametersSetting>} 获取或设置表面分析参数。
     * 在进行点数据集进行提取等值面分析时，暂时不支持 SurfaceAnalystParametersSetting 类中的 expectedZValues 字段。
     */
    extractParameter: null,

    /**
     * APIProperty: resultSetting
     * {<SuperMap.DataReturnOption>} 结果返回设置类。
     */
    resultSetting: null,

    /**
     * APIProperty: surfaceAnalystMethod
     * {<SuperMap.SurfaceAnalystMethod>} 获取或设置表面分析的提取方法，提取等值线和提取等值面，默认为等值线分析。
     */
    surfaceAnalystMethod: SuperMap.SurfaceAnalystMethod.ISOLINE,

    /**
     * Constructor: SuperMap.SurfaceAnalystParameters
     * 表面分析提取操作参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * extractParameter - {<SuperMap.SurfaceAnalystParametersSetting>} 获取或设置表面分析参数。
     * resolution - {Number} 指定中间结果（栅格数据集）的分辨率。
     * resultSetting - {<SuperMap.DataReturnOption>} 结果返回设置类。
     * surfaceAnalystMethod - {<SuperMap.SurfaceAnalystMethod>} 获取或设置表面分析的提取方法，提取等值线和提取等值面。
     */
    initialize: function (options) {
        var me = this;
        me.extractParameter = new SuperMap.SurfaceAnalystParametersSetting();
        me.resultSetting = new SuperMap.DataReturnOption();
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
        me.resolution = null;
        if (me.extractParameter) {
            me.extractParameter.destroy();
            me.extractParameter = null;
        }
        if (me.resultSetting) {
            me.resultSetting.destroy();
            me.resultSetting = null;
        }
        me.surfaceAnalystMethod = null;
    },

    CLASS_NAME: "SuperMap.SurfaceAnalystParameters"
});

module.exports = function (options) {
    return new SuperMap.SurfaceAnalystParameters(options);
};