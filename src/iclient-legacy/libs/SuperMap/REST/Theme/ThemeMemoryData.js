/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.ThemeMemoryData
 * 专题图内存数据类。
 */
SuperMap.REST.ThemeMemoryData = SuperMap.Class({
    
    /** 
     * Property: srcData
     * {Array()} 原始值数组，该属性值将被 targetData 属性所指定的值替换掉，然后制作专题图，但数据库中的值并不会改变。
     */
    srcData: null,
    
    /** 
     * Property: targetData
     * {Array()} 外部值数组，即用于制作专题图的内存数据，设定该属性值后，会将 srcData 属性所指定的原始值替换掉制作专题图，但数据库中的值并不会改变。
     */
    targetData: null,
    
    /**
     * Constructor: SuperMap.REST.ThemeMemoryData
     * 专题图内存数据类构造函数。
     *
     * Parameters:
     * srcData - {Array()} 原始值数组。
     * targetData - {Array()} 外部值数组。
     */
    initialize: function(srcData, targetData) {
        if (srcData) {
            this.srcData = srcData;
        }
        if (targetData) {
            this.targetData = targetData;
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        me.srcData = null;
        me.targetData = null;
    },
    
    /**
     * Method: toJSON
     * 将 ThemeMemoryData 对象转化为json字符串。   
     *
     * Returns:
     * {String} 返回转换后的 JSON 字符串。
     */
     toJSON: function() {
        if (this.srcData && this.targetData) {
            var memoryDataStr = "";
            var count = Math.min(this.srcData.length, this.targetData.length);
            for (var i = 0; i < count; i++) {
                memoryDataStr += "\'" + this.srcData[i] + "\':\'" + this.targetData[i] + "\',";
            }
            //去除多余的逗号
            if (i > 0) {
                memoryDataStr = memoryDataStr.substring(0, memoryDataStr.length - 1);
            }
            return "{" + memoryDataStr + "}";
        } else {
            return null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeMemoryData"
});