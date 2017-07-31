/*
 * Class: SuperMap.QueryByGeometryParameters
 * Geometry 查询参数类。
 * 该类用于设置 Geometry查询的相关参数。
 *
 * Inherits from:
 *  - <SuperMap.QueryParameters>
 */
require('../REST');
require('./QueryParameters');
var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.QueryByGeometryParameters
 * @description Geometry 查询参数类。
 *               该类用于设置 Geometry查询的相关参数。
 * @augments SuperMap.QueryParameters
 * @param options - {Object} 可选参数。如：<br>
 *         customParams - {String} 自定义参数，供扩展使用。<br>
 *         prjCoordSys -{Object} 自定义参数，供isueprmap提供的动态投影查询扩展使用。如 {"epsgCode":3857}。<br>
 *         expectCount - {Number} 期望返回结果记录个数。<br>
 *         networkType - {SuperMap.GeometryType} 网络数据集对应的查询类型。<br>
 *         queryOption - {SuperMap.QueryOption} 查询结果类型枚举类。<br>
 *         queryParams -  {Array<SuperMap.FilterParameter>} 查询过滤条件参数数组。<br>
 *         startRecord - {Number} 查询起始记录号。<br>
 *         holdTime - {Number} 资源在服务端保存的时间。<br>
 *         returnCustomResult -{Boolean} 仅供三维使用。
 *         returnContent - {Boolean} 是否立即返回新创建资源的表述还是返回新资源的 URI。
 *         geometry - {Object} 用于查询的几何对象。
 *         spatialQueryMode - {SuperMap.SpatialQueryMode} 空间查询模式。
 */
SuperMap.QueryByGeometryParameters = SuperMap.Class(SuperMap.QueryParameters, {

    /**
     * APIProperty: returnContent
     * @member SuperMap.QueryByGeometryParameters.prototype.returnContent -{Boolean}
     * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。<br>
     *               如果为 true，则直接返回新创建资源，即查询结果的表述。<br>
     *               为 false，则返回的是查询结果资源的 URI。默认为 true。
     */
    returnContent: true,

    /**
     * APIProperty: geometry
     * @member SuperMap.QueryByGeometryParameters.prototype.geometry -{Object}
     * @description 用于查询的几何对象。
     */
    geometry: null,

    /**
     * APIProperty: spatialQueryMode
     * @member SuperMap.QueryByGeometryParameters.prototype.spatialQueryMode -{SuperMap.SpatialQueryMode}
     * @description 空间查询模式。
     */
    spatialQueryMode: SuperMap.SpatialQueryMode.INTERSECT,

    /*
     * Constructor: SuperMap.QueryByGeometryParameters
     * Geometry 查询参数类构造函数。
     */
    initialize: function (options) {
        SuperMap.QueryParameters.prototype.initialize.apply(this, arguments);
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        SuperMap.QueryParameters.prototype.destroy.apply(me, arguments);
        me.returnContent = null;
        me.geometry = null;
        me.spatialQueryMode = null;
    },

    CLASS_NAME: "SuperMap.QueryByGeometryParameters"
});
module.exports = SuperMap.QueryByGeometryParameters;