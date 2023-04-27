/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {DatasetBufferAnalystParameters} from './DatasetBufferAnalystParameters';
import {GeometryBufferAnalystParameters} from './GeometryBufferAnalystParameters';
import { DataFormat } from '../REST';

/**
 * @class BufferAnalystService
 * @deprecatedclass SuperMap.BufferAnalystService
 * @category iServer SpatialAnalyst BufferAnalyst
 * @classdesc 缓冲区分析服务类。
 * 该类负责将客户设置的缓冲区分析参数传递给服务端，并接收服务端返回的缓冲区分析结果数据。
 * 缓冲区分析结果通过该类支持的事件的监听函数参数获取。
 * @param {string} url - 服务的访问地址。如：http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myBufferAnalystService = new BufferAnalystService(url, {
     *     eventListeners: {
     *           "processCompleted": bufferCompleted,
     *           "processFailed": bufferFailed
     *           }
     *    });
 * (end)
 * @usage
 */
export class BufferAnalystService extends SpatialAnalystBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} BufferAnalystService.prototype.mode
         * @description 缓冲区分析类型
         */
        this.mode = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.BufferAnalystService";
    }


    /**
     * @function BufferAnalystService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }


    /**
     * @method BufferAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {BufferAnalystParameters} parameter - 缓冲区分析参数
     */
    processAsync(parameter) {
        var parameterObject = {};
        var me = this;
        if (parameter instanceof DatasetBufferAnalystParameters) {
            me.mode = 'datasets';
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/buffer');
            DatasetBufferAnalystParameters.toObject(parameter, parameterObject);
        } else if (parameter instanceof GeometryBufferAnalystParameters) {
            me.mode = 'geometry';
            me.url = Util.urlPathAppend(me.url, 'geometry/buffer');
            GeometryBufferAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = Util.toJSON(parameterObject);
        this.returnContent = true;
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    dataFormat() {
      return [DataFormat.GEOJSON, DataFormat.ISERVER, DataFormat.FGB];
    }
}
