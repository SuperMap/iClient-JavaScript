import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iPortalMapsQueryParam
 * @classdesc iPortal地图资源查询参数
 * @category iPortal/Online
 * @param params -{Object} iPortal地图资源查询具体参数
 *
 */
export class IPortalMapsQueryParam {

    constructor(params) {
        params = params || {};
        this.userNames = null;
        this.tags = null;
        this.suggest = false;
        this.sourceTypes = null;
        this.keywords = null;
        this.epsgCode = null;
        this.orderBy = null;
        this.currentPage = null;
        this.pageSize = null;
        this.dirIds = null;
        this.isNotInDir = false;
        this.updateStart = null;
        this.updateEnd = null;
        this.visitStart = null;
        this.visitEnd = null;
        this.filterFields = null;
        Util.extend(this, params);
    }

}

SuperMap.iPortalMapsQueryParam = IPortalMapsQueryParam;

