/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../../SuperMap';

/**
 * @class SuperMap.Widgets.WidgetDropDownBox
 * @classdesc 微件统一的图片下拉框。
 * @param {Array.<Object>} optionsArr - 需要创建的 option 数据数组。
 * @param {string} optionsArr.title - 下拉框 title。
 * @param {string} optionsArr.remark - 下拉框解释标记文本。
 * @param {string} optionsArr.icon - 下拉框图标。 
 * @param {string} [optionsArr.dataValue] - 下拉框 attribute 名为 data-value 的值 。
 * @param {string} [optionsArr.icon.className] - 下拉框图标类名。
 * @param {string} [optionsArr.icon.background] - 下拉框图标背景 url。
 * @category Widgets Common
 */
export class WidgetDropDownBox {
    constructor(optionsArr) {
        this._initView(optionsArr);
    }
    /**
     * @function SuperMap.Widgets.WidgetDropDownBox.prototype._initView
     * @description 初始化下拉框。
     * @private
     */
    _initView(optionsArr) {
        let dropDownContainer = document.createElement('div');
        dropDownContainer.className = 'drop-down-container';
        let dropDownBox = document.createElement('div');
        dropDownBox.setAttribute('tabindex', '1');
        dropDownBox.className = "drop-down-box";
        dropDownContainer.appendChild(dropDownBox);

        let dropDownTopContainer = document.createElement('div');
        dropDownBox.appendChild(dropDownTopContainer);

        this._creatDropDownOption(optionsArr[0], dropDownTopContainer);

        let triangleBtnContainer = document.createElement('div');
        triangleBtnContainer.className = 'triangle-btn';
        dropDownBox.appendChild(triangleBtnContainer);

        let triangleBtn = document.createElement('div');
        triangleBtn.className = 'triangle-down-img';
        triangleBtnContainer.appendChild(triangleBtn);

        let creatDropDownBoxParam = {
            "parentEle": dropDownBox,
            "dropDownContent": ['drop-down-content chart-content', 'dropDownContent'],
            "dropDownItems": 'scrollarea drop-down-items',
            "scrollareaContent": 'scrollarea-content',
            "optionsArr": optionsArr,
            "triangleBtn": triangleBtn,
            "dropDownTopContainer": dropDownTopContainer
        }
        this._creatDropDownBox(creatDropDownBoxParam);

        this.dropDownContainer = dropDownContainer;

    }
    /**
     * @function SuperMap.Widgets.WidgetDropDownBox.prototype._creatDropDownBox
     * @description 创建下拉框。
     * @private
     */
    _creatDropDownBox(creatDropDownBoxParam) {
        let dropDownBox = creatDropDownBoxParam.parentEle;
        let dropDownTopContainer = creatDropDownBoxParam.dropDownTopContainer;
        let dropDownContent = document.createElement('div');
        dropDownContent.className = creatDropDownBoxParam.dropDownContent[0];
        dropDownBox.appendChild(dropDownContent);

        let dropDownItems = document.createElement('div');
        dropDownItems.className = creatDropDownBoxParam.dropDownItems;
        dropDownContent.appendChild(dropDownItems);

        let scrollareaContent = document.createElement('div');
        scrollareaContent.className = creatDropDownBoxParam.scrollareaContent;
        dropDownItems.appendChild(scrollareaContent);
        let optionsArr = creatDropDownBoxParam.optionsArr;
        for (let i = 0; i < optionsArr.length; i++) {
            this._creatDropDownOption(optionsArr[i], scrollareaContent)
        }
        // 下拉框显示 & 隐藏事件
        let triangleBtn = creatDropDownBoxParam.triangleBtn;
        this._dropDownClickEvent(dropDownBox, dropDownContent, triangleBtn);

        this._eleOnblur(dropDownBox, dropDownContent, triangleBtn)

        // 下拉框 options 点击事件
        let scrollareaOptions = scrollareaContent.children;
        for (let i = 0; i < scrollareaOptions.length; i++) {
            scrollareaOptions[i].onclick = function () {
                dropDownTopContainer.innerHTML = scrollareaOptions[i].outerHTML;
                //evt.stopPropagation();
            }
        }
    }

    /**
     * @function SuperMap.Widgets.WidgetDropDownBox.prototype._creatDropDownOption
     * @description 创建下拉框子元素。
     * @private
     */
    _creatDropDownOption(data, parentElement){
        let ele = document.createElement('div');
        ele.className = 'drop-down-item';
        let dataItem = data;
        if (dataItem['dataValue']) {
            ele.setAttribute('data-value', dataItem['dataValue']);
        }
        parentElement.appendChild(ele);

        let imgContainer = document.createElement('div');
        imgContainer.className = 'drop-down-img';
        ele.appendChild(imgContainer);

        let img = document.createElement('div');
        if (dataItem.icon.className) {
            img.className = dataItem.icon.className;
        }
        if (dataItem.icon.background) {
            img.style.background = dataItem.icon.background;
        }
        imgContainer.appendChild(img);

        let title = document.createElement('div');
        title.className = 'drop-down-title';
        title.title = dataItem.title;
        title.innerHTML = dataItem.title;
        ele.appendChild(title);

        let remark = document.createElement('div');
        remark.className = 'drop-down-remark';
        remark.title = dataItem.remark;
        remark.innerHTML = dataItem.remark;
        ele.appendChild(remark);
    }

    /**
     * @function SuperMap.Widgets.WidgetDropDownBox.prototype._dropDownClickEvent
     * @description 下拉框点击事件。
     * @private
     */
    _dropDownClickEvent(eventElement, contentElement, triangleBtn) {
        eventElement.onclick = function (e) {
            if (contentElement.style.display === "block") {
                contentElement.style.display = "none";
                triangleBtn.className = "triangle-down-img";
            } else {
                contentElement.style.display = "block";
                triangleBtn.className = "triangle-up-img";
            }
            e.preventDefault();
            e.stopPropagation()
        }
        eventElement.onmousedown = function (evt) {
            //console.log('drop-down-box onmousedown '+evt.target.className);
            if (evt.target !== this) {
                this.focus();
                evt.preventDefault();
                evt.stopPropagation()
            }
        }
    }

    /**
     * @function SuperMap.Widgets.WidgetDropDownBox.prototype._eleOnblur
     * @description 下拉框失焦事件。
     * @private
     */
    _eleOnblur(eventElement, contentElement, triangleBtn) {
        eventElement.onblur = function () {
            contentElement.style.display = "none";
            triangleBtn.className = "triangle-down-img";
        }
    }
    /**
    * @function SuperMap.Widgets.WidgetDropDownBox.prototype._createElement
    * @description 通用创建元素。
    * @private
    */
    _createElement(tagName, className, parentEle) {
        let ele = document.createElement(tagName || 'div');
        className && ~~(ele.className = className);
        parentEle && parentEle.appendChild(ele);
        return ele;
    }
    /**
     * @function SuperMap.Widgets.WidgetDropDownBox.prototype.getElement
     * @description 获取当前模板 Dom 元素。
     */
    getElement() {
        return this.dropDownContainer;
    }
}
SuperMap.Widgets.WidgetDropDownBox = WidgetDropDownBox;
