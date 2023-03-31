/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import XYZ from 'ol/source/XYZ';
import { SecurityManager, CommonUtil } from '@supermap/iclient-common';

/**
 * @class ol.source.ImageTileSuperMapRest
 * @version 10.2.0
 * @category  iServer Image
 * @classdesc iServer影像服务图层源。根据指定的请求参数，返回影像数据栅格瓦片并渲染。
 * @param {Object} options - 参数。
 * @param {string} options.url - 服务地址。例如: http://{ip}:{port}/iserver/{imageservice-imageserviceName}/restjsr/
 * @param {string} options.collectionId - 影像集合（Collection）的ID，在一个影像服务中唯一标识影像集合。
 * @param {string} [options.sqlFilter] 对所显示影像的过滤条件。相当于sql查询中的where子句。支持st_geometry空间函数过滤。11.0版本暂不支持通过ECQL进行过滤。
 * @param {SuperMap.ImageRenderingRule} [options.renderingRule] 指定影像显示的风格，包含拉伸显示方式、颜色表、波段组合以及应用栅格函数进行快速处理等。不指定时，使用发布服务时所配置的风格。
 * @param {Array.<number>} [options.ids] 返回影像集合中指定ID的影像，该id为系统维护的一个自增id，为SuperMap SDX引擎的SmID字段内容。
 * @param {Array.<string>} [options.names] 返回影像集合中指定名称影像的瓦片资源。影像名称包含文件后缀，如S-60-45.tif。
 * @param {string} [options.format='png'] - 瓦片表述类型，瓦片格式目前支持png、jpg和webp三种格式。
 * @param {boolean} [options.transparent=true] - 瓦片是否透明。默认透明。
 * @param {boolean} [options.cacheEnabled=true] - 启用缓存。
 * @param {string} [options.tileProxy] -  代理地址
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权信息。
 * @extends {ol/source/XYZ}
 */
export class ImageTileSuperMapRest extends XYZ {
    constructor(options) {
        options = options || {};
        options.format = options.format || 'png';
        options.transparent = options.transparent === undefined ? true : options.transparent === true;
        options.cacheEnabled = options.cacheEnabled === undefined ? true : options.cacheEnabled === true;
        var attributions = options.attributions || "Map Data <span>© SuperMap iServer</span>";
        var url = _createLayerUrl(options.url, options);
        var superOptions = {
            ...options,
            attributions: attributions,
            url: url
        };
        //需要代理时走自定义 tileLoadFunction，否则走默认的tileLoadFunction
        if (!options.tileLoadFunction && options.tileProxy) {
            superOptions.tileLoadFunction = tileLoadFunction;
        }
        super(superOptions);
        var me = this;
        this.options = options;
        if (options.tileProxy) {
            this.tileProxy = options.tileProxy;
        }
        function tileLoadFunction(imageTile, src) {
            imageTile.getImage().src = me.tileProxy + encodeURIComponent(src);
        }

        function _createLayerUrl(url, options) {
            var layerUrl = CommonUtil.urlPathAppend(
                url,
                `/collections/${options.collectionId}/tile.${options.format}?x={x}&y={y}&z={z}`
            );
            var requestParams = _getAllRequestParams(options);
            layerUrl = CommonUtil.urlAppend(layerUrl, _getParamString(requestParams));
            layerUrl = SecurityManager.appendCredential(layerUrl);
        
            if (!options.cacheEnabled) {
                layerUrl += '&_t=' + new Date().getTime();
            }
            return layerUrl;
        }

        function _getAllRequestParams(options) {
            var params = {};
            params['transparent'] = options.transparent;
            params['cacheEnabled'] = !(options.cacheEnabled === false);
            if (options.sqlFilter) {
                params['sqlFilter'] = options.sqlFilter;
            }
            if (options.renderingRule) {
                params['renderingRule'] = JSON.stringify(options.renderingRule);
            }
            if (options.ids) {
                params['ids'] = options.ids.join(',');
            }
            if (options.names) {
                params['names'] = options.names.join(',');
            }
            return params;
        }

        function _getParamString(obj) {
            var params = [];
            for (var i in obj) {
                params.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
            }
            return params.join('&');
        }
    }
}
