import SuperMap from '../SuperMap';
import CommonServiceBase from './CommonServiceBase';
import SetLayerInfoParameters from './SetLayerInfoParameters';

/**
 * @class SuperMap.SetLayerInfoService
 * @description 设置图层信息服务类。可以实现临时图层中子图层的修改
 * 该类负责将图层设置参数传递到服务端，并获取服务端返回的结果信息。
 * @augments SuperMap.CommonServiceBase
 * @param url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export default  class SetLayerInfoService extends CommonServiceBase {

    /**
     * @member SuperMap.SetLayerInfoService.resourceID - {String}
     * @description 图层资源ID，临时图层的资源ID标记。
     */
    resourceID = null;

    /**
     * @function SuperMap.SetLayerInfoService.initialize
     * @description 设置图层信息服务类构造函数。可以实现临时图层中子图层的修改。
     * @param url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
     *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
     * @param options - {Object} 交互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    constructor(url, options) {
        super(url, options);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        this.resourceID = options.resourceID;
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        SuperMap.Util.reset(this);
    }

    /**
     * @function SuperMap.SetLayerInfoService.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param params - {Object} 修改后的图层资源信息。<br>
     *        该参数可以使用获取图层信息服务 <SuperMap.GetLayerInfoService>.result.subLayers.layers[i]返回图层信息，然后对其属性进行修改来获取。
     */
    processAsync(params) {
        var me = this;

        if (!params) {
            return;
        }
        me.url += me.isInTheSameDomain ? ".json" : ".jsonp";
        var jsonParamsStr = SuperMap.Util.toJSON(params);
        me.request({
            method: "PUT",
            data: jsonParamsStr,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    CLASS_NAME = "SuperMap.SetLayerInfoService"
}

SuperMap.SetLayerInfoService = SetLayerInfoService;
