/**
 * Class: SuperMap.Online
 * 对接SuperMap Online 所有基础服务
 */


require('./OnlineQueryDatasParameter');
var SuperMap = require('../SuperMap');
var Request = require('../util/FetchRequest');
var SecurityManager = require('../security/SecurityManager');
var OnlineData = require('./OnlineData');
SuperMap.Online = SuperMap.Class({

    /**
     *** TODO 目前并没有对接Online的所有操作，需要补充完整
     * 所有查询返回的是一个Promise,在外部使用的时候通过Promise的then方法获取异步结果
     * 用法：
     * var online=new SuperMap.Online();
     * var services = online.queryDatas(param);
     * service.then(function(services){
     *      var service= services[0];
     *      service.updateDataInfo();
     * })
     */
    initialize: function () {
        this.rootUrl = "http://www.supermapol.com";
        this.webUrl = this.rootUrl + "/web";

        var mContentUrl = this.webUrl + "/mycontent";
        this.mDatasUrl = mContentUrl + "/datas";
    },

    load: function () {
        return Request.get(this.rootUrl).then(function (response) {
            return response;
        });
    },


    login: function () {
        SecurityManager.loginOnline(this.rootUrl, true);
    },

    /**
     * 查询Online “我的内容”下“我的数据”服务(需要登录状态获取),并返回可操作的服务对象
     * @param parameter   <OnlineQueryDatasParameter>
     */
    queryDatas: function (parameter) {
        var me = this, url = me.mDatasUrl;
        if (parameter) {
            parameter = parameter.toJSON();
        }
        return Request.get(url, parameter).then(function (json) {
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
    },


    CLASS_NAME: "SuperMap.Online"
});
module.exports = SuperMap.Online;