/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {TemplateBase} from './TemplateBase';

/**
 * @class PopContainer
 * @aliasclass Components.PopContainer
 * @deprecatedclass SuperMap.Components.PopContainer
 * @classdesc 弹框组件。
 * @version 9.1.1
 * @param {Object} options - 组件配置参数。
 * @param {string} options.id - 组件 dom 元素 id。
 * @param {string} options.title - 弹框组件名称。
 * @extends {TemplateBase}
 * @category Components Common
 * @usage
 */
export class PopContainer extends TemplateBase {
    constructor(options) {
        options = options ? options : {};
        super(options);
        options.title = options.title ? options.title : "";
        this._initView(options.title);
    }

    /**
     * @private
     * @override
     */
    _initView(titile) {
        const container = document.createElement("div");
        container.setAttribute("class", "component-popcontainer");

        //header
        const header = document.createElement("div");
        header.setAttribute("class", "component-popcontainer__header");
        const title = document.createElement("label");
        title.setAttribute("class", "component-popcontainer__header__title");
        title.innerHTML = titile;
        header.appendChild(title);

        const closeBtn = document.createElement("span");
        closeBtn.setAttribute("class", "supermapol-icons-clear component-popcontainer__header__close");
        closeBtn.onclick = this.closeView.bind(this);
        container.appendChild(closeBtn);
        container.appendChild(header);

        //content
        const content = document.createElement("div");
        content.setAttribute("class", "component-popcontainer__content");
        this.content = content;

        container.appendChild(content);

        this.rootContainer = container;

    }

    /**
     * @function PopContainer.prototype.appendContent
     * @description 追加内容。
     * @param {HTMLElement} dom - 内容元素。
     */
    appendContent(dom) {
        this.content.appendChild(dom);
    }

}
