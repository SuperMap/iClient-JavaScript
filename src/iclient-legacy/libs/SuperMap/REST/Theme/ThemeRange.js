/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/Theme/Theme.js
 * @requires SuperMap/REST/Theme/ThemeRangeItem.js
 */
 
/**
 * Class: SuperMap.REST.ThemeRange
 * 范围分段专题图。
 * 范围分段专题图是按照指定的分段方法（如：等距离分段法）对字段的属性值进行分段，使用不同的颜色或符号（线型、填充）表示不同范围段落的属性值在整体上的分布情况，体现区域的差异。
 * 在分段专题图中，专题值按照某种分段方式被分成多个范围段，要素根据各自的专题值被分配到其中一个范围段中，在同一个范围段中的要素使用相同的颜色，填充，符号等风格进行显示。
 * 分段专题图所基于的专题变量必须为数值型，分段专题图一般用来反映连续分布现象的数量或程度特征，如降水量的分布，土壤侵蚀强度的分布等。
 * 
 * Inherits from:
 *  - <SuperMap.REST.Theme> 
 */
SuperMap.REST.ThemeRange = SuperMap.Class(SuperMap.REST.Theme, { 
	/** 
     * Property: precision
     * {String} 
     */
    precision: '1.0E-12',
    /** 
     * APIProperty: items
     * {Array(<SuperMap.REST.ThemeRangeItem>)} 分段专题图子项数组。
     * 在分段专题图中，字段值按照某种分段模式被分成多个范围段，每个范围段即为一个子项，同一范围段的要素属于同一个分段专题图子项。
     * 每个子项都有其分段起始值、终止值、名称和风格等。每个分段所表示的范围为[start, end)。
     * 如果设置了范围分段模式和分段数，则会自动计算每段的范围[start, end)，故无需设置[start, end)；当然可以设置，那么结果就会按照您设置的值对分段结果进行调整。
     */
    items: null,
    
    /** 
     * APIProperty: rangeExpression
     * {String} 分段字段表达式。
     * 由于范围分段专题图基于各种分段方法根据一定的距离进行分段，因而范围分段专题图所基于的字段值的数据类型必须为数值型。对于字段表达式，只能为数值型的字段间的运算。必设字段。
     */
    rangeExpression: null,
    
    /** 
     * APIProperty: rangeMode
     * {<SuperMap.REST.RangeMode>} 分段专题图的分段模式。
     * 默认值为 SuperMap.REST.RangeMode.EQUALINTERVAL（等距离分段）。
     * 在分段专题图中，作为专题变量的字段或表达式的值按照某种分段方式被分成多个范围段。
     * 目前 SuperMap 提供的分段方式包括：等距离分段法、平方根分段法、标准差分段法、对数分段法、等计数分段法和自定义距离法，显然这些分段方法根据一定的距离进行分段，因而范围分段专题图所基于的专题变量必须为数值型。
     */
    rangeMode: SuperMap.REST.RangeMode.EQUALINTERVAL,
    
    /** 
     * APIProperty: rangeParameter
     * {Number} 分段参数。
     * 当分段模式为等距离分段法，平方根分段，对数分段法，计数分段法其中一种模式时，该参数用于设置分段个数，必设；当分段模式为标准差分段法时，该参数不起作用；当分段模式为自定义距离时，该参数用于设置自定义距离。默认值为 -1。
     */
    rangeParameter: 0,
    
    /** 
     * APIProperty: colorGradientType
     * {<SuperMap.REST.ColorGradientType>} 渐变颜色枚举类
     * 渐变色是由起始色根据一定算法逐渐过渡到终止色的一种混合型颜色。    
     * 该类作为单值专题图参数类、分段专题图参数类的属性，负责设置单值专题图、分段专题图的配色方案，在默认情况下专题图所有子项会根据这个配色
     * 方案完成填*充。但如果为某几个子项的风格进行单独设置后（设置了 ThemeUniqueItem 或 ThemeRangeItem 类中Style属性），
     * 该配色方案对于这几个子项将不起作用。
     */
    colorGradientType: SuperMap.REST.ColorGradientType.YELLOW_RED,
    
    /**
     * Constructor: SuperMap.REST.ThemeRange 
     * 范围分段专题图构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * items - {Array(<SuperMap.REST.ThemeRangeItem>)} 分段专题图子项数组。
     * rangeExpression - {String} 分段字段表达式。
     * rangeMode - {<SuperMap.REST.RangeMode>} 分段专题图的分段模式。
     * rangeParameter - {Number} 分段参数。
     * colorGradientType - {<SuperMap.REST.ColorGradientType>} 渐变颜色枚举类。
     * memoryData - {<SuperMap.REST.ThemeMemoryData>} 专题图内存数据。
     */
    initialize: function(options) {
        SuperMap.REST.Theme.prototype.initialize.apply(this, ["RANGE", options]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。 
     */
    destroy: function() {
        SuperMap.REST.Theme.prototype.destroy.apply(this, arguments);
        var me = this;
        if(me.items){
            if(me.items.length > 0){
                for(var item in me.items){
                    me.items[item].destroy();
                    me.items[item] = null;
                }
            }
            me.items = null;
        }
        me.rangeExpression = null;
        me.rangeMode = null;
        me.rangeParameter = null;
		me.colorGradientType = null;
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeRange"
});
SuperMap.REST.ThemeRange.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeRange();
    SuperMap.Util.copy(res, obj);
    var itemsR = obj.items;
    var len = itemsR ? itemsR.length : 0;
    res.items = [];
    for(var i=0;i<len;i++) {
        res.items.push(SuperMap.REST.ThemeRangeItem.fromObj(itemsR[i]));
    }
    return res;
}
