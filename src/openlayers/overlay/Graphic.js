require('./graphic/Graphic');
ol.source.Graphic = function (options) {
    this.canvasContext_ = ol.dom.createCanvasContext2D();
    this.imageTransform = ol.transform.create();
    this.graphics_ = options.graphics;
    ol.source.ImageCanvas.call(this, {
        attributions: options.attributions,
        canvasFunction: this.canvasFunctionInternal_.bind(this),
        logo: options.logo,
        projection: options.projection,
        ratio: options.ratio,
        resolutions: options.resolutions,
        state: options.state
    });
};
ol.inherits(ol.source.Graphic, ol.source.ImageCanvas);

ol.source.Graphic.prototype.canvasFunctionInternal_ = function (extent, resolution, pixelRatio, size, projection) {
    var width = Math.round(ol.extent.getWidth(extent) / resolution);
    var height = Math.round(ol.extent.getHeight(extent) / resolution);
    this.canvasContext_.canvas.width = width;
    this.canvasContext_.canvas.height = height;
    this.imageTransform = this.getTransform_(ol.extent.getCenter(extent), resolution, pixelRatio, size);
    var vectorContext = new ol.render.canvas.Immediate(this.canvasContext_, pixelRatio, extent, this.imageTransform, 0);
    var graphics = this.getGraphicsInExtent(extent);
    graphics.map(function (graphic) {
        vectorContext.drawFeature(graphic, graphic.getStyle());
    });
    return this.canvasContext_.canvas;
};

ol.source.Graphic.prototype.forEachFeatureAtCoordinate = function (coordinate, resolution, rotation, hitTolerance, skippedFeatureUids, callback) {
    var graphics = this.getGraphicsInExtent();
    for (var i = 0; i < graphics.length; i++) {
        var center = graphics[i].getGeometry().flatCoordinates;
        var image = graphics[i].getStyle().getImage();
        var extent = [];
        extent[0] = center[0] - image.getAnchor()[0] * resolution;
        extent[2] = center[0] + image.getAnchor()[0] * resolution;
        extent[1] = center[1] - image.getAnchor()[1] * resolution;
        extent[3] = center[1] + image.getAnchor()[1] * resolution;
        if (ol.extent.containsCoordinate(extent, coordinate)) {
            return callback.call(this, graphics[i]);
        }
    }
};

ol.source.Graphic.prototype.getTransform_ = function (center, resolution, pixelRatio, size) {
    var dx1 = size[0] / 2;
    var dy1 = size[1] / 2;
    var sx = pixelRatio / resolution;
    var sy = -sx;
    var dx2 = -center[0];
    var dy2 = -center[1];
    return ol.transform.compose(this.imageTransform, dx1, dy1, sx, sy, 0, dx2, dy2);
};

ol.source.Graphic.prototype.getGraphicsInExtent = function (extent) {
    var graphics = [];
    if (!extent) {
        this.graphics_.map(function (graphic) {
            graphics.push(graphic);
        })
        return graphics;
    }
    this.graphics_.map(function (graphic) {
        if (ol.extent.containsExtent(extent, graphic.getGeometry().getExtent())) {
            graphics.push(graphic);
        }
    })
    return graphics;
};

module.exports = ol.source.Graphic;