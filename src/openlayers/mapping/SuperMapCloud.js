import ol from 'openlayers';

/**
 * @class ol.source.SuperMapCloud
 * @category  ThirdPartyMap
 * @classdesc 超图云地图图层源。
 * @param opt_options - {Object} 可选参数：如：<br>
 *        url - {string} 服务地址。默认地址为 http://t2.supermapcloud.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z} <br>
 *        tileProxy - {string} 代理地址址
 * @extends ol.source.XYZ{@linkdoc-openlayers/ol.source.XYZ}
 */
export class SuperMapCloud extends ol.source.XYZ {

    constructor(opt_options) {
        var options = opt_options || {};

        var attributions = options.attributions || new ol.Attribution({
            html: "Map Data ©2014 SuperMap - GS(2014)6070号-data©Navinfo with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
        });
        var mapName = options.mapName || 'quanguo';
        var mapType = options.mapType || 'web';
        var url = options.url || 'http://t2.supermapcloud.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}';
        url = url.replace('{mapName}', mapName).replace('{type}', mapType);

        var superOptions = {
            attributions: attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            opaque: options.opaque === undefined ? true : options.opaque,
            maxZoom: options.maxZoom || 18,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            url: url,
            wrapX: options.wrapX
        };
        //需要代理时走自定义 tileLoadFunction，否则走默认的tileLoadFunction
        if (options.tileProxy) {
            superOptions.tileLoadFunction = tileLoadFunction;
        }
        super(superOptions);

        if (options.tileProxy) {
            this.tileProxy = options.tileProxy;
        }
        //需要代理时，走以下代码
        var me = this;
        function tileLoadFunction(imageTile, src) {
            //支持代理
            imageTile.getImage().src = me.tileProxy + encodeURIComponent(src);
        }
    }
}

ol.source.SuperMapCloud = SuperMapCloud;