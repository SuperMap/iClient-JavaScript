import ol from 'openlayers/dist/ol-debug';
export default class Graphic extends ol.Object {

    constructor(geometry) {
        super();
        if (geometry instanceof ol.geom.Geometry) {
            this.geometry_ = geometry;
        }
        this.setStyle();
    }

    clone() {
        var clone = new ol.supermap.Graphic();
        clone.setId(this.id_);
        clone.setGeometry(this.geometry_);
        clone.setStyle(this.style_);
        return clone;
    }

    getId() {
        return this.id_;
    }

    setId(id) {
        this.id_ = id;
    }

    getGeometry() {
        return this.geometry_;
    }

    setGeometry(geometry) {
        this.geometry_ = geometry;
    }

    getStyle() {
        return this.style_;
    }

    setStyle(style) {
        this.style_ = style;
        this.styleFunction_ = !style ?
            undefined : ol.Graphic.createStyleFunction(style);
        this.changed();
    }

    getStyleFunction() {
        return this.styleFunction_;
    }

    static createStyleFunction(obj) {
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
                styles = [obj];
            }
            styleFunction = function () {
                return styles;
            };
        }
        return styleFunction;
    }

    destroy() {
        this.id_ = null;
        this.geometry_ = null;
        this.style_ = null;
    }
}
ol.Graphic = Graphic;