import SuperMap from '../SuperMap';

/**
 * @class SuperMap.iPortalMapsQueryParam
 * @classdesc iPortal地图资源查询参数
 * @param params -{Object} iPortal地图资源查询具体参数
 *
 */
export default  class IPortalMapsQueryParam {

    userNames = '';
    tags = [];
    suggest = false;
    sourceTypes = [];
    keywords = [];
    epsgCode = "";
    orderBy = "";
    currentPage = "";
    pageSize = 0;
    dirIds = [];
    isNotInDir = false;
    updateStart = 0;
    updateEnd = 0;
    visitStart = 0;
    visitEnd = 0;
    filterFields = [];

    constructor(params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
    }

}

SuperMap.iPortalMapsQueryParam = IPortalMapsQueryParam;

