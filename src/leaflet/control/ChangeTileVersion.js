/**
 * Class:ChangeTileVersion
 * 版本切换控件(目前仅支持IE10及以上)
 * 用法： L.supermap.control.changeTileVersion({
 *      layer: baseLayer,
 *      position: "topleft",
 *      orientation: "horizontal"
 *  }).addTo(map);
 */
import '../core/Base';
import './css/ChangeTileVersion.css';
import '../mapping/TiledMapLayer' ;
import L from "leaflet";
import {MapService} from "../services/MapService";
export var ChangeTileVersion = L.Control.extend({

    options: {
        //绑定的底图图层
        layer: null,
        //控件位置 继承自leaflet control
        position: 'topleft',
        //鼠标滑过时提示
        title: '切换缓存版本',
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
        switch: true,
    },

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

    //设置版本相关信息
    //@param version {name:{String},desc:{String}}
    setContent: function (version) {
        var content = L.Util.extend({}, version);
        this.setVersionName(content.desc).setToolTip(content.desc);
    },

    //设置版本号
    //@param content String
    setVersionName: function (content) {
        var value = content;
        if (!content) {
            value = this.getValue();
        }
        this._sliderValue.innerHTML = value;
        return this;
    },

    //设置提示信息
    //@param tooltip HTMLElement|String
    setToolTip: function (tooltip) {
        this.tooltip.innerHTML = tooltip;
        return this;
    },

    //更新进度条长度
    updateLength: function (length) {
        if (length > 0) {
            this.length = length;
            this.slider.setAttribute("max", this.length - 1);
        }
        return this;
    },

    //绑定图层
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
        return this;
    },

    //更新缓存切片集及进度条长度
    update: function (tileVersions) {
        this.tileVersions = tileVersions;
        this.updateLength(this.tileVersions.length);
    },

    //请求获取切片集信息
    getTileSetsInfo: function () {
        var me = this;
        if (me.options.layer) {
            new MapService(me.options.layer._url).getTilesets(getTilesInfoSucceed);
            function getTilesInfoSucceed(info) {
                me.options.layer.serTileSetsInfo(info.result);
            }

        }
        return this;
    },

    //移除绑定的地图图层
    removeLayer: function () {
        this.options.layer = null;
        return this;
    },

    //下一个版本
    // 第一次不进行加减，是无版本的状态
    nextTilesVersion: function () {
        if (this.firstLoad) {
            this.options.layer.nextTilesVersion();
            this.firstLoad = !!0;
            return this;
        }
        this.slider.value = this.slider.value + 1;
        this.options.layer.nextTilesVersion();
        return this;
    },

    //上一个版本
    lastTilesVersion: function () {
        this.slider.value = this.slider.value - 1;
        this.options.layer.lastTilesVersion();
        return this;
    },

    //根据指定版本号请求版本
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

    //获取进度条的值
    //注：(进度条的值并不是版本号)
    getValue: function () {
        return this.slider.value;
    },

    //获取当前进度条值对应的版本号
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

        this.slider.setAttribute("title", this.options.title);
        this.slider.setAttribute("id", "slider");
        this.slider.setAttribute("type", "range");
        this.slider.setAttribute("min", 0);
        this.slider.setAttribute("max", 0);
        this.slider.setAttribute("step", 1);
        this.slider.setAttribute("value", 0);

        //判断浏览器是否支持Range滑动条
        if (this.slider.type == "text") {
            console.error("抱歉，您的浏览器不支持HTML5 range滑动条，请使用高版本浏览器");
        }
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

        if (window.matchMedia("screen and (-webkit-min-device-pixel-ratio:0)").matches && this.options.orientation == 'vertical') {
            this.slider.style.width = 170 + 'px';
            this._sliderContainer.style.height = 170 + 'px';
        }
        else if (this.options.orientation == 'vertical') {
            this._sliderContainer.style.height = 170 + 'px';
        }
        else {
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

    _tilesVersion: function (e) {
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

L.supermap.control.changeTileVersion = changeTileVersion;