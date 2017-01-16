/**
 * Class: SuperMap.REST.EditSmlFileResult
 * 标绘服务中态势图保存、加载及删除的结果类。
 */
SuperMap.REST.EditSmlFileResult = SuperMap.Class({
    /**
     * APIProperty: resourceInfo
     * 服务器的返回结果。
     */
    resourceInfo: null,

    /**
     * Constructor: SuperMap.REST.EditSmlFileResult
     * 初始化 EditSmlFileResult 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
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

    CLASS_NAME: "SuperMap.REST.EditSmlFileResult"
});

/**
 * Function:SuperMap.REST.EditSmlFileResult.fromJson
 * 将服务器返回的 JSON 格式的数据转化为 EditSmlFileResult 类型。
 *
 * Parameters:
 * jsonObject - {Object} 返回结果。
 *
 * Returns:
 * {<SuperMap.REST.EditSmlFileResult>} 转化后的 EditSmlFileResult 对象。
 */
SuperMap.REST.EditSmlFileResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    if(jsonObject instanceof Array) {
        return new SuperMap.REST.EditSmlFileResult({
            resourceInfo: jsonObject
        });
    } else {
        return new SuperMap.REST.EditSmlFileResult({
            resourceInfo: jsonObject
        });
    }
};