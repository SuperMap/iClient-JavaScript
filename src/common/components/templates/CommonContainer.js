/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {TemplateBase} from './TemplateBase';

/**
 * @class SuperMap.Components.CommonContainer
 * @classdesc 组件统一外框。
 * @version 9.1.1
 * @param {Object} options - 组件可选参数。
 * @param {string} options.id - 组件 dom 元素 id。
 * @param {string} options.title - 标题。
 * @category Components Common
 * @extends {SuperMap.Components.TemplateBase}
 */
export class CommonContainer extends TemplateBase {
    constructor(options) {
        super(options);
        let title = options.title ? options.title : "";
        this._initView(title);
    }

    /**
     * @private
     * @override
     */
    _initView(title) {
        const container = document.createElement("div");
        container.setAttribute("class", "component-container");

        //title
        const titleContainer = document.createElement("div");
        titleContainer.setAttribute("class", "component-title");
        const titleContent = document.createElement("div");
        titleContent.innerHTML = title;
        titleContainer.appendChild(titleContent);
        container.appendChild(titleContainer);
        //container
        const componentContent = document.createElement("div");
        componentContent.setAttribute("class", "component-content");
        container.appendChild(componentContent);
        this.content = componentContent;

        this.rootContainer = container;
        return container;
    }

    /**
     * @function SuperMap.Components.CommonContainer.prototype.getContentElement
     * @description 获取内容元素容器
     */
    getContentElement() {
        return this.content;
    }

    /**
     * @function SuperMap.Components.CommonContainer.prototype.appendContent
     * @description 填充内容元素
     */
    appendContent(element) {
        this.content.appendChild(element);
    }
}
