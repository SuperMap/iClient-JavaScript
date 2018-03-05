import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import './SetLayersInfoParameters';

/**
 * @class SuperMap.SetLayersInfoService
 * @category  iServer Map TempLayersSet
 * @classdesc  设置图层信息服务类。可以实现创建新的临时图层和对现有临时图层的修改，<br>
 *                当 isTempLayers 为 false的时候执行创建临时图层。当 isTempLayers 为 ture 并且临时图层资源 resourceID 被设置有效时执行对临时图层的编辑。<br>
 *                该类负责将图层设置参数传递到服务端，并获取服务端返回的结果信息。
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *              http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         resourceID - {string} 图层资源ID，临时图层的资源ID标记。<br>
 *         isTempLayers - {boolean} 当前url对应的图层是否是临时图层。<br>
 *         eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *         serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *         format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。<br>
 */
export class SetLayersInfoService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member SuperMap.SetLayersInfoService.prototype.resourceID - {string}
         * @description 图层资源ID，临时图层的资源ID标记。
         */
        this.resourceID = null;

        /**
         * @function SuperMap.SetLayersInfoService.prototype.isTempLayers -{boolean}
         * @description 当前url对应的图层是否是临时图层。
         */
        this.isTempLayers = false;

        if (options) {
            SuperMap.Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.SetLayersInfoService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function SuperMap.SetLayersInfoService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param  params - {Object} 修改后的图层资源信息。该参数可以使用获取图层信息服务 <{@link SuperMap.GetLayersInfoService}>返回图层信息，然后对其属性进行修改来获取。
     */
    processAsync(params) {
        if (!params) {
            return;
        }
        var jsonParams,
            subLayers = [],
            me = this,
            method = "",
            end;


        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';
        //创建临时图层和设置修改临时图层信息对应不同的资源URL
        if (me.isTempLayers) {
            me.url += "tempLayersSet/" + me.resourceID;
            method = "PUT";
        } else {
            me.url += "tempLayersSet";
            method = "POST";
        }
        me.url += ".json?";
        if (!params.subLayers) {
            params.subLayers = {layers: []}
        }
        if (!params.subLayers.layers) {
            params.subLayers.layers = [];
        }
        var layers = params.subLayers.layers,
            len = layers.length;
        for (let i in layers) {
            if (layers[i].ugcLayerType === "GRID") {
                var colorDictionary = {};
                var colorDics = layers[i].colorDictionarys;
                for (var j in colorDics) {
                    var key = colorDics[j].elevation;
                    colorDictionary[key] = colorDics[j].color;
                }
            }
            layers[i].colorDictionary = colorDictionary;
            delete layers[i].colorDictionarys;
        }

        for (let i = 0; i < len; i++) {
            if (layers[i].toJsonObject) {
                //将图层信息转换成服务端能识别的简单json对象
                subLayers.push(layers[i].toJsonObject());
            } else {
                subLayers.push(layers[i]);
            }
        }
        jsonParams = Util.extend(jsonParams, params);
        jsonParams.subLayers = {"layers": subLayers};
        jsonParams.object = null;
        var jsonParamsStr = Util.toJSON([jsonParams]);
        me.request({
            method: method,
            data: jsonParamsStr,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.SetLayersInfoService = SetLayersInfoService;
