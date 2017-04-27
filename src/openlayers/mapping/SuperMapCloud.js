require('../core/Base');
var ol = require('openlayers');
ol.source.SuperMapCloud = function (opt_options) {

    var options = opt_options || {};

    var attributions;
    if (options.attributions !== undefined) {
        attributions = options.attributions;
    } else {
        attributions = new ol.Attribution({
            html: ' with <a href="http://icltest.supermapol.com/">SuperMap iClient</a>'
        });
    }
    var mapName = options.mapName || 'quanguo';
    var mapType = options.mapType || 'web';
    var url = options.url || 'http://t2.supermapcloud.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}';
    url = url.replace('{mapName}', mapName).replace('{type}', mapType);
    ol.source.XYZ.call(this, {
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

};
ol.inherits(ol.source.SuperMapCloud, ol.source.XYZ);
module.exports = ol.source.SuperMapCloud;