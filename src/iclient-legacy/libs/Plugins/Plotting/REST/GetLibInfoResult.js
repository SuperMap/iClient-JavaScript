/**
 * Class: SuperMap.REST.GetLibInfoResult
 * 标绘服务中获取标号库信息的结果类。
 */
SuperMap.REST.GetLibInfoResult = SuperMap.Class({
    /**
     * APIProperty: resourceInfo
     * 编辑资源后的返回结果。
     */
    resourceInfo: null,

    /**
     * Constructor: SuperMap.REST.GetLibInfoResult
     * 初始化 GetLibInfoResult 的结果类。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * resourceInfo - {Object} 标号库信息。
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

    CLASS_NAME: "SuperMap.REST.GetLibInfoResult"
});

/**
 * Function: SuperMap.REST.GetLibInfoResult.fromJson
 * 将获取标号库信息的返回结果转化为 GetLibInfoResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} 标号库信息的返回结果。
 *
 * Returns:
 * {<SuperMap.REST.GetLibInfoResult>} 转化后的 GetLibInfoResult 对象。
 */
SuperMap.REST.GetLibInfoResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    if(jsonObject instanceof Array) {
        return new SuperMap.REST.GetLibInfoResult({
            resourceInfo: jsonObject
        });
    } else {
        return new SuperMap.REST.GetLibInfoResult({
            resourceInfo: jsonObject
        });
    }
};