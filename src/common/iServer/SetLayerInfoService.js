import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import './SetLayerInfoParameters';

/**
 * @class SuperMap.SetLayerInfoService
 * @category  iServer Map TempLayersSet
 * @classdesc 设置图层信息服务类。可以实现临时图层中子图层的修改
 *              该类负责将图层设置参数传递到服务端，并获取服务端返回的结果信息。
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
export class SetLayerInfoService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.SetLayerInfoService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function SuperMap.SetLayerInfoService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param params - {Object} 修改后的图层资源信息。<br>
     *        该参数可以使用获取图层信息服务<{@link SuperMap.GetLayersInfoService}>返回图层信息，解析结果result.subLayers.layers[i]，然后对其属性进行修改来获取。
     */
    processAsync(params) {
        if (!params) {
            return;
        }
        var me = this;
        me.url += ".json";
        var jsonParamsStr = Util.toJSON(params);
        me.request({
            method: "PUT",
            data: jsonParamsStr,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.SetLayerInfoService = SetLayerInfoService;
