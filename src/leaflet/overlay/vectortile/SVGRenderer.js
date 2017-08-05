import L from "leaflet";
export var  SVGRenderer = L.SVG.extend({

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

    getCoord: function () {
        return this._tileCoord;
    },

    getContainer: function () {
        return this._container;
    },

    onAdd: L.Util.falseFn,

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

    removeFrom: function (map) {
        var map = map || this._map;
        if (this.options.interactive) {
            for (var i in this._layers) {
                var layer = this._layers[i];
                delete map._targets[L.stamp(layer._path)];
            }
        }
        delete this._map;
    },

    _initContainer: function () {
        L.SVG.prototype._initContainer.call(this);
        var rect = L.SVG.create('rect');
    },

    _addPath: function (layer) {
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
            L.DomEvent.on(img, 'load', function (evt) {
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
