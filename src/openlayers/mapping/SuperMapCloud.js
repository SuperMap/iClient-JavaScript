import ol from 'openlayers/dist/ol-debug';
/**
 * @class ol.source.SuperMapCloud
 * @classdesc 超图云
 * @param opt_options - {olx.source.XYZOptions} 参数
 * @extends ol.source.XYZ
 */
export default class SuperMapCloud extends ol.source.XYZ {

    constructor(opt_options) {
        var options = opt_options || {};

        var attributions = options.attributions || new ol.Attribution({
                html: "Map Data ©2013 SuperMap - GS(2011)6014号-data©Navinfo with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
            });
        var mapName = options.mapName || 'quanguo';
        var mapType = options.mapType || 'web';
        var url = options.url || 'http://t2.supermapcloud.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}';
        url = url.replace('{mapName}', mapName).replace('{type}', mapType);
        super({
            attributions: attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            opaque: options.opaque || true,
            maxZoom: options.maxZoom || 18,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileLoadFunction: options.tileLoadFunction,
            url: url,
            wrapX: options.wrapX
        });
    }
}
ol.source.SuperMapCloud = SuperMapCloud;