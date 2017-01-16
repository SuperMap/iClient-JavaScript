/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/FilterParameter.js
 * @requires SuperMap/BaseTypes/Bounds.js
 * @requires SuperMap/REST/QueryParameters.js
 */

/**
 * Class: SuperMap.REST.QueryByBoundsParameters
 * Bounds 查询参数类。
 * 该类用于设置 Bounds 查询的相关参数。
 *
 * Inherits from:
 *  - <SuperMap.REST.QueryParameters> 
 */
SuperMap.REST.QueryByBoundsParameters = SuperMap.Class(SuperMap.REST.QueryParameters, {

    /** 
     * APIProperty: returnContent
     * {Boolean} 是否立即返回新创建资源的表述还是返回新资源的 URI。
     * 如果为 true，则直接返回新创建资源，即查询结果的表述。
     * 为 false，则返回的是查询结果资源的 URI。默认为 true。  
     */
    returnContent: true,
    
    /** 
     * APIProperty: bounds
     * {<SuperMap.Bounds>} 指定的查询范围。 
     */
    bounds: null,
    
    /**
     * Constructor: SuperMap.REST.QueryByBoundsParameters
     * Bounds 查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * customParams - {String} 自定义参数，供扩展使用。  
     * expectCount - {Integer} 期望返回结果记录个数。
     * networkType - {<SuperMap.REST.GeometryType>} 网络数据集对应的查询类型。
     * queryOption - {<SuperMap.REST.QueryOption>} 查询结果类型枚举类。
     * queryParams -  {Array(<SuperMap.REST.FilterParameter>)} 查询过滤条件参数数组。
     * startRecord - {Integer} 查询起始记录号。
     * holdTime - {Integer} 资源在服务端保存的时间。
     * returnContent - {Boolean} 是否立即返回新创建资源的表述还是返回新资源的 URI。
     * bounds - {<SuperMap.Bounds>} 指定的查询范围。
     */
    initialize: function(options) {
        SuperMap.REST.QueryParameters.prototype.initialize.apply(this, arguments);
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。 
     */
    destroy: function() {
        SuperMap.REST.QueryParameters.prototype.destroy.apply(this, arguments); 
        var me = this;
        me.returnContent = null;
        if (me.bounds) {
            me.bounds = null;
        }

    },
    
    CLASS_NAME: "SuperMap.REST.QueryByBoundsParameters"
});