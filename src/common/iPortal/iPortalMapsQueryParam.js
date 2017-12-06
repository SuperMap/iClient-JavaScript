import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iPortalMapsQueryParam
 * @classdesc iPortal地图资源查询参数
 * @param params -{Object} iPortal地图资源查询具体参数
 *
 */
export class IPortalMapsQueryParam {

    userNames = null;
    tags = null;
    suggest = false;
    sourceTypes = null;
    keywords = null;
    epsgCode = null;
    orderBy = null;
    currentPage = null;
    pageSize = null;
    dirIds = null;
    isNotInDir = false;
    updateStart = null;
    updateEnd = null;
    visitStart = null;
    visitEnd = null;
    filterFields = null;

    constructor(params) {
        params = params || {};
        Util.extend(this, params);
    }

}

SuperMap.iPortalMapsQueryParam = IPortalMapsQueryParam;

