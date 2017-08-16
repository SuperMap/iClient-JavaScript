import SuperMap from '../SuperMap';
import {ClientType} from '../REST';
/**
 * @class SuperMap.KeyServiceParameter
 * @classdesc key申请参数
 * @param options - {Object} 参数。如：<br>
 *        name - {string} 申请服务名称。<br>
 *        serviceIds - {number}服务ID。<br>
 *        clientType - {ClientType} 服务端类型。<br>
 *        limitation - {number}有效期
 */
export default class KeyServiceParameter {
    name = null;
    serviceIds = null;
    clientType = ClientType.SERVER;
    limitation = null;

    constructor(options) {
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.KeyServiceParameter.prototype.toJSON
     * @description 转换成JSON对象
     * @return {object} 参数的JSON对象
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
