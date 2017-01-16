/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerTextStyle.js
 */

/**
 * Class: SuperMap.REST.ThemeLabelItem
 * 分段标签专题图的子项。
 * 标签专题图用专题值对点、线、面等对象做标注，值得注意的是，分段标签专题图允许用户通过 rangeExpression 
 * 字段指定用于分段的数值型字段，同一范围段内的标签具有相同的显示风格，其中每一个范围段就是一个专题图子项，
 * 每一个子项都具有其名称、风格、起始值和终止值。注意：每个分段所表示的范围为 [Start, End)。例如：标签专题图的分段点有两个子项，
 * 他们所代表的分段区间分别为[0,5)，[5,10)。那么需要分别设置 ThemeLabelItem[0].start=0，
 * ThemeLabelItem[0].end=5，ThemeLabelItem[1].start=5，ThemeLabelItem[1].end=10。
 */
SuperMap.REST.ThemeLabelItem = SuperMap.Class({
    
    /** 
     * APIProperty: caption
     * {String} 标签专题子项的标题。
     */
    caption: null,
    
    /** 
     * APIProperty: end
     * {Number} 标签专题图子项的终止值。如果该子项是分段中最后一个子项，那么该终止值就是分段的最大值；
     * 如果不是最后一项，该终止值必须与其下一子项的起始值相同，否则系统抛出异常。默认为0。  
     */
    end: 0,

    /** 
     * APIProperty: start
     * {Number} 标签专题图子项的分段起始值。如果该子项是分段中第一项，那么该起始值就是分段的最小值；
     * 如果该子项的序号大于等于 1 的时候，该起始值必须与前一子项的终止值相同，否则系统会抛出异常。默认为0。  
     */
    start: 0,
    
    /** 
     * APIProperty: visible
     * {Boolean} 标签专题图子项是否可见。如果标签专题图子项可见，则为 true，否则为 false。默认值为 true。  
     */
    visible: true,
    
    /** 
     * APIProperty: style
     * {<SuperMap.REST.ServerTextStyle>} 标签专题图子项文本的显示风格。各种风格的优先级从高到低为：
     * uniformMixedStyle（标签文本的复合风格），ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。 
     */
    style: null,
    
    /**
     * Constructor: SuperMap.REST.ThemeLabelItem 
     * 分段标签专题图的子项类构造函数，用于创建 ThemeLabelItem 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * caption - {String} 专题图子项的名称。
     * end - {Number} 标签专题图子项的终止值。
     * start - {Number} 标签专题图子项的分段起始值。
     * visible - {Boolean} 标签专题图子项是否可见。
     * style - {<SuperMap.REST.ServerTextStyle>} 标签专题图子项文本的显示风格。
     */
    initialize: function(options) {
        var me = this;
        me.style = new SuperMap.REST.ServerTextStyle();
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
        me.end = null;
        me.start = null;
        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.visible = null;
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeLabelItem"
});
SuperMap.REST.ThemeLabelItem.fromObj = function(obj) {
    if(!obj) return;
    var t = new SuperMap.REST.ThemeLabelItem();
    SuperMap.Util.copy(t, obj);
    return t;
}
