/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {TemplateBase} from './TemplateBase';

/**
 * @class SuperMap.Components.Select
 * @classdesc 组件统一的文字下拉框。
 * @version 9.1.1
 * @param {Array.<string|Array>} options - 需要创建的 Select 数据数组。
 * @param {string} options.id - 组件 dom 元素 id。
 * @param {string} [options.labelName] - label 名称。
 * @param {Array.<string>} options.optionsArr - 需要创建的 option 数据数组。
 * @param {Function} [options.optionsClickCb] - option 点击事件回调函数。
 * @extends {SuperMap.Components.TemplateBase}
 * @category Components Common
 */
export class Select extends TemplateBase {
    constructor(options) {
        super(options);
        this._initView(options);
    }

    _initView(options) {
        let selectTool = this._createElement('div', "component-selecttool");

        if (options.labelName) {
            let label = this._createElement('label', 'component-selecttool__lable--describe', selectTool);
            label.innerHTML = options.labelName;
        }

        let chartSelect = this._createElement('div', 'component-selecttool--chart', selectTool);
        chartSelect.setAttribute('tabindex', '1');

        let selectName = this._createElement('div', "component-selecttool__name", chartSelect);
        selectName.title = options.optionsArr[0];
        selectName.innerHTML = options.optionsArr[0];

        let chartTriangleBtn = this._createElement('div', 'component-selecttool__trianglebtn--chart', chartSelect);
        let triangleBtn = this._createElement('div', 'component-triangle-down-img', chartTriangleBtn);
        let selectContent = this._createElement('div', 'component-selecttool__content', chartSelect);
        let scrollarea = this._createElement('div', 'component-selecttool__content--chart', selectContent);
        let scrollareaContent = this._createElement('div', 'component-selecttool__scrollarea__content', scrollarea);
        scrollareaContent.setAttribute('tabindex', '1');
        this.createOptions(scrollareaContent, options.optionsArr);
        this.optionClickEvent(scrollareaContent, selectName, options.optionsClickCb);
        // 下拉框显示 & 隐藏事件
        this._selectClickEvent(chartSelect, selectContent, triangleBtn);
        this.rootContainer = selectTool;
    }

    /**
     * @function SuperMap.Components.Select.prototype.createOptions
     * @description 创建所属下拉框选项。
     */
    createOptions(container, optionsArr) {
        for (let i in optionsArr) {
            let option = this._createElement('div', 'component-selecttool__option', container);
            option.title = optionsArr[i];
            option.innerHTML = optionsArr[i];
        }
    }

    /**
     * @function SuperMap.Components.Select.prototype._selectClickEvent
     * @description select 点击显示&隐藏事件。
     * @private
     */
    _selectClickEvent(eventElement, contentElement, triangleBtn) {
        eventElement.onclick = function (e) {
            if (contentElement.style.display === "block") {
                contentElement.style.display = "none";
                triangleBtn.className = "component-triangle-down-img";
            } else {
                contentElement.style.display = "block";
                triangleBtn.className = "triangle-up-img";
            }
            e.preventDefault();
            e.stopPropagation();
        };
        eventElement.onmousedown = function (evt) {
            //console.log('dropdownbox onmousedown '+evt.target.className);
            if (evt.target !== this) {
                this.focus();
                evt.preventDefault();
                evt.stopPropagation()
            }
        };
        eventElement.onblur = function () {

            contentElement.style.display = "none";
            triangleBtn.className = "component-triangle-down-img";
        }
    }

    /**
     * @function Select.prototype._createElement
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
     * @function SuperMap.Components.Select.prototype.optionClickEvent
     * @description 下拉框的 option 的点击事件。
     */
    optionClickEvent(optionEleArr, selectNameEle, optionsClickCb) {
        for (let i = 0; i < optionEleArr.children.length; i++) {
            let childEle = optionEleArr.children[i];
            childEle.onclick = function () {
                selectNameEle.innerHTML = childEle.innerHTML;
                selectNameEle.title = childEle.title;
                if (childEle.getAttribute('data-value')) {
                    selectNameEle.setAttribute('data-value', childEle.getAttribute('data-value'))
                }
                optionsClickCb && optionsClickCb(childEle);
            }
        }
    }
}

SuperMap.Components.Select = Select;
