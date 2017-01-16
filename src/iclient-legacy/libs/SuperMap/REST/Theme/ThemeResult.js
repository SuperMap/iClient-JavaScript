/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.ThemeResult
 * 专题图结果类。
 * 专题图结果类中包含了专题图结果资源（ResourceInfo)的相关信息。
 */
SuperMap.REST.ThemeResult = SuperMap.Class({
    
    /** 
     * APIProperty: resourceInfo
     * {<SuperMap.REST.ResourceInfo>} 专题图结果资源,从中可以获取到相应资源在服务端的地址 url 和资源的 ID 号。这是临时的资源，默认的生命周期是7天，用户可以设置临时资源的存活时间，详情请见SuperMap iServer 8C帮助文档（iServer REST API > 临时资源的生命周期）。
     */
    resourceInfo: null,
    
    /**
     * Constructor: SuperMap.REST.ThemeResult
     * 专题图结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * resourceInfo - {<SuperMap.REST.ResourceInfo>} 专题图结果资源。 
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        var me = this;
        if (me.resourceInfo) {
            me.resourceInfo.destroy();
            me.resourceInfo = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeResult"
});