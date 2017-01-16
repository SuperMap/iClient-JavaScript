/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Size
 * 此类描绘一对高宽值的实例。
 */
SuperMap.Size = SuperMap.Class({

    /**
     * APIProperty: w
     * {Number} 宽，默认值为0.0
     */
    w: 0.0,
    
    /**
     * APIProperty: h
     * {Number} 高，默认值为0.0
     */
    h: 0.0,


    /**
     * Constructor: SuperMap.Size
     * 创建Size实例。
     *
     * 例如:
     * (start code)	 
     * var size = new SuperMap.Size(31,46);
     * (end)
     * 	 
     * Parameters:
     * w - {Number} 宽度，默认值为0.0
     * h - {Number} 高度 ，默认值为0.0
     */
    initialize: function(w, h) {
        this.w = w?parseFloat(w):this.w;
        this.h = w?parseFloat(h):this.h;
    },

    /**
     * APIMethod: toString
     * 返回此对象的字符串形式
     *
     * 例如:
     * (start code)
     * var size = new SuperMap.Size(10,5);
     * var str = size.toString();
     * (end)
     *
     * Returns:
     * {String} 例如："w=10,h=5"
     */
    toString:function() {
        return ("w=" + this.w + ",h=" + this.h);
    },

    /**
     * APIMethod: clone
     * 克隆当前size对象.
     *
     * 例如:
     * (start code)
     * var size = new SuperMap.Size(31,46);
     * var size2 = size.clone();
     * (end)
     *
     * Returns:
     * {<SuperMap.Size>}  返回一个新的与当前size对象有相同宽、高的Size对象。
     */
    clone:function() {
        return new SuperMap.Size(this.w, this.h);
    },

    /**
     *
     * APIMethod: equals
     * 比较两个size对象是否相等。
     *
     * 例如:
     * (start code)
     * var size = new SuperMap.Size(31,46);
     * var size2 = new SuperMap.Size(31,46);
     * var isEquals = size.equals(size2);
     * (end)
     *
     * Parameters:
     * sz - {<SuperMap.Size>} 用于比较相等的Size对象。
     *
     * Returns: 
     * {Boolean} 传入的size和当前size高宽相等，注意：如果传入的size为空则返回false
     *
     */
    equals:function(sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w === sz.w && this.h === sz.h) ||
                      (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)));
        }
        return equals;
    },
    /**
     *
     * APIMethod: destroy
     * 销毁此对象。
     * 销毁后此对象的所有属性为null，而不是初始值。
     *
     * 例如:
     * (start code)
     * var size = new SuperMap.Size(31,46);
     * size.destroy();
     * (end)
     *
     */
    destroy: function() {
        this.w = null;
        this.h = null;
    },

    CLASS_NAME: "SuperMap.Size"
});
