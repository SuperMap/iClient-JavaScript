/**
 * Class: BufferSetting
 * 缓冲区分析通用设置类
 */

require('./BufferDistance');
SuperMap.BufferSetting = SuperMap.Class({

    /**
     * APIProperty: endType
     * {<SuperMap.BufferEndType>} 缓冲区端点枚举值。
     * 分为平头和圆头两种，默认为平头，即 SuperMap.BufferEndType.FLAT 。
     */
    endType: SuperMap.BufferEndType.FLAT,

    /**
     * APIProperty: leftDistance
     * {<BufferDistance>} 左侧缓冲距离。
     * 默认为100。当为GeometryBufferAnalyst时，单位为默认地图的投影系的单位（如3857为米，4326为度），
     * 当为DatasetBufferAnalyst时，单位通过BufferSetting.radiusUnit设置（默认全部为米）。
     */
    leftDistance: null,

    /**
     * APIProperty: rightDistance
     * {<BufferDistance>} 右侧缓冲距离。
     * 默认为100。当为GeometryBufferAnalyst时，单位为默认地图的投影系的单位（如3857为米，4326为度），
     * 当为DatasetBufferAnalyst时，单位通过BufferSetting.radiusUnit设置（默认全部为米）。
     */
    rightDistance: null,

    /**
     * APIProperty: semicircleLineSegment
     * {Number} 圆头缓冲圆弧处线段的个数。
     * 即用多少个线段来模拟一个半圆，默认值为4。
     */
    semicircleLineSegment: 4,

    /**
     * APIProperty: radiusUnit
     * [Enum] 缓冲半径单位，默认值为SuperMap.Unit.METER，还可以是SuperMap.Unit.MILIMETER、
     * SuperMap.Unit.CENTIMETER、SuperMap.Unit.DECIMETER、SuperMap.Unit.KILOMETER、
     * SuperMap.Unit.FOOT、SuperMap.Unit.INCH、SuperMap.Unit.MILE、
     * SuperMap.Unit.YARD。仅对DatasetBufferAnalyst有效
     */
    radiusUnit: SuperMap.Unit.METER,

    /**
     * Constructor: BufferSetting
     * 缓冲区分析通用设置类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * endType - {<SuperMap.BufferEndType>} 缓冲区端点枚举值。
     * leftDistance - {<BufferDistance>} 左侧缓冲距离。
     * rightDistance - {<BufferDistance>} 右侧缓冲距离。
     * semicircleLineSegment - {Number} 圆头缓冲圆弧处线段的个数。
     */
    initialize: function (options) {
        var me = this;
        me.leftDistance = new SuperMap.BufferDistance();
        me.rightDistance = new SuperMap.BufferDistance();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.endType = null;
        if (me.leftDistance) {
            me.leftDistance.destroy();
            me.leftDistance = null;
        }
        if (me.rightDistance) {
            me.rightDistance.destroy();
            me.rightDistance = null;
        }
        me.semicircleLineSegment = null;
        me.radiusUnit = null;
    },

    CLASS_NAME: "SuperMap.BufferSetting"
});

module.exports = function (options) {
    return new SuperMap.BufferSetting(options);
};