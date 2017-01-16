/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/Style.js
 */

/**
 * Class: SuperMap.Filter
 * 这个类代表一个OGC过滤器。
 */
SuperMap.Filter = SuperMap.Class({
    
    /** 
     * Constructor: SuperMap.Filter
     * 这个类代表一个通用过滤器。
     *
     * Parameters:
     * options - {Object} 可选的对象,该对象的属性会被设置给实例对象。
     * 
     * Returns:
     * {<SuperMap.Filter>}
     */
    initialize: function(options) {
        SuperMap.Util.extend(this, options);
    },

    /** 
     * APIMethod: destroy
     * 移除添加的所有引用。
     */
    destroy: function() {
    },

    /**
     * APIMethod: evaluate
     * 根据给定环境确定过滤与否。
     * 推荐使用实例或子类覆盖这个方法。
     * 
     * Parameters:
     * context - {Object} 用于确定过滤与否的给定环境。如果提供一个矢量要素
     *      feature，则 feature.attributes 将会被用做给定环境。
     * 
     * Returns:
     * {Boolean} 返回是否过滤。true：不过滤，false：被过滤掉。
     */
    evaluate: function(context) {
        return true;
    },
    
    /**
     * APIMethod: clone
     * 复制这个过滤器。他应该通过子类实现。
     * 
     * Returns:
     * {<SuperMap.Filter>} 复制的新的过滤器。
     */
    clone: function() {
        return null;
    },
    
    /**
     * APIMethod: toString
     *
     * Returns:
     * {String} 将 <SuperMap.Format.CQL> 引入到你的工程，用来从过滤器返回
     *     一个以CQL方式表示的字符串。否则"[Object object]" 将会被返回。
     */
    toString: function() {
        var string;
        if (SuperMap.Format && SuperMap.Format.CQL) {
            string = SuperMap.Format.CQL.prototype.write(this);
        } else {
            string = Object.prototype.toString.call(this);
        }
        return string;
    },
    
    CLASS_NAME: "SuperMap.Filter"
});
