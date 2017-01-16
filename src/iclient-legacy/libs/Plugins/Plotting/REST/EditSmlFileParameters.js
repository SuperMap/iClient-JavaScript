/**
 * Class: SuperMap.REST.EditSmlFileParameters
 * 标绘服务中态势图保存、加载及删除的参数类。
 */
SuperMap.REST.EditSmlFileParameters = SuperMap.Class({

    /**
     * APIProperty: method
     * {String} 请求服务器时的方法，"POST"、"GET"、"DELETE"。
     */
    method: "POST",

    /**
     * APIProperty: sitData
     * {<SuperMap.Plot.SitDataStruct>} 态势图数据。
     */
    sitData: null,

    /**
     * Constructor: SuperMap.REST.EditSmlFileParameters
     * 初始化 EditSmlFileParameters 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * method - {String}  请求服务器时的方法，"POST"、"GET"、"DELETE"。默认为"POST"。
     * sitData - {<SuperMap.Plot.SitDataStruct>}  态势图数据。"POST"请求时，需要设置。
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
        me.method = "POST";
        me.sitData = null;
    },

    CLASS_NAME:"SuperMap.REST.EditSmlFileParameters"
});

/**
 * Function: SuperMap.REST.EditSimulationMapParameters.toJsonParameters
 * 将 <SuperMap.REST.EditSimulationMapParameters> 对象参数转换为 json 字符串。
 *
 * Parameters:
 * params - {<SuperMap.REST.EditSimulationMapParameters>} 态势图保存及加载的参数类。
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.REST.EditSmlFileParameters.toJsonParameters = function(params) {
    if(params){
        return SuperMap.Plot.PlottingUtil.toJSON(params.sitData)
    }
};
