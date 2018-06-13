import L from "leaflet";

/**
 * @class L.supermap.CanvasRenderer
 * @private
 * @classdesc 画布渲染器
 * @category Visualization VectorTile
 * @extends {L.Canvas}
 * @param {Object} tileCoord - 切片坐标系
 * @param {number} tileSize - 切片大小
 * @param {Object} options - 渲染器参数
 */
export var CanvasRenderer = L.Canvas.extend({

    initialize: function (tileCoord, tileSize, options) {
        L.Canvas.prototype.initialize.call(this, options);
        this._tileCoord = tileCoord;
        this._size = tileSize;

        this._initContainer();
        this._container.setAttribute('width', this._size.x);
        this._container.setAttribute('height', this._size.y);
        this._layers = {};
        this._drawnLayers = {};
        this._drawing = true;

        if (options.interactive) {
            this._container.style.pointerEvents = 'auto';
        }
    },

    /**
     * @function L.supermap.CanvasRenderer.prototype.getCoord
     * @description 获取坐标
     */
    getCoord: function () {
        return this._tileCoord;
    },

    /**
     * @function L.supermap.CanvasRenderer.prototype.getContainer
     * @description 获取容器
     */
    getContainer: function () {
        return this._container;
    },

    /**
     * @function L.supermap.CanvasRenderer.prototype.getOffset
     * @description 停止渲染
     */
    getOffset: function () {
        return this._tileCoord.scaleBy(this._size).subtract(this._map.getPixelOrigin());
    },

    onAdd: L.Util.falseFn,

    /**
     * @function L.supermap.CanvasRenderer.prototype.addTo
     * @description 添加到地图
     * @param {L.map} map - map对象
     */
    addTo: function (map) {
        this._map = map;
    },

    /**
     * @function L.supermap.CanvasRenderer.prototype.removeFrom
     * @description 从地图移除
     * @param {L.map} map - map对象
     */
    removeFrom: function (map) { // eslint-disable-line no-unused-vars
        delete this._map;
    },

    _updateDashArray: function (layer) {
        var array = layer.options.dashArray;
        if (array && typeof array === "string") {
            var parts = array.split(','),
                dashArray = [],
                i;
            for (i = 0; i < parts.length; i++) {
                dashArray.push(Number(parts[i]));
            }
            layer.options._dashArray = dashArray;
        } else {
            layer.options._dashArray = array;
        }
    },

    _onClick: function (e) {
        var point = this._map.mouseEventToLayerPoint(e).subtract(this.getOffset()), layer, clickedLayer;

        for (var id in this._layers) {
            layer = this._layers[id];
            if (layer.options.interactive && layer._containsPoint(point) && !this._map._draggableMoved(layer)) {
                clickedLayer = layer;
            }
        }
        if (clickedLayer) {
            L.DomEvent.stop(e);
            this._fireEvent([clickedLayer], e);
        }
    },

    _onMouseMove: function (e) {
        if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
            return;
        }

        var point = this._map.mouseEventToLayerPoint(e).subtract(this.getOffset());
        this._handleMouseHover(e, point);
    },

    _updateIcon: function (layer) {
        if (!this._drawing) {
            return;
        }

        var options = layer.options,
            ctx = this._ctx,
            img = layer._getImage();
        if (options.iconSize && img.complete) {
            var size = L.point(options.iconSize),
                anchor = size && size.divideBy(2, true),
                p = layer._point.subtract(anchor);
            ctx.drawImage(img, p.x, p.y, size.x, size.y);
        } else {
            L.DomEvent.on(img, 'load', function () {
                var size = L.point([img.width, img.height]),
                    anchor = size && size.divideBy(2, true),
                    p = layer._point.subtract(anchor);
                ctx.drawImage(img, p.x, p.y, size.x, size.y);
            });
        }

        this._drawnLayers[layer._leaflet_id] = layer;
    }
});
