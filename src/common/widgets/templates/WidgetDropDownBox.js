/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../../SuperMap';

/**
 * @class SuperMap.Widgets.WidgetDropDownBox
 * @classDec 微件统一 dropDownBox 下拉框。
 * @param {Array} optionsArr - 需要创建的 option 数据数组。
 */
export class WidgetDropDownBox {
    constructor(optionsArr) {
        this._initView(optionsArr);
    }
    _initView(optionsArr) {
        let dropDownContainer = document.createElement('div');
        dropDownContainer.className = 'drop-down-container';
        let dropDownBox = document.createElement('div');
        dropDownBox.setAttribute('tabindex', '1');
        dropDownBox.className = "drop-down-box";
        dropDownBox.id = 'dropDownBox';

        let dropDownTopContainer = document.createElement('div');
        dropDownTopContainer.id = 'dropDownTopContainer';

        let dropDownTop = document.createElement('div');
        dropDownTop.className = 'drop-down-item';
        dropDownTop.id = 'dropDownTop';

        let dropDownImg = document.createElement('div');
        dropDownImg.className = 'drop-down-img';
        let activeIcon = document.createElement('div');
        activeIcon.className = optionsArr[0].icon.className;
        activeIcon.style.background = optionsArr[0].icon.background;
        dropDownImg.appendChild(activeIcon);
        dropDownTop.appendChild(dropDownImg);

        let dropDownTitle = document.createElement('div');
        dropDownTitle.title = optionsArr[0].title;
        dropDownTitle.innerHTML = optionsArr[0].title;
        dropDownTitle.className = 'drop-down-title';
        dropDownTop.appendChild(dropDownTitle);

        let dropDownRemark = document.createElement('div');
        dropDownRemark.title = optionsArr[0].remark;
        dropDownRemark.innerHTML = optionsArr[0].remark;
        dropDownRemark.className = 'drop-down-remark';
        dropDownTop.appendChild(dropDownRemark);
        dropDownTopContainer.appendChild(dropDownTop);
        dropDownBox.appendChild(dropDownTopContainer);

        let triangleBtnContainer = document.createElement('div');
        triangleBtnContainer.className = 'triangle-btn';
        let triangleBtn = document.createElement('div');
        triangleBtn.className = 'triangle-down-img';
        triangleBtn.id = 'triangleBtn';
        triangleBtnContainer.appendChild(triangleBtn);
        dropDownBox.appendChild(triangleBtnContainer);
        dropDownContainer.appendChild(dropDownBox);

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
    _creatDropDownBox(creatDropDownBoxParam) {
        let dropDownBox = creatDropDownBoxParam.parentEle;
        let dropDownTopContainer = creatDropDownBoxParam.dropDownTopContainer;
        let dropDownContent = document.createElement('div');
        dropDownContent.className = creatDropDownBoxParam.dropDownContent[0];
        dropDownContent.id = creatDropDownBoxParam.dropDownContent[1];
        dropDownBox.appendChild(dropDownContent);

        let dropDownItems = document.createElement('div');
        dropDownItems.className = creatDropDownBoxParam.dropDownItems;
        dropDownContent.appendChild(dropDownItems);

        let scrollareaContent = document.createElement('div');
        scrollareaContent.className = creatDropDownBoxParam.scrollareaContent;
        dropDownItems.appendChild(scrollareaContent);

        this._creatDropDownOptions(creatDropDownBoxParam.optionsArr, scrollareaContent);

        // 下拉框显示 & 隐藏事件
        let triangleBtn = creatDropDownBoxParam.triangleBtn;
        this._dropDownClickEvent(dropDownBox, dropDownContent.id, triangleBtn.id);

        this._eleOnblur(dropDownBox, creatDropDownBoxParam.dropDownContent[1], triangleBtn.id)

        // 下拉框 options 点击事件
        let scrollareaOptions = scrollareaContent.children;
        for (let i = 0; i < scrollareaOptions.length; i++) {
            scrollareaOptions[i].onclick = function () {
                dropDownTopContainer.innerHTML = scrollareaOptions[i].outerHTML;
                dropDownTopContainer.children[0].id = 'dropDownTop';
                //evt.stopPropagation();
            }
        }
    }

    _creatDropDownOptions(dataArr, parentElement) {
        for (let i = 0; i < dataArr.length; i++) {
            let ele = document.createElement('div');
            ele.className = 'drop-down-item';
            ele.setAttribute('data-value', dataArr[i]['data-value']);
            parentElement.appendChild(ele);

            let imgContainer = document.createElement('div');
            imgContainer.className = 'drop-down-img';
            ele.appendChild(imgContainer);

            let img = document.createElement('div');
            img.className = dataArr[i].icon.className;
            img.style.background = dataArr[i].icon.background;
            imgContainer.appendChild(img);

            let title = document.createElement('div');
            title.className = 'drop-down-title';
            title.title = dataArr[i].title;
            title.innerHTML = dataArr[i].title;
            ele.appendChild(title);

            let remark = document.createElement('div');
            remark.className = 'drop-down-remark';
            remark.title = dataArr[i].remark;
            remark.innerHTML = dataArr[i].remark;
            ele.appendChild(remark);

        }
    }

    _dropDownClickEvent(eventElement, contentElementId, triangleBtnId) {
        eventElement.onclick = function (e) {
            let contentElement = document.getElementById(contentElementId);
            let triangleBtn = document.getElementById(triangleBtnId);
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

    _eleOnblur(eventElement, contentElementId, triangleBtnId) {
        eventElement.onblur = function () {
            let contentElement = document.getElementById(contentElementId);
            let triangleBtn = document.getElementById(triangleBtnId);
            contentElement.style.display = "none";
            triangleBtn.className = "triangle-down-img";
        }
    }
    /**
     * @function WidgetSelect.prototype.getElement
     * @description 获取当前模板 Dom 元素。
     */
    getElement() {
        return this.dropDownContainer;
    }
}
SuperMap.Widgets.WidgetDropDownBox = WidgetDropDownBox;
