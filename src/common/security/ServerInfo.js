import SuperMap from '../SuperMap';
import {ServerType} from '../REST';

/**
 * @class SuperMap.ServerInfo
 * @constructs SuperMap.ServerInfo
 * @classdesc
 * 服务器信息(安全相关)，包含服务器类型，服务地址，token服务地址等
 * @api
 */

export default class ServerInfo {
    //服务器类型:SuperMap.ServerType
    type = null;
    //如：http://supermapiserver:8090
    server = null;
    //非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json
    tokenServiceUrl = null;
    //非必填，如：http://supermapiserver:8092/web/mycontent/keys/register.json
    keyServiceUrl = null;

    /**
     * @method SuperMap.ServerInfo.initialize
     * @param type
     * @param options - {Object} 参数。
     */
    constructor(type, options) {
        this.type = type || ServerType.ISERVER;
        SuperMap.Util.extend(this, options);
        if (!this.server) {
            console.error('server url require is not  undefined')
        }
        var patten = /http:\/\/([^\/]+)/i;
        this.server = this.server.match(patten)[0];

        var tokenServiceSuffix = "/services/security/tokens.json";
        if (this.type === ServerType.ISERVER && this.server.indexOf("iserver") < 0) {
            tokenServiceSuffix = "/iserver" + tokenServiceSuffix;
        }

        if (!this.tokenServiceUrl) {
            this.tokenServiceUrl = this.server + tokenServiceSuffix;
        }

        if (!this.keyServiceUrl) {
            if (this.type === ServerType.IPORTAL) {
                this.keyServiceUrl = this.server + "/web/mycontent/keys/register.json";
            } else if (this.type === ServerType.ONLINE) {
                this.keyServiceUrl = this.server + "/web/mycontent/keys.json";
            }
        }
    }

    CLASS_NAME = "SuperMap.ServerInfo"
}

SuperMap.ServerInfo = ServerInfo;
