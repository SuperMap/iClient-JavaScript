/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerStyle.js
 */

/**
 * Class: SuperMap.REST.ThemeGraphItem
 * 统计专题图子项类。
 * 统计专题图可以基于多个变量，反映多种属性，即可以将多个专题变量的值绘制在一个统计图上。每一个专题变量对应的统计图即为一个专题图子项。
 * 该类用来设置每个统计专题图子项的名称，专题变量，显示风格，甚至可以将该子项再制作成范围分段专题图。
 */
SuperMap.REST.ThemeGraphItem = SuperMap.Class({
    
    /** 
     * APIProperty: caption
     * {String} 专题图子项的名称。
     */
    caption: null,
    
    /** 
     * APIProperty: graphExpression
     * {String} 统计专题图的专题变量。专题变量可以是一个字段或字段表达式。字段必须为数值型；表达式只能为数值型的字段间的运算。必设字段。
     */
    graphExpression: null,

    /** 
     * APIProperty: memoryDoubleValues
     * {Array(Number)} 内存数组方式制作专题图时的值数组。
     * 内存数组方式制作专题图时，只对 SmID 值在键数组（ThemeGraph.memoryKeys）中的记录制作专题图。
     * 值数组的数值个数必须与键数组中数值的个数一致。 值数组中的值将代替原来的专题值来制作统计专题图。
     * 比如：利用面积字段和周长字段（即有两个统计专题图子项 ）作为专题变量制作统计专题图。 
     */
    memoryDoubleValues: null,
    
    /** 
     * APIProperty: uniformStyle
     * {<SuperMap.REST.ServerStyle>} 统计专题图子项的显示风格。
     * 每一个统计专题图子项都对应一种显示风格。
     */
    uniformStyle: null,
    
    /**
     * Constructor: SuperMap.REST.ThemeGraphItem 
     * 统计专题图子项类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * caption - {String} 专题图子项的名称。
     * graphExpression - {String} 统计专题图的专题变量。
     * memoryDoubleValues - {Array(Number)} 内存数组方式制作专题图时的值数组。
     * uniformStyle - {<SuperMap.REST.ServerStyle>} 统计专题图子项的显示风格。
     */
    initialize: function(options) {
        var me = this;
        me.uniformStyle = new SuperMap.REST.ServerStyle();
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
        me.caption = null;
        me.graphExpression = null;
        me.memoryDoubleValues = null;
        me.uniformStyle = null;
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeGraphItem"
});
SuperMap.REST.ThemeGraphItem.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeGraphItem();
    SuperMap.Util.copy(res, obj);
    res.uniformStyle = SuperMap.REST.ServerStyle.fromJson(obj.uniformStyle);
    return res;
}
