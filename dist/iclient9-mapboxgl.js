/*!
 * 
 *     iclient9-mapboxgl.(http://iclient.supermapol.com)
 *     Copyright© 2000-2017 SuperMap Software Co. Ltd
 *     license: Apache-2.0
 *     version: v9.0.0
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = mapboxgl;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _iClient = __webpack_require__(8);

var _iClient2 = _interopRequireDefault(_iClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class mapboxgl.supermap.LogoControl
 * @classdesc Logo控件。默认不显示</br>
 *
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.supermap.LogoControl(),'bottom-right');
 * (end)
 * @param options -{Object} logo控件配置项</br>
 *        imageUrl - {string} logo图片地址</br>
 *        width - {string} logo图片宽</br>
 *        height - {string} logo图片高</br>
 *        link - {string} 跳转链接</br>
 *        alt - {string} logo图片失效时显示文本
 */
var Logo = exports.Logo = function () {
    //logo图片高

    //跳转链接
    function Logo(options) {
        _classCallCheck(this, Logo);

        this.imageUrl = null;
        this.link = null;
        this.width = null;
        this.height = null;
        this.alt = "SuperMap iClient";

        this._extend(this, options);
    }

    /**
     * @function mapboxgl.supermap.LogoControl.prototype.onAdd
     * @description 添加一个logo
     * @return {div} 返回创建的logo元素
     */

    //logo图片失效时显示文本

    //logo图片宽


    //logo图片地址


    _createClass(Logo, [{
        key: 'onAdd',
        value: function onAdd(map) {
            this._map = map;
            this._container = document.createElement('div');
            this._container.className = 'mapboxgl-ctrl iclient-logo';
            this._container.style.marginTop = 0;
            this._container.style.marginBottom = 0;
            this._container.style.marginLeft = 0;
            this._container.style.marginRight = 0;

            var imgSrc = _iClient2.default;
            if (this.imageUrl) {
                imgSrc = this.imageUrl;
            }
            var alt = this.alt;

            var imageWidth = "94px";
            var imageHeight = "29px";
            var styleSize = "width:" + imageWidth + ";height:" + imageHeight + ";";
            if (this.imageUrl) {
                imageWidth = this.width;
                imageHeight = this.height;
                styleSize = "width:" + imageWidth + ";height:" + imageHeight + ";";
                if (!imageWidth || !imageHeight) {
                    styleSize = "";
                }
            }
            var link = this.link || "http://iclient.supermapol.com";
            this._container.innerHTML = "<a href='" + link + "' target='_blank'>" + "<img src=" + imgSrc + " alt='" + alt + "' style='" + styleSize + "margin-bottom: 2px'></a>";
            this._createStyleSheet();
            return this._container;
        }
    }, {
        key: '_createStyleSheet',
        value: function _createStyleSheet() {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = ".iclient-logo{" + "margin:0 !important;" + "}" + ".iclient-logo a{" + "border: none;" + "display: block;" + "height:31px;" + "}" + ".iclient-logo img{" + "border: none;" + "white-space: nowrap" + "}";
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }, {
        key: '_extend',
        value: function _extend(dest) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var src = _step.value;

                    for (var k in src) {
                        dest[k] = src[k];
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return dest;
        }
    }]);

    return Logo;
}();

_mapboxGl2.default.supermap = _mapboxGl2.default.supermap || {};
_mapboxGl2.default.supermap.LogoControl = Logo;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapvLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MapvRenderer = __webpack_require__(7);

var _MapvRenderer2 = _interopRequireDefault(_MapvRenderer);

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class mapboxgl.supermap.MapvLayer
 * @classdesc Mapv图层
 * @param map - {Object} 地图
 * @param dataSet -{Object} 数据集
 * @param mapVOptions -{Object} Mapv参数
 */
var MapvLayer = exports.MapvLayer = function () {
    function MapvLayer(map, dataSet, mapVOptions) {
        _classCallCheck(this, MapvLayer);

        this.map = map;
        this.renderer = new _MapvRenderer2.default(map, this, dataSet, mapVOptions);
        this.canvas = this._createCanvas();
        this.renderer._canvasUpdate();
        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.getTopLeft
     * @description 获取左上的距离
     */


    _createClass(MapvLayer, [{
        key: 'getTopLeft',
        value: function getTopLeft() {
            var map = this.map;
            var topLeft;
            if (map) {
                var bounds = map.getBounds();
                topLeft = bounds.getNorthWest();
            }
            return topLeft;
        }
    }, {
        key: 'show',
        value: function show() {
            if (this.renderer) {
                this.renderer._show();
            }
            return this;
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.renderer) {
                this.renderer._hide();
            }
            return this;
        }
    }, {
        key: '_createCanvas',
        value: function _createCanvas() {
            var canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.top = 0 + "px";
            canvas.style.left = 0 + "px";
            canvas.width = parseInt(this.map.getCanvas().style.width);
            canvas.height = parseInt(this.map.getCanvas().style.height);
            canvas.style.width = this.map.getCanvas().style.width;
            canvas.style.height = this.map.getCanvas().style.height;
            return canvas;
        }
    }]);

    return MapvLayer;
}();

_mapboxGl2.default.supermap = _mapboxGl2.default.supermap || {};
_mapboxGl2.default.supermap.MapvLayer = MapvLayer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RankTheme3DLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class mapboxgl.supermap.RankTheme3DLayer
 * @classdesc mapbox gl分段专题图
 * @param  id -{string} 专题图图层id
 * @param  map -{object} mapbox gl地图对象
 * @param  layerOptions -{Object} 专题图图层配置项<br>
 *             opacity -{number} 图层透明度，默认1<br>
 *             parseNumber -{boolean} 是否预处理数据，将数据转换为number，默认false<br>
 *             baseHeightField -{string} 数据中表示基础高度的字段<br>
 *             heightField -{string} 数据中表示高度的字段<br>
 *             heightStops -{Array} 数据高度分段数组<br>
 *             colorField -{string} 数据中表示颜色的字段<br>
 *             colorStops -{Array} 数据颜色分段数组<br>
 *             base -{number} 数据分段线性增量<br>
 *             showLegend -{boolean} 是否显示图例,默认显示<br>
 *             legendTitle -{string} 图例标题<br>
 *             legendTheme -{string} 图例主题，取值：'light','dark'<br>
 *             legendRatio -{number} 图例数值扩大系数，<br>
 *             legendPosition -{string} 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'<br>
 */
var RankTheme3DLayer = exports.RankTheme3DLayer = function () {
    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.legendTheme -{string}
     * @description 图例主题，取值：'light','dark'
     * @default 'light'
     */


    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.legendTitle -{string}
     * @description 图例标题
     */

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.base -{number}
     * @description 数据分段线性增量
     */


    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.colorField -{string}
     * @description 数据中表示颜色的字段
     */


    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.heightField -{string}
     * @description 数据中表示高度的字段
     */

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.parseNumber -{boolean}
     * @description 是否进行数据预处理,有些字段是string类型，需要转换为number
     */


    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.map -{object}
     * @description mapbox gl地图对象
     */
    function RankTheme3DLayer(id, map, layerOptions) {
        _classCallCheck(this, RankTheme3DLayer);

        this.id = null;
        this.map = null;
        this.opacity = 1;
        this.parseNumber = false;
        this.baseHeightField = null;
        this.heightField = null;
        this.heightStops = null;
        this.colorField = null;
        this.colorStops = null;
        this.base = null;
        this.showLegend = true;
        this.legendTitle = null;
        this.legendRatio = 1;
        this.legendTheme = 'light';
        this.legendPosition = 'bottom-right';

        this.id = id;
        this.map = map;
        this._extend(this, layerOptions);
        this.heightField = layerOptions.heightField || 'height';
        this.colorField = layerOptions.colorField || this.heightField;
    }

    /**
     * @function mapboxgl.supermap.RankTheme3DLayer.prototype.setLayerOptions
     * @description 设置图层相关参数
     * @param layerOptions -{object} 该专题图图层相关参数<br>
     * *          opacity -{number} 图层透明度，默认1<br>
     *            parseNumber -{boolean} 是否预处理数据，将数据转换为number，默认false<br>
     *            baseHeightField -{string} 数据中表示基础高度的字段<br>
     *            heightField -{string} 数据中表示高度的字段<br>
     *            heightStops -{Array} 数据高度分段数组<br>
     *            colorField -{string} 数据中表示颜色的字段<br>
     *            colorStops -{Array} 数据颜色分段数组<br>
     *            base -{number} 数据分段线性增量<br>
     *            showLegend -{boolean} 是否显示图例,默认显示<br>
     *            legendTitle -{string} 图例标题<br>
     *            legendRatio -{number} 图例数值扩大系数，<br>
     *            legendTheme -{string} 图例主题，取值：'light','dark'<br>
     *            legendPosition -{string} 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'<br>
     * @returns {mapboxgl.supermap.RankTheme3DLayer}
     */

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.legendPosition -{string}
     * @description 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'
     * @default 'bottom-right'
     */

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.legendRatio -{number}
     * @description 图例数值扩大系数
     */

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.showLegend -{Boolean}
     * @description 是否显示图例
     */

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.colorStops -{Array}
     * @description 数据颜色分段数组
     */

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.heightStops -{Array}
     * @description 数据高度分段数组
     */


    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.baseHeightField -{string}
     * @description 数据中表示基础高度的字段
     */

    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.opacity -{number}
     * @description 图层透明度，默认1
     */


    /**
     * @member  mapboxgl.supermap.RankTheme3DLayer.prototype.id -{string}
     * @description mapbox gl图层id
     */


    _createClass(RankTheme3DLayer, [{
        key: 'setLayerOptions',
        value: function setLayerOptions(layerOptions) {
            this._extend(this, layerOptions);
            return this;
        }

        /**
         * @function mapboxgl.supermap.RankTheme3DLayer.prototype.setData
         * @description 设置数据，数据格式必须为geojson格式
         * @param data -{object} geojson格式数据
         * @param parseNumber -{object} 是否进行数据预处理,有些字段是string类型，需要转换为number
         */

    }, {
        key: 'setData',
        value: function setData(data, parseNumber) {
            var me = this;
            me.data = data;
            if (parseNumber != null) {
                me.parseNumber = parseNumber;
            }
            me.parseNumber && me.data && me.data.features && me.data.features.map(function (val, index) {
                if (me.baseHeightField && val.properties[me.baseHeightField]) {
                    val.properties[baseHeightField] = parseFloat(val.properties[baseHeightField]);
                }
                if (me.heightField && val.properties[me.heightField]) {
                    val.properties[me.heightField] = parseFloat(val.properties[me.heightField]);
                }
            });
            return this;
        }

        /**
         * @function mapboxgl.supermap.RankTheme3DLayer.prototype.getData
         * @description 获取数据，返回的数据格式为geojson
         * @returns {Object}
         */

    }, {
        key: 'getData',
        value: function getData() {
            return this.data;
        }

        /**
         * @function mapboxgl.supermap.RankTheme3DLayer.prototype.show
         * @description 显示图层
         * @param options -{object} 图层相关参数，如图例标题和主题等
         * @returns {mapboxgl.supermap.RankTheme3DLayer}
         */

    }, {
        key: 'show',
        value: function show(options) {
            this._addLayer();
            this._extend(this, options);
            if (this.showLegend) {
                if (this.legend) {
                    map.addControl(legend, this.legendPosition);
                } else {
                    var defaultLegend = this._createLegendControl();
                    this.map.addControl(defaultLegend, this.legendPosition);
                }
            }
            return this;
        }
    }, {
        key: '_createLegendControl',
        value: function _createLegendControl(html) {
            var me = this;

            function LegendControl() {}

            LegendControl.prototype.onAdd = function (map) {
                this._map = map;
                this._container = document.createElement('div');
                var className = 'mapboxgl-ctrl legend ';
                var theme = 'legend-light';
                if (me.legendTheme === 'dark') {
                    theme = 'legend-dark';
                }
                this._container.className = className + theme;

                if (html) {
                    this._container.innerHTML = html;
                } else {
                    this._container.innerHTML = me._createLegendElement.call(me);
                }
                me._appendLegendCSSStyle();
                return this._container;
            };

            LegendControl.prototype.onRemove = function () {
                this._container.parentNode.removeChild(this._container);
                this._map = undefined;
            };

            return new LegendControl();
        }
    }, {
        key: '_createLegendElement',
        value: function _createLegendElement() {
            var len = this.colorStops && this.colorStops.length || 0;
            var titleWidth = len * 60;
            //图例标题
            var titleElement = "";
            var legendTitle = this.legendTitle || "";
            titleElement = " <p class='legend-title' style='width: " + titleWidth + ";'>" + legendTitle + "</p>";
            //颜色分段对应标识
            var colorGalleryElement = "<ul>";
            var valueGalleryElement = "<ul>";
            for (var i = 0; i < len; i++) {
                var value = this.colorStops[i][0];
                this.legendRatio = this.legendRatio == null ? 1 : this.legendRatio;
                value = value * this.legendRatio;
                var text = this._getWrapperText(value);
                var color = this.colorStops[i][1];
                colorGalleryElement += "<li style='background-color:" + color + ";'></li>";
                valueGalleryElement += "<li>" + text + "</li>";
            }
            colorGalleryElement += "</ul>";
            valueGalleryElement += "</ul>";
            return titleElement + colorGalleryElement + valueGalleryElement;
        }
    }, {
        key: '_appendLegendCSSStyle',
        value: function _appendLegendCSSStyle() {
            var legendStyle = document.createElement('style');
            legendStyle.type = 'text/css';
            legendStyle.innerHTML = " .legend {\n" + "            display: inline-block;\n" + "            padding: 4px 10px;\n" + "            border-radius: 2px;\n" + "            -moz-border-radius: 2px;\n" + "            -webkit-border-radius: 2px;\n" + "            font-size: 12px;\n" + "            color: rgba(0, 0, 0, 0.8);\n" + "            background-color: rgb(255, 255, 255);\n" + "        }\n" + "        .legend-light {\n" + "            color: rgba(0, 0, 0, 0.8);\n" + "            background-color: rgb(255, 255, 255);\n" + "        }\n" + "        .legend-dark {\n" + "            color: rgba(255, 255, 255, 0.8);\n" + "            background-color: rgb(64, 64, 64);\n" + "        }\n" + "        .legend ul {\n" + "            clear: both;\n" + "            overflow: auto;\n" + "            padding: 0;\n" + "            margin: 0;\n" + "            height: 100%;\n" + "            display: block;\n" + "            list-style: none;\n" + "            box-sizing: border-box;\n" + "            -webkit-font-smoothing: antialiased;\n" + "        }\n" + "        .legend li {\n" + "            float: left;\n" + "            width: 50px;\n" + "            height: 28px;\n" + "            overflow: hidden;\n" + "            text-overflow: clip;\n" + "            padding: 0 4px;\n" + "            line-height: 28px;\n" + "        }\n" + "        .legend .legend-title {\n" + "            min-height: 14px;\n" + "            max-width: 500px;\n" + "            margin: 4px 0;\n" + "        }\n" + "       .legend-light .legend-title {\n" + "            color: rgba(0, 0, 0, 0.8);\n" + "        }\n" + "        .legend-dark .legend-title {\n" + "            color: rgba(255, 255, 255, 0.8);\n" + "        }";
            document.getElementsByTagName('head')[0].appendChild(legendStyle);
        }
    }, {
        key: '_getWrapperText',
        value: function _getWrapperText(number) {
            //单个颜色值宽度为60px,最大只能完全显示1000000，否则就超出宽度，则显示以为k计数单位的值
            var num = parseFloat(number);
            if (num % 1000000 <= 1000000) {
                return num.toString();
            }
            return parseInt(num / 1000) + 'k';
        }
    }, {
        key: '_addLayer',
        value: function _addLayer() {
            var paintOptions = this._getPaintOptions();
            var id = this.id ? this.id : "rankTheme";
            var sourceId = id + 'Source';
            if (!this.map.getSource(sourceId)) {
                this.map.addSource(sourceId, {
                    'type': 'geojson',
                    'data': this.data
                });
            } else {
                this.map.removeSource(sourceId);
                this.map.addSource(sourceId, {
                    'type': 'geojson',
                    'data': this.data
                });
            }
            this.map.addLayer({
                'id': id,
                'type': 'fill-extrusion',
                'source': sourceId,
                'paint': paintOptions
            }, id);
            this.map.moveLayer(id);
        }
    }, {
        key: '_getPaintOptions',
        value: function _getPaintOptions() {
            var opacity = this.opacity == null ? 1 : this.opacity;
            opacity = isNaN(parseFloat(opacity)) ? 1 : parseFloat(opacity);
            var reg = /^[0-9]+.?[0-9]*$/;
            var options = {
                'fill-extrusion-color': {
                    'stops': this.colorStops,
                    'property': this.colorField || this.heightField,
                    'base': reg.test(this.base) ? this.base : 1
                },
                'fill-extrusion-opacity': opacity
            };
            if (this.heightStops) {
                options['fill-extrusion-height'] = {
                    'stops': this.heightStops,
                    'property': this.heightField || 'height',
                    'base': reg.test(this.base) ? this.base : 1
                };
            } else {
                options['fill-extrusion-height'] = {
                    'property': this.heightField || 'height',
                    'type': 'identity'
                };
            }

            if (this.baseHeightField) {
                options['fill-extrusion-base'] = {
                    'property': this.baseHeightField,
                    'type': 'identity'
                };
            }
            return options;
        }
    }, {
        key: '_extend',
        value: function _extend(dest) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var src = _step.value;

                    for (var k in src) {
                        dest[k] = src[k];
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return dest;
        }
    }]);

    return RankTheme3DLayer;
}();

_mapboxGl2.default.supermap = _mapboxGl2.default.supermap || {};
_mapboxGl2.default.supermap.RankTheme3DLayer = RankTheme3DLayer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPaintProperty = exports.setBackground = exports.getDefaultVectorTileStyle = undefined;

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mapboxGl2.default.supermap = _mapboxGl2.default.supermap || {};
_mapboxGl2.default.supermap.map = _mapboxGl2.default.supermap.map || {};

/**
 * 配置默认底图样式
 */
var getDefaultVectorTileStyle = exports.getDefaultVectorTileStyle = function getDefaultVectorTileStyle(urlTemplate, options) {
    options = options || {};
    var defaultOptions = {};
    defaultOptions.version = options.version || 8;
    defaultOptions.layers = options.layers || [];
    defaultOptions.light = options.light || {
        "anchor": "viewport",
        "color": "#fcf6ef",
        "intensity": 0.5,
        "position": [1.15, 201, 20]
    };

    var style = {
        "version": defaultOptions.version,
        "sources": {
            "vector-tiles": {
                "type": "vector",
                "tiles": [urlTemplate]
            }
        },
        "layers": defaultOptions.layers,
        "light": defaultOptions.light
    };
    if (options.sprite != null) {
        style.sprite = options.sprite;
    }
    if (options.glyphs != null) {
        style.glyphs = options.glyphs;
    }
    return style;
};

/**
 * 设置地图背景
 */
var setBackground = exports.setBackground = function setBackground(map, color) {
    if (color && map) {
        map.addLayer({
            "id": "background",
            "type": "background",
            "paint": {
                "background-color": color
            }
        }, "background");
    }
};

/**
 * 设置图层风格
 * @param map
 * @param layerIds
 * @param type
 * @param paint
 * @param source 非必填，默认vector-tiles
 * @param sourceLayers 非必填，默认与id对应
 */
var setPaintProperty = exports.setPaintProperty = function setPaintProperty(map, layerIds, type, paint, source, sourceLayers) {
    if (layerIds && map) {
        if (Object.prototype.toString.call(layerIds) !== '[object Array]') {
            layerIds = [layerIds];
        }
        for (var i = 0; i < layerIds.length; i++) {
            var sourceLayer = sourceLayers ? sourceLayers[i] : null;
            var layer = getLayer(layerIds[i], type, source, sourceLayer, paint);
            map.addLayer(layer, layerIds[i]);
            map.moveLayer(layerIds[i]);
        }
    }
};

function getLayer(id, type, source, sourceLayer, paint) {
    var sourceType = source || "vector-tiles";
    var sLayer = sourceLayer || id;
    var layer = {
        "id": id,
        "type": type,
        "source": sourceType,
        "source-layer": sLayer,
        "paint": paint
    };
    return layer;
}

_mapboxGl2.default.supermap.map.getDefaultVectorTileStyle = getDefaultVectorTileStyle;
_mapboxGl2.default.supermap.map.setBackground = setBackground;
_mapboxGl2.default.supermap.map.setPaintProperty = setPaintProperty;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapvDataSet = undefined;

var _mapboxGl = __webpack_require__(0);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

var _mapv = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mapboxGl2.default.supermap = _mapboxGl2.default.supermap || {};

var MapvDataSet = exports.MapvDataSet = {

    /**
     * 返回mapv点数据集
     */
    getPoint: function getPoint(center) {
        if (center && center instanceof Array) {
            return new _mapv.DataSet([{
                geometry: {
                    type: 'Point',
                    coordinates: center
                }
            }]);
        }
    },

    /**
     * 返回mapv多点数据集
     */
    getPoints: function getPoints(points) {
        if (points && points instanceof Array) {
            var mPoints = [];
            points.map(function (data) {
                mPoints.push({
                    geometry: {
                        type: 'Point',
                        coordinates: data.geometry.coordinates
                    }
                });
            });
            return new _mapv.DataSet(mPoints);
        }
    },

    /**
     * 返回mapv弧形线数据集
     */
    getCurveLines: function getCurveLines(startPoint, LinePoints) {
        if (startPoint && startPoint instanceof Array && LinePoints && LinePoints instanceof Array) {
            var lineData = [];
            LinePoints.map(function (data) {
                var coords = data.geometry && data.geometry.coordinates;
                var toCenter = { lng: coords[0], lat: coords[1] };
                var fromCenter = { lng: startPoint[0], lat: startPoint[1] };
                var cv = _mapv.utilCurve.getPoints([fromCenter, toCenter]);
                lineData.push({
                    geometry: {
                        type: 'LineString',
                        coordinates: cv
                    }
                });
            });
            return new _mapv.DataSet(lineData);
        }
    },

    /**
     * 返回mapv弧形动态点数据集
     */
    getCurveDynamicPoints: function getCurveDynamicPoints(center, endPoints) {
        if (center && center instanceof Array && endPoints && endPoints instanceof Array) {
            var timeData = [];
            endPoints.map(function (data) {
                var coords = data.geometry && data.geometry.coordinates;
                var toCenter = { lng: coords[0], lat: coords[1] };
                var fromCenter = { lng: center[0], lat: center[1] };
                var cv = _mapv.utilCurve.getPoints([fromCenter, toCenter]);
                for (var j = 0; j < cv.length; j++) {
                    timeData.push({
                        geometry: {
                            type: 'Point',
                            coordinates: cv[j]
                        },
                        time: j
                    });
                }
            });
            return new _mapv.DataSet(timeData);
        }
    }
};
_mapboxGl2.default.supermap.MapvDataSet = MapvDataSet;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mapv = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseLayer = _mapv.baiduMapLayer ? _mapv.baiduMapLayer.__proto__ : Function;
/**
 * @private
 * @class mapboxgl.supermap.MapvRenderer
 * @classdesc MapV图层渲染
 * @param map - {string} 地图
 * @param layer -{Object} 图层
 * @param dataSet -{Object} 数据集
 * @param options -{Object} 交互时所需可选参数。
 * @extends BaseLayer
 *
 */

var MapvRenderer = function (_BaseLayer) {
    _inherits(MapvRenderer, _BaseLayer);

    function MapvRenderer(map, layer, dataSet, options) {
        _classCallCheck(this, MapvRenderer);

        if (!BaseLayer) {
            return _possibleConstructorReturn(_this);
        }

        var _this = _possibleConstructorReturn(this, (MapvRenderer.__proto__ || Object.getPrototypeOf(MapvRenderer)).call(this, map, dataSet, options));

        _this.map = map;
        var self = _this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        _this.canvasLayer = layer;
        _this.clickEvent = _this.clickEvent.bind(_this);
        _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);
        _this.map.on('move', _this.moveEvent.bind(_this));
        _this.map.on('resize', _this.resizeEvent.bind(_this));
        _this.map.on('moveend', _this.moveEndEvent.bind(_this));
        _this.map.on('remove', _this.removeEvent.bind(_this));
        _this.bindEvent();
        return _this;
    }
    /**
     * @function mapboxgl.supermap.prototype.clickEvent
     * @description  点击绑定事件
     * @param e - {Object} 事件
     */


    _createClass(MapvRenderer, [{
        key: 'clickEvent',
        value: function clickEvent(e) {
            var pixel = e.layerPoint;
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'clickEvent', this).call(this, pixel, e);
        }
        /**
         * @function mapboxgl.supermap.prototype.mousemoveEvent
         * @description  鼠标移动事件
         * @param e - {Object} 事件
         */

    }, {
        key: 'mousemoveEvent',
        value: function mousemoveEvent(e) {
            var pixel = e.layerPoint;
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'mousemoveEvent', this).call(this, pixel, e);
        }
        /**
         * @function  mapboxgl.supermap.prototype.bindEvent
         * @description 绑定事件
         * @param e - {object} 触发对象
         */

    }, {
        key: 'bindEvent',
        value: function bindEvent(e) {
            var map = this.map;
            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.on('click', this.clickEvent);
                }
                if (this.options.methods.mousemove) {
                    map.on('mousemove', this.mousemoveEvent);
                }
            }
        }

        /**
         * @function mapboxgl.supermap.prototype.unbindEvent
         * @description 解绑事件
         * @param e - {object} 触发对象
         */

    }, {
        key: 'unbindEvent',
        value: function unbindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.off('click', this.clickEvent);
                }
                if (this.options.methods.mousemove) {
                    map.off('mousemove', this.mousemoveEvent);
                }
            }
        }
        /**
         * @function mapboxgl.supermap.prototype.getContext
         * @description 获取信息
         */

    }, {
        key: 'getContext',
        value: function getContext() {
            return this.canvasLayer.canvas.getContext(this.context);
        }

        /**
         * @function mapboxgl.supermap.prototype.updateData
         * @param dataSet - {Object} 数据集
         * @param options - {Object} 数据项配置
         * @description  更新数据
         */

    }, {
        key: 'updateData',
        value: function updateData(dataSet, options) {
            if (dataSet && dataSet.get) {
                this.dataSet.set(dataSet.get());
            }
            this.update({ options: options });
        }
    }, {
        key: '_canvasUpdate',
        value: function _canvasUpdate(time) {
            if (!this.canvasLayer) {
                return;
            }

            var self = this;

            var animationOptions = self.options.animation;

            var context = this.getContext();
            var map = this.map;
            if (self.isEnabledTime()) {
                if (time === undefined) {
                    this.clear(context);
                    return;
                }
                if (this.context === '2d') {
                    context.save();
                    context.globalCompositeOperation = 'destination-out';
                    context.fillStyle = 'rgba(0, 0, 0, .1)';
                    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                    context.restore();
                }
            } else {
                this.clear(context);
            }

            if (this.context === '2d') {
                for (var key in self.options) {
                    context[key] = self.options[key];
                }
            } else {
                context.clear(context.COLOR_BUFFER_BIT);
            }

            if (self.options.minZoom && map.getZoom() < self.options.minZoom || self.options.maxZoom && map.getZoom() > self.options.maxZoom) {
                return;
            }

            var dataGetOptions = {
                transferCoordinate: function transferCoordinate(coordinate) {
                    var worldPoint = map.project(new window.mapboxgl.LngLat(coordinate[0], coordinate[1]));
                    return [worldPoint.x, worldPoint.y];
                }
            };

            if (time !== undefined) {
                dataGetOptions.filter = function (item) {
                    var trails = animationOptions.trails || 10;
                    return time && item.time > time - trails && item.time < time;
                };
            }

            var data = self.dataSet.get(dataGetOptions);

            this.processData(data);

            self.options._size = self.options.size;

            var worldPoint = map.project(new window.mapboxgl.LngLat(0, 0));
            this.drawContext(context, new mapv.DataSet(data), self.options, worldPoint);

            self.options.updateCallback && self.options.updateCallback(time);
        }
    }, {
        key: 'init',
        value: function init(options) {

            var self = this;

            self.options = options;

            this.initDataRange(options);

            this.context = self.options.context || '2d';

            if (self.options.zIndex) {
                this.canvasLayer && this.canvasLayer.setZIndex(self.options.zIndex);
            }

            this.initAnimator();
        }
        /**
         * @function mapboxgl.supermap.prototype.addAnimatorEvent
         * @description 添加动画事件
         */

    }, {
        key: 'addAnimatorEvent',
        value: function addAnimatorEvent() {}
        /**
         * @function mapboxgl.supermap.prototype.removeEvent
         * @description 移除事件
         */

    }, {
        key: 'removeEvent',
        value: function removeEvent() {
            this.canvasLayer.mapContainer.removeChild(this.canvasLayer.canvas);
        }
        /**
         * @function mapboxgl.supermap.prototype.moveEvent
         * @description 隐藏事件
         */

    }, {
        key: 'moveEvent',
        value: function moveEvent() {
            this._hide();
        }
        /**
         * @function mapboxgl.supermap.prototype.resizeEvent
         * @description 调整事件
         */

    }, {
        key: 'resizeEvent',
        value: function resizeEvent() {
            var canvas = this.canvasLayer.canvas;
            canvas.style.position = 'absolute';
            canvas.style.top = 0 + "px";
            canvas.style.left = 0 + "px";
            canvas.width = parseInt(this.map.getCanvas().style.width);
            canvas.height = parseInt(this.map.getCanvas().style.height);
            canvas.style.width = this.map.getCanvas().style.width;
            canvas.style.height = this.map.getCanvas().style.height;
        }
        /**
         * @function mapboxgl.supermap.prototype.moveEndEvent
         * @description 移除最后事件
         */

    }, {
        key: 'moveEndEvent',
        value: function moveEndEvent() {
            this._canvasUpdate();
            this._show();
        }
        /**
         * @function mapboxgl.supermap.prototype.clear
         * @param context - {object} 当前环境
         * @description 清除环境
         */

    }, {
        key: 'clear',
        value: function clear(context) {
            context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
    }, {
        key: '_hide',
        value: function _hide() {
            this.canvasLayer.canvas.style.display = 'none';
        }
    }, {
        key: '_show',
        value: function _show() {
            this.canvasLayer.canvas.style.display = 'block';
        }
        /**
         * @function mapboxgl.supermap.prototype.draw
         * @description 渲染绘制
         */

    }, {
        key: 'draw',
        value: function draw() {
            this.canvasLayer.draw();
        }
    }]);

    return MapvRenderer;
}(BaseLayer);

exports.default = MapvRenderer;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAAdCAYAAAAjHtusAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYWZlOGIwMi01MWE3LTRiZjYtYWVkYS05MGQ2ZTQ4YjZiMmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODg0NkFBQUE3RjEzMTFFNzhFRjJFQkY4RjcxQjc1NjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODg0NkFBQTk3RjEzMTFFNzhFRjJFQkY4RjcxQjc1NjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MWI3NzdhNC1lZmEyLTQ1MzUtOGQzNi03MmRjNDkyODMzN2UiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjYTYzODVjMi1jNDQ1LTExN2EtYTc0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"

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(6);
__webpack_require__(5);
__webpack_require__(4);
module.exports = __webpack_require__(2);


/***/ })
/******/ ]);