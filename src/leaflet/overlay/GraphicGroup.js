import '../core/Base';
import L from "leaflet";
import './graphic/CircleStyle';
import './graphic/Graphic';
export var GraphicGroup = L.Path.extend({

        initialize: function (graphics, options) {
            options = options || {};
            L.setOptions(this, options);
            this.graphics = graphics;
        },

        getEvents: function () {
            var events = {
                click: this._handleClick
            }
            return events;
        },

        onAdd: function () {
            this._canvas = document.createElement('canvas');
            var width = this._map.getPixelBounds().getSize().x;
            var height = this._map.getPixelBounds().getSize().y;
            this._canvas.width = width;
            this._canvas.height = height;
            this._ctx = this._canvas.getContext('2d');
            L.Path.prototype.onAdd.call(this);
        },

        _update: function () {
            if (this._map) {
                this._updatePath();
            }
        },

        _updatePath: function () {
            this._renderer._drawGraphics(this._getGraphicsInBounds());
        },

        _project: function () {
            var me = this;
            me._getGraphicsInBounds().map(function (graphic) {
                var point = me._map.latLngToLayerPoint(graphic.getLatLng());
                var w = me._clickTolerance();
                var p = [graphic._anchor + w, graphic._anchor + w];
                graphic._pxBounds = new L.Bounds(point.subtract(p), point.add(p));
            })
            me._pxBounds = L.bounds(L.point(0, 0), L.point(this._canvas.width, this._canvas.height));
        },

        _getGraphicsInBounds: function () {
            var me = this;
            var graphicsInBounds = [];
            var viewBounds = me._map.getBounds();
            this.graphics.map(function (graphic) {
                if (viewBounds.contains(graphic.getLatLng())) {
                    graphicsInBounds.push(graphic);
                }
            });
            return graphicsInBounds;
        },

        _containsPoint: function (p) {
            return false;
        },

        _handleClick: function (evt) {
            var me = this;
            var graphics = me._getGraphicsInBounds();
            for (var i = 0; i < graphics.length; i++) {
                var center = me._map.latLngToLayerPoint(graphics[i].getLatLng());
                var canvas = graphics[i].getCanvas();
                var p1 = L.point(center.x - canvas.width / 2, center.y - canvas.height / 2),
                    p2 = L.point(center.x + canvas.width / 2, center.y + canvas.height / 2),
                    bounds = L.bounds(p1, p2);
                if (bounds.contains(me._map.latLngToLayerPoint(evt.latlng))) {
                    return me.options.handleClick.call(me, graphics[i]);
                }
            }
        }
    }
);

L.Canvas.include({
    _drawGraphics: function (graphics) {
        var me = this;
        me._ctx.clearRect(0, 0, me._ctx.canvas.width, me._ctx.canvas.height);
        graphics.map(function (graphic) {
            var canvas = graphic.getCanvas();
            var pt = me._map.latLngToLayerPoint(graphic.getLatLng());
            var p0 = pt.x - canvas.width / 2;
            var p1 = pt.y - canvas.height / 2;
            me._ctx.drawImage(canvas, p0, p1);
        })
    }
});

export var graphicGroup = function (graphics, options) {
    return new GraphicGroup(graphics, options);
};

L.supermap.graphicGroup = graphicGroup;