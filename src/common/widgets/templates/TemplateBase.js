/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';

/**
 * @class SuperMap.Widgets.TemplateBase
 * @classdesc 组件公用组件父类，用于约束统一封装的公用组件结构。
 * @version 9.1.1
 * @param {Object} options - 组件配置参数。
 * @param {string} options.id - 组件 dom 元素 id。
 * @category Components Common
 */
export class TemplateBase {
    constructor(options) {
        options = options ? options : {};
        /**
         * @member {string} [SuperMap.Widgets.TemplateBase.prototype.id=null]
         * @description  组件 dom 元素 id。
         */
        this.id = options.id ? options.id : null;

        /**
         * @member {Element} [SuperMap.Widgets.TemplateBase.prototype.rootContainer=null]
         * @description  组件 dom 元素对象。
         */
        this.rootContainer = null;
    }

    /**
     * @function SuperMap.Widgets.TemplateBase.prototype.getElement
     * @description 获取当前组件元素对象。
     * @return {Element}
     */
    getElement() {
        //todo 其实感觉再这里给组件设置不太合理
        if (this.id) {
            this.rootContainer.id = this.id;
        }

        return this.rootContainer;
    }

    /**
     * @function SuperMap.Widgets.TemplateBase.prototype._initView
     * @private
     * @description 初始化模板。
     */
    _initView() {
        //子类实现此方法
    }

    /**
     * @function SuperMap.Widgets.TemplateBase.prototype.showView
     * @description 显示组件。
     */
    showView() {
        this.rootContainer.hidden = false;
    }

    /**
     * @function SuperMap.Widgets.TemplateBase.prototype.closeView
     * @description 隐藏组件。
     */
    closeView() {
        this.rootContainer.hidden = true;
    }
}

SuperMap.Widgets.TemplateBase = TemplateBase;