/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';


/**
 * @class SuperMap.Widgets.PaginationContainer
 * @classdesc 分页组件模板
 * @category Widgets Common
 * @param {HTMLElement} contents - 页面填充的 DOM 元素对象
 * @param {number} pageCounts - 页数
 */
export class PaginationContainer {
    constructor(contents = null, pageCounts = 0) {
        this.currentPage = 0;
        this.pageNumberLis = [];
        this.currentPageNumberLis = [];
        this.linkageEvent = null;
        this._initView(contents, pageCounts);
    }

    /**
     * @description 设置页面联动函数
     * @param linkageEvent
     */
    setLinkageEvent(linkageEvent) {
        this.linkageEvent = linkageEvent;
    }

    getElement() {
        return this.container;
    }

    showView() {
        this.container.hidden = false;
    }

    closeView() {
        this.container.hidden = true;
    }

    _initView(contents, pageCounts) {
        const container = document.createElement("div");
        container.setAttribute("class", "widgets-pagination");

        //content
        const content = document.createElement("div");
        content.setAttribute("class", "widgets-pagination-content");
        container.appendChild(content);
        this.content = content;

        //link
        const link = document.createElement("ul");
        link.setAttribute("class", "widgets-pagination-link");
        link.onclick = this._changePageEvent.bind(this);
        container.appendChild(link);
        this._createLink(link);
        this.link = link;
        //填充内容：
        if (contents) {
            this.setContent(contents);
        }
        if (pageCounts !== 0) {
            this.setPageLink(pageCounts);
        }
        this.container = container;

    }

    /**---------以下是页面相关操作 **/
    /**
     * @description 设置页面内容
     * @param element
     */
    setContent(element) {
        this.clearContent();
        this.appendContent(element);
    }

    /**
     * @description 添加内容
     * @param element
     */
    appendContent(element) {
        this.content.appendChild(element);
    }

    /**
     * @description 清空内容元素
     */
    clearContent() {
        for (let i = this.content.children.length - 1; i >= 0; i--) {
            this.content.removeChild(this.content.children[i]);
        }
    }

    /** -----以下是页码相关的操作：**/
    /**
     * @description 设置页码
     * @param {Number} pageNumber
     */
    setPageLink(pageNumber) {
        //清空当前页码
        this.pageNumberLis = [];
        this.currentPageNumberLis = [];
        this.clearPageLink();

        //创建页码
        this._createPageLi(pageNumber);
        //添加页码到页码列表
        this.appendPageLink();
    }

    /**
     * @description 创建页码
     * @param pageNumber
     * @private
     */
    _createPageLi(pageNumber) {
        for (let i = 0; i < pageNumber; i++) {
            const pageLi = document.createElement("li");
            pageLi.innerHTML = i + 1;
            /*const liContent = document.createElement("span");
            liContent.innerHTML = i + 1;*/
            // pageLi.appendChild(liContent);
            this.pageNumberLis.push(pageLi);
        }
        this.pageNumberLis[0].setAttribute("class", "active");
        this.currentPage = 1;
        if (pageNumber < 5) {
            this.currentPageNumberLis = this.pageNumberLis;
        } else {
            for (let i = 0; i < 5; i++) {
                this.currentPageNumberLis.push(this.pageNumberLis[i]);
            }
        }
    }

    /**
     * @description 添加页码到页码列表
     * @private
     */
    appendPageLink() {
        //todo 如何插入中间
        for (let i = 0; i < this.currentPageNumberLis.length; i++) {
            this.link.insertBefore(this.currentPageNumberLis[i], this.link.childNodes[this.link.children.length - 2]);
        }

        for (let i = 0; i < this.currentPageNumberLis.length; i++) {
            //清空 active 状态
            this.currentPageNumberLis[i].setAttribute("class", "");
            //给当前选中的 li 赋值  active 状态
            if (Number(this.currentPageNumberLis[i].innerHTML) === this.currentPage) {
                this.currentPageNumberLis[i].setAttribute("class", "active");
            }
        }

        //根据 currentPage 改变按钮状态
        this._changeDisableState();

        if (this.linkageEvent) {
            this.linkageEvent(this.currentPage);
        }

    }

    /**
     * @description 清除页码列表
     */
    clearPageLink() {
        for (let i = this.link.children.length - 3; i > 1; i--) {
            this.link.removeChild(this.link.children[i]);
        }
    }

    /**
     * @description 创建页码按钮
     * @param ul
     * @private
     */
    _createLink(ul) {
        for (let i = 0; i < 4; i++) {
            const li = document.createElement("li");
            li.setAttribute("class", "disable");
            const liContent = document.createElement("span");
            li.appendChild(liContent);
            if (i === 0) {
                liContent.id = "first";
                liContent.setAttribute("class", "supermapol-icons-first");
            } else if (i === 1) {
                liContent.id = "prev";
                liContent.setAttribute("class", "supermapol-icons-prev");
            } else if (i === 2) {
                liContent.id = "next";
                liContent.setAttribute("class", "supermapol-icons-next");
            } else if (i === 3) {
                liContent.id = "last";
                liContent.setAttribute("class", "supermapol-icons-last");
            }

            ul.appendChild(li);
        }

    }

    /**
     * @description 点击页码事件
     * @param e
     * @private
     */
    _changePageEvent(e) {
        //todo
        const trigger = e.target;
        console.log(trigger);
        //若列表禁用，点击无效
        if (trigger.parentElement.classList[0] === "disable") {
            return;
        }
        let targetLi;
        if (trigger.id) {
            targetLi = trigger.id;
        } else if (Number(trigger.innerHTML)) {
            targetLi = Number(trigger.innerHTML);
        } else {
            return;
        }

        //页码预处理：
        this._prePageNum(targetLi);


        //根据 currentPageNumberLis 创建页码列表
        this.clearPageLink();
        this.appendPageLink();
    }

    /**
     * @description 根据 currentPage 改变按钮状态
     * @private
     */
    _changeDisableState() {
        this.link.children[0].setAttribute("class", "");
        this.link.children[1].setAttribute("class", "");
        this.link.children[this.link.children.length - 1].setAttribute("class", "");
        this.link.children[this.link.children.length - 2].setAttribute("class", "");

        if (this.currentPage === 1) {
            this.link.children[0].setAttribute("class", "disable");
            this.link.children[1].setAttribute("class", "disable");
        }
        if (this.currentPage === this.pageNumberLis.length) {
            this.link.children[this.link.children.length - 1].setAttribute("class", "disable");
            this.link.children[this.link.children.length - 2].setAttribute("class", "disable");
        }

    }

    /**
     * @description 根据点击页码列表事件准备需展现的页码列表
     * @param {string|number} targetLi - 被点击的列表对象 id 或 被点击的页码值
     * @private
     */
    _prePageNum(targetLi) {
        const currentPageNumberLis = [];
        if (targetLi === "first") {
            this.currentPage = 1;
        } else if (targetLi === "last") {
            this.currentPage = this.pageNumberLis.length;
        } else if (targetLi === "prev") {
            this.currentPage = this.currentPage - 1;

        } else if (targetLi === "next") {
            this.currentPage = this.currentPage + 1;
        } else {
            this.currentPage = targetLi;
        }

        if (this.pageNumberLis.length <= 5) {
            for (let i = 0; i < this.pageNumberLis.length; i++) {
                currentPageNumberLis.push(this.pageNumberLis[i]);
            }
        } else {
            //当前点击前三，都取前五
            if (this.currentPage <= 3) {
                for (let i = 0; i < 5; i++) {
                    currentPageNumberLis.push(this.pageNumberLis[i]);
                }
            } else if (this.currentPage >= this.pageNumberLis.length - 3) {
                //点击后三，都取后5
                for (let i = this.pageNumberLis.length - 5; i < this.pageNumberLis.length; i++) {
                    currentPageNumberLis.push(this.pageNumberLis[i]);
                }
            } else {
                //其他，取中间：
                for (let i = this.currentPage - 3; i <= this.currentPage + 1; i++) {
                    currentPageNumberLis.push(this.pageNumberLis[i]);
                }
            }

        }
        if (currentPageNumberLis.length > 0) {
            this.currentPageNumberLis = currentPageNumberLis;
        }
    }

}

SuperMap.Widgets.PaginationContainer = PaginationContainer;