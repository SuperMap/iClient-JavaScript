import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ClientType} from '../REST';

/**
 * @class SuperMap.KeyServiceParameter
 * @classdesc key申请参数
 * @param options - {Object} 参数。如：<br>
 *        name - {string} 申请服务名称。<br>
 *        serviceIds - {number}服务ID。<br>
 *        clientType - {{@link SuperMap.ClientType}} 服务端类型。<br>
 *        limitation - {number}有效期
 */
export class KeyServiceParameter {

    constructor(options) {
        this.name = null;
        this.serviceIds = null;
        this.clientType = ClientType.SERVER;
        this.limitation = null;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.KeyServiceParameter";
    }

    /**
     * @function SuperMap.KeyServiceParameter.prototype.toJSON
     * @description 转换成JSON对象
     * @return {Object} 参数的JSON对象
     */
    toJSON() {
        return {
            name: this.name,
            serviceIds: this.serviceIds,
            clientType: this.clientType,
            limitation: this.limitation
        }
    }

}

SuperMap.KeyServiceParameter = KeyServiceParameter;
