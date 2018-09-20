/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    SuperMap
} from '../../SuperMap';
import {
    PopContainer
} from './PopContainer';

export class AttributesPopContainer extends PopContainer {
    constructor(attributes) {
        super("属性");
        this.container.firstChild.hidden = true;
        this._createAttributesTable(attributes);
    }

    _createAttributesTable(attributes) {
        const table = document.createElement("table");
        table.setAttribute("class", "content-table");

        const tbody = document.createElement("tbody");

        let single = true;
        for (let name in attributes) {
            const tr = document.createElement("tr");
            if (single) {
                tr.setAttribute("class", "odd");
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

SuperMap.Widgets.AttributesPopContainer = AttributesPopContainer;