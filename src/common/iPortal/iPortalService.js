require('./iPortalServiceBase');
var SuperMap = require('../SuperMap');
SuperMap.iPortalService = SuperMap.Class(SuperMap.iPortalServiceBase, {

    addedMapNames: null,
    addedSceneNames: null,
    authorizeSetting: [],
    checkStatus: '',
    createTime: 0,
    description: '',
    enable: true,
    id: 0,
    isBatch: false,
    isDataItemService: false,
    linkPage: null,
    mapInfos: [],
    metadata: null,
    nickname: '',
    offline: false,
    proxiedUrl: null,
    resTitle: '',
    scenes: [],
    serviceRootUrlId: null,
    tags: [],
    thumbnail: null,
    type: '',
    updateTime: 0,
    userName: '',
    verifyReason: null,
    version: null,
    visitCount: 0,

    initialize: function (seviceUrl, params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
        this.serviceUrl = seviceUrl;
        if (this.id) {
            this.serviceUrl = seviceUrl + "/" + this.id;
        }
        SuperMap.iPortalServiceBase.prototype.initialize.call(this.serviceUrl);
    },

    load: function () {
        var me = this;
        return me.request("GET", me.serviceUrl + ".json")
            .then(function (serviceInfo) {
                if (serviceInfo.error) {
                    return serviceInfo;
                }
                for (var key in serviceInfo) {
                    me[key] = serviceInfo[key];
                }
            });
    },

    update: function () {
        var serviceUpdateParam = {
            authorizeSetting: this.authorizeSetting,
            metadata: this.metadata,
            tags: this.tags,
            thumbnail: this.thumbnail
        };
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return this.request("PUT", this.serviceUrl, JSON.stringify(serviceUpdateParam), options);
    }

});

module.exports = SuperMap.iPortalService;

