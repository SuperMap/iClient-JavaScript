/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Feature.ShapeParameters
 * 图形参数基类，此类不可实例化
 */
SuperMap.Feature.ShapeParameters = SuperMap.Class({

    /**
     * APIProperty: refOriginalPosition
     * {Array} 图形参考原点位置，图形的参考中心位置。
     * refOriginalPosition 是长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
     *
     * refOriginalPosition 表示图形的参考中心，通常情况下，图形是使用 canvas 的原点位置作为位置参考，
     * 但 refOriginalPosition 可以改变图形的参考位置，例如： refOriginalPosition = [80, 80],
     * 图形圆的 style.x = 20, style.y = 20，那么圆在 canvas 中的实际位置是 [100, 100]。
     *
     * 图形（Shape） 的所有位置相关属性都是以 refOriginalPosition 为参考中心，
     * 也就是说图形的所有位置信息在 canvas 中都是以 refOriginalPosition 为参考的相对位置，只有
     * refOriginalPosition 的值为 [0, 0] 时，图形的位置信息才是 canvas 绝对位置。
     *
     * 图形的位置信息通常有：style.pointList，style.x，style.y。
     *
     * refOriginalPosition。默认值是： [0, 0]。
     */
    refOriginalPosition: null,

    /**
     * APIProperty: refDataID
     * {String} 图形所关联数据的 ID （ <SuperMap.Feature.Vector> 的 id ）。
     */
    refDataID: null,

    /**
     * APIProperty: isHoverByRefDataID
     * {Boolean} 是否根据 refDataID 进行高亮。用于同时高亮所有 refDataID 相同的图形。
     */
    isHoverByRefDataID: false,

    /**
     * APIProperty: refDataHoverGroup
     * {String} 高亮图形组的组名。此属性在 refDataID 有效且 isHoverByRefDataID 为 true 时生效。
     * 一旦设置此属性，且属性值有效，只有关联同一个数据的图形且此属性相同的图形才会高亮。
     */
    refDataHoverGroup: null,

    /**
     * APIProperty: dataInfo
     * {Object} 图形携带的附加数据。
     */
    dataInfo: null,

    /**
     * APIProperty: clickable
     * {Boolean} 是否可点击。
     */
    clickable: true,

    /**
     * APIProperty: hoverable
     * {Boolean} 是否可 hover。
     */
    hoverable: true,

    /**
     * Property: style。
     * {Object} 图形样式对象，可设样式属性在子类中确定。
     */
    style: null,

    /**
     * Property: highlightStyle
     * {Object} 高亮样式对象，可设样式属性与 style 的可设样式属性相同。
     */
    highlightStyle: null,

    /**
     * Constructor: SuperMap.Feature.ShapeParameters
     * 图形参数对象。
     *
     * Returns:
     * {Object} 图形参数对象。
     */
    initialize: function() {
        this.refOriginalPosition = [0, 0];
        this.highlightStyle = {};
    },

    /**
     * APIMethod: destroy
     * 销毁对象。
     */
    destroy: function() {
        this.refOriginalPosition = null;
        this.refDataID = null;
        this.isHoverByRefDataID = null;
        this.refDataHoverGroup = null;
        this.dataInfo = null;
        this.clickable = null;
        this.hoverable = null;
        this.style = null;
        this.highlightStyle = null;
    },

    CLASS_NAME: "SuperMap.Feature.ShapeParameters"
});
