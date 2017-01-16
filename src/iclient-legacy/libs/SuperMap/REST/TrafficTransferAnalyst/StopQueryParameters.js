/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.StopQueryParameters
 * 站点查询参数类。 
 */
SuperMap.REST.StopQueryParameters = SuperMap.Class({
    /** 
     * APIProperty: keyWord
     * {String} 站点名称关键字。
     */
    keyWord: null,
    
    /** 
     * APIProperty: returnPosition
     * {Boolean} 是否返回站点坐标信息。
     */
    returnPosition: false,
    
    /**
     * Constructor: SuperMap.REST.StopQueryParameters
     * 站点查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * keyWord - {String} 站点名称关键字。
     * returnPosition - {Boolean} 是否返回站点坐标信息。   
     */
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        SuperMap.Util.reset(this);
    },
    
    CLASS_NAME:"SuperMap.REST.StopQueryParameters"
});