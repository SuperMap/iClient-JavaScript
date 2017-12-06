import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iPortalServicesQueryParam
 * @classdesc iPortal服务查询参数
 * @param params -{Object} 服务参数
 *
 */
export class IPortalServicesQueryParam {

    tags = [];
    userNames = '';
    types = [];
    checkStatus = '';
    offline = false;
    orderBy = '';
    orderType = '';
    keywords = [];
    currentPage = 0;
    pageSize = 0;
    isBatch = false;
    dirIds = [];
    isNotInDir = false;
    filterFields = [];
    authorizedOnly = false;

    constructor(params) {
        params = params || {};
        Util.extend(this, params);
    }

}

SuperMap.iPortalServicesQueryParam = IPortalServicesQueryParam;

