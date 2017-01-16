/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Symbolizer
 * 用于要素渲染的样式基类。
 */
SuperMap.Symbolizer = SuperMap.Class({
    

    /**
     * APIProperty: zIndex
     * {Number} zIndex值决定了一个符号的渲染次序，那些具有较大zIndex值的符号渲染在
	 *          那些具有较小zIndex值的上面。默认为0。
     */
    zIndex: 0,
    
    /**
     * Constructor: SuperMap.Symbolizer
     * 构造函数。该类的实例是没有用处的，参见子类的实例。
     *
     * Parameters:
     * config - {Object} 属性设置对象，其属性会被设置到当前样式对象上。样式的任何内部属性都可以通过构造函数来设置。
     *
     * Returns:
     * 新的样式对象。
     */
    initialize: function(config) {
        SuperMap.Util.extend(this, config);
    },
    
    /** 
     * APIMethod: clone
     * 创建样式的副本。
     *
     * 返回具有相同属性的同类型的样式。
     */
    clone: function() {
        var Type = eval(this.CLASS_NAME);
        return new Type(SuperMap.Util.extend({}, this));
    },
    
    CLASS_NAME: "SuperMap.Symbolizer"
    
});

