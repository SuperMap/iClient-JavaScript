/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/Theme/Theme.js
 * @requires SuperMap/REST/Theme/ThemeGridRangeItem.js
 */

/**
 * Class: SuperMap.REST.ThemeGridRange
 * 栅格分段专题图。
 * 栅格分段专题图，是将所有单元格的值按照某种分段方式分成多个范围段，值在同一个范围段中的单元格使用相同的颜色进行显示。
 * 栅格分段专题图一般用来反映连续分布现象的数量或程度特征。比如某年的全国降水量分布图，将各气象站点的观测值经过内插之后生成的栅格数据进行分段显示。
 * 该类类似于分段专题图类，不同点在于分段专题图的操作对象是矢量数据，而栅格分段专题图的操作对象是栅格数据。
 * Inherits from:
 *  - <SuperMap.REST.Theme>
 */
SuperMap.REST.ThemeGridRange = SuperMap.Class(SuperMap.REST.Theme, {

    /**
     * APIProperty: items
     * {Array(<SuperMap.REST.ThemeGridRangeItem>)} 栅格分段专题图子项数组。
     * 在栅格分段专题图中，将栅格值按照某种分段模式被分成多个范围段。
     * 本类用来设置每个栅格范围段的分段起始值、终止值、名称和颜色等。每个分段所表示的范围为 [Start,End)。
     */
    items: null,



    /**
     * APIProperty: rangeMode
     * {<SuperMap.REST.RangeMode>} 分段专题图的分段模式。
     * 默认值为 SuperMap.REST.RangeMode.EQUALINTERVAL（等距离分段）。
     * 在栅格分段专题图中，作为专题变量的字段或表达式的值按照某种分段方式被分成多个范围段。
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
     *
     */
    colorGradientType: SuperMap.REST.ColorGradientType.YELLOW_RED,
    /**
     * APIProperty: reverseColor
     * {boolean}是否对栅格分段专题图中分段的颜色风格进行反序显示。
     */
    reverseColor:false,
    /**
     * Constructor: SuperMap.REST.ThemeGridRange
     * 栅格分段专题图构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * items - {Array(<SuperMap.REST.ThemeGridRangeItem>)} 栅格分段专题图子项数组。
     * reverseColor - {boolean} 是否对栅格分段专题图中分段的颜色风格进行反序显示。
     * rangeMode - {<SuperMap.REST.RangeMode>} 分段专题图的分段模式。
     * rangeParameter - {Number} 分段参数。
     * colorGradientType - {<SuperMap.REST.ColorGradientType>} 渐变颜色枚举类。
     */
    initialize: function(options) {
        SuperMap.REST.Theme.prototype.initialize.apply(this, ["GRIDRANGE", options]);
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
        me.reverseColor = null;
        me.rangeMode = null;
        me.rangeParameter = null;
        me.colorGradientType = null;
    },

    CLASS_NAME: "SuperMap.REST.ThemeGridRange"
});
SuperMap.REST.ThemeGridRange.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeGridRange();
    SuperMap.Util.copy(res, obj);
    var itemsR = obj.items;
    var len = itemsR ? itemsR.length : 0;
    res.items = [];
    for(var i=0;i<len;i++) {
        res.items.push(SuperMap.REST.ThemeGridRangeItem.fromObj(itemsR[i]));
    }
    return res;
}
