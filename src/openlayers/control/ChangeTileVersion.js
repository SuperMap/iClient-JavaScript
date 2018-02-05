import './css/ChangeTileVersion.css';
import ol from 'openlayers';
import {MapService} from "../services/MapService"

ol.supermap = ol.supermap || {};
ol.supermap.control = ol.supermap.control || {};

/**
 * @class ol.supermap.control.ChangeTileVersion
 * @category  Control
 * @classdesc 版本切换控件(目前仅支持IE10及以上)暂时不支持自定义位置
 * @extends ol.control.Control{@linkdoc-openlayers/ol.control.Control}
 * @param options -{options} 可选参数。如：<br>
 *        title - {string} 提示信息。<br>
 *        tooltip - {string} 提示显示位置 top | right | bottom | left。<br>
 *        collapsed - {boolean} 是否折叠。<br>
 *        lastText - {string} 上一个版本的按钮布局。<br>
 *        nextText - {string} 下一个版本的按钮布局。<br>
 *        ico - {string} 控件显示的logo。<br>
 *        orientation - {string} 方向horizontal|vertical。<br>
 *        switch - {boolean} 是否显示上/下一个版本切换控件
 * @example
 * var control = new ol.supermap.control.ChangeTileVersion({
 *           layer: baseLayer,
 *           orientation: "horizontal"
 *      });
 *      map.addControl(control)
 */
export class ChangeTileVersion extends ol.control.Control {

    constructor(options) {
        options = options || {};
        //鼠标滑过时提示
        if (!options.title) {
            options.title = "switch tile version";
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
        super(options);
        this.options = options;
        this.element = options.element = initLayout.call(this);

        if (options.layer) {
            this.setLayer(options.layer);
        }

        /*
         * @function ol.supermap.control.ChangeTileVersion.prototype.initLayout
         * @description 初始化
         */
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

            this.min = this.min == null || isNaN(this.min) ? 0 : parseInt(this.min);
            this.slider.setAttribute("title", options.title);
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

            // if (window.matchMedia("screen and (-webkit-min-device-pixel-ratio:0)").matches && options.orientation == 'vertical') {
            if (options.orientation == 'vertical') {
                this.slider.style.width = 170 + 'px';
                this._sliderContainer.style.height = 170 + 'px';
            } else {
                this._sliderContainer.style.width = 150 + 'px';
            }

            /*
             * @function ol.supermap.control.ChangeTileVersion.prototype.addDomEvent
             * @description 为元素添加事件
             */
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

        /*
         * @function ol.supermap.control.ChangeTileVersion.prototype.createElement
         * @description 新建元素
         * @param tagName -{string} 标签名
         * @param className -{string} 类名
         * @param container -{Object} 容器
         * @return {object|Element} 元素
         */
        function createElement(tagName, className, container) {
            var el = document.createElement(tagName);
            el.className = className || '';

            if (container) {
                container.appendChild(el);
            }
            return el;
        }

        /*
         * @function ol.supermap.control.ChangeTileVersion.prototype.addDomEvent
         * @description 为元素添加事件
         * @param obj -{Object} 事件对象集
         * @param type -{string} 事件类型
         * @param fn -{Object} 容器
         * @param context -{Object} 当前环境
         * @return {addDomEvent} 添加的事件
         */
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

        function tilesVersion() {
            var version = this.getVersion();
            this.tilesVersion(version);

        }
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.setContent
     * @description 设置版本相关信息
     * @param version -{Object} 版本信息
     */
    setContent(version) {
        var content = version || {};
        this.setVersionName(content.desc).setToolTip(content.desc);
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.setVersionName
     * @description 设置版本号
     * @param content -{string} 版本内容
     */
    setVersionName(content) {
        var value = content;
        if (!content) {
            value = this.getValue();
        }
        this._sliderValue.innerHTML = value;
        return this;
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.setToolTip
     * @description 设置提示信息
     * @param tooltip -{string} 工具提示
     * @return {this} this
     */
    setToolTip(tooltip) {
        this.tooltip.innerHTML = tooltip;
        return this;
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.updateLength
     * @description 更新进度条长度
     * @param length -{number} 进度条长度
     */
    updateLength(length) {
        if (length > 0) {
            this.length = length;
            this.max = this.length - 1;
            this.slider.setAttribute("max", this.max);
        }
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.setLayer
     * @description 绑定图层
     * @param layer -{Object} 图层
     */
    setLayer(layer) {
        if (layer) {
            this.options.layer = layer;
        }
        var me = this;
        var tileLayer = me.options.layer;
        tileLayer.on("tilesetsinfoloaded", function (evt) {
            var tileVersions = evt.value && evt.value.tileVersions;
            me.update(tileVersions);
        });
        tileLayer.on("tileversionschanged", function (evt) {
            var tileVersions = evt.value && evt.value.tileVersion;
            me.setContent(tileVersions);
        });
        me.getTileSetsInfo();
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.update
     * @description 更新缓存切片集及进度条长度
     * @param tileVersions -{Object} 待更新的切片版本
     */
    update(tileVersions) {
        this.tileVersions = tileVersions;
        this.updateLength(this.tileVersions.length);
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.getTileSetsInfo
     * @description 请求获取切片集信息
     */
    getTileSetsInfo() {
        var me = this;
        if (me.options.layer) {
            new MapService(me.options.layer._url).getTilesets(function getTilesInfoSucceed(info) {
                me.options.layer.setTileSetsInfo(info.result);
            });
        }
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.removeLayer
     * @description 移除绑定的地图图层
     */
    removeLayer() {
        this.options.layer = null;
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.nextTilesVersion
     * @description 下一个版本，第一次不进行加减，是无版本的状态
     * @return {this} this
     */
    nextTilesVersion() {
        if (this.firstLoad) {
            this.options.layer.nextTilesVersion();
            this.firstLoad = !!0;
            return this;
        }
        if (parseInt(this.slider.value) > this.max - 1) {
            return this;
        }
        this.slider.value = parseInt(this.slider.value) + 1;
        this.options.layer.nextTilesVersion();
        return this;
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.lastTilesVersion
     * @description 获取上一个版本信息
     * @return {this} this
     */
    lastTilesVersion() {
        if (parseInt(this.slider.value) < this.min + 1) {
            return this;
        }
        this.slider.value = parseInt(this.slider.value) - 1;
        this.options.layer.lastTilesVersion();
        return this;
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.tilesVersion
     * @description 根据指定版本号请求版本
     * @param version -{Object} 版本信息
     */
    tilesVersion(version) {
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
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.getValue
     * @description 获取进度条的值。注：(进度条的值并不是版本号)
     */
    getValue() {
        return this.slider.value;
    }

    /**
     * @function ol.supermap.control.ChangeTileVersion.prototype.getVersion
     * @description 获取当前进度条值对应的版本号
     */
    getVersion() {
        var version = this.tileVersions[this.getValue()];
        return version && version.name;
    }
}

ol.supermap.control.ChangeTileVersion = ChangeTileVersion;