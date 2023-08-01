/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {DatasetMinDistanceAnalystParameters} from './DatasetMinDistanceAnalystParameters';
import {GeometryMinDistanceAnalystParameters} from './GeometryMinDistanceAnalystParameters';

/**
 * @class MinDistanceAnalystService
 * @deprecatedclass SuperMap.MinDistanceAnalystService
 * @category iServer SpatialAnalyst MinDistanceAnalyst
 * @classdesc 空间关系分析服务类。该类负责将客户设置的空间关系分析服务参数传递给服务端，并接收服务端返回的空间关系分析结果数据。
 * @param {string} url - 服务地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SpatialAnalystBase}
 * @usage
 */
export class MinDistanceAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.MinDistanceAnalystService";
    }

    /**
     * @function MinDistanceAnalystService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function MinDistanceAnalystService.prototype.processAsync
     * @description 负责将客户端的参数传递到服务端
     * @param {MinDistanceAnalystParameters} parameter - 最短距离分析所需的参数信息。
     */
    processAsync(parameter) {
        var me = this;
        var parameterObject = {};
        if (parameter instanceof DatasetMinDistanceAnalystParameters) {
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/mindistance');
            parameterObject = parameter;
        } else if (parameter instanceof GeometryMinDistanceAnalystParameters) {
            me.url = Util.urlPathAppend(me.url, 'geometry/mindistance');
            GeometryMinDistanceAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = Util.toJSON(parameterObject);
        me.url = Util.urlAppend(me.url, 'returnContent=true');

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


}
