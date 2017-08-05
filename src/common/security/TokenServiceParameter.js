import SuperMap from '../SuperMap';
import {ClientType} from '../REST';

/**
 * @class SuperMap.TokenServiceParameter
 * @constructs  SuperMap.TokenServiceParameter
 * @classdesc
 * token申请参数
 * @api
 */
export default class TokenServiceParameter {
    userName = null;
    password = null;
    //token申请的客户端标识类型
    clientType = ClientType.NONE;
    ip = null;
    //clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则传递相应的 URL。
    referer = null;
    //申请令牌的有效期，从发布令牌的时间开始计算，单位为分钟。
    expiration = 60;

    /**
     * @method SuperMap.TokenServiceParameter.initialize
     * @param options - {Object} 参数。
     */
    constructor(options) {
        SuperMap.Util.extend(this, options);
    }

    /**
     * @method SuperMap.TokenServiceParameter.toJSON
     * @return {String} 参数的JSON字符串
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
