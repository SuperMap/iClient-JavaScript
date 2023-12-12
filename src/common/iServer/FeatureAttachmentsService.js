/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';
import { AttachmentsParameters } from './AttachmentsParameters';
import { EditAttachmentsParameters } from './EditAttachmentsParameters';
import { EditType } from '../REST';

/**
 * @class FeatureAttachmentsService
 * @deprecatedclass SuperMap.FeatureAttachmentsService
 * @category iServer Data Feature
 * @classdesc 数据服务中要素附件查询、添加、删除服务类。
 * @param {string} url - 服务端的数据服务资源地址。请求数据服务中数据集编辑服务，URL 应为：</br>
 * http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data。</br>
 * 例如：http://localhost:8090/iserver/services/data-world/rest/data
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @example
 * new FeatureAttachmentsService(url).processAsync(param, function(result) {
 *  //doSomething
 * })
 * @usage
 */
export class FeatureAttachmentsService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.FeatureAttachmentsService";
    }

    /**
     * @function FeatureAttachmentsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function FeatureAttachmentsService.prototype.processAsync
     * @description 负责将客户端对附件的添加、删除参数传递到服务端。
     * @version 11.2.0
     * @param {EditAttachmentsParameters} params - 添加和删除附件参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(params, callback) {
        if (!(params instanceof EditAttachmentsParameters)) {
            return;
        }
        Util.extend(this, params);
        var me = this;
        var editType = params.editType;
        me.featureId = params.featureId;
        me.IDs = params.IDs;
        if (editType === EditType.DELETE) {
            if (!me.IDs || (Array.isArray(me.IDs) && me.IDs.length === 0)) {
                return;
            }
            me.method = "DELETE";
            var promises = [];
            for (let i = 0; i < me.IDs.length; i++) {
                var url = Util.urlPathAppend(me.url, `/features/${me.featureId}/attachments/${me.IDs[i]}`);
                var res = me.request({
                    url: url,
                    method: me.method,
                    data: null,
                    scope: me,
                    success: null,
                    failure: null
                });
                promises.push(res);
            }
            return Promise.all(promises).then(res => {
                callback && callback(res)
                return res;
            });
        } else {
            if (!params.file || !(params.file instanceof File || params.file instanceof Blob)) {
                return;
            }
            const formData = new FormData();
            formData.append('file', params.file);
            me.method = "POST";
            me.url = Util.urlPathAppend(me.url, `/features/${me.featureId}/attachments`);
            return me.request({
                method: me.method,
                data: formData,
                scope: me,
                success: callback,
                failure: callback
            });
        }
    }

    /**
     * @function FeatureAttachmentsService.prototype.getAttachments
     * @description 获取要素附件。
     * @version 11.2.0
     * @param {AttachmentsParameters} params - 查询附件参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getAttachments(params, callback) {
        if (!(params instanceof AttachmentsParameters)) {
            return;
        }
        Util.extend(this, params);
        var me = this;
        me.method = "GET";
        me.featureId = params.featureId;
        me.url = Util.urlPathAppend(me.url, `/features/${me.featureId}/attachments`);
        return me.request({
            method: me.method,
            data: null,
            scope: me,
            success: callback,
            failure: callback
        });
    }
}