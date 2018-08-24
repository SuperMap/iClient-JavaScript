import '../css/WidgetContainer.css';

/**
 * @class WidgetContainer
 * @class 微件统一外框
 * @param {string} title - 标题
 */
export class WidgetContainer {
    constructor(title) {
        this._initContainer(title);
    }

    _initContainer(title) {
        const container = document.createElement("div");
        container.setAttribute("class", "widget-container");
        //title
        const titleContainer = document.createElement("div");
        titleContainer.setAttribute("class", "widget-title");
        const titleContent = document.createElement("div");
        titleContent.innerHTML = title;
        titleContainer.appendChild(titleContent);
        container.appendChild(titleContainer);

        this.container = container;
        return container;
    }

    /**
     * @function WidgetContainer.prototype.getElement
     * @description 获取当前模板 Dom 元素
     */
    getElement() {
        return this.container;
    }
}