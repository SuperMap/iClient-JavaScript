/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {AreaSolarRadiationParameters} from './AreaSolarRadiationParameters';
import {Util} from '../commontypes/Util';

/**
 * @class AreaSolarRadiationService
 * @deprecatedclass SuperMap.AreaSolarRadiationService
 * @category iServer SpatialAnalyst SolarRadiationAnalyst
 * @classdesc 地区太阳辐射服务类。地区太阳辐射计算指的是计算整个 DEM 范围内每个栅格的太阳辐射情况，计算可得到太阳辐射的总辐射量、直射辐射量、散射辐射量、直射持续时间。
 * @param {string} url - 服务的访问地址。如：</br>http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst。</br>
 * @param {Object} options - 参数。</br>
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myAreaSolarRadiationService = new AreaSolarRadiationService(url);
 * (end)
 * @usage
 */
export class AreaSolarRadiationService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.AreaSolarRadiationService";
    }

    /**
     * @function AreaSolarRadiationService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function AreaSolarRadiationService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {AreaSolarRadiationParameters} parameter - 地区太阳辐射参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(parameter, callback) {
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

        return me.request({
            method: 'POST',
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }
}


