var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.iPortalMapsQueryParam
 * @classdesc iPortal地图资源查询参数
 *
 */
SuperMap.iPortalMapsQueryParam = SuperMap.Class({

    userNames: '',
    tags: [],
    suggest:false,
    sourceTypes: [],
    keywords: [],
    epsgCode: '',
    orderBy: '',
    currentPage:'',
    pageSize: 0,
    dirIds: [],
    isNotInDir: false,
    updateStart:0,
    updateEnd:0,
    visitStart:0,
    visitEnd:0,
    filterFields: [],
    /**
     * @method SuperMap.iPortalMapsQueryParam.initialize
     * @param params
     *
     */
    initialize: function (params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
    }

});

module.exports = SuperMap.iPortalMapsQueryParam;

