import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {DatasetBufferAnalystParameters} from './DatasetBufferAnalystParameters';
import {GeometryBufferAnalystParameters} from './GeometryBufferAnalystParameters';

/**
 * @class SuperMap.BufferAnalystService
 * @category  iServer SpatialAnalyst BufferAnalyst
 * @classdesc 缓冲区分析服务类
 * 该类负责将客户设置的缓冲区分析参数传递给服务端，并接收服务端返回的缓冲区分析结果数据。
 * 缓冲区分析结果通过该类支持的事件的监听函数参数获取
 * @param url - {string} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 * @param options - {Object} 可选参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 * @extends SuperMap.SpatialAnalystBase
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
export class BufferAnalystService extends SpatialAnalystBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member SuperMap.BufferAnalystService.prototype.mode -{string}
         * @description 缓冲区分析类型
         */
        this.mode = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.BufferAnalystService";
    }


    /**
     * @function SuperMap.BufferAnalystService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }


    /**
     * @method SuperMap.BufferAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param parameter - {BufferAnalystParameters} 缓冲区分析参数
     */
    processAsync(parameter) {
        var parameterObject = {};
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end !== '/') {
            me.url += "/";
        }

        if (parameter instanceof DatasetBufferAnalystParameters) {
            me.mode = "datasets";
            me.url += 'datasets/' + parameter.dataset + '/buffer';
            DatasetBufferAnalystParameters.toObject(parameter, parameterObject);
        } else if (parameter instanceof GeometryBufferAnalystParameters) {
            me.mode = "geometry";
            me.url += 'geometry/buffer';
            GeometryBufferAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = Util.toJSON(parameterObject);
        me.url += '.json?returnContent=true';
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.BufferAnalystService = BufferAnalystService;