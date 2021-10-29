/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ClientType} from '../REST';

/**
 * @class TokenServiceParameter
 * @deprecatedclass SuperMap.TokenServiceParameter
 * @classdesc token 申请参数。
 * @category Security
 * @param {Object} options - 参数。
 * @param {string} options.username - 用户名。
 * @param {string} options.password - 密码。
 * @param {ClientType} [options.clientType='ClientType.NONE'] - token 申请的客户端标识类型。
 * @param {string} [options.ip] - clientType=IP 时，必选。
 * @param {string} [options.referer] -clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则设置相应的 URL。
 * @param {number} [options.expiration=60] - 申请令牌的有效期,从发布令牌的时间开始计算,单位为分钟。
 * @usage
 *
 */
export class TokenServiceParameter {
    constructor(options) {
        /**
         * @member {string} TokenServiceParameter.prototype.userName
         * @description 用户名。
         */
        this.userName = null;

        /**
         * @member {string} TokenServiceParameter.prototype.password
         * @description 密码。
         */
        this.password = null;

        /**
         * @member {ClientType} TokenServiceParameter.prototype.clientType
         * @description token 申请的客户端标识类型。
         */
        this.clientType = ClientType.NONE;

        /**
         * @member {string} [TokenServiceParameter.prototype.ip]
         * @description clientType=IP 时，必选。
         */

        this.ip = null;
        /**
         * @member {string} [TokenServiceParameter.prototype.referer]
         * @description clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则设置相应的 URL。
         */
        this.referer = null;

        /**
         * @member {number} TokenServiceParameter.prototype.expiration
         * @description 申请令牌的有效期，从发布令牌的时间开始计算，单位为分钟。
         */
        this.expiration = 60;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TokenServiceParameter";
    }

    /**
     * @function TokenServiceParameter.prototype.toJSON
     * @description 将所有信息转成 JSON 字符串
     * @returns {string} 参数的 JSON 字符串
     */
    toJSON() {
        return {
            userName: this.userName,
            password: this.password,
            clientType: this.clientType,
            ip: this.ip,
            referer: this.referer,
            expiration: this.expiration
        }
    }

}

