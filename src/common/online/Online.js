import {SuperMap} from '../SuperMap';
import {SecurityManager} from '../security/SecurityManager';
import {OnlineData} from './OnlineData';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @class SuperMap.Online
 * @classdesc 对接SuperMap Online 所有基础服务
 * @category iPortal/Online
 * @example
 * var online=new SuperMap.Online();
 * var services = online.queryDatas(param);
 * service.then(function(services){
 *      var service= services[0];
 *      service.updateDataInfo();
 * })
 */
export class Online {

    //TODO 目前并没有对接Online的所有操作，需要补充完整
    //所有查询返回的是一个Promise,在外部使用的时候通过Promise的then方法获取异步结果
    constructor() {
        this.rootUrl = "http://www.supermapol.com";
        this.webUrl = this.rootUrl + "/web";

        var mContentUrl = this.webUrl + "/mycontent";
        this.mDatasUrl = mContentUrl + "/datas";

        this.CLASS_NAME = "SuperMap.Online";
    }

    /**
     * @function SuperMap.Online.prototype.load
     * @description 加载online，验证online是否可用
     * @returns {Promise} 返回包含网络请求结果的Promise对象
     */
    load() {
        return FetchRequest.get(this.rootUrl).then(function (response) {
            return response;
        });
    }

    /**
     * @function SuperMap.Online.prototype.login
     * @description 登录Online
     */
    login() {
        SecurityManager.loginOnline(this.rootUrl, true);
    }

    /**
     * @function SuperMap.Online.prototype.queryDatas
     * @description 查询Online “我的内容”下“我的数据”服务(需要登录状态获取),并返回可操作的服务对象
     * @param parameter -{SuperMap.OnlineQueryDatasParameter} myDatas服务资源查询参数
     * @returns {Promise} 返回包含所有数据服务信息的Promise对象
     */
    queryDatas(parameter) {
        var me = this, url = me.mDatasUrl;
        if (parameter) {
            parameter = parameter.toJSON();
        }
        return FetchRequest.get(url, parameter).then(function (json) {
            if (!json || !json.content || json.content.length < 1) {
                return;
            }
            var services = [], contents = json.content, len = contents.length;
            for (var i = 0; i < len; i++) {
                var content = contents[i];
                var service = new OnlineData(me.mDatasUrl, content);
                services.push(service);
            }
            return services;
        });
    }
}

SuperMap.Online = Online;