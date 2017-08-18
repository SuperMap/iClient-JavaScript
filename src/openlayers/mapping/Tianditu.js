import ol from 'openlayers/dist/ol-debug';
/**
 * @class ol.source.Tianditu
 * @classdesc 天地图
 * @param opt_options - {olx.source.WMTSOptions} 参数
 * @extends ol.source.WMTS{@linkdoc-openlayers/ol.source.WMTS}
 */
export default class Tianditu extends ol.source.WMTS {

    constructor(opt_options) {
        var options = opt_options || {};
        var attributions = options.attributions || new ol.Attribution({
            html: "Map Data <a href='http://www.tianditu.com' target='_blank'><img style='background-color:transparent;bottom:2px;opacity:1;' " +
            "src='http://api.tianditu.com/img/map/logo.png' width='53px' height='22px' opacity='0'></a> with " +
            "<span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
        });

        if (!options.url && !options.urls) {
            options.url = "http://t{0-7}.tianditu.com/img_w/wmts"
        }
        super({
            version: options.version || '1.0.0',
            format: options.format || 'tiles',
            dimensions: options.dimensions || {},
            layer: options.layer || 'img',
            matrixSet: options.matrixSet || 'w',
            tileGrid: options.tileGrid || ol.source.Tianditu.getTileGrid(options.projection || 'EPSG:3857'),
            style: options.style || 'default',
            attributions: attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            opaque: options.opaque || true,
            maxZoom: options.maxZoom || 19,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileLoadFunction: options.tileLoadFunction,
            url: options.url,
            urls: options.urls,
            projection: options.projection || 'EPSG:3857',
            wrapX: options.wrapX
        })
    }
    /**
     * @function ol.source.Tianditu.getTileGrid
     * @description 网格瓦片
     * @param projection -{objecxt} 投影参考对象
     * @return {ol.tilegrid.WMTS}
     */
    static getTileGrid(projection) {
        if (projection === "EPSG:4326" || projection === "EPSG:4490") {
            return ol.source.Tianditu.default4326TileGrid();
        }
        return ol.source.Tianditu.default3857TileGrid();
    }
    /**
     * @function ol.source.Tianditu.default4326TileGrid
     * @description 自定义4326网格瓦片
     * @return {ol.tilegrid.WMTS}
     */
    static default4326TileGrid() {
        var tdt_WGS84_resolutions = [];
        var matrixIds = [];
        for (var i = 0; i < 18; i++) {
            tdt_WGS84_resolutions.push(0.703125 / (Math.pow(2, i)));
            matrixIds.push(i + 1);
        }
        var tileGird = new ol.tilegrid.WMTS({
            extent: [-180, -90, 180, 90],
            resolutions: tdt_WGS84_resolutions,
            origin: [-180, 90],
            matrixIds: matrixIds,
            minZoom: 1
        });
        return tileGird;
    }
    /**
     * @function ol.source.Tianditu.default3857TileGrid
     * @description 自定义3857网格瓦片
     * @return {ol.tilegrid.WMTS}
     */
    static default3857TileGrid() {
        var tdt_Mercator_resolutions = [];
        var matrixIds = [];
        for (var i = 0; i < 18; i++) {
            tdt_Mercator_resolutions.push(78271.5169640203125 / (Math.pow(2, i)));
            matrixIds.push(i + 1);
        }
        var tileGird = new ol.tilegrid.WMTS({
            extent: [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892],
            resolutions: tdt_Mercator_resolutions,
            matrixIds: matrixIds,
            origin: [-20037508.3427892, 20037508.3427892],
            minZoom: 1,
        });
        return tileGird;
    }
}
ol.source.Tianditu = Tianditu;