import SuperMap from '../SuperMap';
import {DataFormat} from '../../common/REST';
import CommonServiceBase from '../../common/iServer/CommonServiceBase';
import CommonAddressMatchService from '../../common/iServer/AddressMatchService';

/**
 * 地址匹配服务，包括正向匹配和反向匹配。
 */
export class AddressMatchService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    code(params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new CommonAddressMatchService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.code(me.url + '/geocoding', params);
        return me;
    }

    decode(params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new CommonAddressMatchService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
        return me;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }

    CLASS_NAME = "SuperMap.REST.AddressMatchService"
}

SuperMap.REST.AddressMatchService = AddressMatchService;