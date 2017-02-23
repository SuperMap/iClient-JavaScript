/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.GeoRelationAnalystService
 * 空间关系分析服务类。
 * 该类负责将客户设置的空间关系分析服务参数传递给服务端，并接收服务端返回的空间关系分析结果数据。
 */
require('./SpatialAnalystBase');
require('./GeoRelationAnalystParameters');
SuperMap.REST.GeoRelationAnalystService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Constructor: SuperMap.REST.GenerateSpatialDataService
     * 空间关系分析服务类构造函数。
     *
     * 实例化该类如下例所示：
     * (start code)
     *  function datasetGeoRelationAnalystProcess() {
     *      var referenceFilter = new SuperMap.REST.FilterParameter({
     *                              name:"Frame_R@Changchun",
     *                              attributeFilter:"SmID>0"});
     *      var sourceFilter = new SuperMap.REST.FilterParameter({
     *                          attributeFilter:"SmID>0"});
     *      //初始化服务类
     *      var datasetGeoRelationService = new SuperMap.REST.GeoRelationAnalystService(
     *          "http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst/"),
     *      //构建参数类
     *      datasetGeoRelationParameters = new GeoRelationAnalystParameters({
     *          dataset: "Park@Changchun",
     *          startRecord: 0,
     *          expectCount: 20,
     *          sourceFilter: sourceFilter,
     *          referenceFilter: referenceFilter,
     *          spatialRelationType: SuperMap.REST.SpatialRelationType.INTERSECT,
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
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.REST.SpatialAnalystBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.REST.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的空间关系分析参数传递到服务端
     *
     * Parameters:
     * params - {<GeoRelationAnalystParameters>} 空间关系分析所需的参数信息。
     */
    processAsync: function (parameter) {
        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {
            me.url += 'datasets/' + parameter.dataset + '/georelation';
        } else {
            me.url += '/datasets/' + parameter.dataset + '/georelation';
        }

        var jsonParameters = SuperMap.Util.toJSON(parameter);

        if (me.isInTheSameDomain) {
            me.url += '.json?returnContent=true';
        } else {
            me.url += '.jsonp?returnContent=true';
        }

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.REST.GeoRelationAnalystService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.GeoRelationAnalystService(url, options);
};