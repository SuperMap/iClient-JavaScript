/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/SpatialAnalyst/OverlayAnalystParameters.js
 */

/**
 * Class: SuperMap.REST.GeometryOverlayAnalystParameters
 * 几何对象叠加分析参数类
 * 对指定的某两个几何对象做叠加分析。通过该类可以指定要做叠加分析的几何对象、叠加操作类型。
 *
 * Inherits from:
 *  - <SuperMap.REST.OverlayAnalystParameters> 
 */
SuperMap.REST.GeometryOverlayAnalystParameters = SuperMap.Class(SuperMap.REST.OverlayAnalystParameters, {

    /** 
     * Property: operateGeometry
     * {SuperMap.Geometry} 叠加分析的操作几何对象。必设字段。
     */
    operateGeometry: null,

    /** 
     * Property: sourceGeometry
     * {SuperMap.Geometry} 叠加分析的源几何对象。必设字段。 
     */
    sourceGeometry: null,

    /**
     * Constructor: SuperMap.REST.GeometryOverlayAnalystParameters 
     * 几何对象叠加分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * operateGeometry - {SuperMap.Geometry} 叠加分析的操作几何对象。必设字段。
     * sourceGeometry - {SuperMap.Geometry} 叠加分析的源几何对象。必设字段。
     * operation - {<SuperMap.REST.OverlayOperationType>} 叠加操作枚举值。
     */
    initialize: function (options) {
        SuperMap.REST.OverlayAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。 
     */
    destroy: function () {
        SuperMap.REST.OverlayAnalystParameters.prototype.destroy.apply(this, arguments);

        var me = this;
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }

        if (me.operateGeometry) {
            me.operateGeometry.destroy();
            me.operateGeometry = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.GeometryOverlayAnalystParameters"
});

SuperMap.REST.GeometryOverlayAnalystParameters.toObject = function (geometryOverlayAnalystParameters, tempObj) {
    for (var name in geometryOverlayAnalystParameters) {
        if (name === "sourceGeometry") {
            tempObj.sourceGeometry = SuperMap.REST.ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.sourceGeometry);
        }
        else if (name === "operateGeometry") {
            tempObj.operateGeometry = SuperMap.REST.ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.operateGeometry);
        }
        else {
            tempObj[name] = geometryOverlayAnalystParameters[name];
        }
    }
};