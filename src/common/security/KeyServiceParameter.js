/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ClientType} from '../REST';

/**
 * @class KeyServiceParameter
 * @deprecatedclass SuperMap.KeyServiceParameter
 * @classdesc key申请参数
 * @category Security
 * @param {Object} options - 参数。
 * @param {string} options.name - 申请服务名称。
 * @param {number} options.serviceIds - 服务 ID。
 * @param {ClientType} [options.clientType=ClientType.SERVER] - 服务端类型。
 * @param {number} options.limitation - 有效期
 * @usage
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
     * @function KeyServiceParameter.prototype.toJSON
     * @description 转换成 JSON 对象
     * @returns {Object} 参数的 JSON 对象
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

