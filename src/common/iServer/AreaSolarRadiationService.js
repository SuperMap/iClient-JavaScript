import {SuperMap} from '../SuperMap';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {AreaSolarRadiationParameters} from './AreaSolarRadiationParameters';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.AreaSolarRadiationService
 * @category  iServer SpatialAnalyst SolarradiationAnalyst
 * @classdesc 地区太阳辐射服务类。
 * @param url - {string} 服务的访问地址。如</br> http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst 。</br>
 * @param options - {Object} 参数。如:</br>
 * eventListeners - {Object} 需要被注册的监听器对象。
 * @extends SuperMap.SpatialAnalystBase
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
     * @description  负责将客户端的查询参数传递到服务端。
     * @param parameter - {SuperMap.AreaSolarRadiationParameters} 地区太阳辐射参数
     */
    processAsync(parameter) {
        if (!(parameter instanceof AreaSolarRadiationParameters)) {
            return;
        }
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end !== '/') {
            me.url += "/";
        }

        var parameterObject = {};

        if (parameter instanceof AreaSolarRadiationParameters) {
            me.url += 'datasets/' + parameter.dataset + '/solarradiation';
        }

        AreaSolarRadiationParameters.toObject(parameter, parameterObject);
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

SuperMap.AreaSolarRadiationService = AreaSolarRadiationService;

