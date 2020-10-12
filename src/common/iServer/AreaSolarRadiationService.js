/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {AreaSolarRadiationParameters} from './AreaSolarRadiationParameters';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.AreaSolarRadiationService
 * @category iServer SpatialAnalyst SolarRadiationAnalyst
 * @classdesc 地区太阳辐射服务类。
 * @param {string} url - 服务的访问地址。如：</br>http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst。</br>
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SuperMap.SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myAreaSolarRadiationService = new SuperMap.AreaSolarRadiationService(url);
 * myAreaSolarRadiationService.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
 * );
 * (end)
 *
 */
export class AreaSolarRadiationService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.AreaSolarRadiationService";
    }

    /**
     * @function SuperMap.AreaSolarRadiationService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.AreaSolarRadiationService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {SuperMap.AreaSolarRadiationParameters} parameter - 地区太阳辐射参数。
     */
    processAsync(parameter) {
        if (!(parameter instanceof AreaSolarRadiationParameters)) {
            return;
        }
        var me = this;
        var parameterObject = {};

        if (parameter instanceof AreaSolarRadiationParameters) {
            me.url = Util.urlPathAppend(me.url, `datasets/${parameter.dataset}/solarradiation`);
        }
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        AreaSolarRadiationParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);

        me.request({
            method: 'POST',
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.AreaSolarRadiationService = AreaSolarRadiationService;

