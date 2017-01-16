/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Theme/ThemeMemoryData.js
 */
 
/**
 * Class: SuperMap.REST.Theme
 * 专题图基类。
 */
SuperMap.REST.Theme = SuperMap.Class({
    
    /** 
     * Property: memoryData
     * {<SuperMap.REST.ThemeMemoryData>} 专题图内存数据。
     * 用内存数据制作专题图的方式与表达式制作专题图的方式互斥，前者优先级较高。
     * 第一个参数代表专题值，即数据集中用来做专题图的字段或表达式的值；第二个参数代表外部值。在制作专题图时，会用外部值代替专题值来制作相应的专题图。
     */
    memoryData: null,
    
    /** 
     * Property: type
     * {String} 专题图类型。
     */
    type: null,
    
    /**
     * Constructor: SuperMap.REST.Theme
     * 专题图基类构造函数。
     *
     * Parameters:
     * type - {String} 专题图类型。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * memoryData - {<SuperMap.REST.ThemeMemoryData>} 专题图内存数据。
     */
    initialize: function(type, options) {
        if (!type) {
            return false;
        }
        this.type = type;
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
        if (me.memoryData) {
            me.memoryData.destroy();
            me.memoryData = null;
        }    
        me.type = null;
    },
    
    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        //return 子类实现
        return;
    },
    
    CLASS_NAME: "SuperMap.REST.Theme"
});