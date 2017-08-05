import SuperMap from '../SuperMap';
import {ClientType} from '../REST';

/**
 * @class SuperMap.KeyServiceParameter
 * @constructs SuperMap.KeyServiceParameter
 * @classdesc
 * key申请参数

 * @api
 */
export default class KeyServiceParameter {
    name = null;
    serviceIds = null;
    clientType = ClientType.SERVER;
    limitation = null;

    /**
     * @method SuperMap.KeyServiceParameter.initialize
     * @param options - {Object} 参数。
     */
    constructor(options) {
        SuperMap.Util.extend(this, options);
    }

    /**
     * @method SuperMap.KeyServiceParameter.toJSON
     * @return {string} 参数的JSON字符串
     */
    toJSON() {
        return {
            name: this.name,
            serviceIds: this.serviceIds,
            clientType: this.clientType,
            limitation: this.limitation
        }
    }

    CLASS_NAME = "SuperMap.KeyServiceParameter"
}

SuperMap.KeyServiceParameter = KeyServiceParameter;
