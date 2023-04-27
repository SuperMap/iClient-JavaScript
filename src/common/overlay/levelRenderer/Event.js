/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @class  LevelRenderer.Tool.Event
 * @category Visualization Theme
 * @classdesc LevelRenderer 工具-事件辅助类
 * @private
 */
export class Event {
    constructor() {
        /**
         * @member {function} LevelRenderer.Tool.Event.prototype.stop
         * @description 停止冒泡和阻止默认行为
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
     * @function LevelRenderer.Tool.Event.prototype.getX
     * @description 提取鼠标（手指）x坐标。
     * @param {Event} e - 事件。
     * @returns {number} 鼠标（手指）x坐标。
     */
    getX(e) {
        return typeof e.zrenderX != 'undefined' && e.zrenderX
            || typeof e.offsetX != 'undefined' && e.offsetX
            || typeof e.layerX != 'undefined' && e.layerX
            || typeof e.clientX != 'undefined' && e.clientX;
    }


    /**
     * @function LevelRenderer.Tool.Event.prototype.getY
     * @description 提取鼠标（手指）y坐标。
     * @param {Event} e - 事件。
     * @returns {number} 鼠标（手指）y坐标。
     */
    getY(e) {
        return typeof e.zrenderY != 'undefined' && e.zrenderY
            || typeof e.offsetY != 'undefined' && e.offsetY
            || typeof e.layerY != 'undefined' && e.layerY
            || typeof e.clientY != 'undefined' && e.clientY;
    }


    /**
     * @function LevelRenderer.Tool.Event.prototype.getDelta
     * @description 提取鼠标滚轮变化。
     * @param {Event} e - 事件。
     * @returns {number} 滚轮变化，正值说明滚轮是向上滚动，如果是负值说明滚轮是向下滚动。
     */
    getDelta(e) {
        return typeof e.zrenderDelta != 'undefined' && e.zrenderDelta
            || typeof e.wheelDelta != 'undefined' && e.wheelDelta
            || typeof e.detail != 'undefined' && -e.detail;
    }
}
