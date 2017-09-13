import SuperMap from '../SuperMap';
import IPortalServiceBase from './iPortalServiceBase';

/**
 * @class SuperMap.iPortalMap
 * @classdesc iPortal地图服务类
 * @param mapUrl -{string}  地图地址
 * @param params -{Object}  服务参数
 * @extends SuperMap.iPortalServiceBase
 *
 */
export default  class IPortalMap extends IPortalServiceBase {

    authorizeSetting = [];
    center = "";
    controls = null;
    checkStatus = "";
    createTime = 0;
    description = "";
    epsgCode = 0;
    extent = "";
    id = 0;
    isDefaultBottomMap = false;
    layers = [];
    level = null;
    nickname = "";
    sourceType = "";
    status = null;
    tags = [];
    thumbnail = "";
    title = "";
    units = null;
    updateTime = 0;
    userName = "";
    visitCount = 0;


    constructor(mapUrl, params) {
        super(mapUrl);
        params = params || {};
        SuperMap.Util.extend(this, params);
        this.mapUrl = mapUrl;
        // if (this.id) {
        //     this.mapUrl = mapUrl + "/" + this.id;
        // }
    }

    /**
     * @function SuperMap.iPortalMap.prototype.load
     * @description 加载地图信息
     * @returns {Promise}
     */
    load() {
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
    }

    /**
     * @function SuperMap.iPortalMap.prototype.update
     * @description 更新地图参数
     * @returns {Promise}
     */
    update() {
        var mapUpdateParam = {
            units: this.units,
            level: this.level,
            center: this.center,
            controls: this.controls,
            description: this.description,
            epsgCode: this.epsgCode,
            extent: this.extent,
            status: this.status,
            tags: this.tags,
            layers: this.layers,
            title: this.title,
            thumbnail: this.thumbnail,
            sourceType: this.sourceType,
            authorizeSetting: this.authorizeSetting
        };
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return this.request("PUT", this.mapUrl, JSON.stringify(mapUpdateParam), options);
    }

}

SuperMap.iPortalMap = IPortalMap;

