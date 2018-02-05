import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {OnlineServiceBase} from './OnlineServiceBase';

/**
 * @class SuperMap.OnlineData
 * @classdesc Online myData服务
 * @category iPortal/Online
 * @param serviceRootUrl -{string} 服务根地址
 * @param options -{string} 服务相关参数
 */
export class OnlineData extends OnlineServiceBase {

    //TODO 目前并没有对接服务支持的所有操作，日后需要补充完整
    constructor(serviceRootUrl, options) {
        super(serviceRootUrl);
        options = options || {};
        //MD5
        this.MD5 = null;
        //文件类型。
        this.type = null;
        //数据上传者名称。
        this.userName = null;
        //文件名称。
        this.fileName = null;
        //文件大小，单位为 B 。
        this.size = null;
        //服务发布状态。
        this.serviceStatus = null;
        //服务 id 。
        this.serviceId = null;
        //数据项 id 。
        this.id = null;
        //最后修改时间。
        this.lastModfiedTime = null;
        //文件状态。
        this.status = null;
        //数据文件存储 id 。
        this.storageId = null;
        //数据的发布信息。
        this.publishInfo = null;
        //数据的权限信息。
        this.authorizeSetting = null;
        //用户的昵称。
        this.nickname = null;
        //数据的标签。
        this.tags = [];
        //数据的描述信息。
        this.description = null;
        //数据发布的服务信息集合。
        this.dataItemServices = null;
        //数据坐标类型。
        this.coordType = null;
        //数据审核信息
        this.dataCheckResult = null;
        //数据元数据信息
        this.dataMetaInfo = null;
        //数据的缩略图路径。
        this.thumbnail = null;

        Util.extend(this, options);
        if (this.id) {
            this.serviceUrl = serviceRootUrl + "/" + this.id;
        }
        this.CLASS_NAME = "SuperMap.OnlineData";
    }

    /**
     * @function SuperMap.OnlineData.prototype.load
     * @description 通过url请求获取该服务完整信息
     * @returns {Promise} 返回不包含请求结果的Promise对象,请求返回结果自动填充到该类属性中
     */
    load() {
        if (!this.serviceUrl) {
            return;
        }
        var me = this;
        return me.request("GET", this.serviceUrl).then(function (result) {
            Util.extend(me, result);
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


}

SuperMap.OnlineData = OnlineData;
