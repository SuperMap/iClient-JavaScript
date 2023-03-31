/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import TileImage from 'ol/source/TileImage';
import * as asserts from 'ol/asserts';
import TileGrid from 'ol/tilegrid/TileGrid';
import { Util } from '../core/Util';

/**
 * @class BaiduMap
 * @browsernamespace ol.source
 * @category  ThirdPartyMap
 * @classdesc 百度地图图层源。
 * @param {Object} opt_options - 参数。
 * @param {string} [opt_options.url='http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20170408'] - 服务地址。
 * @param {string} [opt_options.tileProxy] - 代理地址。
 * @param {boolean} [hidpi = false] - 是否使用高分辨率地图。
 * @extends {ol.source.TileImage}
 * @usage
 */
export class BaiduMap extends TileImage {
    constructor(opt_options) {
        var options = opt_options || {};
        var attributions =
            options.attributions ||
            "Map Data © 2018 Baidu - GS(2016)2089号 - Data © 长地万方 with <span>© SuperMap iClient</span>";
        var tileGrid = BaiduMap.defaultTileGrid();
        var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

        var url =
            options.url !== undefined
                ? options.url
                : 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20170408';
        var hidpi =
            options.hidpi || (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
        url = url.replace('{styles}', hidpi ? 'ph' : 'pl');
        super({
            attributions: attributions,
            cacheSize: options.cacheSize,
            crossOrigin: crossOrigin,
            opaque: options.opaque !== undefined ? options.opaque : true,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileLoadFunction: options.tileLoadFunction,
            projection: 'EPSG:3857',
            wrapX: options.wrapX,
            tilePixelRatio: hidpi ? 2 : 1,
            tileGrid: tileGrid,
            tileUrlFunction: tileUrlFunction
        });

        if (options.tileProxy) {
            this.tileProxy = options.tileProxy;
        }
        var me = this;

        // eslint-disable-next-line no-unused-vars
        function tileUrlFunction(tileCoord, pixelRatio, projection) {
            var tempUrl = url
                .replace('{z}', tileCoord[0].toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', function() {
                    console.log(Util.getOlVersion());
                    var y = ['4', '5'].indexOf(Util.getOlVersion()) > -1 ? tileCoord[2] : -tileCoord[2] - 1;
                    return y.toString();
                })
                .replace('{-y}', function() {
                    var z = tileCoord[0];
                    var range = tileGrid.getFullTileRange(z);
                    asserts.assert(range, 55); // The {-y} placeholder requires a tile grid with extent
                    var y = range.getHeight() + tileCoord[2];
                    return y.toString();
                });

            //支持代理
            if (me.tileProxy) {
                tempUrl = me.tileProxy + encodeURIComponent(tempUrl);
            }
            return tempUrl;
        }
    }

    // TODO 确认这个方法是否要开出去
    /**
     * @function BaiduMap.defaultTileGrid
     * @description 获取默认瓦片格网。
     * @returns {ol.tilegrid.TileGrid} 返回瓦片格网对象。
     */
    static defaultTileGrid() {
        var tileGird = new TileGrid({
            extent: [-33554432, -33554432, 33554432, 33554432],
            resolutions: [
                131072 * 2,
                131072,
                65536,
                32768,
                16284,
                8192,
                4096,
                2048,
                1024,
                512,
                256,
                128,
                64,
                32,
                16,
                8,
                4,
                2,
                1,
                0.5
            ],
            origin: [0, 0],
            minZoom: 3
        });
        return tileGird;
    }
}
