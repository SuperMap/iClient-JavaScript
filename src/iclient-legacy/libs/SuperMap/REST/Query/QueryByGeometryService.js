/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/QueryService.js
 * @requires SuperMap/REST/QueryByGeometryParameters.js
 */

/**
 * Class: SuperMap.REST.QueryByGeometryService
 * Geometry 查询服务类。
 *
 * Inherits from:
 *  - <SuperMap.REST.QueryService> 
 */
SuperMap.REST.QueryByGeometryService = SuperMap.Class(SuperMap.REST.QueryService, {

    /**
    * Constructor: SuperMap.REST.QueryByGeometryService
    * Geometry 查询服务类构造函数。
    *
    * 例如：
    * (start code)
    * var myQueryByGeometryService = new SuperMap.REST.QueryByGeometryService(url, {
    *     eventListeners: {
    *	      "processCompleted": queryCompleted, 
    *		  "processFailed": queryError
    *		  }
    * });
    * function queryCompleted(QueryEventArgs){//todo};
    * function queryError(QueryEventArgs){//todo};
    * (end)
    *
    * Parameters:
    * url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 即可。
    * options - {Object} 参数。
    *
    * Allowed options properties:
    * eventListeners - {Object} 需要被注册的监听器对象。
    */
    initialize: function(url, options) {
        SuperMap.REST.QueryService.prototype.initialize.apply(this, arguments);
    },
    
     /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。  
     */
    destroy: function() {
        SuperMap.REST.QueryService.prototype.destroy.apply(this, arguments); 
    },
    
    /**
     * Method: getJsonParameters
     * 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（sql, geometry, distance, bounds等）。
     *
     * Parameters:
     * params - {<SuperMap.REST.QueryByGeometryParameters>} 
     *
     * Returns:
     * {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters: function(params) {
        var me = this,
            jsonParameters = "",
            qp = null,
            geometry=params.geometry,
            sg= SuperMap.REST.ServerGeometry.fromGeometry(geometry);
        qp = me.getQueryParameters(params);
        jsonParameters += "'queryMode':'SpatialQuery','queryParameters':";
        jsonParameters += SuperMap.Util.toJSON(qp) + ",'geometry':" + SuperMap.Util.toJSON(sg) + ",'spatialQueryMode':" + SuperMap.Util.toJSON(params.spatialQueryMode);
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    },
    
    CLASS_NAME: "SuperMap.REST.QueryByGeometryService"
});