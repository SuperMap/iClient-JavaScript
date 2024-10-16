/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {MapService} from "../services/MapService";

/**
 * @class ChangeTileVersion
 * @aliasclass control.ChangeTileVersion
 * @deprecatedclassinstance L.supermap.control.changeTileVersion
 * @classdesc 版本切换控件，支持 IE10 及以上。
 * @category  Control
 * @extends {L.Control}
 * @modulecategory Control
 * @example
 * new ChangeTileVersion({
 *      layer: baseLayer,
 *      position: "topleft",
 *      orientation: "horizontal"
 *  }).addTo(map);
 * @param {Object} options - 参数。
 * @param {L.Layer} options.layer - Leaflet Layer 对象。
 * @param {string} [options.position='topleft'] - 控件位置继承自 Leaflet control。
 * @param {string} [options.title='switch tile version'] - 鼠标滑过时提示。
 * @param {string} [options.tooltip='top'] - tooltip 提示显示位置 top | right | bottom | left。
 * @param {boolean} [options.collapsed=true] - 是否折叠。
 * @param {string} [options.nextText='+'] - 下一个版本的按钮布局。
 * @param {string} [options.lastText='-'] - 上一个版本的按钮布局。
 * @param {string} [options.ico='v'] - 控件显示的 logo。
 * @param {string} [options.orientation='horizontal'] - 方向 horizontal|vertical。
 * @param {boolean} [options.switch=true] - 是否显示上/下一个版本切换控件。
 * @usage
 */
export var ChangeTileVersion = L.Control.extend({

    options: {
        //绑定的底图图层
        layer: null,
        //控件位置 继承自leaflet control
        position: 'topleft',
        //鼠标滑过时提示
        title: 'switch tile version',
        //tooltip提示显示位置 top | right | bottom | left
        tooltip: "top",
        //是否折叠
        collapsed: true,
        //下一个版本的按钮布局
        nextText: "+",
        //上一个版本的按钮布局
        lastText: "-",
        //控件显示的logo
        ico: 'V',
        //方向horizontal|vertical
        orientation: 'horizontal',
        //是否显示上/下一个版本切换控件
        switch: true
    },

    /**
     * @private
     * @function ChangeTileVersion.prototype.onAdd
     * @description 添加控件。
     */
    onAdd: function () {
        if (this.options.orientation !== 'vertical') {
            this.options.orientation = 'horizontal';
        }
        var layout = this._initLayout();
        if (this.options.layer) {
            this.setLayer(this.options.layer);
        }
        return layout;
    },

    /**
     * @function ChangeTileVersion.prototype.setContent
     * @description 设置版本信息。
     * @param {Object} version - 版本信息。
     */
    setContent: function (version) {
        var content = L.Util.extend({}, version);
        this.setVersionName(content.desc).setToolTip(content.desc);
    },

    /**
     * @function ChangeTileVersion.prototype.setVersionName
     * @description  设置版本号。
     * @param {string} content - 版本信息。
     * @returns {ChangeTileVersion} ChangeTileVersion的实例对象。
     */
    setVersionName: function (content) {
        var value = content;
        if (!content) {
            value = this.getValue();
        }
        this._sliderValue.innerHTML = value;
        return this;
    },

    /**
     * @function ChangeTileVersion.prototype.setToolTip
     * @description 设置提示信息。
     * @param {(HTMLElement|string)} tooltip - 提示信息。
     * @returns {ChangeTileVersion} ChangeTileVersion的实例对象。
     */
    setToolTip: function (tooltip) {
        this.tooltip.innerHTML = tooltip;
        return this;
    },

    /**
     * @function ChangeTileVersion.prototype.updateLength
     * @description 更新进度条长度。
     * @param {number} length - 进度长度参数。
     */
    updateLength: function (length) {
        if (length > 0) {
            this.length = length;
            this.max = this.length - 1;
            this.slider.setAttribute("max", this.max);
        }
    },

    /**
     * @function ChangeTileVersion.prototype.setLayer
     * @description 设置需要绑定的图层。
     * @param {TiledMapLayer} layer - 绑定的图层。
     */
    setLayer: function (layer) {
        if (layer) {
            this.options.layer = layer;
        }
        var me = this;
        var tileLayer = me.options.layer;
        tileLayer.on("tilesetsinfoloaded", function (result) {
            var tileVersions = result && result.tileVersions;
            me.update(tileVersions);
        });
        tileLayer.on("tileversionschanged", function (result) {
            var tileVersions = result && result.tileVersion;
            me.setContent(tileVersions);
        });
        me.getTileSetsInfo();
    },

    /**
     * @function ChangeTileVersion.prototype.update
     * @description 更新缓存切片集和进度条长度。
     * @param {number} tileVersions - 待更新的切片版本号。
     */
    update: function (tileVersions) {
        this.tileVersions = tileVersions || [];
        this.updateLength(this.tileVersions.length);
    },

    /**
     * @function ChangeTileVersion.prototype.getTileSetsInfo
     * @description 获取切片集信息。
     */
    getTileSetsInfo: function () {
        var me = this;
        if (me.options.layer) {
            new MapService(me.options.layer._url).getTilesets(function getTilesInfoSucceed(info) {
                me.options.layer.setTileSetsInfo(info.result);
            });
        }
    },

    /**
     * @function ChangeTileVersion.prototype.removeLayer
     * @description 移除绑定的地图图层。
     */
    removeLayer: function () {
        this.options.layer = null;
    },

    /**
     * @function ChangeTileVersion.prototype.nextTilesVersion
     * @description 下一个版本，首次调用该函数默认为无版本。
     * @returns {ChangeTileVersion} ChangeTileVersion的实例对象。
     */
    nextTilesVersion: function () {
        if (this.firstLoad) {
            this.options.layer.nextTilesVersion();
            this.firstLoad = !!0;
            return this;
        }
        if (parseInt(this.slider.value) > this.max-1) {
            return this;
        }
        this.slider.value = parseInt(this.slider.value) + 1;
        this.options.layer.nextTilesVersion();
        return this;
    },

    /**
     * @function ChangeTileVersion.prototype.lastTilesVersion
     * @description 上一个版本。
     */
    lastTilesVersion: function () {
        if (parseInt(this.slider.value) < this.min + 1) {
            return this;
        }
        this.slider.value = parseInt(this.slider.value) - 1;
        this.options.layer.lastTilesVersion();
        return this;
    },

    /**
     * @function ChangeTileVersion.prototype.tilesVersion
     * @description 请求指定版本。
     * @param {string} version - 版本号参数。
     */
    tilesVersion: function (version) {
        var layer = this.options.layer,
            tileVersions = this.tileVersions;
        var len = tileVersions.length;
        for (var i = 0; i < len; i++) {
            if (tileVersions[i].name == version) {
                layer.updateCurrentTileSetsIndex(i);
                layer.changeTilesVersion();
                break;
            }
        }
    },

    /**
     * @function ChangeTileVersion.prototype.getValue
     * @description 获取进度条的值。（注：进度条的值并不是版本号）。
     */
    getValue: function () {
        return this.slider.value;
    },

    /**
     * @function ChangeTileVersion.prototype.getVersion
     * @description 获取当前进度条的值对应的版本号。
     */
    getVersion: function () {
        var version = this.tileVersions[this.getValue()];
        return version && version.name;
    },

    _initLayout: function () {
        var className = 'leaflet-control-ctv';
        this._container = L.DomUtil.create('div', className + ' ' + className + '-' + this.options.orientation);
        //正常情况下显示btn
        this._sliderBtn = L.DomUtil.create('a', className + '-toggle', this._container);
        this._sliderBtn.setAttribute("title", this.options.title);
        this._sliderBtn.innerHTML = this.options.ico;

        //滑块拖动时值显示区域
        this._sliderValue = L.DomUtil.create('p', className + '-value', this._container);
        this._sliderValue.innerHTML = this.options.ico;

        var sliderClassName = "leaflet-ctv-slider";
        this._sliderContent = L.DomUtil.create('div', sliderClassName + "-main" + "  tooltip", this._container);

        //tooltip提示框
        this.tooltip = L.DomUtil.create("span", "tooltip-text" + "  " + "tooltip-" + this.options.tooltip, this._sliderContent);
        this.tooltip.innerHTML = this.options.ico;

        //加控件
        if (this.options.switch) {
            this._next = L.DomUtil.create('a', sliderClassName + "-incdec" + " " + sliderClassName + '-next', this._sliderContent);
            this._next.innerHTML = this.options.nextText;
            L.DomEvent.on(this._next, 'click', this.nextTilesVersion, this);
            L.DomUtil.addClass(this._container, className + '-incdec');
        }

        //滑块
        this._sliderContainer = L.DomUtil.create('div', sliderClassName + '-container', this._sliderContent);
        this.slider = L.DomUtil.create('input', sliderClassName, this._sliderContainer);


        this.min = this.min == null || isNaN(this.min) ? 0 : parseInt(this.min);
        this.slider.setAttribute("title", this.options.title);
        this.slider.setAttribute("id", "slider");
        this.slider.setAttribute("type", "range");
        this.slider.setAttribute("min", this.min);
        this.slider.setAttribute("max", 0);
        this.slider.setAttribute("step", 1);
        this.slider.setAttribute("value", 0);

        // //判断浏览器是否支持Range滑动条
        // if (this.slider.type == "text") {
        //     console.error("抱歉，您的浏览器不支持HTML5 range滑动条，请使用高版本浏览器");
        // }
        this.firstLoad = true;
        if ('oninput' in this.slider || 'onchange' in this.slider) {
            L.DomEvent.on(this.slider, "change", this._tilesVersion, this);
        } else {
            this.slider.onpropertychange = this._tilesVersion;
        }

        //减控件
        if (this.options.switch) {
            this._last = L.DomUtil.create('a', sliderClassName + "-incdec" + " " + sliderClassName + '-last', this._sliderContent);
            this._last.innerHTML = this.options.lastText;
            L.DomEvent.on(this._last, 'click', this.lastTilesVersion, this);
        }

        //if (window.matchMedia("screen and (-webkit-min-device-pixel-ratio:0)").matches && this.options.orientation == 'vertical') {
        if (this.options.orientation === 'vertical') {
            this.slider.style.width = 170 + 'px';
            this._sliderContainer.style.height = 170 + 'px';
        } else {
            this._sliderContainer.style.width = 150 + 'px';
        }

        L.DomEvent.disableClickPropagation(this._container);

        if (this.options.collapsed) {
            if (!L.Browser.android) {
                L.DomEvent
                    .on(this._container, 'mouseenter', this._expand, this)
                    .on(this._container, 'mouseleave', this._collapse, this);
            }

            if (L.Browser.touch) {
                L.DomEvent
                    .on(this._sliderBtn, 'click', L.DomEvent.stop)
                    .on(this._sliderBtn, 'click', this._expand, this);
            } else {
                L.DomEvent.on(this._sliderBtn, 'focus', this._expand, this);
            }
        } else {
            this._expand();
        }
        return this._container;
    },

    _expand: function () {
        L.DomUtil.addClass(this._container, 'leaflet-control-ctv-expanded');
    },

    _collapse: function () {
        L.DomUtil.removeClass(this._container, 'leaflet-control-ctv-expanded');
    },

    _tilesVersion: function () {
        var version = this.getVersion();
        this.tilesVersion(version);
    }


});

L.Map.mergeOptions({
    changeTileVersionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.changeTileVersionControl) {
        this.changeTileVersionControl = new ChangeTileVersion();
        this.addControl(this.changeTileVersionControl);
    }
});

export var changeTileVersion = function (options) {
    return new ChangeTileVersion(options);
};
