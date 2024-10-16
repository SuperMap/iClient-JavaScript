/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import {crs as CRS} from './Proj4Leaflet'
/**
 * @name BaiduCRS
 * @description 百度坐标对象。
 * @namespace
 * @category BaseTypes Projection
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const baiduCRS = {namespace}.CRS.BaiduCRS;
 * 
 *   // 弃用的写法
 *   const baiduCRS = L.CRS.BaiduCRS;
 * 
 * </script>
 * //ES6 Import
 * import { BaiduCRS } from "{npm}";
 * 
 * const baiduCRS = BaiduCRS;
 * ```
 */
export var BaiduCRS = L.extend({}, L.CRS.EPSG3857, {
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
 * @name TianDiTu_WGS84CRS
 * @deprecatedclass L.CRS.TianDiTu_WGS84CRS
 * @description 天地图 WGS84 坐标对象。
 * @namespace
 * @category BaseTypes Projection
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const tianDiTu_WGS84CRS = {namespace}.CRS.TianDiTu_WGS84CRS;
 * 
 *   // 弃用的写法
 *   const tianDiTu_WGS84CRS = L.CRS.TianDiTu_WGS84CRS;
 * 
 * </script>
 * //ES6 Import
 * import { TianDiTu_WGS84CRS } from "{npm}";
 * 
 * const tianDiTu_WGS84CRS = TianDiTu_WGS84CRS;
 * 
 * ```
 */
export var TianDiTu_WGS84CRS = CRS("EPSG:4326",{
    origin: [-180, 90],
    resolutions: tdt_WGS84_resolutions,
    bounds: L.bounds([-180, -90], [180, 90]),
    wrapLng: [-180, 180]
});

const c = Math.PI * 2 * 6378137;
const halfC = c / 2;
var tdt_Mercator_resolutions = [];
for (let i = 1; i < 19; i++) {
    tdt_Mercator_resolutions.push(c / 256 / Math.pow(2, i));
}

/**
 * @name TianDiTu_MercatorCRS
 * @deprecatedclass L.CRS.TianDiTu_MercatorCRS
 * @description 天地图墨卡托坐标对象。
 * @category BaseTypes Projection
 * @namespace
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const tianDiTu_MercatorCRS = {namespace}.CRS.TianDiTu_MercatorCRS;
 * 
 *   // 弃用的写法
 *   const tianDiTu_MercatorCRS = L.CRS.TianDiTu_MercatorCRS;
 * 
 * </script>
 * //ES6 Import
 * import { TianDiTu_MercatorCRS } from "{npm}";
 * 
 * const tianDiTu_MercatorCRS = TianDiTu_MercatorCRS;
 * 
 * ```
 */
export var TianDiTu_MercatorCRS = CRS('EPSG:3857', {
    origin: [-halfC, halfC],
    resolutions: tdt_Mercator_resolutions,
    bounds: L.bounds([-halfC, -halfC], [halfC, halfC]),
    wrapLng: [-180, 180]
});