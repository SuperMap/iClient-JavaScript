import L from "leaflet";

/**
 * @name L.CRS.BaiduCRS
 * @description 百度的坐标对象
 * @namespace
 * @category BaseTypes Projection
 */
export var BaiduCRS = L.CRS.Baidu = L.extend({}, L.CRS.EPSG3857, {
    code: 'Baidu',
    scale: function (zoom) {
        return (6378137 * Math.PI * 2) / Math.pow(2, 18 - zoom)
    },

    transformation: (function () {
        var scale = 0.5 / (Math.PI * 6378137);
        return new L.Transformation(scale, 0, -scale, 0);
    }())
});

var tdt_WGS84_resolutions = [];

for (let i = 1; i < 19; i++) {
    tdt_WGS84_resolutions.push(0.703125 * 2 / (Math.pow(2, i)));
}

/**
 * @name L.CRS.TianDiTu_WGS84CRS
 * @description 天地图WGS84坐标对象
 * @namespace
 * @category BaseTypes Projection
 */
export var TianDiTu_WGS84CRS = L.CRS.TianDiTu_WGS84 = L.Proj.CRS("EPSG:4326",{
    origin: [-180, 90],
    resolutions: tdt_WGS84_resolutions,
    bounds: L.bounds([-180, -90], [180, 90])
});

var tdt_Mercator_resolutions = [];
for (let i = 1; i < 19; i++) {
    tdt_Mercator_resolutions.push(78271.5169640203125 * 2 / (Math.pow(2, i)));
}

/**
 * @name L.CRS.TianDiTu_MercatorCRS
 * @description 天地图墨卡托坐标对象
 * @category BaseTypes Projection
 * @namespace
 */
export var TianDiTu_MercatorCRS = L.CRS.TianDiTu_Mercator = L.Proj.CRS("EPSG:3857",{
    origin: [-20037508.3427892, 20037508.3427892],
    resolutions: tdt_Mercator_resolutions,
    bounds: L.bounds([-20037508.3427892, -20037508.3427892], [20037508.3427892, 20037508.3427892])
});
L.CRS.BaiduCRS = BaiduCRS;
L.CRS.TianDiTu_WGS84CRS = TianDiTu_WGS84CRS;
L.CRS.TianDiTu_MercatorCRS = TianDiTu_MercatorCRS;