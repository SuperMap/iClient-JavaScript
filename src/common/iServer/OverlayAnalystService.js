require('./ServiceBase');
require('./DatasetOverlayAnalystParameters');
require('./GeometryOverlayAnalystParameters');
var SuperMap = require('../SuperMap');
SuperMap.OverlayAnalystService = SuperMap.Class(SuperMap.SpatialAnalystBase, {
    /**
     * @class SuperMap.OverlayAnalystService
     * @constructs SuperMap.OverlayAnalystService
     * @classdesc
     * 叠加分析服务类
     * 该类负责将客户设置的叠加分析参数传递给服务端，并接收服务端返回的叠加分析结果数据。
     * 叠加分析结果通过该类支持的事件的监听函数参数获取
     * @extends {SuperMap.ServiceBase}
     * @api
     * @example 例如：
     * (start code)
     * var myOverlayAnalystService = new SuperMap.OverlayAnalystService(url, {
     *     eventListeners: {
     *	       "processCompleted": OverlayCompleted,
     *		   "processFailed": OverlayFailed
     *		   }
     * });
     * (end)
     */

    /**
     * Property: mode
     * {<String>} 叠加分析类型
     */
    mode: null,

    /**
     * @method SuperMap.OverlayAnalystService.initialize
     * @param url {String} 服务的访问地址。如http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.SpatialAnalystBase.prototype.initialize.apply(this, arguments);
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    },

    /*
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
        this.mode = null;
    },

    /**
     * @method SuperMap.OverlayAnalystService.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param parameter - {SuperMap.OverlayAnalystParameters}
     */
    processAsync: function (parameter) {
        var parameterObject = {};
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        if (parameter instanceof SuperMap.DatasetOverlayAnalystParameters) {
            me.mode = "datasets";
            me.url += 'datasets/' + parameter.sourceDataset + '/overlay';
            SuperMap.DatasetOverlayAnalystParameters.toObject(parameter, parameterObject);
        }
        else if (parameter instanceof SuperMap.GeometryOverlayAnalystParameters) {
            me.mode = "geometry";
            me.url += 'geometry/overlay';
            SuperMap.GeometryOverlayAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = SuperMap.Util.toJSON(parameterObject);

        if (me.isInTheSameDomain) {
            me.url += '.json?returnContent=true';
        } else {
            me.url += '.jsonp?returnContent=true';
        }

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.OverlayAnalystService"
});

module.exports = SuperMap.OverlayAnalystService;