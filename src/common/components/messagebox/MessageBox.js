/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';

/**
 * @class SuperMap.Components.MessageBox
 * @version 9.1.1
 * @classdesc 组件信息提示框。
 * @category Components Common
 */
export class MessageBox {

    constructor() {
        this._initView();
    }

    _initView() {
        //原生js形式
        const messageBoxContainer = document.createElement("div");
        messageBoxContainer.hidden = true;
        messageBoxContainer.setAttribute("class", "component-messageboxcontainer component-border-bottom-orange");

        //图标
        const iconContainer = document.createElement("div");
        iconContainer.setAttribute("class", "icon");
        this.icon = document.createElement("span");
        this.icon.setAttribute("class", "supermapol-icons-message-warning");
        iconContainer.appendChild(this.icon);
        messageBoxContainer.appendChild(iconContainer);

        //内容：
        const messageBox = document.createElement("div");
        messageBox.setAttribute("class", "component-messagebox");
        messageBox.innerHTML = "";
        messageBoxContainer.appendChild(messageBox);
        this.messageBox = messageBox;

        //关闭按钮
        const cancelContainer = document.createElement("div");
        cancelContainer.setAttribute("class", "component-messagebox__cancelbtncontainer");
        const cancelBtn = document.createElement("button");
        cancelBtn.setAttribute("class", "component-messagebox__cancelBtn");
        cancelBtn.innerHTML = "x";
        cancelBtn.onclick = this.closeView.bind(this);
        cancelContainer.appendChild(cancelBtn);
        messageBoxContainer.appendChild(cancelContainer);

        this.messageBoxContainer = messageBoxContainer;
        document.body.appendChild(this.messageBoxContainer);
    }

    /**
     * @function SuperMap.Components.MessageBox.prototype.closeView
     * @description 关闭提示框。
     */
    closeView() {
        this.messageBoxContainer.hidden = true;
    }

    /**
     * @function SuperMap.Components.MessageBox.prototype.showView
     * @description 显示提示框。
     * @param {string} message - 提示框显示内容。
     * @param {string}[type="warring"] 提示框类型，如 "warring", "failure", "success"。
     */
    showView(message, type = 'warring') {
        //设置提示框的样式：
        if (type === "success") {
            this.icon.setAttribute("class", "supermapol-icons-message-success");
            this.messageBoxContainer.setAttribute("class", "component-messageboxcontainer component-border-bottom-green");

        } else if (type === "failure") {
            this.icon.setAttribute("class", "supermapol-icons-message-failure");
            this.messageBoxContainer.setAttribute("class", "component-messageboxcontainer component-border-bottom-red");
        } else if (type === "warring") {
            this.icon.setAttribute("class", "supermapol-icons-message-warning");
            this.messageBoxContainer.setAttribute("class", "component-messageboxcontainer component-border-bottom-orange");
        }
        this.messageBox.innerHTML = message;
        this.messageBoxContainer.hidden = false;
    }
}

SuperMap.Components.MessageBox = MessageBox;