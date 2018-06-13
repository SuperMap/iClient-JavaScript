import L from "leaflet";

/**
 * @class L.supermap.SVGRenderer
 * @classdesc 矢量图层缩放渲染器类
 * @category Visualization VectorTile
 * @private
 * @extends {L.SVG}
 * @param {Object} tileCoord - 切片坐标系
 * @param {number} tileSize - 切片大小
 * @param {Object} options - 渲染参数
 */
export var SVGRenderer = L.SVG.extend({

    initialize: function (tileCoord, tileSize, options) {
        L.SVG.prototype.initialize.call(this, options);
        this._tileCoord = tileCoord;
        this._size = tileSize;

        this._initContainer();
        this._container.setAttribute('width', this._size.x);
        this._container.setAttribute('height', this._size.y);
        this._container.setAttribute('viewBox', [0, 0, this._size.x, this._size.y].join(' '));

        this._layers = {};
    },

    /**
     * @function L.supermap.SVGRenderer.prototype.getCoord
     * @description 获取坐标
     */
    getCoord: function () {
        return this._tileCoord;
    },

    /**
     * @function L.supermap.SVGRenderer.prototype.getContainer
     * @description 获取容器
     */
    getContainer: function () {
        return this._container;
    },

    onAdd: L.Util.falseFn,

    /**
     * @function L.supermap.SVGRenderer.prototype.addTo
     * @description 添加到地图
     * @param {L.map} map - map对象
     */
    addTo: function (map) {
        this._map = map;
        if (this.options.interactive) {
            for (var i in this._layers) {
                var layer = this._layers[i];
                layer._path.style.pointerEvents = 'auto';
                this._map._targets[L.stamp(layer._path)] = layer;
            }
        }
    },

    /**
     * @function L.supermap.SVGRenderer.prototype.removeFrom
     * @description 从地图移除
     * @param {L.map} map - map对象
     */
    removeFrom: function (map) {
        var _map = map || this._map;
        if (this.options.interactive) {
            for (var i in this._layers) {
                var layer = this._layers[i];
                delete _map._targets[L.stamp(layer._path)];
            }
        }
        delete this._map;
    },

    _addPath: function (layer) {
        if (!this._rootGroup) {
            this._initContainer();
        }
        if (!this._rootGroup) {
            this._rootGroup = this._container;
        }
        this._rootGroup.appendChild(layer._path);
        this._layers[L.stamp(layer)] = layer;
    },

    _updateIcon: function (layer) {
        var path = layer._path = L.SVG.create('image'),
            options = layer.options,
            iconUrl = options.iconUrl;
        if (options.iconSize) {
            var size = L.point(options.iconSize),
                anchor = size && size.divideBy(2, true),
                p = layer._point.subtract(anchor);
            path.setAttribute('x', p.x);
            path.setAttribute('y', p.y);
            path.setAttribute('width', size.x + 'px');
            path.setAttribute('height', size.y + 'px');
        } else {
            var img = new Image();
            img.src = iconUrl;
            L.DomEvent.on(img, 'load', function () {
                var size = L.point([img.width, img.height]),
                    anchor = size && size.divideBy(2, true),
                    p = layer._point.subtract(anchor);
                path.setAttribute('x', p.x);
                path.setAttribute('y', p.y);
                path.setAttribute('width', size.x + 'px');
                path.setAttribute('height', size.y + 'px');
            });
        }
        path.setAttribute('href', iconUrl);
    }
});
