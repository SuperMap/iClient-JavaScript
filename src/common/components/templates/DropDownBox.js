/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {TemplateBase} from './TemplateBase';

/**
 * @class SuperMap.Components.DropDownBox
 * @classdesc 组件统一的图片下拉框。
 * @version 9.1.1
 * @param {Array.<Object>} optionsArr - 需要创建的 option 数据数组。
 * @param {string} optionsArr.id - 组件 dom 元素 id。
 * @param {string} optionsArr.title - 下拉框 title。
 * @param {string} optionsArr.remark - 下拉框解释标记文本。
 * @param {string} optionsArr.icon - 下拉框图标。
 * @param {string} [optionsArr.dataValue] - 下拉框 attribute 名为 data-value 的值 。
 * @param {string} [optionsArr.icon.className] - 下拉框图标类名。
 * @param {string} [optionsArr.icon.background] - 下拉框图标背景 url。
 * @category Components Common
 * @extends {SuperMap.Components.TemplateBase}
 */
export class DropDownBox extends TemplateBase {
    constructor(optionsArr) {
        super(optionsArr);
        this._initView(optionsArr);
    }

    /**
     * @function SuperMap.Components.DropDownBox.prototype._initView
     * @description 初始化下拉框。
     * @private
     * @override
     */
    _initView(optionsArr) {
        let dropDownContainer = document.createElement('div');
        dropDownContainer.className = 'component-dropdownbox--container';
        let dropDownBox = document.createElement('div');
        dropDownBox.setAttribute('tabindex', '1');
        dropDownBox.className = "component-dropdownbox";
        dropDownContainer.appendChild(dropDownBox);

        let dropDownTopContainer = document.createElement('div');
        dropDownBox.appendChild(dropDownTopContainer);

        this._createDropDownOption(optionsArr[0], dropDownTopContainer);

        let triangleBtnContainer = document.createElement('div');
        triangleBtnContainer.className = 'component-dropdownbox__triangle-btn';
        dropDownBox.appendChild(triangleBtnContainer);

        let triangleBtn = document.createElement('div');
        triangleBtn.className = 'component-triangle-down-img';
        triangleBtnContainer.appendChild(triangleBtn);

        let createDropDownBoxParam = {
            "parentEle": dropDownBox,
            "dropDownContent": ['component-dropdownbox__content component-dropdownbox__content--chart', 'dropDownContent'],
            "scrollareaContent": 'component-selecttool__scrollarea__content',
            "optionsArr": optionsArr,
            "triangleBtn": triangleBtn,
            "dropDownTopContainer": dropDownTopContainer
        };
        this._createDropDownBox(createDropDownBoxParam);

        this.rootContainer = dropDownContainer;

    }

    /**
     * @function SuperMap.Components.DropDownBox.prototype._createDropDownBox
     * @description 创建下拉框。
     * @private
     */
    _createDropDownBox(createDropDownBoxParam) {
        let dropDownBox = createDropDownBoxParam.parentEle;
        let dropDownTopContainer = createDropDownBoxParam.dropDownTopContainer;
        let dropDownContent = document.createElement('div');
        dropDownContent.className = createDropDownBoxParam.dropDownContent[0];
        dropDownBox.appendChild(dropDownContent);

        let scrollareaContent = document.createElement('div');
        scrollareaContent.className = createDropDownBoxParam.scrollareaContent;
        dropDownContent.appendChild(scrollareaContent);

        let optionsArr = createDropDownBoxParam.optionsArr;
        for (let i = 0; i < optionsArr.length; i++) {
            this._createDropDownOption(optionsArr[i], scrollareaContent)
        }
        // 下拉框显示 & 隐藏事件
        let triangleBtn = createDropDownBoxParam.triangleBtn;
        this._dropDownClickEvent(dropDownBox, dropDownContent, triangleBtn);

        this._eleOnblur(dropDownBox, dropDownContent, triangleBtn);

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
     * @function SuperMap.Components.DropDownBox.prototype._createDropDownOption
     * @description 创建下拉框子元素。
     * @private
     */
    _createDropDownOption(data, parentElement) {
        let ele = document.createElement('div');
        ele.className = 'component-dropdownbox__item';
        let dataItem = data;
        if (dataItem['dataValue']) {
            ele.setAttribute('data-value', dataItem['dataValue']);
        }
        parentElement.appendChild(ele);

        let imgContainer = document.createElement('div');
        imgContainer.className = 'component-dropdownbox__item__img';
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
        title.className = 'component-dropdownbox__item__title';
        title.title = dataItem.title;
        title.innerHTML = dataItem.title;
        ele.appendChild(title);

        let remark = document.createElement('div');
        remark.className = 'component-dropdownbox__item__remark';
        remark.title = dataItem.remark;
        remark.innerHTML = dataItem.remark;
        ele.appendChild(remark);
    }

    /**
     * @function SuperMap.Components.DropDownBox.prototype._dropDownClickEvent
     * @description 下拉框点击事件。
     * @private
     */
    _dropDownClickEvent(eventElement, contentElement, triangleBtn) {
        eventElement.onclick = function (e) {
            if (contentElement.style.display === "block") {
                contentElement.style.display = "none";
                triangleBtn.className = "component-triangle-down-img";
            } else {
                contentElement.style.display = "block";
                triangleBtn.className = "triangle-up-img";
            }
            e.preventDefault();
            e.stopPropagation()
        };
        eventElement.onmousedown = function (evt) {
            //console.log('dropdownbox onmousedown '+evt.target.className);
            if (evt.target !== this) {
                this.focus();
                evt.preventDefault();
                evt.stopPropagation()
            }
        }
    }

    /**
     * @function SuperMap.Components.DropDownBox.prototype._eleOnblur
     * @description 下拉框失焦事件。
     * @private
     */
    _eleOnblur(eventElement, contentElement, triangleBtn) {
        eventElement.onblur = function () {
            contentElement.style.display = "none";
            triangleBtn.className = "component-triangle-down-img";
        }
    }

    /**
     * @function SuperMap.Components.DropDownBox.prototype._createElement
     * @description 通用创建元素。
     * @private
     */
    _createElement(tagName, className, parentEle) {
        let ele = document.createElement(tagName || 'div');
        className && ~~(ele.className = className);
        parentEle && parentEle.appendChild(ele);
        return ele;
    }

}

SuperMap.Components.DropDownBox = DropDownBox;
