/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L, { Util as LUtil } from 'leaflet';
import '../core/Base';
import Attributions from '../core/Attributions';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { SecurityManager } from '@supermap/iclient-common/security/SecurityManager';

/**
 * @class ImageTileLayer
 * @deprecatedclassinstance L.supermap.imageTileLayer
 * @version 10.2.0
 * @classdesc iServer 影像服务图层源。根据请求参数，返回指定的影像数据栅格瓦片并渲染。
 * @category iServer Image
 * @extends {L.TileLayer}
 * @example
 *      new ImageTileLayer(url,{collectionId:'xxx'}).addTo(map);
 * @param {string} url - 服务地址,例如: http://{ip}:{port}/iserver/{imageservice-imageserviceName}/restjsr/
 * @param {Object} options - 参数。
 * @param {string} options.collectionId - 影像集合（Collection）的ID，在一个影像服务中唯一标识影像集合。
 * @param {string} [options.sqlFilter] 对所显示影像的过滤条件。相当于SQL查询中的where子句。支持st_geometry空间函数过滤。11.0版本暂不支持通过ECQL进行过滤。
 * @param {ImageRenderingRule} [options.renderingRule] 指定影像显示的风格，包含拉伸显示方式、颜色表、波段组合以及应用栅格函数进行快速处理等。不指定时，使用发布服务时所配置的风格。
 * @param {Array.<number>} [options.ids] 返回影像集合中指定ID的影像，该ID为系统维护的一个自增ID，为SuperMap SDX引擎的SmID字段内容。
 * @param {Array.<string>} [options.names] 返回影像集合中指定名称影像的瓦片资源。影像名称包含文件后缀，如S-60-45.tif。
 * @param {string} [options.format='png'] - 瓦片表述类型，瓦片格式目前支持png、jpg和webp三种格式。
 * @param {boolean} [options.transparent=true] - 瓦片是否透明。默认透明。
 * @param {boolean} [options.cacheEnabled=true] - 启用缓存。
 * @param {string} [options.attribution='Map Data <span>© <a href='http://support.supermap.com.cn/product/iServer.aspx' title='SuperMap iServer' target='_blank'>SuperMap iServer</a></span>'] - 版权信息。
 * @param {Array.<number>} [options.subdomains] - 子域名数组。
 * @param {string} [options.tileProxy] - 服务代理地址。
 * @usage
 */
export var ImageTileLayer = L.TileLayer.extend({
    options: {
        collectionId: null,
        sqlFilter: null,
        ids: null,
        names: null,
        renderingRule: null,
        format: 'png',
        zoomOffset: 1,
        transparent: true,
        cacheEnabled: true,
        tileProxy: null, //启用托管地址。
        attribution: Attributions.Common.attribution,
        subdomains: null
    },

    initialize: function (url, options) {
        this._url = url;
        L.TileLayer.prototype.initialize.apply(this, arguments);
        L.setOptions(this, options);
        L.stamp(this);
    },

    /**
     * @private
     * @function ImageTileLayer.prototype.onAdd
     * @description 添加地图。
     * @param {L.Map} map - Leaflet Map 对象。
     */
    onAdd: function (map) {
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    /**
     * @function ImageTileLayer.prototype.getTileUrl
     * @description 根据行列号获取瓦片地址。
     * @param {Object} coords - 行列号。
     * @returns {string} 瓦片地址。
     */
    getTileUrl: function (coords) {
        var layerUrl = this._getLayerUrl();
        var tileUrl = layerUrl + '&z=' + this._getZoomForUrl() + '&x=' + coords.x + '&y=' + coords.y;
        //支持代理
        if (this.options.tileProxy) {
            tileUrl = this.options.tileProxy + encodeURIComponent(tileUrl);
        }
        if (!this.options.cacheEnabled) {
            tileUrl += '&_t=' + new Date().getTime();
        }
        if (this.options.subdomains) {
            tileUrl = L.Util.template(tileUrl, { s: this._getSubdomain(coords) });
        }
        return tileUrl;
    },

    _getLayerUrl: function () {
        return this._layerUrl || this._createLayerUrl();
    },

    _createLayerUrl: function () {
        let layerUrl = CommonUtil.urlPathAppend(
            this._url,
            `/collections/${this.options.collectionId}/tile.${this.options.format}`
        );
        this.requestParams = this.requestParams || this._getAllRequestParams();
        layerUrl = CommonUtil.urlAppend(layerUrl, LUtil.getParamString(this.requestParams));
        layerUrl = SecurityManager.appendCredential(layerUrl);
        this._layerUrl = layerUrl;
        return layerUrl;
    },

    _getAllRequestParams: function () {
        var me = this,
            options = me.options || {},
            params = {};

        params['transparent'] = options.transparent === true;
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
});

export var imageTileLayer = function (url, options) {
    return new ImageTileLayer(url, options);
};

