import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iPortalServicesQueryParam
 * @classdesc iPortal服务查询参数
 * @category iPortal/Online
 * @param params -{Object} 服务参数
 *
 */
export class IPortalServicesQueryParam {


    constructor(params) {
        params = params || {};
        this.tags = [];
        this.userNames = '';
        this.types = [];
        this.checkStatus = '';
        this.offline = false;
        this.orderBy = '';
        this.orderType = '';
        this.keywords = [];
        this.currentPage = 0;
        this.pageSize = 0;
        this.isBatch = false;
        this.dirIds = [];
        this.isNotInDir = false;
        this.filterFields = [];
        this.authorizedOnly = false;
        Util.extend(this, params);
    }

}

SuperMap.iPortalServicesQueryParam = IPortalServicesQueryParam;

