/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
 
/**
 * Class: QueryByGeometryParameters
 * Geometry 查询参数类。
 * 该类用于设置 Geometry查询的相关参数。
 *
 * Inherits from:
 *  - <QueryParameters> 
 */
require('../base');
require('./QueryParameters');
QueryByGeometryParameters = SuperMap.Class(QueryParameters, {

    /** 
     * APIProperty: returnContent
     * {Boolean} 是否立即返回新创建资源的表述还是返回新资源的 URI。
     * 如果为 true，则直接返回新创建资源，即查询结果的表述。
     * 为 false，则返回的是查询结果资源的 URI。默认为 true。  
     */
    returnContent: true,
    
    /**
     * APIProperty: geometry
     * {Object} 用于查询的几何对象。
     */
    geometry: null,
    
    /**
     * APIProperty: spatialQueryMode
     * {<SpatialQueryMode>} 空间查询模式。
     */
    spatialQueryMode: SpatialQueryMode.INTERSECT,
    
    /**
     * Constructor: QueryByGeometryParameters
     * Geometry 查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * customParams - {String} 自定义参数，供扩展使用。  
     * expectCount - {Integer} 期望返回结果记录个数。
     * networkType - {<GeometryType>} 网络数据集对应的查询类型。
     * queryOption - {<QueryOption>} 查询结果类型枚举类。
     * queryParams -  {Array(<FilterParameter>)} 查询过滤条件参数数组。
     * startRecord - {Integer} 查询起始记录号。
     * holdTime - {Integer} 资源在服务端保存的时间。
     * returnContent - {Boolean} 是否立即返回新创建资源的表述还是返回新资源的 URI。
     * geometry - {Object} 用于查询的几何对象。
     * spatialQueryMode - {<SpatialQueryMode>} 空间查询模式。
     */
    initialize: function(options) {
        QueryParameters.prototype.initialize.apply(this,arguments);
        if (!options){
            return;
        }
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        QueryParameters.prototype.destroy.apply(me, arguments); 
        me.returnContent = null;
        me.geometry = null;
        me.spatialQueryMode = null;        
    },
    
    CLASS_NAME: "QueryByGeometryParameters"
});
module.exports = function (options) {
    return new QueryByGeometryParameters(options);
};