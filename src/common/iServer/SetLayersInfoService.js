/*
 * Class: SuperMap.SetLayersInfoService
 * 设置图层信息服务类。可以实现创建新的临时图层和对现有临时图层的修改，当 isTempLayers 为 false
 * 的时候执行创建临时图层。当 isTempLayers 为 ture 并且临时图层资源 resourceID 被设置有效时执行
 * 对临时图层的编辑。
 * 该类负责将图层设置参数传递到服务端，并获取服务端返回的结果信息。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
require('./SetLayersInfoParameters');
var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.SetLayersInfoService
 * @description  设置图层信息服务类。可以实现创建新的临时图层和对现有临时图层的修改，<br>
 *                当 isTempLayers 为 false的时候执行创建临时图层。当 isTempLayers 为 ture 并且临时图层资源 resourceID 被设置有效时执行对临时图层的编辑。<br>
 *                该类负责将图层设置参数传递到服务端，并获取服务端返回的结果信息。
 * @augments SuperMap.ServiceBase
 * @param url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *              http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         resourceID - {String} 图层资源ID，临时图层的资源ID标记。<br>
 *         isTempLayers - {Boolean} 当前url对应的图层是否是临时图层。<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
SuperMap.SetLayersInfoService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * @member SuperMap.SetLayersInfoService.resourceID - {String}
     * @description 图层资源ID，临时图层的资源ID标记。
     */
    resourceID: null,

    /**
     * @function SuperMap.SetLayersInfoService.isTempLayers -{Boolean}
     * @description 当前url对应的图层是否是临时图层。
     */
    isTempLayers: false,

    /**
     * @function SuperMap.SetLayersInfoService.initialize
     * @description 设置图层信息服务类构造函数。可以实现创建新的临时图层和对现有临时图层的修改。
     * @param url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
     *              http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
     * @param options - {Object} 交互服务时所需可选参数。如：<br>
     *         resourceID - {String} 图层资源ID，临时图层的资源ID标记。<br>
     *         isTempLayers - {Boolean} 当前url对应的图层是否是临时图层。<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        this.resourceID = options.resourceID;
        this.isTempLayers = options.isTempLayers;
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * @function SuperMap.SetLayersInfoService.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @params - {Object} 修改后的图层资源信息。该参数可以使用获取图层信息服务<SuperMap.GetLayerInfoService>.result.subLayers.layers
     *            返回图层信息，然后对其属性进行修改来获取。
     */
    processAsync: function (params) {
        var jsonParams,
            subLayers = [],
            me = this,
            method = "",
            end;
        if (!params) {
            return;
        }
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
        me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";
        var layers = params.subLayers.layers,
            len = layers.length;
        for (var i in layers) {
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

        for (var i = 0; i < len; i++) {
            if (layers[i].toJsonObject) {
                //将图层信息转换成服务端能识别的简单json对象
                subLayers.push(layers[i].toJsonObject());
            } else {
                subLayers.push(layers[i]);
            }
        }
        jsonParams = SuperMap.Util.extend(jsonParams, params);
        jsonParams.subLayers = {"layers": subLayers};
        jsonParams.object = null;
        var jsonParamsStr = SuperMap.Util.toJSON([jsonParams]);
        me.request({
            method: method,
            data: jsonParamsStr,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.SetLayersInfoService"
});

module.exports = SuperMap.SetLayersInfoService;
