ol.Graphic = function (geometry) {
    ol.Object.call(this);
    if (geometry instanceof ol.geom.Geometry) {
        this.geometry_ = geometry;
    }
};
ol.inherits(ol.Graphic, ol.Object);

ol.Graphic.prototype.clone = function () {
    var clone = new ol.supermap.Graphic();
    clone.setId(this.id_);
    clone.setGeometry(this.geometry_);
    clone.setStyle(this.style_);
    return clone;
};

ol.Graphic.prototype.getId = function () {
    return this.id_;
};

ol.Graphic.prototype.setId = function (id) {
    this.id_ = id;
};

ol.Graphic.prototype.getGeometry = function () {
    return this.geometry_;
};

ol.Graphic.prototype.setGeometry = function (geometry) {
    this.geometry_ = geometry;
};

ol.Graphic.prototype.getStyle = function () {
    return this.style_;
};

ol.Graphic.prototype.setStyle = function (style) {
    this.style_ = style;
    this.styleFunction_ = !style ?
        undefined : ol.Graphic.createStyleFunction(style);
    this.changed();
};

ol.Graphic.prototype.getStyleFunction = function () {
    return this.styleFunction_;
};

ol.Graphic.createStyleFunction = function (obj) {
    var styleFunction;

    if (typeof obj === 'function') {
        if (obj.length == 2) {
            styleFunction = function (resolution) {
                return (obj)(this, resolution);
            };
        } else {
            styleFunction = obj;
        }
    } else {
        var styles;
        if (Array.isArray(obj)) {
            styles = obj;
        } else {
            ol.asserts.assert(obj instanceof ol.style.Style,
                41);
            styles = [obj];
        }
        styleFunction = function () {
            return styles;
        };
    }
    return styleFunction;
};

ol.Graphic.prototype.destroy = function () {
    this.id_ = null;
    this.geometry_ = null;
    this.style_ = null;
};

module.exports = ol.Graphic;