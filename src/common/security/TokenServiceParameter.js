import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ClientType} from '../REST';

/**
 * @class SuperMap.TokenServiceParameter
 * @classdesc token申请参数
 * @category Security
 * @param {Object} options - token申请参数。
 */
export class TokenServiceParameter {
    constructor(options) {
        /**
         * @member {string} SuperMap.TokenServiceParameter.prototype.userName
         * @description 用户名。
         */
        this.userName = null;

        /**
         * @member {string} SuperMap.TokenServiceParameter.prototype.password
         * @description 密码。
         */
        this.password = null;

        /**
         * @member {string} SuperMap.TokenServiceParameter.prototype.clientType
         * @description token申请的客户端标识类型。
         */
        this.clientType = ClientType.NONE;

        /**
         * @member {string} SuperMap.TokenServiceParameter.prototype.ip
         * @description clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则传递相应的 URL。
         */

        this.ip = null;
        /**
         * @member {string} SuperMap.TokenServiceParameter.prototype.referer
         * @description clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则传递相应的 URL。
         */
        this.referer = null;

        /**
         * @member {number} SuperMap.TokenServiceParameter.prototype.expiration
         * @description 申请令牌的有效期，从发布令牌的时间开始计算，单位为分钟。
         */
        this.expiration = 60;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TokenServiceParameter";
    }

    /**
     * @function SuperMap.TokenServiceParameter.prototype.toJSON
     * @description 将所有信息转成JSON字符串
     * @return {string} 参数的JSON字符串
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

SuperMap.TokenServiceParameter = TokenServiceParameter;
