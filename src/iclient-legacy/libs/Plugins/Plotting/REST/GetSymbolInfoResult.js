/**
 * Class: SuperMap.REST.GetSymbolInfoResult
 * 标绘服务中获取标号信息的结果类。
 */
SuperMap.REST.GetSymbolInfoResult = SuperMap.Class({
    /**
     * APIProperty: resourceInfo
     * 编辑资源后的返回结果。
     */
    resourceInfo: null,

    /**
     * Constructor: SuperMap.REST.GetSymbolInfoResult
     * 初始化 GetSymbolInfoResult 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * resourceInfo - {Object} 当前标号信息。
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
        me.resourceInfo = null;
    },

    CLASS_NAME: "SuperMap.REST.GetSymbolInfoResult"
});

/**
 * Function: SuperMap.REST.GetSymbolInfoResult.fromJson
 * 将标号信息表示的返回结果转化为 GetSymbolInfoResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} 标号信息的返回结果。
 *
 * Returns:
 * {<SuperMap.REST.GetSymbolInfoResult>} 转化后的 GetSymbolInfoResult 对象。
 */
SuperMap.REST.GetSymbolInfoResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    if(jsonObject instanceof Array) {
        return new SuperMap.REST.GetSymbolInfoResult({
            resourceInfo: jsonObject
        });
    } else {
        return new SuperMap.REST.GetSymbolInfoResult({
            resourceInfo: jsonObject
        });
    }
};