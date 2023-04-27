/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import XYZ from 'ol/source/XYZ';

/**
 * @class SuperMapCloud
 * @browsernamespace ol.source
 * @category  ThirdPartyMap
 * @classdesc 超图云地图图层源。
 * @param {Object} opt_options - 参数。
 * @param {string} [opt_options.url='http://t2.dituhui.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}'] - 服务地址。
 * @param {string} [opt_options.tileProxy] - 代理地址。
 * @extends {ol.source.XYZ}
 * @usage
 */
export class SuperMapCloud extends XYZ {

    constructor(opt_options) {
        var options = opt_options || {};

        var attributions = options.attributions || "Map Data ©2014 SuperMap - GS(2014)6070号-data©Navinfo with <span>© SuperMap iClient</span>"
        var mapName = options.mapName || 'quanguo';
        var mapType = options.mapType || 'web';
        var url = options.url || 'http://t2.dituhui.com/FileService/image?map={mapName}&type={type}&x={x}&y={y}&z={z}';
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
