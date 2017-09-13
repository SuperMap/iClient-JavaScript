import ol from 'openlayers/dist/ol-debug';
/**
 * @class ol.source.SuperMapCloud
 * @classdesc 超图云地图图层源。
 * @param opt_options - {Object} 可选参数：如：<br>
 *        url - {string} 服务地址。默认地址为 http://t2.supermapcloud.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z} <br>
 *        attributions - {string} 版权描述信息。<br>
 *        cacheSize - {number} 缓冲大小。<br>
 *        tileLoadFunction - {function} 切片加载完成后执行函数。<br>
 *        maxZoom - {Object} 最大缩放级别。<br>
 *        opaque - {boolean} 是否透明。
 * @extends ol.source.XYZ{@linkdoc-openlayers/ol.source.XYZ}
 */
export default class SuperMapCloud extends ol.source.XYZ {

    constructor(opt_options) {
        var options = opt_options || {};

        var attributions = options.attributions || new ol.Attribution({
                html: "Map Data ©2014 SuperMap - GS(2014)6070号-data©Navinfo with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
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