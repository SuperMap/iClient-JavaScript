/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {GeoRelationAnalystParameters} from './GeoRelationAnalystParameters';

/**
 * @class GeoRelationAnalystService
 * @deprecatedclass SuperMap.GeoRelationAnalystService
 * @category iServer SpatialAnalyst GeoRelationAnalyst
 * @classdesc 空间关系分析服务类。该类负责将客户设置的空间关系分析服务参数传递给服务端，并接收服务端返回的空间关系分析结果数据。
 * @param {string} url - 服务地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SpatialAnalystBase}
 * @example 实例化该类如下例所示：
 * (start code)
 *  function datasetGeoRelationAnalystProcess() {
     *      var referenceFilter = new FilterParameter({
     *                              name:"Frame_R@Changchun",
     *                              attributeFilter:"SmID>0"});
     *      var sourceFilter = new FilterParameter({
     *                          attributeFilter:"SmID>0"});
     *      //初始化服务类
     *      var datasetGeoRelationService = new GeoRelationAnalystService(
     *          "http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst/"),
     *      //构建参数类
     *      datasetGeoRelationParameters = new GeoRelationAnalystParameters({
     *          dataset: "Park@Changchun",
     *          startRecord: 0,
     *          expectCount: 20,
     *          sourceFilter: sourceFilter,
     *          referenceFilter: referenceFilter,
     *          spatialRelationType: SpatialRelationType.INTERSECT,
     *          isBorderInside: true,
     *          returnFeature: true,
     *          returnGeoRelatedOnly: true
     *      });
     *      datasetGeoRelationService.events.on({
     *          "processCompleted": datasetGeoRelationAnalystCompleted,
     *          "processFailed": datasetGeoRelationAnalystFailed});
     *      //执行
     *      datasetGeoRelationService.processAsync(datasetGeoRelationParameters);
     *  }
 *  function Completed(datasetGeoRelationAnalystCompleted){//todo};
 *  function Error(datasetGeoRelationAnalystFailed){//todo};
 * (end)
 * @usage
 */
export class GeoRelationAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.GeoRelationAnalystService";
    }

    /**
     * @function GeoRelationAnalystService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function GeoRelationAnalystService.prototype.processAsync
     * @description 负责将客户端的空间关系分析参数传递到服务端
     * @param {GeoRelationAnalystParameters} parameter - 空间关系分析所需的参数信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(parameter, callback) {
        if (!(parameter instanceof GeoRelationAnalystParameters)) {
            return;
        }
        var me = this;
        me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/georelation');
        var jsonParameters = Util.toJSON(parameter);

        me.url = Util.urlAppend(me.url, 'returnContent=true');

        return me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }


}
