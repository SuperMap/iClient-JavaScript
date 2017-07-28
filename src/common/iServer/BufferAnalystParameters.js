var SuperMap = require('../SuperMap');
var BufferSetting = require('./BufferSetting');
SuperMap.BufferAnalystParameters = SuperMap.Class({
    /**
     * @class SuperMap.BufferAnalystParameters
     * @constructs SuperMap.BufferAnalystParameters
     * @classdesc
     * 缓冲区分析参数基类。
     * @api
     */

    /**
     * APIProperty: bufferSetting
     * {<SuperMap.BufferSetting>} 设置缓冲区通用参数。
     * 为缓冲区分析提供必要的参数信息，包括左缓冲距离、右缓冲距离、端点类型、圆头缓冲圆弧处线段的个数信息。
     */
    bufferSetting: null,

    /**
     * @method SuperMap.BufferAnalystParameters.initialize
     * @param options - {Object} 参数。
     * Allowed options properties:<br>
     * bufferSetting - {SuperMap.BufferSetting} 设置缓冲区通用参数。
     */
    initialize: function (options) {
        var me = this;
        me.bufferSetting = new BufferSetting();
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
        if (me.bufferSetting) {
            me.bufferSetting.destroy();
            me.bufferSetting = null;
        }
    },

    CLASS_NAME: "SuperMap.BufferAnalystParameters"
});

module.exports = SuperMap.BufferAnalystParameters;