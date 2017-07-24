/*!
 * 
 *     iclient9-legacy.(http://iclient.supermapol.com)
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
/***/ (function(module, exports) {

module.exports = window.SuperMap;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * MapV renderer
 */

var SuperMap = __webpack_require__(0);
var mapv = {};
try {
    mapv = __webpack_require__(3);
} catch (ex) {
    mapv = {};
}
var MapVBaseLayer = mapv.baiduMapLayer ? mapv.baiduMapLayer.__proto__ : Function;

var MapVRenderer = function (_MapVBaseLayer) {
    _inherits(MapVRenderer, _MapVBaseLayer);

    function MapVRenderer(map, layer, dataSet, options) {
        _classCallCheck(this, MapVRenderer);

        if (!MapVBaseLayer) {
            return _possibleConstructorReturn(_this);
        }

        var _this = _possibleConstructorReturn(this, (MapVRenderer.__proto__ || Object.getPrototypeOf(MapVRenderer)).call(this, map, dataSet, options));

        var self = _this;
        options = options || {};

        self.init(options);
        self.argCheck(options);
        _this.canvasLayer = layer;
        self.transferToMercator();
        _this.clickEvent = _this.clickEvent.bind(_this);
        _this.mousemoveEvent = _this.mousemoveEvent.bind(_this);
        _this.bindEvent();
        return _this;
    }

    _createClass(MapVRenderer, [{
        key: 'clickEvent',
        value: function clickEvent(e) {
            var pixel = e.layerPoint;
            _get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), 'clickEvent', this).call(this, pixel, e);
        }
    }, {
        key: 'mousemoveEvent',
        value: function mousemoveEvent(e) {
            var pixel = e.layerPoint;
            _get(MapVRenderer.prototype.__proto__ || Object.getPrototypeOf(MapVRenderer.prototype), 'mousemoveEvent', this).call(this, pixel, e);
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.events.on({ 'click': this.clickEvent });
                }
                if (this.options.methods.mousemove) {
                    map.events.on({ 'mousemove': this.mousemoveEvent });
                }
            }
        }
    }, {
        key: 'unbindEvent',
        value: function unbindEvent(e) {
            var map = this.map;

            if (this.options.methods) {
                if (this.options.methods.click) {
                    map.events.un({ 'click': this.clickEvent });
                }
                if (this.options.methods.mousemove) {
                    map.events.un({ 'mousemove': this.mousemoveEvent });
                }
            }
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.canvasLayer && this.canvasLayer.canvasContext;
        }

        //追加数据

    }, {
        key: 'addData',
        value: function addData(data, options) {
            var _data = data;
            if (data && data.get) {
                _data = data.get();
            }
            this.dataSet.add(_data);
            this.update({ options: options });
        }

        //更新覆盖原数据

    }, {
        key: 'setData',
        value: function setData(data, options) {
            var _data = data;
            if (data && data.get) {
                _data = data.get();
            }
            this.dataSet = this.dataSet || new mapv.DataSet();
            this.dataSet.set(_data);
            this.update({ options: options });
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.dataSet;
        }
    }, {
        key: 'removeData',
        value: function removeData(filter) {
            if (!this.dataSet) {
                return;
            }
            var newData = this.dataSet.get(filter);
            this.dataSet.set(newData);
            this.update({ options: null });
        }
    }, {
        key: 'clearData',
        value: function clearData() {
            this.dataSet && this.dataSet.clear();
            this.update({ options: null });
        }
    }, {
        key: 'render',
        value: function render(time) {
            this._canvasUpdate(time);
        }

        //墨卡托坐标为经纬度

    }, {
        key: 'transferToMercator',
        value: function transferToMercator() {
            if (this.options.coordType && ["bd09mc", "coordinates_mercator"].indexOf(this.options.coordType) > -1) {
                var data = this.dataSet.get();
                data = this.dataSet.transferCoordinate(data, function (coordinates) {
                    var pixel = SuperMap.Projection.transform({
                        x: coordinates[0],
                        y: coordinates[1]
                    }, "EPSG:3857", "EPSG:4326");
                    return [pixel.x, pixel.y];
                }, 'coordinates', 'coordinates');
                this.dataSet._set(data);
            }
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
            var layer = self.canvasLayer;
            var dataGetOptions = {
                fromColumn: 'coordinates',
                transferCoordinate: function transferCoordinate(coordinate) {
                    var coord = layer.transferToMapLatLng({ lon: coordinate[0], lat: coordinate[1] });
                    var worldPoint = map.getViewPortPxFromLonLat(coord);
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

            var worldPoint = map.getViewPortPxFromLonLat(layer.transferToMapLatLng({ lon: 0, lat: 0 }));

            var zoomUnit = Math.pow(2, 14 - map.getZoom());
            if (self.options.unit == 'm') {
                if (self.options.size) {
                    self.options._size = self.options.size / zoomUnit;
                }
                if (self.options.width) {
                    self.options._width = self.options.width / zoomUnit;
                }
                if (self.options.height) {
                    self.options._height = self.options.height / zoomUnit;
                }
            } else {
                self.options._size = self.options.size;
                self.options._height = self.options.height;
                self.options._width = self.options.width;
            }

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
        value: function addAnimatorEvent() {
            this.map.events.on({ 'movestart': this.animatorMovestartEvent.bind(this) });
            this.map.events.on({ 'moveend': this.animatorMoveendEvent.bind(this) });
        }
    }, {
        key: 'clear',
        value: function clear(context) {
            context && context.clearRect && context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }
    }, {
        key: 'show',
        value: function show() {
            this.map.addLayer(this.canvasLayer);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.map.removeLayer(this.canvasLayer);
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.canvasLayer.redraw();
        }
    }]);

    return MapVRenderer;
}(MapVBaseLayer);

module.exports = MapVRenderer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Layer.MapVLayer
 * MapV图层。
 */
var SuperMap = __webpack_require__(0);
var MapVRenderer = __webpack_require__(1);
SuperMap.Layer.MapVLayer = SuperMap.Class(SuperMap.Layer, {

    /**
     * mapv dataset 对象
     */
    dataSet: null,

    /**
     *mapv 绘图风格配置信息
     */
    options: null,

    /**
     * Proterty: supported
     * {Boolean} 当前浏览器是否支持canvas绘制，默认为false。
     * 决定了MapV图是否可用，内部判断使用。
     */
    supported: false,

    /**
     * Proterty: canvas
     * {Canvas} MapV图主绘制面板。
     */
    canvas: null,

    /**
     * Proterty: canvas
     * {Canvas} MapV图主绘制对象。
     */
    canvasContext: null,

    /**
     * MapV支持webgl和普通canvas渲染.
     * 但目前本图层webgl渲染不能正确显示，待解决
     *
     * @param name
     * @param options 有两个参数
     *        dataSet: mapv 的dataSet对象
     *        options: mapv 绘图风格配置信息
     */
    initialize: function (name, options) {
        this.EVENT_TYPES = SuperMap.Layer.prototype.EVENT_TYPES;

        SuperMap.Layer.prototype.initialize.apply(this, arguments);
        //MapV图要求使用canvas绘制，判断是否支持
        this.canvas = document.createElement("canvas");
        if (!this.canvas.getContext) {
            return;
        }
        this.supported = true;
        //构建绘图面板
        this.canvas.style.position = "absolute";
        this.canvas.style.top = 0 + "px";
        this.canvas.style.left = 0 + "px";
        this.div.appendChild(this.canvas);
        var context = this.options.context || "2d";
        this.canvasContext = this.canvas.getContext(context);
        this.attribution = "© 2017 百度 MapV with <a target='_blank' href='http://iclient.supermapol.com' " +
            "style='color: #08c;text-decoration: none;'>SuperMap iClient</a>";
    },

    /**
     * APIMethod: destroy
     * 销毁图层，释放资源。
     */
    destroy: function () {
        this.dataSet = null;
        this.options = null;
        this.renderer = null;
        this.supported = null;
        this.canvas = null;
        this.canvasContext = null;
        this.maxWidth = null;
        this.maxHeight = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);
    },

    /**
     * 追加数据
     * @param dataSet {MapV.DataSet}
     * @param options {MapV options}
     */
    addData: function (dataSet, options) {
        this.renderer && this.renderer.addData(dataSet, options);
    },

    /**
     * 设置数据
     * @param dataSet {MapV.DataSet}
     * @param options {MapV options}
     */
    setData: function (dataSet, options) {
        this.renderer && this.renderer.setData(dataSet, options);
    },

    getData: function () {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    },

    /**
     * 按照过滤条件移除数据
     * @param filter
     * eg: filter=function(data){
     *         if(data.id="1"){
     *            return true
     *         }
     *         return false;
     *     }
     */
    removeData: function (filter) {
        this.renderer && this.renderer.removeData(filter);
    },

    clearData: function () {
        this.renderer.clearData();
    },

    /**
     * Method: setMap
     * 图层已经添加到Map中。
     *
     * 如果当前浏览器支持canvas，则开始渲染要素；如果不支持则移除图层。
     *
     * Parameters:
     * map - {<SuperMap.Map>}需要绑定的map对象。
     */
    setMap: function (map) {
        SuperMap.Layer.prototype.setMap.apply(this, arguments);
        this.renderer = new MapVRenderer(map, this, this.dataSet, this.options);
        if (!this.supported) {
            this.map.removeLayer(this);
        } else {
            this.redraw();
        }
    },

    /**
     * Method: moveTo
     * 重置当前MapV图层的div，再一次与Map控件保持一致。
     * 修改当前显示范围，当平移或者缩放结束后开始重绘MapV图的渲染效果。
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * zoomChanged - {Boolean}
     * dragging - {Boolean}
     */
    moveTo: function (bounds, zoomChanged, dragging) {
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);
        if (!this.supported) {
            return;
        }
        this.zoomChanged = zoomChanged;
        if (!dragging) {
            this.div.style.visibility = "hidden";
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left) + "px";
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top) + "px";
            /*this.canvas.style.left = this.div.style.left;
             this.canvas.style.top = this.div.style.top;*/
            var size = this.map.getSize();
            this.div.style.width = parseInt(size.w) + "px";
            this.div.style.height = parseInt(size.h) + "px";
            this.canvas.width = parseInt(size.w);
            this.canvas.height = parseInt(size.h);
            this.canvas.style.width = this.div.style.width;
            this.canvas.style.height = this.div.style.height;
            this.maxWidth = size.w;
            this.maxHeight = size.h;
            this.div.style.visibility = "";
            if (!zoomChanged) {
                this.renderer && this.renderer.render();
            }
        }

        if (zoomChanged) {
            this.renderer && this.renderer.render();
        }
    },

    /**
     * 将经纬度转成底图的投影坐标
     * @param latLng
     */
    transferToMapLatLng: function (latLng) {
        var source = "EPSG:4326", dest = "EPSG:4326";
        var unit = this.map.getUnits();
        if (["m", "meter"].indexOf(unit.toLowerCase()) > -1) {
            dest = "EPSG:3857";
        }
        return new SuperMap.LonLat(latLng.lon, latLng.lat).transform(source, dest);
    },

    CLASS_NAME: "SuperMap.Layer.MapVLayer"
});

module.exports = SuperMap.Layer.MapVLayer;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

if(typeof mapv === 'undefined') {var e = new Error("Cannot find module \"mapv\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = mapv;

/***/ })
/******/ ]);