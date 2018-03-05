import {SuperMap} from '../SuperMap';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {GeoRelationAnalystParameters} from './GeoRelationAnalystParameters';

/**
 * @class SuperMap.GeoRelationAnalystService
 * @category  iServer SpatialAnalyst GeorelationAnalyst
 * @classdesc
 * 空间关系分析服务类。
 * 该类负责将客户设置的空间关系分析服务参数传递给服务端，并接收服务端返回的空间关系分析结果数据。
 * @param url - {string} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 * @param options - {Object} 可选参数。</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 * @extends SuperMap.SpatialAnalystBase
 * @example 实例化该类如下例所示：
 * (start code)
 *  function datasetGeoRelationAnalystProcess() {
     *      var referenceFilter = new SuperMap.FilterParameter({
     *                              name:"Frame_R@Changchun",
     *                              attributeFilter:"SmID>0"});
     *      var sourceFilter = new SuperMap.FilterParameter({
     *                          attributeFilter:"SmID>0"});
     *      //初始化服务类
     *      var datasetGeoRelationService = new SuperMap.GeoRelationAnalystService(
     *          "http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst/"),
     *      //构建参数类
     *      datasetGeoRelationParameters = new SuperMap.GeoRelationAnalystParameters({
     *          dataset: "Park@Changchun",
     *          startRecord: 0,
     *          expectCount: 20,
     *          sourceFilter: sourceFilter,
     *          referenceFilter: referenceFilter,
     *          spatialRelationType: SuperMap.SpatialRelationType.INTERSECT,
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
 *
 */
export class GeoRelationAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.GeoRelationAnalystService";
    }

    /**
     * @function SuperMap.GeoRelationAnalystService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.GeoRelationAnalystService.prototype.processAsync
     * @description 负责将客户端的空间关系分析参数传递到服务端
     * @param parameter - {SuperMap.GeoRelationAnalystParameters} 空间关系分析所需的参数信息。
     */
    processAsync(parameter) {
        if (!(parameter instanceof GeoRelationAnalystParameters)) {
            return;
        }
        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {
            me.url += 'datasets/' + parameter.dataset + '/georelation';
        } else {
            me.url += '/datasets/' + parameter.dataset + '/georelation';
        }

        var jsonParameters = SuperMap.Util.toJSON(parameter);

        me.url += '.json?returnContent=true';

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


}

SuperMap.GeoRelationAnalystService = GeoRelationAnalystService;