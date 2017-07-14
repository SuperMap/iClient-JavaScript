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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapv = {};
var mapboxgl = {};
try {
    mapv = __webpack_require__(3);
} catch (ex) {
    mapv = {};
}
try {
    mapboxgl = __webpack_require__(2);
} catch (ex) {
    mapboxgl = {};
}
var BaseLayer = mapv.baiduMapLayer ? mapv.baiduMapLayer.__proto__ : Function;

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
        _this.bindEvent();
        return _this;
    }

    _createClass(MapvRenderer, [{
        key: "clickEvent",
        value: function clickEvent(e) {
            var pixel = e.layerPoint;
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), "clickEvent", this).call(this, pixel, e);
        }
    }, {
        key: "mousemoveEvent",
        value: function mousemoveEvent(e) {
            var pixel = e.layerPoint;
            _get(MapvRenderer.prototype.__proto__ || Object.getPrototypeOf(MapvRenderer.prototype), "mousemoveEvent", this).call(this, pixel, e);
        }
    }, {
        key: "bindEvent",
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
        key: "unbindEvent",
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
    }, {
        key: "getContext",
        value: function getContext() {
            return this.canvasLayer.canvas.getContext(this.context);
        }
    }, {
        key: "updateData",
        value: function updateData(dataSet, options) {
            if (dataSet && dataSet.get) {
                this.dataSet.set(dataSet.get());
            }
            this.update({ options: options });
        }
    }, {
        key: "_canvasUpdate",
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
        key: "init",
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
        key: "addAnimatorEvent",
        value: function addAnimatorEvent() {
            this.map.on('movestart', this.animatorMovestartEvent.bind(this));
            this.map.on('moveend', this.animatorMoveendEvent.bind(this));
        }
    }, {
        key: "clear",
        value: function clear(context) {
            context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }

        // show() {
        //     this.map.addLayer(this.canvasLayer);
        // }
        //
        // hide() {
        //     this.map.addLayer(this.canvasLayer);
        // }

    }, {
        key: "draw",
        value: function draw() {
            this.canvasLayer.draw();
        }
    }]);

    return MapvRenderer;
}(BaseLayer);

module.exports = MapvRenderer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapvRenderer = __webpack_require__(0);

var MapvLayer = function () {
    function MapvLayer(map, dataSet, mapVOptions) {
        _classCallCheck(this, MapvLayer);

        this.map = map;
        this.mapvLayer = new MapvRenderer(map, this, dataSet, mapVOptions);
        this.canvas = this._createCanvas();
        this._redraw();
        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
        var me = this;

        map.on('resize', function (e) {
            me._redraw();
        });

        map.on('move', function (e) {
            me._redraw();
        });

        map.on('zoomstart', function (e) {
            me._hide();
        });

        map.on('zoomend', function (e) {
            me._show();
        });

        map.on('remove', function (e) {
            me.mapContainer.removeChild(me.canvas);
        });
    }

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
    }, {
        key: '_redraw',
        value: function _redraw() {
            this._resize();
            this.mapvLayer._canvasUpdate();
        }
    }, {
        key: '_resize',
        value: function _resize() {
            var canvas = this.canvas;
            if (!canvas) {
                return;
            }
            canvas.width = parseInt(this.map.getCanvas().style.width);
            canvas.height = parseInt(this.map.getCanvas().style.height);
            canvas.style.width = this.map.getCanvas().style.width;
            canvas.style.height = this.map.getCanvas().style.height;
        }
    }, {
        key: '_hide',
        value: function _hide() {
            this.canvas.style.display = 'none';
        }
    }, {
        key: '_show',
        value: function _show() {
            this.canvas.style.display = 'block';
        }
    }]);

    return MapvLayer;
}();

window.mapvlayer = MapvLayer;

module.exports = MapvLayer;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

if(typeof mapbox-gl === 'undefined') {var e = new Error("Cannot find module \"mapbox-gl\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = mapbox-gl;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

if(typeof mapv === 'undefined') {var e = new Error("Cannot find module \"mapv\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = mapv;

/***/ })
/******/ ]);