import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerType} from '../REST';

/**
 * @class SuperMap.ServerInfo
 * @classdesc 服务器信息(安全相关)，包含服务器类型，服务地址，token服务地址等
 * @category Security
 * @param type - {string} 服务器类型
 * @param options - {Object} 服务器信息相关可选参数。如：<br>
 *        server - {string} 服务器地址,如：http://supermapiserver:8090/iserver<br>
 *        tokenServiceUrl - {string} 非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json<br>
 *        keyServiceUrl - {string} 非必填，如：http://supermapiserver:8092/web/mycontent/keys/register.json
 */
export class ServerInfo {
    constructor(type, options) {
        /**
         * @member SuperMap.ServerInfo.prototype.type -{ServerType}
         * @description 服务器类型
         */
        this.type = type;

        /**
         * @member SuperMap.ServerInfo.prototype.server -{string}
         * @description 必填，服务器地址
         */
        this.server = null;

        /**
         * @member SuperMap.ServerInfo.prototype.tokenServiceUrl -{string}
         * @description 非必填，如：http://supermapiserver:8090/iserver/services/security/tokens.json
         */
        this.tokenServiceUrl = null;

        /**
         * @member SuperMap.ServerInfo.prototype.keyServiceUrl -{string}
         * @description 非必填。如：http://supermapiserver:8092/web/mycontent/keys/register.json
         */
        this.keyServiceUrl = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.ServerInfo";
        this.type = this.type || ServerType.ISERVER;
        if (!this.server) {
            console.error('server url require is not  undefined')
        }
        // var patten = /http:\/\/([^\/]+)/i;
        //this.server = this.server.match(patten)[0];

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

}

SuperMap.ServerInfo = ServerInfo;
