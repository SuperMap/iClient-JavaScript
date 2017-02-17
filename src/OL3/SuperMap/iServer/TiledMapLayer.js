/**
 * Class: ol.superMap.TiledMapLayer
 * SuperMap iServer 的 REST 地图服务的图层(SuperMap iServer Java 6R 及以上分块动态 REST 图层)
 * 用法：
 *      map.addLayer(new ol.supermap.TiledMapLayer(url, options));
 */
require('../../base');
require('../../../Core/base');

ol.supermap.TiledMapLayer = function (url, options) {
    if (url == undefined) {
        return;
    }
    var tileLayer = new ol.layer.Tile({
        source: getSource()
    });
    var layerUrl = url + "/image.png?redirect=false&width=256&height=256";

    //为url添加安全认证信息片段
    if (SuperMap.Credential && SuperMap.Credential.CREDENTIAL) {
        layerUrl += "&" + SuperMap.Credential.CREDENTIAL.getUrlParameters();
    }

    //切片是否透明
    var transparent = true;
    if (options && options.transparent != undefined) {
        transparent = options.transparent;
    }
    layerUrl += "&transparent=" + transparent;

    //是否使用缓存
    var cacheEnabled = false;
    if (options && options.cacheEnabled != undefined) {
        cacheEnabled = options.cacheEnabled;
    }
    layerUrl += "&cacheEnabled=" + cacheEnabled;

    //如果有layersID，则是在使用专题图
    if (options && options.layersID != undefined) {
        layerUrl += "&layersID=" + options.layersID;
    }
    //如果有pro，并且只能是4326或者3857的地图。
    var pro = "3857";
    if (options && options.pro) {
        if (options.pro === "4326") {
            pro = "4326";
        }
    }
    layerUrl += "&projection=" + pro;
    //计算分辨率和比例尺
    var resLen = 17;
    var resStart = 0;
    var dpi = 95.99999999999984;
    var scales3857 = [];
    var scales4326 = [];
    var resolutions3857 = [];
    var resolutions4326 = [];

    for (var i = resStart; i <= resLen; i++) {
        var res3857 = 156543.0339 / Math.pow(2, i);

        resolutions3857.push(res3857);

        var scale3857 = 0.0254 / dpi / res3857;
        scales3857.push(scale3857);
    }
    tileLayer.scales = scales3857;
    for (var i = resStart; i <= resLen; i++) {
        var res4326 = 1.40625 / Math.pow(2, i);
        resolutions4326.push(res4326);
        var scale4326 = 0.0254 * 360 / dpi / res4326 / Math.PI / 2 / 6378137;
        scales4326.push(scale4326);
    }
    tileLayer.scales = scales4326;

    function getSource() {
        var tileUrl;
        var source = new ol.source.TileImage({
            wrapX: true,
            tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                var z = tileCoord[0], x = tileCoord[1], y = tileCoord[2];
                if (pro === "3857") {
                    x -= Math.pow(2, z - 1);
                    y += Math.pow(2, z - 1);
                    var left = x * 256 * resolutions3857[z];
                    var bottom = y * 256 * resolutions3857[z];
                    var right = (x + 1) * 256 * resolutions3857[z];
                    var top = (y + 1) * 256 * resolutions3857[z];
                    tileUrl = layerUrl + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + left + ",\"y\":" + bottom + "},\"rightTop\" : {\"x\":" + right + ",\"y\":" + top + "}}";
                }
                else if (pro === "4326") {
                    var left = -180 + (x * 256 * resolutions4326[z]);
                    var bottom = 90 + (y * 256 * resolutions4326[z]);
                    var right = -180 + ((x + 1) * 256 * resolutions4326[z]);
                    var top = 90 + ((y + 1) * 256 * resolutions4326[z]);
                    tileUrl = layerUrl + "&viewBounds=" + "{\"leftBottom\" : {\"x\":" + left + ",\"y\":" + bottom + "},\"rightTop\" : {\"x\":" + right + ",\"y\":" + top + "}}";
                }
                var epsg = pro === "3857" ? 3857 : 4326;
                tileUrl += "&prjCoordSys={\"epsgCode\":" + epsg + "}";
                return tileUrl;
            }
        });
        return source;
    }

    return tileLayer;
};

module.exports = ol.supermap.TiledMapLayer;