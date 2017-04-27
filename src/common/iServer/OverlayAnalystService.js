/**
 * Class: SuperMap.REST.OverlayAnalystService
 * 叠加分析服务类
 * 该类负责将客户设置的叠加分析参数传递给服务端，并接收服务端返回的叠加分析结果数据。
 * 叠加分析结果通过该类支持的事件的监听函数参数获取
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
require('./DatasetOverlayAnalystParameters');
require('./GeometryOverlayAnalystParameters');
var SuperMap = require('../SuperMap');
SuperMap.REST.OverlayAnalystService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Property: mode
     * {<String>} 叠加分析类型
     */
    mode: null,

    /**
     * Constructor: SuperMap.REST.OverlayAnalystService
     * 查询叠加分析服务基类构造函数。
     *
     * 例如：
     * (start code)
     * var myOverlayAnalystService = new SuperMap.REST.OverlayAnalystService(url, {
     *     eventListeners: {
     *	       "processCompleted": OverlayCompleted, 
     *		   "processFailed": OverlayFailed
     *		   }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.REST.SpatialAnalystBase.prototype.initialize.apply(this, arguments);
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
        this.mode = null;
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.OverlayAnalystParameters>}
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

    CLASS_NAME: "SuperMap.REST.OverlayAnalystService"
});

module.exports = SuperMap.REST.OverlayAnalystService;