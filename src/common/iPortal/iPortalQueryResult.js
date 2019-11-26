/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iPortalQueryResult
 * @classdesc iPortal 资源结果集封装类。
 * @category iPortal/Online
 * @param {string} resourceUrl - 资源地址。
 * @param {Object} [params] - 资源参数。
 *
 */
export class IPortalQueryResult {
    constructor(mapUrl, params) {
        params = params || {};
        this.authorizeSetting = [];
        this.center = "";
        this.controls = null;
        this.checkStatus = "";
        this.createTime = 0;
        this.description = "";
        this.epsgCode = 0;
        this.extent = "";
        this.id = 0;
        this.isDefaultBottomMap = false;
        this.layers = [];
        this.level = null;
        this.nickname = "";
        this.sourceType = "";
        this.status = null;
        this.tags = [];
        this.thumbnail = "";
        this.title = "";
        this.units = null;
        this.updateTime = 0;
        this.userName = "";
        this.visitCount = 0;
        Util.extend(this, params);
        this.mapUrl = mapUrl;
    }

}

SuperMap.iPortalQueryResult = IPortalQueryResult;

