require('./iPortalServiceBase');
var SuperMap = require('../SuperMap');
SuperMap.iPortalMap = SuperMap.Class(SuperMap.iPortalServiceBase, {

    authorizeSetting: [],
    center: '',
    controls: null,
    checkStatus: '',
    createTime: 0,
    description: '',
    epsgCode: 0,
    extent: '',
    id: 0,
    isDefaultBottomMap: false,
    layers: [],
    level: null,
    nickname: '',
    sourceType: '',
    status: null,
    tags: [],
    thumbnail: '',
    title: '',
    units: null,
    updateTime: 0,
    userName: '',
    visitCount: 0,

    initialize: function (mapUrl, params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
        this.mapUrl = mapUrl;
        // if (this.id) {
        //     this.mapUrl = mapUrl + "/" + this.id;
        // }
        SuperMap.iPortalServiceBase.prototype.initialize.call(this.mapUrl);
    },

    load: function () {
        var me = this;
        return me.request("GET", me.mapUrl + ".json")
            .then(function (mapInfo) {
                if (mapInfo.error) {
                    return mapInfo;
                }
                for (var key in mapInfo) {
                    me[key] = mapInfo[key];
                }
            });
    },

    update: function () {
        var mapUpdateParam = {
            units: this.units,
            level:this.level,
            center:this.center,
            controls:this.controls,
            description:this.description,
            epsgCode:this.epsgCode,
            extent:this.extent,
            status:this.status,
            tags:this.tags,
            layers:this.layers,
            title:this.title,
            thumbnail:this.thumbnail,
            sourceType:this.sourceType,
            authorizeSetting: this.authorizeSetting
        };
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return this.request("PUT", this.mapUrl, JSON.stringify(mapUpdateParam), options);
    }

});

module.exports = SuperMap.iPortalMap;

