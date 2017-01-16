/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Control.js
 * @requires SuperMap/Handler/Hover.js
 * @requires SuperMap/Handler/Click.js
 */

/**
 * Class: SuperMap.Control.UTFGrid
 *
 * 这个控制类提供了与UTFGrid图层相关的行为。
 * 通过判断鼠标位置能够直接提取出UTFGrid图层对应要素的属性，不需要向服务端
 * 发送请求。
 * 这个控制类通过设置属性提供了Mousemove(鼠标移动)， Hovering(鼠标悬停)以
 * 及Click(鼠标点击)等事件来触发回调函数。
 *
 * 最常见的例子可能就是当鼠标移动到UTFGrid图层上的要素的时候，使用DIV显示该
 * 要素的属性。
 *
 * 示例代码:
 *
 * (start code)
 * var china_utfgrid = new SuperMap.Layer.UTFGrid("UTFGridLayer", "http://localhost:8090/iserver/services/map-china400/rest/maps/China",
 * {
 *      layerName: "China_Province_R@China400",
 *      utfTileSize: 256,
 *      pixcell: 2,
 *      isUseCache: false
 * },
 * {
 *     utfgridResolution: 2
 * });
 * map.addLayer(china_utfgrid);
 *
 * var control = new SuperMap.Control.UTFGrid({
 *     layers: [china_utfgrid],
 *     handlerMode: 'move',
 *     callback: function(dataLookup) {
 *         // do something with returned data
 *     }
 * })
 * (end code)
 *
 *
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.UTFGrid = SuperMap.Class(SuperMap.Control, {

    /**
     * APIProperty: autoActivate
     * {Boolean} 当控件类添加到地图后自动激活该控件，默认为true。
     */
    autoActivate: true,

    /**
     * APIProperty: Layers
     * 可以进行查询的图层列表数组，图层必须是Layer.UTFGrids类型，默认值'null'表示
     * 所有的UTFGrid图层都是可查询的。
     * {Array} <SuperMap.Layer.UTFGrid>
     */
    layers: null,

    /**
     *  Property: defaultHandlerOptions
     * {Object} 传递给事件处理类构造函数的默认选项值。
     */
    defaultHandlerOptions: {
        'delay': 300,
        'pixelTolerance': 4,
        'stopMove': false,
        'single': true,
        'double': false,
        'stopSingle': false,
        'stopDouble': false
    },

    /**
     *  APIProperty: handlerMode
     * {String} 事件触发类型，默认值为'click'。也可以是'hover' 或 'move'.
     */
    handlerMode: 'click',

    /**
     * APIMethod: setHandler
     * 重新设置handlerMode属性的方法，切换事件触发类型。
     *
     * Parameters:
     * hm - {String} 事件触发类型：'click'、'hover' 或 'move'。
     */
    setHandler: function (hm) {
        this.handlerMode = hm;
        this.resetHandler();
    },

    /**
     * Method: resetHandler
     * 废除旧的事件处理方式，并创建新的事件处理方式。
     * <SuperMap.Handler> based on the mode specified in
     * this.handlerMode
     *
     */
    resetHandler: function () {
        if (this.handler) {
            this.handler.deactivate();
            this.handler.destroy();
            this.handler = null;
        }

        if (this.handlerMode === 'hover') {
            // Handle this event on hover
            this.handler = new SuperMap.Handler.Hover(
                this,
                {'pause': this.handleEvent, 'move': this.reset},
                this.handlerOptions
            );
        } else if (this.handlerMode === 'click') {
            // Handle this event on click
            this.handler = new SuperMap.Handler.Click(
                this, {
                    'click': this.handleEvent
                }, this.handlerOptions
            );
        } else if (this.handlerMode === 'move') {
            this.handler = new SuperMap.Handler.Hover(
                this,
                // Handle this event while hovering OR moving
                {'pause': this.handleEvent, 'move': this.handleEvent},
                this.handlerOptions
            );
        }
        if (this.handler) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Constructor:  SuperMap.Control.UTFGrid
     * UTFGrid控件类构造函数。
     *
     * Parameters:
     * options - {Object}
     */
    initialize: function (options) {
        options = options || {};
        options.handlerOptions = options.handlerOptions || this.defaultHandlerOptions;
        SuperMap.Control.prototype.initialize.apply(this, [options]);
        this.resetHandler();
    },

    /**
     * Method: handleEvent
     * 特定事件触发时调用的内部方法。
     *
     * 这个方法做了以下几步:
     * 获取事件触发点的经纬度坐标。
     * 循环查找UTFGrid图层并通过特定位置收集属性。
     * 将属性传递给回调函数。
     *
     * Parameters:
     * evt - {<SuperMap.Event>} 特定的事件类型，通过某种事件调用该函数，该参数
     * 则为对应的事件类型，通常情况下该参数无需设置。
     */
    handleEvent: function (evt) {
        if (evt == null) {
            this.reset();
            return;
        }

        var lonLat = this.map.getLonLatFromPixel(evt.xy);
        if (!lonLat) {
            return;
        }

        var layers = this.findLayers();
        if (layers.length > 0) {
            var infoLookup = {};
            var layer, idx;
            for (var i = 0, len = layers.length; i < len; i++) {
                layer = layers[i];
                idx = SuperMap.Util.indexOf(this.map.layers, layer);
                infoLookup[idx] = layer.getFeatureInfo(lonLat);
            }
            this.callback(infoLookup, lonLat, evt.xy);
        }
    },

    /**
     * APIMethod: callback
     * 当鼠标事件触发的位置恰好在UTFGrid图层上有对应数据的时候调用该方法。
     *
     * Parameters:
     * infoLookup - {Object} 返回一个对象，该对象由一个或多个键值对组成，其中
     *      键值为图层索引，值为鼠标位置对应该图层的数据，数据格式为JSON类型。
     */
    callback: function (infoLookup) {
        // to be provided in the constructor
    },

    /**
     * Method: reset
     * Calls the callback with null.
     */
    reset: function (evt) {
        this.callback(null);
    },

    /**
     * Method: findLayers
     * Internal method to get the layers, independent of whether we are
     *     inspecting the map or using a client-provided array
     *
     * this.layers默认值为null；这就使得findLayers方法返回所有的UTFGrid图层。
     *
     * Parameters:
     * 无
     *
     * Returns:
     * {Array} 用来处理事件的图层。
     */
    findLayers: function () {
        var candidates = this.layers || this.map.layers;
        var layers = [];
        var layer;
        for (var i = candidates.length - 1; i >= 0; --i) {
            layer = candidates[i];
            if (layer instanceof SuperMap.Layer.UTFGrid) {
                layers.push(layer);
            }
        }
        return layers;
    },

    CLASS_NAME: "SuperMap.Control.UTFGrid"
});
