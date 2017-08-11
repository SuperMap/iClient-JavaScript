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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mapv = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseLayer = _mapv.baiduMapLayer ? _mapv.baiduMapLayer.__proto__ : Function;
/**
 * @class mapboxgl.supermap.MapvRenderer
 * @classdesc MapV图层渲染
 * @param map - {String} 地图
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
     * @class mapboxgl.supermap.prototype.MapvRenderer
     * @description  点击绑定事件
     * @param e - {object} 事件
     */


    _createClass(MapvRenderer, [{
        key: 'clickEvent',
        value: function clickEvent(e) {
            var pixel = e.layerPoint;
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'clickEvent', this).call(this, pixel, e);
        }
        /**
         * @class mapboxgl.supermap.prototype.mousemoveEvent
         * @description  鼠标移动事件
         * @param e - {object} 事件
         */

    }, {
        key: 'mousemoveEvent',
        value: function mousemoveEvent(e) {
            var pixel = e.layerPoint;
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), 'mousemoveEvent', this).call(this, pixel, e);
        }
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
         * @class mapboxgl.supermap.prototype.getContext
         * @description  获取画布内容
         */

    }, {
        key: 'getContext',
        value: function getContext() {
            return this.canvasLayer.canvas.getContext(this.context);
        }

        /**
         * @class mapboxgl.supermap.prototype.updateData
         * @param dataSet - {object} 数据集
         * @param options - {object} 交互操作
         * @description  更新画布内容
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
    }, {
        key: 'addAnimatorEvent',
        value: function addAnimatorEvent() {}
    }, {
        key: 'removeEvent',
        value: function removeEvent() {
            this.canvasLayer.mapContainer.removeChild(this.canvasLayer.canvas);
        }
    }, {
        key: 'moveEvent',
        value: function moveEvent() {
            this._hide();
        }
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
    }, {
        key: 'moveEndEvent',
        value: function moveEndEvent() {
            this._canvasUpdate();
            this._show();
        }
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
/* 1 */
/***/ (function(module, exports) {

module.exports = mapboxgl;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapvLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MapvRenderer = __webpack_require__(0);

var _MapvRenderer2 = _interopRequireDefault(_MapvRenderer);

var _mapboxGl = __webpack_require__(1);

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class mapboxgl.supermap.MapvLayer
 * @classdesc MAPV图层信息
 * @param map - {String} 地图
 * @param dataSet -{Object} 数据集
 * @param mapVOptions -{Object} 交互时所需可选参数。
 */
var MapvLayer = exports.MapvLayer = function () {
    function MapvLayer(map, dataSet, mapVOptions) {
        _classCallCheck(this, MapvLayer);

        this.map = map;
        this.mapvLayer = new _MapvRenderer2.default(map, this, dataSet, mapVOptions);
        this.canvas = this._createCanvas();
        this.mapvLayer._canvasUpdate();
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
/* 3 */
/***/ (function(module, exports) {

module.exports = function(){try{return mapv}catch(e){return {}}}();

/***/ })
/******/ ]);