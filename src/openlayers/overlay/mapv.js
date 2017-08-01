require('../core/Base');
var ol = require('openlayers/dist/ol-debug');
var MapvLayer = require('./mapv/MapvLayer');
var Util = require('../core/Util');
ol.source.Mapv = function (opt_options) {
    var options = opt_options ? opt_options : {};
    ol.source.ImageCanvas.call(this, {
        attributions: options.attributions || new ol.Attribution({
            html: '© 2017 百度 MapV with <a href="http://iclient.supermapol.com/">SuperMap iClient</a>'
        }),
        canvasFunction: this.canvasFunctionInternal_.bind(this),
        logo: options.logo,
        projection: options.projection,
        ratio: options.ratio,
        resolutions: options.resolutions,
        state: options.state
    });
    this.layer = new MapvLayer(opt_options.map, opt_options.dataSet, opt_options.mapvOptions, this);
    this.layer.canvasLayer.draw();
    this.map = opt_options.map;
};
ol.inherits(ol.source.Mapv, ol.source.ImageCanvas);

ol.source.Mapv.prototype.canvasFunctionInternal_ = function (extent, resolution, pixelRatio, size, projection) {
    if (this.layer) {
        if (!this.layer.isEnabledTime()) {
            this.layer.canvasLayer.draw();
        }
        var mapWidth = size[0];
        var mapHeight = size[1];
        var width = this.map.getSize()[0];
        var height = this.map.getSize()[1];
        var canvas = this.layer.canvasLayer.canvas;
        var context =Util.CreateCanvasContext2D(mapWidth, mapHeight);
        context.drawImage(canvas, 0, 0, width, height, (mapWidth - width) / 2, (mapHeight - height) / 2, width, height);
        if (this.resolution !== resolution || JSON.stringify(this.extent) !== JSON.stringify(extent)) {
            this.resolution = resolution;
            this.extent = extent;
        }
        return context.canvas;
    }
};

ol.source.Mapv.prototype.update = function (options) {
    this.layer.update(options);
    this.changed();
};

module.exports = ol.source.Mapv;