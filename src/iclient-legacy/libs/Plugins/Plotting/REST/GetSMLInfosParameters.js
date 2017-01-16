/**
 * Class: SuperMap.REST.GetSMLInfosParameters
 * 获取态势图信息列表。
 */
SuperMap.REST.GetSMLInfosParameters = SuperMap.Class({

    /**
     * APIProperty: start
     * {Integer} 从第几个文件开始获取
     */
    start: null,

    /**
     * APIProperty: count
     * {Integer} 一共获取几个
     */
    count: null,

    /**
     * Constructor: SuperMap.REST.GetSMLInfosParameters
     * 初始化 GetSMLInfosParameters 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * start - {Integer}  从第几个文件开始获取。
     * count - {Integer}  一共获取几个。
     */
    initialize: function(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        var me = this;
        me.start = null;
        me.count = null;
    },

    CLASS_NAME:"SuperMap.REST.GetSMLInfosParameters"
});

/**
 * Function: SuperMap.REST.GetSMLInfosParameters.toUrlParameters
 * 将 <SuperMap.REST.GetSMLInfosParameters> 对象参数转换为 json 字符串。
 *
 * Parameters:
 * params - {<SuperMap.REST.GetSMLInfosParameters>} 获取服务器态势图文件的描述名的参数类。
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.REST.GetSMLInfosParameters.toUrlParameters = function(params) {
    if(params){
        var paramsSymbolInfo = "";

        if(params.start !== null){

            paramsSymbolInfo = "?start=" + params.start;
        }
        if(params.count && (params.count !== null || params.count !== 0)){
            paramsSymbolInfo += "&count=" + params.count;
        }
        return paramsSymbolInfo;
    }
};
