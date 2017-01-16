/**
 * Class: SuperMap.Cloud.PathAnalystParameter
 * 路径导航分析参数类。记录路径导航所需的起点、终点、途径点、分析类型等参数。
 
 */
SuperMap.Cloud.PathAnalystParameter = SuperMap.Class({

	/**
     * APIProperty: startPoint
     * {<SuperMap.Geometry.Point>} 路径导航分析起始点坐标，必设属性。
     */
	startPoint: null,
	
	 /**
     * APIProperty: endPoint
     * {<SuperMap.Geometry.Point>} 路径导航分析终点坐标，必设属性。
     */
	endPoint: null,
	
	 /**
     * APIProperty: passPoints
     * {Array(<SuperMap.Geometry.Point>)} 路径导航分析途径点坐标集合。
     */
	passPoints: null,
	
	 /**
     * APIProperty: layerStatusList
     * {<SuperMap.Cloud.RouteType>} 路径导航分析所选用的分析模式，默认为 SuperMap.Cloud.RouteType.MINLENGTH，距离最短模式。
     */
	routeMode: SuperMap.Cloud.RouteType.MINLENGTH,

    /**
     * APIProperty: returnPathInfos
     * {Boolean} 是否返回路径导引信息，默认为true。
     */
    returnPathInfos: true,

    /**
     * APIProperty: returnPathPoints
     * {Boolean} 是否返回路径，默认为true。
     */
    returnPathPoints: true,

    /**
     * APIProperty: to
     * {Number} 输出结果坐标类型，默认值：910101。支持的坐标类型编码参考 http://www.supermapol.com/developer/webapi.html?title=convert 。
     */
    to: 910101,
	
	/**
     * Constructor: SuperMap.Cloud.PathAnalystParameter
     *
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * startPoint - {<SuperMap.Geometry.Point>} 路径导航分析起始点坐标。
     * endPoint - {<SuperMap.Geometry.Point>} 路径导航分析终点坐标。
     * passPoints - {Array(<SuperMap.Geometry.Point>)} 路径导航分析途径点坐标集合。
	 * routeMode - {<SuperMap.Cloud.RouteType>} 路径导航分析所选用的分析模式。
     */
    initialize: function(options) {
        var me = this;
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
        me.startPoint = null;
        me.endPoint = null;
        me.passPoints = null;
		me.routeMode = null;
        me.to = null;
    },
	
	CLASS_NAME: "SuperMap.Cloud.PathAnalystParameter"
});