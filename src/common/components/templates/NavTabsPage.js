/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {TemplateBase} from './TemplateBase';

/**
 * @class SuperMap.Components.NavTabsPage
 * @classdesc 标签页面组件。
 * @version 9.1.1
 * @param {Object} options - 组件配置参数。
 * @param {string} optionsArr.id - 组件 dom 元素 id。
 * @param {Array.<Object>} [options.tabs=[]] - 标签对象数组，形如：[{title: "",content: HTMLElement}]，初始时，传入则创建页面。
 * @extends {SuperMap.Components.TemplateBase}
 * @category Components Common
 */
//  todo 思考拆分的控件应该以哪种方式使用
export class NavTabsPage extends TemplateBase {
    constructor(options) {
        super(options);
        this.navTabsTitle = null;
        this.navTabsContent = null;
        options.tabs = options.tabs ? options.tabs : [];
        this._initView(options.tabs);
    }

    /**
     * @override
     * @private
     */
    _initView(tabs) {
        const navTabsPage = document.createElement("div");
        navTabsPage.setAttribute("class", "component-navtabspage");

        //关闭按钮
        const closeBtn = document.createElement("span");
        closeBtn.setAttribute("class", "supermapol-icons-close");
        closeBtn.onclick = this.closeView.bind(this);
        navTabsPage.appendChild(closeBtn);

        //标签
        const navTabsTitle = document.createElement("div");
        this.navTabsTitle = navTabsTitle;
        navTabsTitle.setAttribute("class", "component-navtabspage__title");
        navTabsPage.appendChild(navTabsTitle);

        //内容
        const navTabsContent = document.createElement("div");
        this.navTabsContent = navTabsContent;
        navTabsContent.setAttribute("class", "component-navtabspage__content");
        navTabsPage.appendChild(navTabsContent);

        //若 tabs 初始传入值，则
        if (tabs.length > 0) {
            this.appendTabs(tabs);
        }

        this.rootContainer = navTabsPage;
    }

    /**
     * @function SuperMap.Components.NavTabsPage.prototype.setTabs
     * @description 设置标签。
     * @param {Array.<Object>} tabs - 标签对象数组，形如：[{title: "",content: {}}]。
     */
    setTabs(tabs) {
        this.removeAllTabs();
        this.appendTabs(tabs);
    }

    /**
     * @function SuperMap.Components.NavTabsPage.prototype.appendTabs
     * @description 添加标签页面。
     * @param {Array.<Object>} tabs - 标签对象数组，形如：[{title: "",content: {}}]。
     */
    appendTabs(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            let title = document.createElement("span");
            title.index = i;
            title.appendChild(document.createTextNode(tabs[i].title));
            //绑定标签切换对应页面：
            title.onclick = this._changeTabsPage.bind(this);
            let content = tabs[i].content;
            content.index = i;
            content.hidden = true;

            this.navTabsTitle.appendChild(title);
            this.navTabsContent.appendChild(content);
        }
        //todo 确认是否两个子元素的 index 相互对应
        //默认显示第一个标签对象
        this.navTabsTitle.firstChild.setAttribute("class", "component-navtabspage__tabs--select");
        this.navTabsContent.firstChild.hidden = false;
    }

    /**
     * @function SuperMap.Components.NavTabsPage.prototype.removeTab
     * @description 删除某个标签页面。
     * @param {number} index - 标签索引号。
     */
    removeTab(index) {
        this.navTabsTitle.removeChild(this.navTabsTitle.children[index]);
        this.navTabsContent.removeChild(this.navTabsContent.children[index]);
    }

    /**
     * @function SuperMap.Components.NavTabsPage.prototype.removeAllTabs
     * @description 删除所有标签。
     */
    removeAllTabs() {
        for (let i = this.navTabsTitle.children.length; i > 0; i--) {
            this.navTabsTitle.removeChild(this.navTabsTitle.children[i]);
            this.navTabsContent.removeChild(this.navTabsContent.children[i]);
        }
    }

    _changeTabsPage(e) {
        const index = e.target.index;
        for (let i = 0; i < this.navTabsTitle.children.length; i++) {
            this.navTabsTitle.children[i].setAttribute("class", "");
            this.navTabsContent.children[i].hidden = true;
            if (i === index) {
                this.navTabsTitle.children[i].setAttribute("class", "component-navtabspage__tabs--select");
                this.navTabsContent.children[i].hidden = false;
            }
        }
    }

}

SuperMap.Components.NavTabsPage = NavTabsPage;