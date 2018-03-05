import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {GenerateSpatialDataParameters} from './GenerateSpatialDataParameters';

/**
 * @class SuperMap.GenerateSpatialDataService
 * @category  iServer SpatialAnalyst GenerateSpatialData
 * @classdesc
 * 动态分段分析服务类。
 * 该类负责将客户设置的动态分段分析服务参数传递给服务端，并接收服务端返回的动态分段分析结果数据。
 * 获取的结果数据包括 originResult 、result 两种，其中，originResult 为服务端返回的用 JSON 对象表示的动态分段分析结果数据，result 为服务端返回的动态分段分析结果数据。
 *  @param url - {string} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 *  @param options - {Object} 可选参数。如:</br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 * @extends SuperMap.SpatialAnalystBase
 * @example 实例化该类如下例所示：
 * (start code)
 *  function GenerateSpatialData(){
     *
     *  //配置数据返回选项(option)
     *  var option = new SuperMap.DataReturnOption({
     *      expectCount: 1000,
     *      dataset: "generateSpatialData",
     *      deleteExistResultDataset: true,
     *      dataReturnMode: SuperMap.DataReturnMode.DATASET_ONLY
     *  }),
     *  //配置动态分段参数(Parameters)
     *  parameters = new SuperMap.GenerateSpatialDataParameters({
     *      routeTable: "RouteDT_road@Changchun",
     *      routeIDField: "RouteID",
     *      eventTable: "LinearEventTabDT@Changchun",
     *      eventRouteIDField: "RouteID",
     *      measureField: "",
     *      measureStartField: "LineMeasureFrom",
     *      measureEndField: "LineMeasureTo",
     *      measureOffsetField: "",
     *      errorInfoField: "",
     *      retainedFields:[],
     *      dataReturnOption: option
     *  }),
     *  //配置动态分段iService
     *  iService = new SuperMap.GenerateSpatialDataService(Changchun_spatialanalyst, {
     *      eventListeners: {
     *          processCompleted: generateCompleted,
     *          processFailed: generateFailded
     *      }
     *  });
     *  //执行
     *  iService.processAsync(parameters);
     *  function Completed(generateSpatialDataEventArgs){//todo};
     *  function Error(generateSpatialDataEventArgs){//todo};
     * (end)
     */
export class GenerateSpatialDataService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.GenerateSpatialDataService";
    }

    /**
     * @function SuperMap.GenerateSpatialDataService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function SuperMap.GenerateSpatialDataService.prototype.processAsync
     * @description 负责将客户端的动态分段服务参数传递到服务端。
     * @param params - {SuperMap.GenerateSpatialDataParameters}
     */
    processAsync(params) {
        if (!(params instanceof GenerateSpatialDataParameters)) {
            return;
        }
        var me = this,
            jsonParameters;

        jsonParameters = me.getJsonParameters(params);

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


    /**
     * @function SuperMap.GenerateSpatialDataService.prototype.getJsonParameters
     * @description 将参数转化为 JSON 字符串。
     * @param params -  {SuperMap.GenerateSpatialDataParameters}
     * @return {string}转化后的JSON字符串。
     */
    getJsonParameters(params) {
        var jsonParameters = "",
            jsonStr = "datasets/" + params.routeTable + "/linearreferencing/generatespatialdata",
            me = this,
            end;

        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? jsonStr + ".json" : "/" + jsonStr + ".json";

        me.url += "?returnContent=true";
        jsonParameters = Util.toJSON(params);
        return jsonParameters;
    }


}

SuperMap.GenerateSpatialDataService = GenerateSpatialDataService;