/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {IPortalServiceBase} from './iPortalServiceBase';
import {IPortalAddResourceParam} from './iPortalAddResourceParam';
import {IPortalRegisterServiceParam} from "./iPortalRegisterServiceParam";
import { IPortalAddDataParam } from "./iPortalAddDataParam";
import { IPortalDataMetaInfoParam } from "./iPortalDataMetaInfoParam";
import { IPortalDataStoreInfoParam } from "./iPortalDataStoreInfoParam";
import { IPortalDataConnectionInfoParam } from "./iPortalDataConnectionInfoParam";
/**
 * @class SuperMap.iPortalUser
 * @classdesc iPortal 门户中用户信息的封装类。用于管理用户资源，包括可删除，添加资源。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {string} iportalUrl - iportal根地址。
 * @extends {SuperMap.iPortalServiceBase}
 *
 */
export class IPortalUser extends IPortalServiceBase {
    constructor(iportalUrl) {
        super(iportalUrl);
        this.iportalUrl = iportalUrl;
    }

    /**
     * @function SuperMap.iPortalUser.prototype.deleteResources
     * @description 删除资源。
     * @param {Object} params - 删除资源所需的参数对象：{ids,resourceType}。
     * @returns {Promise} 返回包含删除操作状态的 Promise 对象。
     */
    deleteResources(params) {
        var resourceName = params.resourceType.replace("_","").toLowerCase();
        var deleteResourceUrl = this.iportalUrl+"/web/" + resourceName +"s.json?ids=" + encodeURI(JSON.stringify(params.ids));
        if( resourceName === 'data') {
            deleteResourceUrl = this.iportalUrl + "/web/mycontent/datas/delete.json";
            return this.request("POST", deleteResourceUrl, JSON.stringify(params.ids));
        }
        return this.request("DELETE", deleteResourceUrl);
    }

    /**
     * @function SuperMap.iPortalUser.prototype.addMap
     * @description 添加地图。
     * @version 10.1.0
     * @param {SuperMap.iPortalAddResourceParam} addMapParams - 添加地图的参数。
     * @returns {Promise} 返回包含添加地图结果的 Promise 对象。
     */
    addMap(addMapParams) {
        if (!(addMapParams instanceof IPortalAddResourceParam)) {
            return this.getErrMsgPromise("addMapParams is not instanceof IPortalAddResourceParam !");
        }
        let cloneAddMapParams = {
            rootUrl: addMapParams.rootUrl,
            tags: addMapParams.tags,
            authorizeSetting: addMapParams.entities
        }
        let addMapUrl = this.iportalUrl + "/web/maps/batchaddmaps.json";
        return this.request("POST", addMapUrl, JSON.stringify(cloneAddMapParams)).then(function(result) {
            return result;
        });
    }

    /**
     * @function SuperMap.iPortalUser.prototype.addScene
     * @description 添加场景。
     * @version 10.1.0
     * @param {SuperMap.iPortalAddResourceParam} addSceneParams - 添加场景的参数。
     * @returns {Promise} 返回包含添加场景结果的 Promise 对象。
     */
    addScene(addSceneParams) {
        if (!(addSceneParams instanceof IPortalAddResourceParam)) {
            return this.getErrMsgPromise("addSceneParams is not instanceof IPortalAddResourceParam !");
        }
        let cloneAddSceneParams = {
            rootUrl: addSceneParams.rootUrl,
            tags: addSceneParams.tags,
            authorizeSetting: addSceneParams.entities
        }
        let addSceneUrl = this.iportalUrl + "/web/scenes/batchaddscenes.json";
        return this.request("POST", addSceneUrl, JSON.stringify(cloneAddSceneParams)).then(function(result) {
            return result;
        });
    }

    /**
     * @function SuperMap.iPortalUser.prototype.registerService
     * @description 注册服务。
     * @version 10.1.0
     * @param {SuperMap.iPortalRegisterServiceParam} registerParams - 注册服务的参数。
     * @returns {Promise} 返回包含注册服务结果的 Promise 对象。
     */
    registerService(registerParams) {
        if(!(registerParams instanceof IPortalRegisterServiceParam)) {
            return this.getErrMsgPromise("registerParams is not instanceof IPortalRegisterServiceParam !");
        }
        let cloneRegisterParams = {
            type: registerParams.type,
            tags: registerParams.tags,
            authorizeSetting: registerParams.entities,
            metadata: registerParams.metadata,
            addedMapNames: registerParams.addedMapNames,
            addedSceneNames: registerParams.addedSceneNames
        }
        let registerUrl = this.iportalUrl + "/web/services.json";
        return this.request("POST", registerUrl, JSON.stringify(cloneRegisterParams)).then(result => {
            return result;
        });
    }

    /**
     * @function SuperMap.iPortalUser.prototype.getErrMsgPromise
     * @description 获取包含错误信息的Promise对象。
     * @version 10.1.0
     * @param {String} errMsg - 传入的错误信息。
     * @returns {Promise} 返回包含错误信息的 Promise 对象。
     */
    getErrMsgPromise(errMsg) {
        return new Promise(resolve => {
            resolve(errMsg);
        })
    }

    /**
     * @function SuperMap.iPortalUser.prototype.uploadDataRequest
     * @description 上传数据。
     * @version 10.1.0
     * @param {number} id - 上传数据的资源id。
     * @param {Object} formData - 请求体为文本数据流。
     * @returns {Promise} 返回包含上传数据操作的 Promise 对象。
     */
    uploadDataRequest(id,formData) {
        var uploadDataUrl = this.iportalUrl + "/web/mycontent/datas/"+id+"/upload.json";
        return this.request("POST",uploadDataUrl,formData);
    }

    /**
     * @function SuperMap.iPortalUser.prototype.addData
     * @description 上传/注册数据。
     * @version 10.1.0
     * @param {SuperMap.iPortalAddDataParam} params - 上传/注册数据所需的参数。
     * @param {Object} [formData] - 请求体为文本数据流(上传数据时传入)。
     * @returns {Promise} 返回上传/注册数据的 Promise 对象。
     */
    addData(params,formData) {
        if(!(params instanceof IPortalAddDataParam)){
            return this.getErrMsgPromise("params is not instanceof iPortalAddDataParam !");
        }
        var datasUrl = this.iportalUrl + "/web/mycontent/datas.json";
        var entity = {
            fileName:params.fileName,
            tags:params.tags,
            type:params.type
        };
        var type = params.type.toLowerCase();
        var dataMetaInfo;
        if(type === "excel" || type === "csv"){
            if(!(params.dataMetaInfo instanceof IPortalDataMetaInfoParam)){
                return  this.getErrMsgPromise("params.dataMetaInfo is not instanceof iPortalDataMetaInfoParam !");
            }
            dataMetaInfo = {
                xField:params.dataMetaInfo.xField,
                yField:params.dataMetaInfo.yField
            }
            if(type === 'csv') {
                dataMetaInfo.fileEncoding = params.dataMetaInfo.fileEncoding
            }
            entity.coordType = "WGS84";
            entity.dataMetaInfo = dataMetaInfo;
        }else if(type === "hdfs" || type === "hbase") {
            if(!(params.dataMetaInfo instanceof IPortalDataMetaInfoParam)){
                return this.getErrMsgPromise("params.dataMetaInfo is not instanceof iPortalDataMetaInfoParam !");
            }
            if(!(params.dataMetaInfo.dataStoreInfo instanceof IPortalDataStoreInfoParam)){
                return this.getErrMsgPromise("params.dataMetaInfo.dataStoreInfo is not instanceof iPortalDataStoreInfoParam !");
            }
            var dataStoreInfo = {
                type:params.dataMetaInfo.dataStoreInfo.type
            }
            switch (type) {
                case "hdfs":
                    dataStoreInfo.url = params.dataMetaInfo.dataStoreInfo.url;
                    dataMetaInfo = {
                        url: params.dataMetaInfo.url,
                        dataStoreInfo:dataStoreInfo
                    }
                    break;
                case "hbase":
                    if(!(params.dataMetaInfo.dataStoreInfo.connectionInfo instanceof IPortalDataConnectionInfoParam)){
                        return this.getErrMsgPromise("params.dataMetaInfo.dataStoreInfo.connectionInfo is not instanceof iPortalDataConnectionInfoParam !");
                    }
                    dataStoreInfo.connectionInfo = {
                        dataBase:params.dataMetaInfo.dataStoreInfo.connectionInfo.dataBase,
                        server:params.dataMetaInfo.dataStoreInfo.connectionInfo.server,
                        engineType:'HBASE'
                    }
                    dataStoreInfo.datastoreType = "SPATIAL";//该字段SPATIAL表示HBASE注册
                    dataMetaInfo = {
                        dataStoreInfo:dataStoreInfo
                    }
                    break;
            }
            entity.dataMetaInfo = dataMetaInfo;
        }
        return this.request("POST",datasUrl,JSON.stringify(entity)).then(res=>{
            if(type === "hdfs" || type === "hbase"){
                return res;
            }else {
                if(res.childID) {
                    return this.uploadDataRequest(res.childID,formData);
                }else {
                    return res.customResult;
                }
            }
        })
    }

    /**
     * @function SuperMap.iPortalUser.prototype.publishOrUnpublish
     * @description 发布/取消发布。
     * @version 10.1.0
     * @param {object} options - 发布/取消发布数据服务所需的参数。
     * @param {object} options.dataId - 数据项id。
     * @param {object} options.serviceType - 发布的服务类型，目前支持发布的服务类型包括：RESTDATA, RESTMAP, RESTREALSPACE, RESTSPATIALANALYST。
     * @param {object} [options.dataServiceId] - 发布的服务 id。
     * @param {boolean} forPublish - 是否取消发布。
     * @returns {Promise} 返回发布/取消发布数据服务的 Promise 对象。
     */
    publishOrUnpublish(option,forPublish){
        if(!option.dataId || !option.serviceType) {
            return this.getErrMsgPromise("option.dataID and option.serviceType are Required!");
        }
        var dataId = option.dataId;
        var dataServiceId = option.dataServiceId;
        var serviceType = option.serviceType;
        var publishUrl = this.iportalUrl + "/web/mycontent/datas/" + dataId + "/publishstatus.json?serviceType=" + serviceType;
        if (dataServiceId) {
            publishUrl += "&dataServiceId=" + dataServiceId;
        }
        return this.request("PUT",publishUrl,JSON.stringify(forPublish)).then(res=>{
            // 发起服务状态查询
            if(forPublish) {
                // 发布服务的结果异步处理
                //  var publishStateUrl = this.iportalUrl + "web/mycontent/datas/" + dataId + "/publishstatus.rjson";
                if (!dataServiceId) { // 发布服务时会回传serviceIDs，发布服务之前serviceIDs为空
                    dataServiceId = res.customResult;
                }
                return dataServiceId;
            }else {
                // 取消发布的结果同步处理
                return res;
            }
        });
    }

    /**
     * @function SuperMap.iPortalUser.prototype.getDataPublishedStatus
     * @description 查询服务状态，发起服务状态查询。
     * @version 10.1.0
     * @param {number} dataId - 查询服务状态的数据项id。
     * @param {string} dataServiceId - 发布的服务id。
     * @returns {Promise} 返回查询服务状态的 Promise 对象。
     */
    getDataPublishedStatus(dataId,dataServiceId){
        var publishStateUrl = this.iportalUrl + "/web/mycontent/datas/" + dataId + "/publishstatus.json?dataServiceId="+dataServiceId+"&forPublish=true";
        return this.request("GET",publishStateUrl);
    }

    /**
     * @function SuperMap.iPortalUser.prototype.unPublishedDataService
     * @description 取消发布。
     * @version 10.1.0
     * @param {object} options - 取消发布服务具体参数。
     * @param {object} options.dataId - 数据项id。
     * @param {object} options.serviceType - 发布的服务类型，目前支持发布的服务类型包括：RESTDATA, RESTMAP, RESTREALSPACE, RESTSPATIALANALYST。
     * @param {object} [options.dataServiceId] - 发布的服务 id。
     * @returns {Promise} 返回取消发布数据服务的 Promise 对象。
     */
    unPublishDataService(option){
        return this.publishOrUnpublish(option,false);
    }

    /**
     * @function SuperMap.iPortalUser.prototype.publishedDataService
     * @description 发布数据服务。
     * @version 10.1.0
     * @param {object} options - 发布数据服务具体参数。
     * @param {object} options.dataId - 数据项id。
     * @param {object} options.serviceType - 发布的服务类型，目前支持发布的服务类型包括：RESTDATA, RESTMAP, RESTREALSPACE, RESTSPATIALANALYST。
     * @param {object} [options.dataServiceId] - 发布的服务 id。
     * @returns {Promise} 返回发布数据服务的 Promise 对象。
     */
    publishDataService(option){
        return this.publishOrUnpublish(option,true);
    }
}
