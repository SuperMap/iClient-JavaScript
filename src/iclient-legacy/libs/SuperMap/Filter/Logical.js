/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Filter.js
 */

/**
 * Class: SuperMap.Filter.Logical
 * 这个类表示ogc标准的 ogc:And, ogc:Or 和 ogc:Not 等规则。
 * 
 * Inherits from:
 * - <SuperMap.Filter>
 */
SuperMap.Filter.Logical = SuperMap.Class(SuperMap.Filter, {

    /**
     * APIProperty: filters
     * {Array(<SuperMap.Filter>)} 这个过滤器的子过滤器数组。
     */
    filters: null, 
     
    /**
     * APIProperty: type
     * {String} 逻辑操作符的类型。
     *
     * 可用的类型是:
     * - SuperMap.Filter.Logical.AND = "&&";
     * - SuperMap.Filter.Logical.OR  = "||";
     * - SuperMap.Filter.Logical.NOT = "!";
     */
    type: null,

    /** 
     * Constructor: SuperMap.Filter.Logical
     * 创建一个逻辑过滤器 (And, Or, Not) 。
     *
     * Parameters:
     * options - {Object} 可选的对象，该对象的属性会被设置给过滤器对象。
     * 
     * Returns:
     * {<SuperMap.Filter.Logical>}
     */
    initialize: function(options) {
        this.filters = [];
        SuperMap.Filter.prototype.initialize.apply(this, [options]);
    },
    
    /** 
     * APIMethod: destroy
     * 移除对子类过滤器的引用。
     */
    destroy: function() {
        this.filters = null;
        SuperMap.Filter.prototype.destroy.apply(this);
    },

    /**
     * APIMethod: evaluate
     * 根据给定环境确定过滤与否。
     * 
     * Parameters:
     * context - {Object} 用于确定过滤与否的给定环境。  提供一个矢量要素，通过
     *     比较过滤器比较要素属性，或用空间过滤器筛选几何图形。
     * 
     * Returns:
     * {Boolean} 返回是否过滤。true：不过滤，false：被过滤掉。
     */
    evaluate: function(context) {
        var i, len;
        switch(this.type) {
            case SuperMap.Filter.Logical.AND:
                for (i=0, len=this.filters.length; i<len; i++) {
                    if (this.filters[i].evaluate(context) == false) {
                        return false;
                    }
                }
                return true;
                
            case SuperMap.Filter.Logical.OR:
                for (i=0, len=this.filters.length; i<len; i++) {
                    if (this.filters[i].evaluate(context) == true) {
                        return true;
                    }
                }
                return false;
            
            case SuperMap.Filter.Logical.NOT:
                return (!this.filters[0].evaluate(context));
        }
        return undefined;
    },
    
    /**
     * APIMethod: clone
     * 复制过滤器。
     * 
     * Returns:
     * {<SuperMap.Filter.Logical>} 过滤器的副本。
     */
    clone: function() {
        var filters = [];        
        for(var i=0, len=this.filters.length; i<len; ++i) {
            filters.push(this.filters[i].clone());
        }
        return new SuperMap.Filter.Logical({
            type: this.type,
            filters: filters
        });
    },
    
    CLASS_NAME: "SuperMap.Filter.Logical"
});


SuperMap.Filter.Logical.AND = "&&";
SuperMap.Filter.Logical.OR  = "||";
SuperMap.Filter.Logical.NOT = "!";
