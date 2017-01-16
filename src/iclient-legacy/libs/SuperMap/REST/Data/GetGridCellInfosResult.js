/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.GetFieldsResult
 * 栅格单元信息查询结果。
 */
SuperMap.REST.GetGridCellInfosResult = SuperMap.Class({

    /**
     * Constructor: SuperMap.REST.GetGridCellInfosResult
     *
     *
     * Parameters:
     * options - {Object} 参数。
     */
    initialize: function(options) {
        if(!!options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        var me = this;
        me.column = null;
        me.row = null;
        me.value = null;
    },

    CLASS_NAME: "SuperMap.REST.GetGridCellInfosResult"
});

/**
 * Function: SuperMap.REST.GetGridCellInfosResult.fromJson
 * 将 JSON 对象表示的结果资源信息类转化为 GetGridCellInfosResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的结果资源信息类。
 *
 * Returns:
 * {<SuperMap.REST.GetGridCellInfosResult>} 转化后的 GetGridCellInfosResult 对象。
 */
SuperMap.REST.GetGridCellInfosResult.fromJson = function(jsonObject) {
    if(!jsonObject) {
        return;
    }
    var obj = {};
    for(var jsonName in jsonObject) {
		if(jsonName != "succeed" && jsonObject.hasOwnProperty(jsonName)) {
			obj[jsonName] = jsonObject[jsonName];
		}    			
	}
    return new SuperMap.REST.GetGridCellInfosResult(obj);
};
