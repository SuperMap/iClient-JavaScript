import ol from 'openlayers/dist/ol-debug';
/**
 * @class ol.source.BaiduMap
 * @classdesc 百度地图图层源。
 * @param opt_options - {Object} 创建地图参数可选参数：<br>
 *        url - {string} 服务地址。<br>
 *        attributions - {string} 版权描述信息。<br>
 *        cacheSize - {number} 缓冲大小。<br>
 *        tileLoadFunction - {function} 切片加载完成后执行函数。<br>
 *        maxZoom - {Object} 最大缩放级别。<br>
 *        opaque - {boolean} 是否透明。
 * @extends ol.source.TileImage{@linkdoc-openlayers/ol.source.TileImage}
 */
export default class BaiduMap extends ol.source.TileImage {
    constructor(opt_options) {
        var options = opt_options || {};
        var attributions = options.attributions || new ol.Attribution({
                html: "Map Data © 2017 Baidu - GS(2016)2089号 - Data © 长地万方 with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
            });
        var tileGrid = ol.source.BaiduMap.defaultTileGrid();
        var crossOrigin = options.crossOrigin !== undefined ?
            options.crossOrigin : 'anonymous';

        var url = options.url !== undefined ?
            options.url : "http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20170408";
        var hidpi = options.hidpi || (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;
        url = url.replace('{styles}', hidpi ? 'ph' : 'pl');
        super({
            attributions: attributions,
            cacheSize: options.cacheSize,
            crossOrigin: crossOrigin,
            opaque: options.opaque !== undefined ? options.opaque : true,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileLoadFunction: options.tileLoadFunction,
            url: url,
            projection: 'EPSG:3857',
            wrapX: options.wrapX,
            tilePixelRatio: hidpi ? 2 : 1,
            tileGrid: tileGrid,
            tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                return url.replace("{z}", tileCoord[0].toString())
                    .replace("{x}", tileCoord[1].toString())
                    .replace("{y}", function () {
                        var y = tileCoord[2];
                        return y.toString();
                    })
                    .replace("{-y}", function () {
                        var z = tileCoord[0];
                        var range = tileGrid.getFullTileRange(z);
                        ol.asserts.assert(range, 55); // The {-y} placeholder requires a tile grid with extent
                        var y = range.getHeight() + tileCoord[2];
                        return y.toString();
                    });
            }
        });
    }

    /**
     * @function ol.source.BaiduMap.defaultTileGrid
     * @description 获取默认瓦片格网
     * @return {ol.tilegrid.TileGrid}
     */
    static defaultTileGrid() {
        var tileGird = new ol.tilegrid.TileGrid({
            extent: [-33554432, -33554432, 33554432, 33554432],
            resolutions: [131072 * 2, 131072, 65536, 32768, 16284, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5],
            origin: [0, 0],
            minZoom: 3,
        });
        return tileGird;
    }

}
ol.source.BaiduMap = BaiduMap;