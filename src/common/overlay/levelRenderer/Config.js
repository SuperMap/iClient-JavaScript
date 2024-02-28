/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
export class Config {

}
/**
 * @enum EVENT
 * @description 事件
 * @type {Object}
 * @private 
 */
Config.EVENT = {
    //窗口大小变化
    RESIZE: 'resize',

    //鼠标按钮被（手指）按下，事件对象是：目标图形元素或空
    CLICK: 'click',

    //双击事件
    DBLCLICK: 'dblclick',

    //鼠标滚轮变化，事件对象是：目标图形元素或空
    MOUSEWHEEL: 'mousewheel',

    //鼠标（手指）被移动，事件对象是：目标图形元素或空
    MOUSEMOVE: 'mousemove',

    //鼠标移到某图形元素之上，事件对象是：目标图形元素
    MOUSEOVER: 'mouseover',

    //鼠标从某图形元素移开，事件对象是：目标图形元素
    MOUSEOUT: 'mouseout',

    //鼠标按钮（手指）被按下，事件对象是：目标图形元素或空
    MOUSEDOWN: 'mousedown',

    //鼠标按键（手指）被松开，事件对象是：目标图形元素或空
    MOUSEUP: 'mouseup',

    //全局离开，MOUSEOUT触发比较频繁，一次离开优化绑定
    GLOBALOUT: 'globalout',

    // 一次成功元素拖拽的行为事件过程是：
    // dragstart > dragenter > dragover [> dragleave] > drop > dragend

    //开始拖拽时触发，事件对象是：被拖拽图形元素
    DRAGSTART: 'dragstart',

    //拖拽完毕时触发（在drop之后触发），事件对象是：被拖拽图形元素
    DRAGEND: 'dragend',

    //拖拽图形元素进入目标图形元素时触发，事件对象是：目标图形元素
    DRAGENTER: 'dragenter',

    //拖拽图形元素在目标图形元素上移动时触发，事件对象是：目标图形元素
    DRAGOVER: 'dragover',

    //拖拽图形元素离开目标图形元素时触发，事件对象是：目标图形元素
    DRAGLEAVE: 'dragleave',

    //拖拽图形元素放在目标图形元素内时触发，事件对象是：目标图形元素
    DROP: 'drop',

    //touch end - start < delay is click
    touchClickDelay: 300
};

/**
 * @enum catchBrushException
 * @description 是否异常捕获
 * @type {boolean}
 * @private 
 */
Config.catchBrushException = false;

/**
 * @enum debugMode
 * @description debug 日志选项：catchBrushException 为 true 下有效。
 * 0 : 不生成debug数据，发布用
 * 1 : 异常抛出，调试用
 * 2 : 控制台输出，调试用
 * @type {boolean}
 * @private 
 */
Config.debugMode = 0;