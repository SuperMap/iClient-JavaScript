/**
 * @private
 * @class  SuperMap.LevelRenderer.Tool.Event
 * @category Visualization Theme
 * LevelRenderer 工具-事件辅助类
 *
 */
export class Event {


    /**
     * Constructor: SuperMap.LevelRenderer.Tool.Event
     * 构造函数。
     *
     */
    constructor() {
        /**
         * Property: stop
         * {Function} 停止冒泡和阻止默认行为
         */
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

        this.CLASS_NAME = "SuperMap.LevelRenderer.Tool.Event";
    }


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
    getX(e) {
        return typeof e.zrenderX != 'undefined' && e.zrenderX
            || typeof e.offsetX != 'undefined' && e.offsetX
            || typeof e.layerX != 'undefined' && e.layerX
            || typeof e.clientX != 'undefined' && e.clientX;
    }


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
    getY(e) {
        return typeof e.zrenderY != 'undefined' && e.zrenderY
            || typeof e.offsetY != 'undefined' && e.offsetY
            || typeof e.layerY != 'undefined' && e.layerY
            || typeof e.clientY != 'undefined' && e.clientY;
    }


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
    getDelta(e) {
        return typeof e.zrenderDelta != 'undefined' && e.zrenderDelta
            || typeof e.wheelDelta != 'undefined' && e.wheelDelta
            || typeof e.detail != 'undefined' && -e.detail;
    }
}