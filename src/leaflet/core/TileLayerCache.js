/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';

/**
 * 扩展 Leaflet `L.TileLayer`：
 * 1. 放大时沿用原生父级瓦片占位，不提前拆掉原级别。
 * 2. 额外保留邻近缩放级别的已加载瓦片（含放大前四周的瓦片）。
 * 3. 被裁掉的瓦片进入内存缓存；再次需要时立刻复用，缺失的再发请求。
 *
 * @param {boolean} [options.tileCache=false] - 是否启用客户端瓦片内存缓存。
 * @param {number} [options.tileCacheZoomRange=5] - 动态缓存相对当前视野的缩放范围倍数。缓存上限为 `(ceil(宽/tileSize)+1) * (ceil(高/tileSize)+1) * tileCacheZoomRange`。
 * @param {number} [options.maxOverzooming=8] - 保留更低级别瓦片的深度，用于放大占位以及缩小后四周填充。
 * @param {number} [options.maxUnderzooming=3] - 保留更高级别瓦片的深度，用于缩小过程中的占位填充。
 */
var EMPTY_IMAGE_URL = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
var DEFAULT_TILE_CACHE_ZOOM_RANGE = 5;
var DEFAULT_MAX_OVERZOOMING = 8;
var DEFAULT_MAX_UNDERZOOMING = 3;

var originalAddTile = L.GridLayer.prototype._addTile;
var originalRemoveTile = L.TileLayer.prototype._removeTile;
var originalTileReady = L.TileLayer.prototype._tileReady;
var originalPruneTiles = L.GridLayer.prototype._pruneTiles;
var originalOnRemove = L.GridLayer.prototype.onRemove;
var originalRedraw = L.GridLayer.prototype.redraw;
var originalSetUrl = L.TileLayer.prototype.setUrl;
var originalSetZoomTransforms = L.GridLayer.prototype._setZoomTransforms;

function isEmptyImageSrc(el) {
    if (!el) {
        return true;
    }
    var src = el.getAttribute ? el.getAttribute('src') : el.src;
    return !src || src === EMPTY_IMAGE_URL;
}

function toTileCoords(x, y, z) {
    var coords = L.point(x, y);
    coords.z = z;
    return coords;
}

L.TileLayer.mergeOptions({
    tileCache: false,
    tileCacheZoomRange: DEFAULT_TILE_CACHE_ZOOM_RANGE,
    maxOverzooming: DEFAULT_MAX_OVERZOOMING,
    maxUnderzooming: DEFAULT_MAX_UNDERZOOMING
});

L.TileLayer.include({
    _isTileCacheEnabled: function () {
        return this.options.tileCache !== false && this._getMaxTileCacheSize() > 0 && !this._tileCacheClosing;
    },

    _getViewDependentTileCacheSize: function () {
        var map = this._map;
        var tileSize = this.getTileSize ? this.getTileSize() : null;
        var tw = (tileSize && tileSize.x) || 256;
        var th = (tileSize && tileSize.y) || 256;
        var width = tw;
        var height = th;
        if (map && map.getSize) {
            var size = map.getSize();
            if (size && size.x > 0 && size.y > 0) {
                width = size.x;
                height = size.y;
            }
        }
        var widthInTiles = Math.ceil(width / tw) + 1;
        var heightInTiles = Math.ceil(height / th) + 1;
        return Math.floor(widthInTiles * heightInTiles * this._getTileCacheZoomRange());
    },

    _getTileCacheZoomRange: function () {
        var range = this.options.tileCacheZoomRange;
        if (range == null) {
            return DEFAULT_TILE_CACHE_ZOOM_RANGE;
        }
        return range > 0 ? range : 0;
    },

    _getMaxTileCacheSize: function () {
        return this._getViewDependentTileCacheSize();
    },

    _getMaxOverzooming: function () {
        return this.options.maxOverzooming != null ? this.options.maxOverzooming : DEFAULT_MAX_OVERZOOMING;
    },

    _getMaxUnderzooming: function () {
        return this.options.maxUnderzooming != null ? this.options.maxUnderzooming : DEFAULT_MAX_UNDERZOOMING;
    },

    _ensureTileCache: function () {
        if (!this._tileCache) {
            this._tileCache = new Map();
        }
        return this._tileCache;
    },

    _clearTileCache: function () {
        if (this._tileCache) {
            this._tileCache.clear();
        }
    },

    _isCacheableTile: function (tile) {
        return !!(
            tile &&
            tile.loaded &&
            tile.el &&
            tile.el.complete &&
            !isEmptyImageSrc(tile.el)
        );
    },

    _putTileCache: function (key, el, z) {
        if (!this._isTileCacheEnabled() || !el || isEmptyImageSrc(el)) {
            return;
        }
        var cache = this._ensureTileCache();
        L.DomEvent.off(el, 'load');
        L.DomEvent.off(el, 'error');
        el.onload = null;
        el.onerror = null;
        cache.delete(key);
        cache.set(key, { el: el, z: z });
        this._evictTileCache();
    },

    _takeTileCache: function (key) {
        if (!this._tileCache || !this._tileCache.has(key)) {
            return null;
        }
        var entry = this._tileCache.get(key);
        if (!entry || !entry.el || isEmptyImageSrc(entry.el)) {
            this._tileCache.delete(key);
            return null;
        }
        this._tileCache.delete(key);
        return entry.el;
    },

    _evictTileCache: function () {
        var cache = this._tileCache;
        var maxSize = this._getMaxTileCacheSize();
        if (!cache) {
            return;
        }
        while (cache.size > maxSize) {
            var evictKey = this._findTileCacheEvictKey();
            if (!evictKey) {
                break;
            }
            cache.delete(evictKey);
        }
    },

    _findTileCacheEvictKey: function () {
        var cache = this._tileCache;
        var currentZ = this._tileZoom;
        var firstKey;
        var farKey;
        var currentZoomKey;
        var nearbyKey;
        var maxOver = this._getMaxOverzooming();
        var maxUnder = this._getMaxUnderzooming();
        cache.forEach(function (entry, key) {
            if (!firstKey) {
                firstKey = key;
            }
            var z = entry && entry.z;
            var dz = currentZ - z;
            var nearby =
                z === currentZ ||
                (dz > 0 && dz <= maxOver) ||
                (dz < 0 && -dz <= maxUnder);
            if (!nearby && !farKey) {
                farKey = key;
            }
            if (z === currentZ && !currentZoomKey) {
                currentZoomKey = key;
            }
            if (nearby && z !== currentZ && !nearbyKey) {
                nearbyKey = key;
            }
        });
        return farKey || currentZoomKey || nearbyKey || firstKey;
    },

    _tilePosOnLevel: function (coords, level) {
        return coords.scaleBy(this.getTileSize()).subtract(level.origin);
    },

    _ensureTileLevel: function (z) {
        var level = this._levels[z];
        if (level) {
            return level;
        }
        var map = this._map;
        var maxZoom = this.options.maxZoom;
        maxZoom = typeof maxZoom === 'number' ? maxZoom : 20;
        level = this._levels[z] = {};
        level.el = L.DomUtil.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
        level.el.style.zIndex = maxZoom - Math.abs(this._tileZoom - z);
        level.origin = map.project(map.unproject(map.getPixelOrigin()), z).round();
        level.zoom = z;
        this._setZoomTransform(level, map.getCenter(), map.getZoom());
        return level;
    },

    _restoreCachedTileAt: function (coords, isCurrent) {
        var key = this._tileCoordsToKey(coords);
        if (this._tiles[key]) {
            return true;
        }
        var el = this._takeTileCache(key);
        if (!el) {
            return false;
        }
        var level = this._ensureTileLevel(coords.z);
        this._initTile(el);
        el.style.opacity = '';
        L.DomUtil.addClass(el, 'leaflet-tile-loaded');
        L.DomUtil.setPosition(el, this._tilePosOnLevel(coords, level));
        this._tiles[key] = {
            el: el,
            coords: coords,
            current: !!isCurrent,
            loaded: +new Date(),
            active: true
        };
        if (isCurrent) {
            el._fromTileCache = true;
        }
        level.el.appendChild(el);
        return true;
    },

    _restoreCoveringTiles: function (coords) {
        var px = coords.x;
        var py = coords.y;
        var maxOver = this._getMaxOverzooming();
        var z, depth;
        for (z = coords.z - 1, depth = 1; depth <= maxOver && z >= 0; z--, depth++) {
            px = Math.floor(px / 2);
            py = Math.floor(py / 2);
            if (this._restoreCachedTileAt(toTileCoords(px, py, z), false)) {
                return;
            }
        }
        var maxUnder = this._getMaxUnderzooming();
        this._restoreCachedChildren(coords.x, coords.y, coords.z, coords.z + maxUnder);
    },

    _restoreCachedChildren: function (x, y, z, maxZoom) {
        if (z + 1 > maxZoom) {
            return;
        }
        var i, j, child;
        for (i = x * 2; i < x * 2 + 2; i++) {
            for (j = y * 2; j < y * 2 + 2; j++) {
                child = toTileCoords(i, j, z + 1);
                if (!this._restoreCachedTileAt(child, false)) {
                    this._restoreCachedChildren(i, j, z + 1, maxZoom);
                }
            }
        }
    },

    _addTile: function (coords, container) {
        if (!this._isTileCacheEnabled()) {
            return originalAddTile.call(this, coords, container);
        }
        var key = this._tileCoordsToKey(coords);
        if (this._restoreCachedTileAt(coords, true)) {
            var cachedEl = this._tiles[key] && this._tiles[key].el;
            this.fire('tileloadstart', {
                tile: cachedEl,
                coords: coords
            });
            if (cachedEl && cachedEl.complete) {
                L.Util.requestAnimFrame(L.bind(this._tileReady, this, coords, null, cachedEl));
            } else if (cachedEl) {
                var done = L.bind(this._tileReady, this, coords);
                L.DomEvent.on(cachedEl, 'load', L.bind(this._tileOnLoad, this, done, cachedEl));
                L.DomEvent.on(cachedEl, 'error', L.bind(this._tileOnError, this, done, cachedEl));
            }
            this._clipPlaceholderTiles();
            return;
        }
        originalAddTile.call(this, coords, container);
        this._restoreCoveringTiles(coords);
        this._clipPlaceholderTiles();
    },

    _removeTile: function (key) {
        var tile = this._tiles[key];
        if (this._isTileCacheEnabled() && this._isCacheableTile(tile)) {
            this._putTileCache(key, tile.el, tile.coords && tile.coords.z);
            return L.GridLayer.prototype._removeTile.call(this, key);
        }
        return originalRemoveTile.call(this, key);
    },

    _tileReady: function (coords, err, tile) {
        if (tile && tile._fromTileCache) {
            delete tile._fromTileCache;
            if (!this._map) {
                return;
            }
            var key = this._tileCoordsToKey(coords);
            var cachedTile = this._tiles[key];
            if (!cachedTile) {
                return;
            }
            cachedTile.loaded = +new Date();
            cachedTile.active = true;
            L.DomUtil.addClass(cachedTile.el, 'leaflet-tile-loaded');
            cachedTile.el.style.opacity = '';
            this.fire('tileload', {
                tile: cachedTile.el,
                coords: coords
            });
            if (this._noTilesToLoad()) {
                this._loading = false;
                this.fire('load');
                L.Util.requestAnimFrame(this._pruneTiles, this);
            }
            return;
        }
        return originalTileReady.call(this, coords, err, tile);
    },

    _pruneTiles: function () {
        if (!this._isTileCacheEnabled()) {
            return originalPruneTiles.call(this);
        }
        if (!this._map) {
            return;
        }

        var key, tile, coords, dz;
        var zoom = this._map.getZoom();
        if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
            this._removeAllTiles();
            return;
        }

        for (key in this._tiles) {
            tile = this._tiles[key];
            tile.retain = tile.current;
        }

        // 与原生 Leaflet 一致：当前瓦片尚未就绪时，用父级（放大）或子级（缩小）占位
        for (key in this._tiles) {
            tile = this._tiles[key];
            if (tile.current && !tile.active) {
                coords = tile.coords;
                if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                    this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
                }
            }
        }

        // 额外保留邻近级别的全部已加载瓦片，避免放大后把四周裁掉、缩小时出现空白
        var currentZ = this._tileZoom;
        var maxOver = this._getMaxOverzooming();
        var maxUnder = this._getMaxUnderzooming();
        for (key in this._tiles) {
            tile = this._tiles[key];
            if (tile.retain || !tile.loaded) {
                continue;
            }
            dz = currentZ - tile.coords.z;
            if ((dz > 0 && dz <= maxOver) || (dz < 0 && -dz <= maxUnder)) {
                tile.retain = true;
            }
        }

        for (key in this._tiles) {
            if (!this._tiles[key].retain) {
                this._removeTile(key);
            }
        }
        this._evictTileCache();
        this._clipPlaceholderTiles();
    },

    _getValidLatLngBounds: function () {
        if (this.options.bounds) {
            return L.latLngBounds(this.options.bounds);
        }
        if (!this._globalTileRange || this._tileZoom == null || !this._map) {
            return null;
        }
        var min = this._globalTileRange.min;
        var max = this._globalTileRange.max;
        var nw = this._tileCoordsToNwSe(toTileCoords(min.x, min.y, this._tileZoom))[0];
        var se = this._tileCoordsToNwSe(toTileCoords(max.x, max.y, this._tileZoom))[1];
        return L.latLngBounds(nw, se);
    },

    _clipPlaceholderTiles: function () {
        if (!this._isTileCacheEnabled() || !this._map) {
            return;
        }
        var validBounds = this._getValidLatLngBounds();
        var key;
        for (key in this._tiles) {
            this._clipTileElToBounds(this._tiles[key], validBounds);
        }
    },

    _clipTileElToBounds: function (tile, validBounds) {
        if (!tile || !tile.el || !tile.coords) {
            return;
        }
        if (!validBounds || tile.coords.z === this._tileZoom) {
            tile.el.style.clipPath = '';
            tile.el.style.visibility = '';
            return;
        }

        var z = tile.coords.z;
        var nwse = this._tileCoordsToNwSe(tile.coords);
        var tNw = this._map.project(nwse[0], z);
        var tSe = this._map.project(nwse[1], z);
        var vNw = this._map.project(validBounds.getNorthWest(), z);
        var vSe = this._map.project(validBounds.getSouthEast(), z);

        var tileMinX = Math.min(tNw.x, tSe.x);
        var tileMaxX = Math.max(tNw.x, tSe.x);
        var tileMinY = Math.min(tNw.y, tSe.y);
        var tileMaxY = Math.max(tNw.y, tSe.y);
        var validMinX = Math.min(vNw.x, vSe.x);
        var validMaxX = Math.max(vNw.x, vSe.x);
        var validMinY = Math.min(vNw.y, vSe.y);
        var validMaxY = Math.max(vNw.y, vSe.y);

        var left = Math.max(0, validMinX - tileMinX);
        var top = Math.max(0, validMinY - tileMinY);
        var right = Math.max(0, tileMaxX - validMaxX);
        var bottom = Math.max(0, tileMaxY - validMaxY);
        var width = tileMaxX - tileMinX;
        var height = tileMaxY - tileMinY;

        if (left + right >= width - 0.5 || top + bottom >= height - 0.5) {
            tile.el.style.visibility = 'hidden';
            tile.el.style.clipPath = '';
            return;
        }

        tile.el.style.visibility = '';
        if (left < 0.5 && top < 0.5 && right < 0.5 && bottom < 0.5) {
            tile.el.style.clipPath = '';
            return;
        }
        tile.el.style.clipPath = 'inset(' + top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px)';
    },

    _setZoomTransforms: function (center, zoom) {
        originalSetZoomTransforms.call(this, center, zoom);
        if (this._isTileCacheEnabled()) {
            this._clipPlaceholderTiles();
        }
    },

    redraw: function () {
        this._clearTileCache();
        return originalRedraw.call(this);
    },

    setUrl: function (url, noRedraw) {
        this._clearTileCache();
        return originalSetUrl.call(this, url, noRedraw);
    },

    onRemove: function (map) {
        this._tileCacheClosing = true;
        originalOnRemove.call(this, map);
        this._clearTileCache();
        this._tileCacheClosing = false;
    }
});
