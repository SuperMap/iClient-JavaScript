/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {PopContainer} from './PopContainer';

/**
 * @class AttributesPopContainer
 * @aliasclass Components.AttributesPopContainer
 * @deprecatedclass SuperMap.Components.AttributesPopContainer
 * @classdesc 属性弹框组件
 * @version 9.1.1
 * @param {Object} options - 组件配置参数。
 * @param {string} options.id - 组件 dom 元素 id。
 * @param {Object} options.title - 属性弹框组件名称。
 * @param {Object} options.attributes - 组件需要显示的属性内容。
 * @extends {PopContainer}
 * @category Components Common
 * @usage
 */
export class AttributesPopContainer extends PopContainer {
    constructor(options) {
        //默认为属性：
        options.title = options.title ? options.title : "属性";

        super(options);
        this.rootContainer.firstChild.hidden = true;
        options.attributes = options.attributes ? options.attributes : [];
        this._createAttributesTable(options.attributes);
    }

    _createAttributesTable(attributes) {
        const table = document.createElement("table");
        table.setAttribute("class", "component-popcontainer__content__table");

        const tbody = document.createElement("tbody");

        let single = true;
        for (let name in attributes) {
            const tr = document.createElement("tr");
            if (single) {
                tr.setAttribute("class", "component-popcontainer__content__td--color");
            }
            const title = document.createElement("td");
            const titleSpan = document.createElement("Span");
            titleSpan.innerHTML = name;
            title.appendChild(titleSpan);
            const value = document.createElement("td");
            value.innerHTML = attributes[name];

            tr.appendChild(title);
            tr.appendChild(value);
            tbody.appendChild(tr);
            single = !single;
        }
        table.appendChild(tbody);

        this.appendContent(table);
    }
}
