import ol from 'openlayers/dist/ol-debug';
/**
 * @class ol.source.Baidu
 * @classdesc 百度地图
 * @param opt_options - {object} 可选参数
 * @extends ol.source.TileImage
 */
export default class Baidu extends ol.source.TileImage {
    constructor(opt_options) {
        var options = opt_options || {};
        var attributions = options.attributions || new ol.Attribution({
                html: "Map Data © 2017 Baidu - GS(2016)2089号 - Data © 长地万方 with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
            });
        var tileGrid = ol.source.Baidu.defaultTileGrid();
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
ol.source.Baidu = Baidu;