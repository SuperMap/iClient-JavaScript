/**
 * Class:ol.supermap.control.ChangeTileVersion
 * 版本切换控件(目前仅支持IE10及以上)
 * 暂时不支持自定义位置
 * 用法： var control = ol.supermap.control.ChangeTileVersion({
 *           layer: baseLayer,
 *           orientation: "horizontal"
 *      });
 *      map.addControl(control)
 */
require('../core/Base');
require('./ChangeTileVersion.css');
require('../mapping/TileSuperMapRest');
var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../common/SuperMap');
ol.supermap.control.ChangeTileVersion = function (options) {
    options = options || {};
    //鼠标滑过时提示
    if (!options.title) {
        options.title = "切换缓存版本";
    }
    //tooltip提示显示位置 top | right | bottom | left
    if (!options.tooltip) {
        options.tooltip = "top";
    }
    //是否折叠
    if (!options.collapsed) {
        options.collapsed = true;
    }
    //上一个版本的按钮布局
    if (!options.lastText) {
        options.lastText = "-";
    }
    //下一个版本的按钮布局
    if (!options.nextText) {
        options.nextText = "+";
    }

    //控件显示的logo
    if (!options.ico) {
        options.ico = "V";
    }
    //方向horizontal|vertical
    if (options.orientation !== 'vertical') {
        options.orientation = "horizontal";
    }
    //是否显示上/下一个版本切换控件
    if (!options.switch) {
        options.switch = true;
    }

    this.options = options;
    this.element = options.element = initLayout.call(this);
    ol.control.Control.call(this, options);

    if (options.layer) {
        this.setLayer(options.layer);
    }

    function initLayout() {
        var className = 'ol-control-ctv';
        this._container = createElement('div', className + ' ' + className + '-' + options.orientation + " ol-unselectable ol-control");
        //正常情况下显示btn
        this._sliderBtn = createElement('button', className + '-toggle', this._container);
        this._sliderBtn.setAttribute("title", options.title);
        this._sliderBtn.innerHTML = options.ico;

        //滑块拖动时值显示区域
        this._sliderValue = createElement('p', className + '-value', this._container);
        this._sliderValue.innerHTML = options.ico;
        this._sliderValue.setAttribute("title", options.title);

        var sliderClassName = "ol-ctv-slider";
        this._sliderContent = createElement('div', sliderClassName + "-main" + "  tooltip", this._container);

        //tooltip提示框
        if (options.orientation === "vertical" && options.tooltip === "top") {
            options.tooltip = "right";
        }
        this.tooltip = createElement("span", "tooltip-text" + "  " + "tooltip-" + options.tooltip, this._sliderContent);
        this.tooltip.innerHTML = options.ico;

        //加控件
        if (options.switch) {
            this._next = createElement('a', sliderClassName + "-incdec" + " " + sliderClassName + '-next', this._sliderContent);
            this._next.innerHTML = options.nextText;
            addDomEvent(this._next, 'click', this.nextTilesVersion, this);
            this._container.classList.add(className + '-incdec');
        }

        //滑块
        this._sliderContainer = createElement('div', sliderClassName + '-container', this._sliderContent);
        this.slider = createElement('input', sliderClassName, this._sliderContainer);

        this.slider.setAttribute("title", options.title);
        this.slider.setAttribute("id", "slider");
        this.slider.setAttribute("type", "range");
        this.slider.setAttribute("min", 0);
        this.slider.setAttribute("max", 0);
        this.slider.setAttribute("step", 1);
        this.slider.setAttribute("value", 0);

        //判断浏览器是否支持Range滑动条
        if (this.slider.type == "text") {
            alert("抱歉，您的浏览器不支持HTML5 range滑动条，请使用高版本浏览器");
        }
        this.firstLoad = true;
        if ('oninput' in this.slider || 'onchange' in this.slider) {
            addDomEvent(this.slider, "change", tilesVersion, this);
        } else {
            this.slider.onpropertychange = tilesVersion;
        }

        //减控件
        if (options.switch) {
            this._last = createElement('a', sliderClassName + "-incdec" + " " + sliderClassName + '-last', this._sliderContent);
            this._last.innerHTML = options.lastText;
            addDomEvent(this._last, 'click', this.lastTilesVersion, this);
        }

        if (window.matchMedia("screen and (-webkit-min-device-pixel-ratio:0)").matches && options.orientation == 'vertical') {
            this.slider.style.width = 170 + 'px';
            this._sliderContainer.style.height = 170 + 'px';
        }
        else if (options.orientation == 'vertical') {
            this._sliderContainer.style.height = 170 + 'px';
        }
        else {
            this._sliderContainer.style.width = 150 + 'px';
        }

        addDomEvent(this._container, "click", function (e) {
            e.preventDefault();
            e.stopPropagation();
        }, this);

        if (options.collapsed) {
            addDomEvent(this._container, 'mouseenter', expand, this);
            addDomEvent(this._container, 'mouseleave', collapse, this);
            addDomEvent(this._sliderBtn, 'click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
            addDomEvent(this._sliderBtn, 'click', expand, this);
            addDomEvent(this._sliderBtn, 'focus', expand, this);
        } else {
            expand();
        }
        return this._container;
    }

    function createElement(tagName, className, container) {
        var el = document.createElement(tagName);
        el.className = className || '';

        if (container) {
            container.appendChild(el);
        }
        return el;
    }

    function addDomEvent(obj, type, fn, context) {
        var handler = function (e) {
            if (fn) {
                return fn.call(context || obj, e || window.event);
            }
        };
        var originalHandler = handler;
        if ('addEventListener' in obj) {
            if (type === 'mousewheel') {
                obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, false);

            } else if ((type === 'mouseenter') || (type === 'mouseleave')) {
                handler = function (e) {
                    e = e || window.event;
                    if (isExternalTarget(obj, e)) {
                        originalHandler(e);
                    }
                };
                obj.addEventListener(type === 'mouseenter' ? 'mouseover' : 'mouseout', handler, false);

            } else {
                obj.addEventListener(type, handler, false);
            }

        } else if ('attachEvent' in obj) {
            obj.attachEvent('on' + type, handler);
        }
        return this;
    }

    function isExternalTarget(el, e) {
        var related = e.relatedTarget;
        if (!related) {
            return true;
        }
        try {
            while (related && (related !== el)) {
                related = related.parentNode;
            }
        } catch (err) {
            return false;
        }
        return (related !== el);
    }

    function expand() {
        this._container.classList.add('ol-control-ctv-expanded');
    }

    function collapse() {
        this._container.classList.remove('ol-control-ctv-expanded');
    }

    function tilesVersion(e) {
        var version = this.getVersion();
        this.tilesVersion(version);
    }


};
ol.inherits(ol.supermap.control.ChangeTileVersion, ol.control.Control);

//设置版本相关信息
//@param version {name:{String},desc:{String}}
ol.supermap.control.ChangeTileVersion.prototype.setContent = function (version) {
    var content = version || {};
    this.setVersionName(content.desc).setToolTip(content.desc);
};
//设置版本号
//@param content String
ol.supermap.control.ChangeTileVersion.prototype.setVersionName = function (content) {
    var value = content;
    if (!content) {
        value = this.getValue();
    }
    this._sliderValue.innerHTML = value;
    return this;
};

//设置提示信息
//@param tooltip HTMLElement|String
ol.supermap.control.ChangeTileVersion.prototype.setToolTip = function (tooltip) {
    this.tooltip.innerHTML = tooltip;
    return this;
};

//更新进度条长度
ol.supermap.control.ChangeTileVersion.prototype.updateLength = function (length) {
    if (length > 0) {
        this.length = length;
        this.slider.setAttribute("max", this.length - 1);
    }
    return this;
};

//绑定图层
ol.supermap.control.ChangeTileVersion.prototype.setLayer = function (layer) {
    if (layer) {
        this.options.layer = layer;
    }
    var me = this;
    var tileLayer = me.options.layer;
    tileLayer.on("tilesetsinfoloaded", function (evt) {
        var tileVersions = evt.result && evt.result.tileVersions;
        me.update(tileVersions);
    });
    tileLayer.on("tileversionschanged", function (evt) {
        var tileVersions = evt.result && evt.result.tileVersion;
        me.setContent(tileVersions);
    });
    me.getTileSetsInfo();
    return this;
};

//更新缓存切片集及进度条长度
ol.supermap.control.ChangeTileVersion.prototype.update = function (tileVersions) {
    this.tileVersions = tileVersions;
    this.updateLength(this.tileVersions.length);
};

//请求获取切片集信息
ol.supermap.control.ChangeTileVersion.prototype.getTileSetsInfo = function () {
    if (!this.options.layer) {
        return;
    }
    this.options.layer.getTileSetsInfo();
    return this;
};

//移除绑定的地图图层
ol.supermap.control.ChangeTileVersion.prototype.removeLayer = function () {
    this.options.layer = null;
    return this;
};

//下一个版本
// 第一次不进行加减，是无版本的状态
ol.supermap.control.ChangeTileVersion.prototype.nextTilesVersion = function () {
    if (this.firstLoad) {
        this.options.layer.nextTilesVersion();
        this.firstLoad = !!0;
        return this;
    }
    this.slider.value = this.slider.value + 1;
    this.options.layer.nextTilesVersion();
    return this;
};

//上一个版本
ol.supermap.control.ChangeTileVersion.prototype.lastTilesVersion = function () {
    this.slider.value = this.slider.value - 1;
    this.options.layer.lastTilesVersion();
    return this;
};

//根据指定版本号请求版本
ol.supermap.control.ChangeTileVersion.prototype.tilesVersion = function (version) {
    var layer = this.options.layer,
        tileVersions = this.tileVersions;
    len = tileVersions.length;
    for (var i = 0; i < len; i++) {
        if (tileVersions[i].name == version) {
            layer.updateCurrentTileSetsIndex(i);
            layer.changeTilesVersion();
            break;
        }
    }
};

//获取进度条的值
//注：(进度条的值并不是版本号)
ol.supermap.control.ChangeTileVersion.prototype.getValue = function () {
    return this.slider.value;
};

//获取当前进度条值对应的版本号
ol.supermap.control.ChangeTileVersion.prototype.getVersion = function () {
    var version = this.tileVersions[this.getValue()];
    return version && version.name;
};

module.exports = ol.supermap.control.ChangeTileVersion;