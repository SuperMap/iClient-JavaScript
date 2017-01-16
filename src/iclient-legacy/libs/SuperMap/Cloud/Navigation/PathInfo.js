/**
 * Class: SuperMap.Cloud.PathInfo
 * 路径导航结果信息类，记录道路转向，名称，坐标等信息。
 
 */
SuperMap.Cloud.PathInfo = SuperMap.Class({
	/**
     * APIProperty: dirToSwerve
     * {int} 到下一条道路的转弯方向。其中0表示直行，1表示左前转弯，2表示右前转弯，3表示左转弯，4表示右转弯，5表示做后转弯，
	 * 6表示右后转弯，7表示掉头，8表示右转弯绕行至左，9表示直角斜边右转弯，10表示环岛。
     */
	dirToSwerve: null,
	/**
     * APIProperty: junction
     * {SuperMap.Geometry.Point} 到下一条道路的路口点坐标。
     */
	junction: null,
	/**
     * APIProperty: length
     * {Number} 当前道路的长度。
     */
	length: 0,
	/**
     * APIProperty: routeName
     * {String} 当前道路的名称。
     */
	routeName: null,
	
	/**
     * Constructor: SuperMap.Cloud.PathAnalystResult
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * dirToSwerve - 到下一条道路的转弯方向。
     * junction - 到下一条道路的路口点坐标。
     * length - {Number} 当前道路的长度。
	 * routeName - {String} 当前道路的名称。
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
        me.dirToSwerve = null;
        me.junction = null;
        me.length = null;
		me.routeName = null;
    },
    
    CLASS_NAME: "SuperMap.Cloud.PathInfo"
});

/**
 * Function: SuperMap.Cloud.PathInfo.fromJson
 * 将 JSON 对象表示的导航引导信息转化为 PathInfo 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的导航引导信息。 
 *
 * Returns:
 * {<SuperMap.Cloud.PathInfo>} 转化后的 PathInfo 对象。
 */
SuperMap.Cloud.PathInfo.fromJson = function(jsonObj){
	if(!jsonObj){
		return null;
	}
	var junction = null;
	if(jsonObj.junction){
		junction = new SuperMap.Geometry.Point(jsonObj.junction.x, jsonObj.junction.y);
	}
	return new SuperMap.Cloud.PathInfo({
		dirToSwerve: jsonObj.dirToSwerve,
		junction: junction,
        length: jsonObj.length,
		routeName: jsonObj.routeName
	});
};