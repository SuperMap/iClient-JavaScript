/**
 * Class: SuperMap.REST.GetLibIDsResult
 * 标绘服务中获取支持的标号库ID列表的结果类。
 */
SuperMap.REST.GetLibIDsResult = SuperMap.Class({
    /**
     * APIProperty: resourceInfo
     * 所有符号库的ID集合。
     */
    resourceInfo: null,

    /**
     * Constructor: SuperMap.REST.GetLibIDsResult
     * 初始化 GetLibIDsResult 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * resourceInfo - {Object} 所有符号库的ID集合。
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

    CLASS_NAME: "SuperMap.REST.GetLibIDsResult"
});

/**
 * Function: SuperMap.REST.GetLibIDsResult.fromJson
 * 将获取到的所有符号库ID列表转化为 GetLibIDsResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} 获取标号库ID列表的结果。
 *
 * Returns:
 * {<SuperMap.REST.EditFeaturesResult>} 转化后的 EditFeaturesResult 对象。
 */
SuperMap.REST.GetLibIDsResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    if(jsonObject instanceof Array) {
        return new SuperMap.REST.GetLibIDsResult({
            resourceInfo: jsonObject
        });
    } else {
        return new SuperMap.REST.GetLibIDsResult({
            resourceInfo: jsonObject
        });
    }
};