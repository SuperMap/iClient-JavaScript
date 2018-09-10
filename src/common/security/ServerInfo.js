/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerType} from '../REST';

/**
 * @class SuperMap.ServerInfo
 * @classdesc 服务器信息(安全相关)，包含服务器类型，服务地址，token服务地址等
 * @category Security
 * @param {string} type - 服务器类型
 * @param {Object} options - 服务器信息相关可选参数。
 * @param {string} options.server - 服务器地址,如：http://supermapiserver:8090/iserver
 * @param {string} [options.tokenServiceUrl] - 如：http://supermapiserver:8090/iserver/services/security/tokens.json
 * @param {string} [options.keyServiceUrl] - 如：http://supermapiserver:8092/web/mycontent/keys/register.json
 */
export class ServerInfo {
    constructor(type, options) {
        /**
         * @member {SuperMap.ServerType} SuperMap.ServerInfo.prototype.type
         * @description 服务器类型
         */
        this.type = type;

        /**
         * @member {string} SuperMap.ServerInfo.prototype.server
         * @description 服务器地址
         */
        this.server = null;

        /**
         * @member {string} [SuperMap.ServerInfo.prototype.tokenServiceUrl]
         * @description 如：http://supermapiserver:8090/iserver/services/security/tokens.json
         */
        this.tokenServiceUrl = null;

        /**
         * @member {string} [SuperMap.ServerInfo.prototype.keyServiceUrl]
         * @description 如：http://supermapiserver:8092/web/mycontent/keys/register.json
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
