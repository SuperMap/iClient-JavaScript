/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/SpatialAnalyst/ThiessenAnalystParameters.js
 * @requires SuperMap/Geometry/Point.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 */

/**
 * Class: SuperMap.REST.GeometryThiessenAnalystParameters
 * 几何对象泰森多边形分析参数类
 * 对指定的某个几何对象做泰森多边形分析。通过该类可以指定要做泰森多边形分析的几何对象、返回数据集名称等。
 *
 * Inherits from:
 *  - <SuperMap.REST.ThiessenAnalystParameters> 
 */
SuperMap.REST.GeometryThiessenAnalystParameters = SuperMap.Class(SuperMap.REST.ThiessenAnalystParameters, {
 
    /** 
     * Property: points
     * {Array(<SuperMap.Geometry.Point>)} 
	 * 使用点数组进行分析时使用的几何对象。
     */
    points : null,

    /**
     * Constructor: SuperMap.REST.GeometryThiessenAnalystParameters 
     * 几何对象泰森多边形分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * points - {Array(<SuperMap.Geometry.Point>)} 使用点数组进行分析时使用的几何对象。
     */
    initialize: function (options) {
        SuperMap.REST.ThiessenAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function () {
        SuperMap.REST.ThiessenAnalystParameters.prototype.destroy.apply(this,arguments);

        var me = this;
        if(me.points ){
			for(var i = me.points.length-1; i >= 0; i--){
				me.points[i].destroy();
			}
            me.points = null;
        }
    },
    
     CLASS_NAME: "SuperMap.REST.GeometryThiessenAnalystParameters"
});

SuperMap.REST.GeometryThiessenAnalystParameters.toObject = function (geometryThiessenAnalystParameters, tempObj) {
    for (var name in geometryThiessenAnalystParameters) {
        if (name === "clipRegion") {
            tempObj.clipRegion = SuperMap.REST.ServerGeometry.fromGeometry(geometryThiessenAnalystParameters.clipRegion);
        }else {
            tempObj[name] = geometryThiessenAnalystParameters[name];
        }
    }
};