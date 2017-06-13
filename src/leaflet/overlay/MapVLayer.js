/**
 * Class:MapVLayer
 *  MapV图层
 */
var L = require("leaflet");
var MapVRenderer = require("./mapv/MapVRenderer");
var MapVLayer = L.Layer.extend({

    options: {
        attribution: '© 2017 百度 MapV with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'
    },

    initialize: function (dataSet, mapVOptions, options) {
        options = options || {};
        this.dataSet = dataSet || {};
        this.mapVOptions = mapVOptions || {};
        this.render = this.render.bind(this);
        L.Util.setOptions(this, options);
        this.canvas = this._createCanvas();
    },


    onAdd: function (map) {
        this._map = map;
        var overlayPane = this.getPane();
        var container = this.container = L.DomUtil.create("div", "leaflet-layer leaflet-zoom-animated", overlayPane);
        container.appendChild(this.canvas);
        var size = map.getSize();
        container.style.width = size.x + "px";
        container.style.height = size.y + "px";
        this.mapvLayer = new MapVRenderer(map, this, this.dataSet, this.mapVOptions);
        this.draw();
        this.fire("loaded");
    },

    getEvents: function () {
        return {
            moveend: this.draw,
            zoomend: this.draw,
            resize: this._resize,
            zoomanim: this._animateZoom
        }

    },

    onRemove: function (map) {
        map.off({
            moveend: this.draw,
            zoomend: this.draw,
            resize: this._resize,
            zoomanim: this._animateZoom
        }, this);
    },

    update: function (data) {
        this.mapvLayer.update(data);
    },

    draw: function () {
        return this._reset();
    },

    setZIndex: function (zIndex) {
        this.canvas.style.zIndex = zIndex;
    },

    render: function () {
        this.mapvLayer._canvasUpdate();
    },

    getCanvas: function () {
        return this.canvas;
    },

    getContainer: function () {
        return this.container;
    },

    getTopLeft: function () {
        var map = this._map;
        var topLeft;
        if (map) {
            var bounds = map.getBounds();
            topLeft = bounds.getNorthWest();
        }
        return topLeft;

    },

    _createCanvas: function () {
        var canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = this.options.zIndex || 600;
        return canvas;
    },

    _animateZoom: function (evt) {
        if (!this._animating) {
            this._animating = true;
        }

        var zoom = evt.zoom, center = evt.center;
        var scale = this._map.getZoomScale(zoom),
            offset = this._map._getCenterOffset(center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

        if (L.DomUtil.setTransform) {
            L.DomUtil.setTransform(this.canvas, offset, scale);
        } else {
            L.DomUtil.setPosition(this.canvas, offset);
        }
    },

    _resize: function () {
        var canvas = this.canvas;
        if (!canvas) {
            return;
        }
        var map = this._map;
        var center = map.getCenter();
        var size = map.getSize();
        canvas.width = size.x;
        canvas.height = size.y;
        canvas.style.width = size.x + 'px';
        canvas.style.height = size.y + 'px';
        var divCenter = map.latLngToLayerPoint(center);
        var offsetX = -Math.round(size.x / 2 - divCenter.x);
        var offsetY = -Math.round(size.y / 2 - divCenter.y);
        L.DomUtil.setPosition(canvas, L.point(offsetX, offsetY));
    },

    _reset: function () {
        this._resize();
        this._render()
    },

    _render: function () {
        this.render();
    },

});

L.supermap.mapVLayer = function (dataSet, mapVOptions, options) {
    return new MapVLayer(dataSet, mapVOptions, options);
};
module.exports = MapVLayer;