require('./SpatialAnalystBase');
require('./DatasetBufferAnalystParameters');
require('./GeometryBufferAnalystParameters');
var SuperMap = require('../SuperMap');
var GeoJSONFormat = require('../format/GeoJSON');
SuperMap.BufferAnalystService = SuperMap.Class(SuperMap.SpatialAnalystBase, {
    /**
     * @class SuperMap.BufferAnalystService
     * @constructs SuperMap.BufferAnalystService
     * @classdesc
     * 缓冲区分析服务类
     * 该类负责将客户设置的缓冲区分析参数传递给服务端，并接收服务端返回的缓冲区分析结果数据。
     * 缓冲区分析结果通过该类支持的事件的监听函数参数获取
     * @extends {SuperMap.SpatialAnalystBase}
     * @api
     * @example 例如：
     * (start code)
     * var myBufferAnalystService = new SuperMap.BufferAnalystService(url, {
     *     eventListeners: {
     *           "processCompleted": bufferCompleted,
     *           "processFailed": bufferFailed
     *           }
     *    });
     * (end)
     *
     *
     */

    /**
     * Property: mode
     * {String} 缓冲区分析类型
     */
    mode: null,

    /**
     * @method SuperMap.BufferAnalystService.initialize
     * @param url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
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
     * @method SuperMap.BufferAnalystService.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param parameter - {BufferAnalystParameters}
     */
    processAsync: function (parameter) {
        var parameterObject = {};
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        if (parameter instanceof SuperMap.DatasetBufferAnalystParameters) {
            me.mode = "datasets";
            me.url += 'datasets/' + parameter.dataset + '/buffer';
            SuperMap.DatasetBufferAnalystParameters.toObject(parameter, parameterObject);
        }
        else if (parameter instanceof SuperMap.GeometryBufferAnalystParameters) {
            me.mode = "geometry";
            me.url += 'geometry/buffer';
            SuperMap.GeometryBufferAnalystParameters.toObject(parameter, parameterObject);
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

    /**
     *
     * @method SuperMap.BufferAnalystService.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。
     * @param result - {Object} 服务器返回的结果对象。
     *
     */
    toGeoJSONResult: function (result) {
        if (!result) {
            return result;
        }

        var analystResult = SuperMap.SpatialAnalystBase.prototype.toGeoJSONResult.apply(this, arguments);
        if (analystResult.resultGeometry) {
            var geoJSONFormat = new GeoJSONFormat();
            result = JSON.parse(geoJSONFormat.write(analystResult.resultGeometry));
        }
        return result;
    },
    CLASS_NAME: "SuperMap.BufferAnalystService"
});

module.exports = SuperMap.BufferAnalystService;