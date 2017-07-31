require('./OverlayAnalystParameters');
var SuperMap = require('../SuperMap');
SuperMap.GeometryOverlayAnalystParameters = SuperMap.Class(SuperMap.OverlayAnalystParameters, {
    /**
     * @class SuperMap.GeometryOverlayAnalystParameters
     * @constructs SuperMap.GeometryOverlayAnalystParameters
     * @classdesc
     * 几何对象叠加分析参数类
     * 对指定的某两个几何对象做叠加分析。通过该类可以指定要做叠加分析的几何对象、叠加操作类型。
     * @extends {SuperMap.OverlayAnalystParameters}
     * @api
     */

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
     * @method SuperMap.GeometryOverlayAnalystParameters.initialize
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * operateGeometry - {SuperMap.Geometry} 叠加分析的操作几何对象。必设字段。</br>
     * sourceGeometry - {SuperMap.Geometry} 叠加分析的源几何对象。必设字段。</br>
     * operation - {SuperMap.OverlayOperationType} 叠加操作枚举值。</br>
     */
    initialize: function (options) {
        SuperMap.OverlayAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.OverlayAnalystParameters.prototype.destroy.apply(this, arguments);

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

    CLASS_NAME: "SuperMap.GeometryOverlayAnalystParameters"
});

SuperMap.GeometryOverlayAnalystParameters.toObject = function (geometryOverlayAnalystParameters, tempObj) {
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

module.exports = SuperMap.GeometryOverlayAnalystParameters;