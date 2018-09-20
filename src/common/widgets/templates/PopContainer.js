/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';

export class PopContainer {
    constructor(title) {
        this._initView(title);
    }

    _initView(titile) {
        const container = document.createElement("div");
        container.setAttribute("class", "widgets-pop-container");

        //header
        const header = document.createElement("div");
        header.setAttribute("class", "widgets-pop-header");
        const title = document.createElement("label");
        title.setAttribute("class", "widgets-pop-titlename");
        title.innerHTML = titile;
        header.appendChild(title);

        const closeBtn = document.createElement("span");
        closeBtn.setAttribute("class", "supermapol-icons-clear widgets-pop-close");
        closeBtn.onclick = this.closeView.bind(this);
        container.appendChild(closeBtn);
        container.appendChild(header);

        //content
        const content = document.createElement("div");
        content.setAttribute("class", "widgets-pop-content");
        this.content = content;

        container.appendChild(content);

        this.container = container;

    }

    getElement() {
        return this.container;
    }

    appendContent(dom) {
        this.content.appendChild(dom);
    }

    showView() {
        this.container.hidden = false;
    }

    closeView() {
        this.container.hidden = true;
    }
}

SuperMap.Widgets.PopContainer = PopContainer;