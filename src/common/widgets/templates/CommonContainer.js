/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import {SuperMap} from '../../SuperMap';

/**
 * @class SuperMap.Widgets.CommonContainer
 * @classdesc 微件统一外框。
 * @param {string} title - 标题。
 * @param {Object} position - 设置外框绝对位置，包括上下左右：{"top":"5px","bottom":"5px","left":"5px","right":"5px"}
 * @category Widgets Common
 */
export class CommonContainer {
    constructor(title, position = null) {
        this._initContainer(title, position);
    }

    _initContainer(title, position) {
        const container = document.createElement("div");
        container.setAttribute("class", "widget-container");
        this.container = container;
        if (position) {
            this.setContainerPosition(position);
        }
        //title
        const titleContainer = document.createElement("div");
        titleContainer.setAttribute("class", "widget-title");
        const titleContent = document.createElement("div");
        titleContent.innerHTML = title;
        titleContainer.appendChild(titleContent);
        container.appendChild(titleContainer);
        //container
        const widgetContent = document.createElement("div");
        widgetContent.setAttribute("class", "widget-content-container");
        container.appendChild(widgetContent);
        this.content = widgetContent;

        return container;
    }

    /**
     * @function SuperMap.Widgets.CommonContainer.prototype.getElement
     * @description 改变容器绝对位置
     */
    setContainerPosition(position) {
        for (let name in position) {
            this.container.style[name] = position[name];
        }
    }

    /**
     * @function SuperMap.Widgets.CommonContainer.prototype.getElement
     * @description 获取当前模板 Dom 元素
     */
    getElement() {
        return this.container;
    }

    /**
     * @function SuperMap.Widgets.CommonContainer.prototype.getContentElement
     * @description 获取内容元素容器
     */
    getContentElement() {
        return this.content;
    }

    /**
     * @function SuperMap.Widgets.CommonContainer.prototype.appendContent
     * @description 填充内容元素
     */
    appendContent(element) {
        this.content.appendChild(element);
    }
}

SuperMap.Widgets.CommonContainer = CommonContainer;