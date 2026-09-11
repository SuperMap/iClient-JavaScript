/* Copyright© 2000 - 2026 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';

/**
 * 扩展 Leaflet `L.TileLayer`，在视野外预加载若干圈同级瓦片，减少平移时的空白块。
 * `_getTiledPixelBounds` 定义在 `L.GridLayer`，TileLayer 继承该方法；此处覆盖后仅对 TileLayer 及其子类生效。
 *
 * @param {number} [options.bufferTiles=0] - 视野外预加载的瓦片圈数。默认 0 表示不预加载；为 1 时上下左右各多加载一圈。支持小数。
 */
var originalGetTiledPixelBounds = L.GridLayer.prototype._getTiledPixelBounds;

L.TileLayer.mergeOptions({
    bufferTiles: 0
});

L.TileLayer.include({
    _getTiledPixelBounds: function (center) {
        var pixelBounds = originalGetTiledPixelBounds.call(this, center);
        var bufferTiles = this.options.bufferTiles;
        if (bufferTiles > 0) {
            var pad = this.getTileSize().multiplyBy(bufferTiles);
            pixelBounds = new L.Bounds(pixelBounds.min.subtract(pad), pixelBounds.max.add(pad));
        }
        return pixelBounds;
    }
});
