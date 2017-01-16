/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.ThemeOffset
 * 专题图中文本或符号相对于要素内点的偏移量设置类。
 * 通过该类可以设置专题图中标记文本或符号的偏移量以及偏移量是否随地图缩放而改变。
 */
SuperMap.REST.ThemeOffset = SuperMap.Class({
    
    /** 
     * APIProperty: offsetFixed
     * {Boolean} 当前专题图是否固定标记文本或符号的偏移量。所谓固定偏移量，则文本或符号的偏移量不随地图的缩放而变化。默认为 false，表示偏移量随地图的缩放而变化。
     */
    offsetFixed: false,
    
    /** 
     * APIProperty: offsetX
     * {String} 专题图中文本或符号相对于要素内点的水平偏移量。偏移量的单位为地图单位。
     * 该偏移量的值为一个常量值或者字段表达式所表示的值，即如果字段表达式为 SmID，其中 SmID = 2，那么水平偏移量为2。
     */
    offsetX: "0.0",
    
    /** 
     * APIProperty: offsetY
     * {String} 专题图中文本或符号相对于要素内点的垂直偏移量。偏移量的单位为地图单位。
     * 该偏移量的值为一个常量值或者字段表达式所表示的值，即如果字段表达式为 SmID，其中 SmID = 2，那么垂直偏移量为2。
     */    
    offsetY: "0.0",
    /**
     * Constructor: SuperMap.REST.ThemeOffset 
     * 专题图中文本或符号相对于要素内点的偏移量设置类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * offsetFixed - {Boolean} 当前专题图是否固定标记文本或符号的偏移量。
     * offsetX - {String} 专题图中文本或符号相对于要素内点的水平偏移量。
     * offsetY - {String} 专题图中文本或符号相对于要素内点的垂直偏移量。
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
        me.offsetFixed = null;
        me.offsetX = null;
        me.offsetY = null;
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeOffset"
});
SuperMap.REST.ThemeOffset.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeOffset();
    SuperMap.Util.copy(res, obj);
    return res;
}
