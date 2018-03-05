import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {ServerTheme} from './ServerTheme';
import {Grid} from './Grid';
import {UGCImage as Image} from './Image';
import {Vector} from './Vector';

/**
 * @class SuperMap.GetLayersInfoService
 * @category  iServer Map Layer
 * @classdesc 获取图层信息服务类构造函数。
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *         http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；<br>
 *         如 http://localhost:8090/iserver/services/map-world/rest/maps/World 。<br>
 *         如果查询临时图层的信息，请指定完成的url，包含临时图层ID信息，如：<br>
 *         http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/resourceID
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *         serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *         format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 *         isTempLayers - {boolean} 当前url对应的图层是否是临时图层。
 */
export class GetLayersInfoService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member SuperMap.GetLayersInfoService.prototype.isTempLayers -{Boolean}
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
            method = "GET",
            end = me.url.substr(me.url.length - 1, 1);
        if (!me.isTempLayers) {
            me.url += (end === "/") ? '' : '/';
            me.url += "layers.json?";
        } else {
            me.url += ".json?";
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
     * @param result - {Object} 服务器返回的结果对象。
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
     * @description 处理iserver 新增图层组数据 (subLayers.layers 中可能还会含有 subLayers.layers)
     * @param len - {number} subLayers.layers的长度
     * @param layers - {Array} subLayers.layers
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