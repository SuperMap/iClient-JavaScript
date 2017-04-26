/**
 * Class: SuperMap.REST.BufferAnalystService
 * 缓冲区分析服务类
 * 该类负责将客户设置的缓冲区分析参数传递给服务端，并接收服务端返回的缓冲区分析结果数据。
 * 缓冲区分析结果通过该类支持的事件的监听函数参数获取
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystBase>
 */
require('./SpatialAnalystBase');
require('./DatasetBufferAnalystParameters');
require('./GeometryBufferAnalystParameters');
SuperMap.REST.BufferAnalystService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Property: mode
     * {<String>} 缓冲区分析类型
     */
    mode: null,

    /**
     * Constructor: SuperMap.REST.BufferAnalystService
     * 缓冲区分析服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myBufferAnalystService = new SuperMap.REST.BufferAnalystService(url, {
     *     eventListeners: {
     *           "processCompleted": bufferCompleted,
     *           "processFailed": bufferFailed
     *           }
     *    });
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
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
     * params - {<BufferAnalystParameters>}
     */
    processAsync: function (parameter) {
        var parameterObject = new Object();
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
     * Method: toGeoJSONResult
     * 将含有geometry的数据转换为geojson格式。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult: function (result) {
        if (!result) {
            return result;
        }

        var analystResult = SuperMap.REST.SpatialAnalystBase.prototype.toGeoJSONResult.apply(this, arguments);
        if (analystResult.resultGeometry) {
            var geoJSONFormat = new SuperMap.Format.GeoJSON();
            result = JSON.parse(geoJSONFormat.write(analystResult.resultGeometry));
        }
        return result;
    },
    CLASS_NAME: "SuperMap.REST.BufferAnalystService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.BufferAnalystService(url, options);
};