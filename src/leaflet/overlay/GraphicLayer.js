import L from "leaflet";
import '../core/Base';

/**
 * @class L.supermap.graphicLayer
 * @classdesc 高效率点图层类。
 * @category Visualization Graphic
 * @extends L.Path{@linkdoc-leaflet/#path}
 * @param graphics - {Array<L.supermap.Graphic>} 图形对象
 * @param options - {Object} 图层参数，暂时为空
 */
export var GraphicLayer = L.Path.extend({

        initialize: function (graphics, options) {
            options = options || {};
            L.setOptions(this, options);
            this.graphics = graphics;
        },

        /**
         * @private
         * @function L.supermap.graphicLayer.prototype.getEvents
         * @description 获取事件
         * @return {Object} 返回该图层支持的事件对象
         */
        getEvents: function () {
            var events = {
                click: this._handleClick
            };
            return events;
        },

        /**
         * @private
         * @function L.supermap.graphicLayer.prototype.onAdd
         * @description 添加图形
         */
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
            var graphics = this._getGraphicsInBounds();
            this._renderer._drawGraphics(graphics);
        },

        _project: function () {
            var me = this;
            me._getGraphicsInBounds().map(function (graphic) {
                var point = me._map.latLngToLayerPoint(graphic.getLatLng());
                var w = me._clickTolerance();
                var p = [graphic._anchor + w, graphic._anchor + w];
                graphic._pxBounds = new L.Bounds(point.subtract(p), point.add(p));
                return graphic;
            });
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
                return graphic;
            });
            return graphicsInBounds;
        },

        _containsPoint: function () {
            return false;
        },

        _handleClick: function (evt) {
            var me = this;
            var graphics = me._getGraphicsInBounds();
            for (var i = 0; i < graphics.length; i++) {
                var p1, p2, bounds;
                var center = me._map.latLngToLayerPoint(graphics[i].getLatLng());
                var style = graphics[i].getStyle();
                if (style.img) {
                    var anchor = style.anchor;
                    p1 = L.point(center.x - style.img.width / 2, center.y - style.img.height / 2);
                    p2 = L.point(center.x + style.img.width / 2, center.y + style.img.height / 2);
                    p1 = calculateOffset(p1, anchor);
                    p2 = calculateOffset(p2, anchor);
                } else {
                    p1 = L.point(center.x - style.width / 2, center.y - style.height / 2);
                    p2 = L.point(center.x + style.width / 2, center.y + style.height / 2);
                }
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
        graphics.forEach(function (graphic) {
            var style = graphic.getStyle();
            if (style.img) { //绘制图片
                me._drawImage.call(me, me._ctx, style, graphic.getLatLng());
            } else {//绘制canvas
                me._drawCanvas.call(me, me._ctx, style, graphic.getLatLng());
            }
        })
    },

    _drawCanvas: function (ctx, style, latLng) {

        var canvas = style;
        var pt = this._map.latLngToLayerPoint(latLng);
        var p0 = pt.x - canvas.width / 2;
        var p1 = pt.y - canvas.height / 2;
        var width = canvas.width;
        var height = canvas.height;

        ctx.drawImage(canvas, p0, p1, width, height);
    },

    _drawImage: function (ctx, style, latLng) {
        //设置图片的大小
        var width, height;
        if (style.size) {
            var size = style.size;
            width = size[0];
            height = size[1];
        } else {
            width = style.img.width;
            height = style.img.height;
        }
        //设置偏移
        var pt = this._coordinateToPoint(latLng);
        pt = calculateOffset(pt, style.anchor);

        ctx.drawImage(style.img, pt[0], pt[1], width, height);
    },

    _coordinateToPoint: function (coordinate) {
        if (!this._map) {
            return coordinate;
        }
        var coor = coordinate;
        if (L.Util.isArray(coordinate)) {
            coor = L.latLng(coordinate[0], coordinate[1]);
        } else if (coordinate instanceof L.LatLng) {
            coor = L.latLng(coordinate.lat, coordinate.lng);
        }
        var point = this._map.latLngToLayerPoint(coor);
        return [point.x, point.y];
    }

});

function calculateOffset(point, anchor) {
    var pt = L.point(point),
        ac = L.point(anchor);
    return [pt.x - ac.x, pt.y - ac.y];
}

export var graphicLayer = function (graphics, options) {
    return new GraphicLayer(graphics, options);
};

L.supermap.graphicLayer = graphicLayer;