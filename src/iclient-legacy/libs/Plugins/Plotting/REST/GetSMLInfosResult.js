/**
 * Class: SuperMap.REST.GetSMLInfosResult
 * 获取态势图信息列表结果类
 */
SuperMap.REST.GetSMLInfosResult = SuperMap.Class({
    /**
     * APIProperty: resourceInfo
     * 从服务器返回的返回结果。
     */
    fileArray: null,

    /**
     * Constructor: SuperMap.REST.GetSMLInfosResult
     * 初始化 GetSMLInfosResult 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * resourceInfo -  态势图信息列表。
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
        me.fileArray = null;
    },

    CLASS_NAME: "SuperMap.REST.GetSMLInfosResult"
});

/**
 * Function: SuperMap.REST.GetSMLInfosResult.fromJson
 * 获取服务器态势图信息列表的结果对象。
 *
 * Parameters:
 * jsonObject - {Object} 返回结果。
 *
 * Returns:
 * {<SuperMap.REST.GetSMLInfosResult>} 转化后的 SMLInfosResult 对象。
 */
SuperMap.REST.GetSMLInfosResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    if(jsonObject instanceof Array) {
        return new SuperMap.REST.GetSMLInfosResult({
            fileArray: jsonObject
        });
    } else {
        return new SuperMap.REST.GetSMLInfosResult({
            fileArray: jsonObject
        });
    }
};