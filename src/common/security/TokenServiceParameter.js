import SuperMap from '../SuperMap';
import {ClientType} from '../REST';

/**
 * @class SuperMap.TokenServiceParameter
 * @classdesc token申请参数
 * @param options - {Object} token申请参数。
 */
export default class TokenServiceParameter {
    /**
     * @member SuperMap.TokenServiceParameter.prototype.userName -{string}
     * @description 用户名。
     */
    userName = null;

    /**
     * @member SuperMap.TokenServiceParameter.prototype.password -{string}
     * @description 密码。
     */
    password = null;

    /**
     * @member SuperMap.TokenServiceParameter.prototype.clientType -{string}
     * @description token申请的客户端标识类型。
     */
    clientType = ClientType.NONE;

    /**
     * @member SuperMap.TokenServiceParameter.prototype.ip -{string}
     * @description clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则传递相应的 URL。
     */

    ip = null;
    /**
     * @member SuperMap.TokenServiceParameter.prototype.referer -{string}
     * @description clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则传递相应的 URL。
     */
    referer = null;

    /**
     * @member SuperMap.TokenServiceParameter.prototype.expiration -{number}
     * @description 申请令牌的有效期，从发布令牌的时间开始计算，单位为分钟。
     */
    expiration = 60;

    constructor(options) {
        SuperMap.Util.extend(this, options);
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

    CLASS_NAME = "SuperMap.TokenServiceParameter"
}

SuperMap.TokenServiceParameter = TokenServiceParameter;
