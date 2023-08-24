/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {SetLayerStatusParameters} from './SetLayerStatusParameters';

/**
 * @class SetLayerStatusService
 * @deprecatedclass SuperMap.SetLayerStatusService
 * @category  iServer Map TempLayersSet
 * @classdesc  子图层显示控制服务类。该类负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
 *             用户获取服务端返回的各子图层显示状态有两种方式：
 *             一种是通过监听 SetLayerEvent.PROCESS_COMPLETE 事件；
 *             一种是使用 AsyncResponder 类实现异步处理。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。请求地图服务，URL 应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class SetLayerStatusService extends CommonServiceBase {



    constructor(url, options) {
        super(url, options);
        this.lastparams = null;

        this.mapUrl = url;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.SetLayerStatusService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }


    /**
     * @function SetLayerStatusService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param {Object} params - 修改后的图层资源信息。该参数可以使用获取图层信息服务{@link SetLayerStatusParameters}
     *                          返回图层信息，然后对其属性进行修改来获取。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof SetLayerStatusParameters)) {
            return;
        }
        var me = this,
            method = "POST";
        me.url = me.mapUrl;

        if (params.resourceID == null) {
            me.url = Util.urlPathAppend(me.url, 'tempLayersSet');
            me.lastparams = params;

            return me.request({
                method: method,
                scope: me,
                success: me.createTempLayerComplete.bind(me, callback),
                failure: callback
            });
        } else {
            me.url = Util.urlPathAppend(me.url, "tempLayersSet/" + params.resourceID);
            me.url = Util.urlAppend(me.url, "elementRemain=true&reference=" + params.resourceID + "&holdTime=" + params.holdTime.toString());

            var jsonParameters = '[{';

            jsonParameters += '"type":"UGC",';
            if (params.layerStatusList != null && params.layerStatusList.length > 0) {
                jsonParameters += '"subLayers":' + params.toJSON();
            }
            jsonParameters += ',"visible":' + true + ',';
            jsonParameters += '"name":"' + this.getMapName(this.mapUrl) + '"';

            jsonParameters += '}]';

            return me.request({
                method: "PUT",
                data: jsonParameters,
                scope: me,
                success: callback,
                failure: callback
            });
        }
    }

    /**
     * @function SetLayerStatusService.prototype.createTempLayerComplete
     * @description 设置完成，执行此方法。
     * @param {RequestCallback} callback - 回调函数。
     * @param {Object} result - 服务器返回的结果对象，记录设置操作是否成功。
     * @returns {Promise} Promise 对象。
     */
    createTempLayerComplete(callback, result) {
        var me = this;
        result.result = Util.transformResult(result.result);
        if (result.result.succeed) {
            me.lastparams.resourceID = result.result.newResourceID;
        }

        return me.processAsync(me.lastparams, callback);
    }

    /**
     * @function SetLayerStatusService.prototype.getMapName
     * @description 获取地图名称。
     * @param {Object} url - 服务地址。
     */
    getMapName(url) {
        var mapUrl = url;
        if (mapUrl.charAt(mapUrl.length - 1) === "/") {
            mapUrl = mapUrl.substr(0, mapUrl.length - 1);
        }
        var index = mapUrl.lastIndexOf("/");
        var mapName = mapUrl.substring(index + 1, mapUrl.length);
        return mapName;
    }

    /**
     * @function SetLayerStatusService.prototype.setLayerCompleted
     * @description 设置完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象，记录设置操作是否成功。
     */
    serviceProcessCompleted(result, options) {
      var me = this;
      result = Util.transformResult(result);
      if (result != null && me.lastparams != null && me.lastparams.resourceID != null) {
          result.newResourceID = me.lastparams.resourceID;
      }
      return { result, options };
    }
}

