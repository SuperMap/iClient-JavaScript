var SuperMap = require('../SuperMap');
SuperMap.BufferDistance = SuperMap.Class({
    /**
     * @class SuperMap.BufferDistance
     * @constructs SuperMap.BufferDistance
     * @classdesc
     * 缓冲区分析的缓冲距离类
     * 通过该类可以设置缓冲区分析的缓冲距离，距离可以是数值也可以是数值型的字段表达式。
     * @api
     */

    /**
     * APIProperty: exp
     * {String} 以数值型的字段表达式作为缓冲区分析的距离值。
     */
    exp: null,

    /**
     * APIProperty: value
     * {Number} 以数值作为缓冲区分析的距离值。默认为100，单位：米。
     */
    value: 100,

    /**
     * @method SuperMap.BufferDistance.initialize
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * exp - {String} 以数值型的字段表达式作为缓冲区分析的距离值。</br>
     * value - {Number} 以数值作为缓冲区分析的距离值。默认为100，单位：米。</br>
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.exp = null;
        me.value = null;
    },

    CLASS_NAME: "SuperMap.BufferDistance"
});

module.exports = SuperMap.BufferDistance;