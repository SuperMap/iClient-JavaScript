/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Tool.Event
 * LevelRenderer 工具-事件辅助类
 *
 */
SuperMap.LevelRenderer.Tool.Event = SuperMap.Class({

    /**
     * Property: stop
     * {Function} 停止冒泡和阻止默认行为
     */
    stop: null,

    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Event
     * 构造函数。
     *
     */
    initialize: function() {
        this.stop = typeof window.addEventListener === 'function'
            ? function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.cancelBubble = true;
        }
            : function (e) {
            e.returnValue = false;
            e.cancelBubble = true;
        };
    },

    /**
     * APIMethod: getX
     * 提取鼠标（手指）x坐标。
     *
     * Parameters:
     * e - {Event} 事件。
     *
     * Returns:
     * {Number} 鼠标（手指）x坐标。
     */
    getX: function(e){
        return typeof e.zrenderX != 'undefined' && e.zrenderX
            || typeof e.offsetX != 'undefined' && e.offsetX
            || typeof e.layerX != 'undefined' && e.layerX
            || typeof e.clientX != 'undefined' && e.clientX;
    },

    /**
     * APIMethod: getY
     * 提取鼠标y坐标。
     *
     * Parameters:
     * e - {Event} 事件。
     *
     * Returns:
     * {Number} 鼠标（手指）y坐标。
     */
    getY: function(e){
        return typeof e.zrenderY != 'undefined' && e.zrenderY
            || typeof e.offsetY != 'undefined' && e.offsetY
            || typeof e.layerY != 'undefined' && e.layerY
            || typeof e.clientY != 'undefined' && e.clientY;
    },

    /**
     * APIMethod: getDelta
     * 提取鼠标滚轮变化。
     *
     * Parameters:
     * e - {Event} 事件。
     *
     * Returns:
     * {Number} 滚轮变化，正值说明滚轮是向上滚动，如果是负值说明滚轮是向下滚动。
     */
    getDelta: function(e){
        return typeof e.zrenderDelta != 'undefined' && e.zrenderDelta
            || typeof e.wheelDelta != 'undefined' && e.wheelDelta
            || typeof e.detail != 'undefined' && -e.detail;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Tool.Event"
});