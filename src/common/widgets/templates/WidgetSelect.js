import { SuperMap } from '../../SuperMap';

/**
 * @class SuperMap.Widgets.WidgetSelect
 * @classDec 微件统一 select 下拉框。
 * @param {Array} optionsArr - 需要创建的 option 数据数组。
 */
export class WidgetSelect {
    constructor(optionsArr) {
        this._initView(optionsArr);
    }
    _initView(optionsArr) {
        let select = document.createElement('select');
        select.className = "widget-select-options";
        select.id = 'widgetSelect';
        for (let i = 0; i < optionsArr.length; i++) {
            let ele = document.createElement('option');
            ele.innerHTML = optionsArr[i];
            ele.value = optionsArr[i];
            // 默认选中第 0 个元素
            if (i === 0) {
                ele.selected = true;
            }
            select.appendChild(ele);
        }
        this.select = select;
       
    }

    /**
     * @function WidgetSelect.prototype.getElement
     * @description 获取当前模板 Dom 元素。
     */
    getElement() {
        return this.select;
    }
}
SuperMap.Widgets.WidgetSelect = WidgetSelect;