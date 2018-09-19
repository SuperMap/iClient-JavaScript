/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * @class NavTabsPage
 * @class 标签页面组件
 * @param {Array.<Object>} tabs - 标签对象数组 [{title: "",content: HTMLElement}],初始时，传入则创建页面，默认值为 []
 * todo 思考拆分的控件应该以哪种方式使用
 */
export class NavTabsPage {
    constructor(tabs = [], id = null) {
        this.navTabsPage = null;
        this.navTabsTitle = null;
        this.navTabsContent = null;

        this.rootContainer = document.createElement("div");
        if (id) {
            this.rootContainer.id = id;
        }
        this._initContainer(tabs);

    }

    _initContainer(tabs) {
        const navTabsPage = document.createElement("div");
        navTabsPage.setAttribute("class", "nav-tabs-page");

        //关闭按钮
        const closeBtn = document.createElement("span");
        closeBtn.setAttribute("class", "supermapol-icons-close");
        closeBtn.onclick = this.closeView.bind(this);
        navTabsPage.appendChild(closeBtn);

        //标签
        const navTabsTitle = document.createElement("div");
        this.navTabsTitle = navTabsTitle;
        navTabsTitle.setAttribute("class", "nav-tabs-title");
        navTabsPage.appendChild(navTabsTitle);

        //内容
        const navTabsContent = document.createElement("div");
        this.navTabsContent = navTabsContent;
        navTabsContent.setAttribute("class", "nav-tabs-content");
        navTabsPage.appendChild(navTabsContent);

        //若 tabs 初始传入值，则
        if (tabs.length > 0) {
            this.appendTabs(tabs);
        }

        this.navTabsPage = navTabsPage;
    }

    getElement() {
        return this.navTabsPage;
    }

    /**
     * @function NavTabsPage.prototype.setTabs
     * @description 设置标签
     * @param {Array.<Object>} tabs - 标签对象数组 [{title: "",content: {}}]
     */
    setTabs(tabs) {
        this.removeAllTabs();
        this.appendTabs(tabs);
    }

    /**
     * @function NavTabsPage.prototype.appendTabs
     * @description 添加标签页面
     * @param {Array.<Object>} tabs - 标签对象数组 [{title: "",content: {}}]
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
        this.navTabsTitle.firstChild.setAttribute("class", "tabs-select");
        this.navTabsContent.firstChild.hidden = false;
    }

    /**
     * @function NavTabsPage.prototype.removeTab
     * @description 删除某个标签页面
     * @param {number} index - 标签索引号
     */
    removeTab(index) {
        this.navTabsTitle.removeChild(this.navTabsTitle.children[index]);
        this.navTabsContent.removeChild(this.navTabsContent.children[index]);
    }

    /**
     * @function NavTabsPage.prototype.removeAllTabs
     * @description 删除所有标签F
     */
    removeAllTabs() {
        for (let i = this.navTabsTitle.children.length; i > 0; i--) {
            this.navTabsTitle.removeChild(this.navTabsTitle.children[i]);
            this.navTabsContent.removeChild(this.navTabsContent.children[i]);
        }
    }

    /**
     * @function NavTabsPage.prototype.closeView
     * @description 关闭当前窗口
     */
    closeView() {
        this.navTabsPage.hidden = true;
    }

    showView() {
        this.navTabsPage.hidden = false;
    }

    _changeTabsPage(e) {
        const index = e.target.index;
        for (let i = 0; i < this.navTabsTitle.children.length; i++) {
            this.navTabsTitle.children[i].setAttribute("class", "");
            this.navTabsContent.children[i].hidden = true;
            if (i === index) {
                this.navTabsTitle.children[i].setAttribute("class", "tabs-select");
                this.navTabsContent.children[i].hidden = false;
            }
        }
    }

}