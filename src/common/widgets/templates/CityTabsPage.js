/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../../SuperMap';
import {IndexTabsPageContainer} from './IndexTabsPageContainer';
import {Util} from '../../commontypes/Util';

/**
 * @class SuperMap.Widgets.CityTabsPage
 * @classdesc 城市地址匹配组件模板
 * @version 9.1.1
 * @param {Object} options - 组件配置参数。
 * @param {string} options.id - 组件 dom 元素 id。
 * @param {Object|Array.<string>} options.config - 城市名称配置列表，支持两种格式：{key1:{A:[],B:[]}, key2:{C:[],D:[]}} 或
 *                               ["成都市","北京市"]，用户可根据自己的项目需求进行配置
 * @extends {SuperMap.Widgets.IndexTabsPageContainer}
 * @category Components Common
 */
export class CityTabsPage extends IndexTabsPageContainer {
    constructor(options) {
        super(options);
        //去掉默认的边框阴影样式：
        this.rootContainer.classList.add("widget-citytabpage--noneBoxShadow");
        this.config = options.config;
        //header，若 config为城市名称数组，则直接加载内容
        if (Util.isArray(this.config)) {
            this.header.hidden = true;
            this._createCityItem("城市", this.config);
            this.content.style.border = "none";
        } else {
            this._createTabs();
            this.header.onclick = (e) => {
                //关闭所有元素 是否有更简化的写法？
                for (let i = 0; i < this.header.children.length; i++) {
                    this.header.children[i].setAttribute("class", "");
                }
                //打开点击内容元素
                e.target.setAttribute("class", "on");
                this._createCityContent(e.target.innerHTML);
            };
        }

    }

    /**
     * @function SuperMap.Widgets.CityTabsPage.prototype._createTabs
     * @description 创建 Tabs
     * @private
     */
    _createTabs() {
        //header
        if (Util.isArray(this.config)) {
            for (let i = 0; i < this.config.length; i++) {
                let innerHTML = "";
                for (const key in this.config[i]) {
                    innerHTML += key;
                }
                let li = document.createElement("li");
                li.innerHTML = innerHTML;
                this.header.appendChild(li);
            }
        } else {
            for (const key in this.config) {
                let li = document.createElement("li");
                li.innerHTML = key;
                this.header.appendChild(li);
            }
        }
        this.header.firstChild.setAttribute("class", "on");
        this._createCityContent(this.header.firstChild.innerHTML);
    }

    /**
     * @function SuperMap.Widgets.CityTabsPage.prototype._createCityContent
     * @description 创建列表容器
     * @private
     */
    _createCityContent(keyName) {
        //清除元素：
        for (let i = this.content.children.length; i > 0; i--) {
            this.content.removeChild(this.content.children[i - 1]);
        }
        //创建对应元素
        const cities = this.config[keyName];
        for (let key in cities) {
            this._createCityItem(key, cities[key]);
        }
    }

    /**
     * @function SuperMap.Widgets.CityTabsPage.prototype._createCityContent
     * @description 创建列表容器
     * @private
     */
    _createCityItem(key, cities) {
        const city = document.createElement("div");

        const cityClass = document.createElement("div");
        cityClass.setAttribute("class", "widget-citytabpag__py-key");
        cityClass.innerHTML = key;
        city.appendChild(cityClass);

        const cityContent = document.createElement("div");
        cityContent.setAttribute("class", "widget-citytabpag__content");

        for (let i = 0; i < cities.length; i++) {
            let span = document.createElement("span");
            span.innerHTML = cities[i];
            cityContent.appendChild(span);
        }
        //HOT 元素长度单独微调：
        if (key === "HOT") {
            cityContent.style.width = "428px";
        }
        city.appendChild(cityContent);
        this.content.appendChild(city);
    }

}

SuperMap.Widgets.CityTabsPage = CityTabsPage;