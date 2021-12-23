/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {ServerTheme} from './ServerTheme';
import {Grid} from './Grid';
import {UGCImage as Image} from './Image';
import {Vector} from './Vector';

/**
 * @class SuperMap.GetLayersInfoService
 * @category iServer Map Layer
 * @classdesc 获取图层信息服务类构造函数。
 * @extends {SuperMap.CommonServiceBase}
 * @param {string} url - 与客户端交互的地图服务地址。请求地图服务,URL 应为：
 *        http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 *        如 http://localhost:8090/iserver/services/map-world/rest/maps/World 。
 *        如果查询临时图层的信息，请指定完成的url，包含临时图层ID信息，如：
 *        http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/resourceID
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {SuperMap.DataFormat} [options.format=SuperMap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {boolean} options.isTempLayers - 当前url对应的图层是否是临时图层。
 */
export class GetLayersInfoService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {boolean} SuperMap.GetLayersInfoService.prototype.isTempLayers
         * @description 当前url对应的图层是否是临时图层。
         */
        this.isTempLayers = false;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.GetLayersInfoService";
    }

    /**
     * @function SuperMap.GetLayersInfoService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function SuperMap.GetLayersInfoService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     */
    processAsync() {
        var me = this,
            method = "GET";
        if (!me.isTempLayers) {
            me.url = Util.urlPathAppend(me.url, 'layers');
        } 
        me.request({
            method: method,
            params: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.GetLayersInfoService.prototype.serviceProcessCompleted
     * @description 编辑完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        var me = this, existRes, layers, len;
        result = Util.transformResult(result);

        existRes = !!result && result.length > 0;
        layers = existRes ? result[0].subLayers.layers : null;
        len = layers ? layers.length : 0;
        me.handleLayers(len, layers);
        me.events.triggerEvent("processCompleted", {result: result[0]});
    }

    /**
     * TODO 专题图时候可能会用到
     * @function SuperMap.GetLayersInfoService.prototype.handleLayers
     * @description 处理 iServer 新增图层组数据 (subLayers.layers 中可能还会含有 subLayers.layers)
     * @param {number} len - subLayers.layers的长度
     * @param {Array.<number>} layers - subLayers.layers的长度数组
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

SuperMap.GetLayersInfoService = GetLayersInfoService;