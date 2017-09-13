import SuperMap from '../SuperMap';
import OnlineServiceBase from './OnlineServiceBase';

/**
 * @class SuperMap.OnlineData
 * @classdesc Online myData服务
 * @param serviceRootUrl -{string} 服务根地址
 * @param options -{string} 服务相关参数
 */
export default  class OnlineData extends OnlineServiceBase {
    //MD5
    MD5 = null;
    //文件类型。
    type = null;
    //数据上传者名称。
    userName = null;
    //文件名称。
    fileName = null;
    //文件大小，单位为 B 。
    size = null;
    //服务发布状态。
    serviceStatus = null;
    //服务 id 。
    serviceId = null;
    //数据项 id 。
    id = null;
    //最后修改时间。
    lastModfiedTime = null;
    //文件状态。
    status = null;
    //数据文件存储 id 。
    storageId = null;
    //数据的发布信息。
    publishInfo = null;
    //数据的权限信息。
    authorizeSetting = null;
    //用户的昵称。
    nickname = null;
    //数据的标签。
    tags = [];
    //数据的描述信息。
    description = null;
    //数据发布的服务信息集合。
    dataItemServices = null;
    //数据坐标类型。
    coordType = null;
    //数据审核信息
    dataCheckResult = null;
    //数据元数据信息
    dataMetaInfo = null;
    //数据的缩略图路径。
    thumbnail = null;

    //TODO 目前并没有对接服务支持的所有操作，日后需要补充完整
    constructor(serviceRootUrl, options) {
        super(serviceUrl);
        var me = this;
        options = options || {};
        SuperMap.Util.extend(me, options);
        me.serviceUrl = serviceRootUrl;
        if (me.id) {
            me.serviceUrl = serviceRootUrl + "/" + me.id;
        }
    }

    /**
     * @function SuperMap.OnlineData.prototype.load
     * @description 通过url请求获取该服务完整信息
     * @returns {Promise}
     */
    load() {
        if (!this.serviceUrl) {
            return;
        }
        var me = this;
        return me.request("GET", this.serviceUrl).then(function (result) {
            SuperMap.Util.extend(me, result);
        });
    }

    /**
     * @function SuperMap.OnlineData.prototype.getPublishedServices
     * @description 获取数据发布的所有服务
     * @returns {Object} 数据发布的所有服务
     */
    getPublishedServices() {
        return this.dataItemServices;
    }

    /**
     * @function SuperMap.OnlineData.prototype.getAuthorizeSetting
     * @description 获取数据的权限信息
     * @returns {Object} 权限信息
     */
    getAuthorizeSetting() {
        return this.authorizeSetting;
    }


    CLASS_NAME = "SuperMap.OnlineData"

}

SuperMap.OnlineData = OnlineData;
