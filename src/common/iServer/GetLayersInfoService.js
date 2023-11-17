/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {ServerTheme} from './ServerTheme';
import {Grid} from './Grid';
import {UGCImage as Image} from './Image';
import {Vector} from './Vector';

/**
 * @class GetLayersInfoService
 * @deprecatedclass SuperMap.GetLayersInfoService
 * @category iServer Map Layer
 * @classdesc 获取图层信息服务类构造函数。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。请求地图服务，URL 应为：
 *        http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 *        如 http://localhost:8090/iserver/services/map-world/rest/maps/World。
 *        如果查询临时图层的信息，请指定完成的url，包含临时图层ID信息，如：
 *        http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/resourceID。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {boolean} options.isTempLayers - 当前 URL 对应的图层是否是临时图层。
 * @usage
 */
export class GetLayersInfoService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {boolean} GetLayersInfoService.prototype.isTempLayers
         * @description 当前url对应的图层是否是临时图层。
         */
        this.isTempLayers = false;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.GetLayersInfoService";
    }

    /**
     * @function GetLayersInfoService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function GetLayersInfoService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @returns {Promise} Promise 对象。
     */
    processAsync(callback) {
        var me = this,
            method = "GET";
        if (!me.isTempLayers) {
            me.url = Util.urlPathAppend(me.url, 'layers');
        }
        return me.request({
            method: method,
            params: null,
            scope: me,
            success: callback,
            failure: callback
        });
    }

    /**
     * @function GetLayersInfoService.prototype.transformResult
     * @description 状态完成时转换结果。
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     */
    transformResult(result, options) {
        var me = this, existRes, layers, len;
        result = Util.transformResult(result);
        existRes = !!result && result.length > 0;
        layers = existRes ? result[0].subLayers.layers : null;
        len = layers ? layers.length : 0;
        me.handleLayers(len, layers);
        return { result: result[0], options };
    }

    /**
     * TODO 专题图时候可能会用到
     * @function GetLayersInfoService.prototype.handleLayers
     * @description 处理 SuperMap iServer 新增图层组数据 (subLayers.layers 中可能还会含有 subLayers.layers)
     * @param {number} len - subLayers.layers 的长度
     * @param {Array.<number>} layers - subLayers.layers 的长度数组
     */
    handleLayers(len, layers) {
        var me = this, tempLayer;
        if (len) {
            for (var i = 0; i < len; i++) {
                if (layers[i].subLayers && layers[i].subLayers.layers && layers[i].subLayers.layers.length > 0) {
                    me.handleLayers(layers[i].subLayers.layers.length, layers[i].subLayers.layers);
                } else {
                    var type = layers[i].ugcLayerType;
                    switch (type) {
                        case 'THEME':
                            tempLayer = new ServerTheme();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'GRID':
                            tempLayer = new Grid();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'IMAGE':
                            tempLayer = new Image();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'VECTOR':
                            tempLayer = new Vector();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        default:
                            break;
                    }
                }

            }
        }
    }
}
