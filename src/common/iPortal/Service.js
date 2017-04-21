require('../Request');
require('./ServiceUpdateParam');

SuperMap.Service = SuperMap.Class({

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
        this.serviceUrl = seviceUrl + "/" + this.id;
        this.request = new SuperMap.Request();
    },

    load: function () {
        var me = this;
        return me.request.get(me.serviceUrl).then(function (serviceInfo) {
            for (var key in serviceInfo) {
                me[key] = serviceInfo[key];
            }
        });
    },

    update: function () {
        var serviceUpdateParam = new SuperMap.ServiceUpdateParam();
        for (var key in serviceUpdateParam) {
            serviceUpdateParam[key] = this[key];
        }
        return this.request.put(this.serviceUrl, serviceUpdateParam);
    }

});

module.exports = function (serviceUrl, params) {
    return new SuperMap.Service(serviceUrl, params);
};

