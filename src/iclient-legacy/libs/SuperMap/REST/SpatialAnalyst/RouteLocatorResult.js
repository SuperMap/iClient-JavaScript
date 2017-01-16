/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/SpatialAnalyst/SpatialAnalystResult.js
 */

/**
 * Class: SuperMap.REST.RouteLocatorResult
 * 创建路由定位点（线）的分析结果资源。
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystResult>
 */
SuperMap.REST.RouteLocatorResult = SuperMap.Class(SuperMap.REST.SpatialAnalystResult, {

    /**
     * APIProperty:succeed
     * {Boolean} 创建分析结果是否成功；成功则返回 true，否则返回 false。
     */
    succeed:null,

    /**
     * APIProperty:image
     * {Object} 路由定位点（线）分析结果图片。表达了 SuperMap iServer 空
     *      间分析结果产生的图片以及图片信息相关的描述。
     */
    image:null,

    /**
     * APIProperty:message
     * {String} 路由定位点（线）分析过程中产生的相关信息。
     */
    message:null,

    /**
     * APIProperty:resultGeometry
     * {<SuperMap.Geometry>} 空间分析结果几何对象。
     */
    resultGeometry:null,

    /**
     * Constructor: SuperMap.REST.RouteLocatorResult
     * 路由定位点（线）的分析结果资源构造函数。
     *
     * Parameters:
     * options - {Object} 此类及其父类的属性。
     *
     * Allowed options properties:
     * succeed -  {Boolean} 创建分析结果是否成功；成功则返回 true，否则返回 false。
     * image -  {ImageResult} 路由定位点（线）分析结果图片。表达了 SuperMap iServer 空
     *      间分析结果产生的图片以及图片信息相关的描述。
     * message -  {String} 路由定位点（线）分析过程中产生的相关信息。
     * resultGeometry -  {<SuperMap.Geometry>} 空间分析结果几何对象。
     */
    initialize:function (options) {
        SuperMap.REST.SpatialAnalystResult.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        var me = this;
        me.succeed = null;
        if (me.image) {
            me.image = null;
        }
        if (me.message) {
            me.message = null;
        }
        me.resultGeometry = null;
    },

    CLASS_NAME:"SuperMap.REST.RouteLocatorResult"
});


/**
 * SuperMap.REST.RouteLocatorResult.fromJson
 * 将 JSON 对象表示的查询结果记录集转化为 RouteLocatorResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的计算结果。
 *
 * Returns:
 * {<SuperMap.REST.RouteCalculateMeasureResult>} 转化后的RouteLocatorResult 对象。
 */
SuperMap.REST.RouteLocatorResult.fromJson = function (jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.RouteLocatorResult();
    if (jsonObject.image) {
        result.image = jsonObject.image;
    }
    if (jsonObject.message) {
        result.message = jsonObject.message;
    }
    if (jsonObject.resultGeometry) {
        if (jsonObject.resultGeometry.type === "POINT") {
            var x = jsonObject.resultGeometry.points[0].x;
            var y = jsonObject.resultGeometry.points[0].y;
            result.resultGeometry = new SuperMap.Geometry.Point(x, y);
        }else if(jsonObject.resultGeometry.type === "LINE"){
            result.resultGeometry =SuperMap.REST.Route.fromJson(jsonObject.resultGeometry);
        }
    }
    result.succeed = jsonObject.succeed;
    return result;
};