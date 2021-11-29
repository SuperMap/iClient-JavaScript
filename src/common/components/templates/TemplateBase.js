/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class TemplateBase
 * @deprecatedclass SuperMap.Components.TemplateBase
 * @classdesc 组件公用组件父类，用于约束统一封装的公用组件结构。
 * @version 9.1.1
 * @param {Object} options - 组件配置参数。
 * @param {string} options.id - 组件 dom 元素 id。
 * @category Components Common
 * @usage
 */
export class TemplateBase {
    constructor(options) {
        options = options ? options : {};
        /**
         * @member {string} [TemplateBase.prototype.id=null]
         * @description  组件 dom 元素 id。
         */
        this.id = options.id ? options.id : null;

        /**
         * @member {Element} [TemplateBase.prototype.rootContainer=null]
         * @description  组件 dom 元素对象。
         */
        this.rootContainer = null;
    }

    /**
     * @function TemplateBase.prototype.getElement
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
     * @function TemplateBase.prototype._initView
     * @private
     * @description 初始化模板。
     */
    _initView() {
        //子类实现此方法
    }

    /**
     * @function TemplateBase.prototype.showView
     * @description 显示组件。
     */
    showView() {
        this.rootContainer.hidden = false;
    }

    /**
     * @function TemplateBase.prototype.closeView
     * @description 隐藏组件。
     */
    closeView() {
        this.rootContainer.hidden = true;
    }
}
