import SuperMap from '../SuperMap';
import CommonServiceBase from './CommonServiceBase';
import GetGridCellInfosParameters from './GetGridCellInfosParameters';

/**
 * @class SuperMap.GetGridCellInfosService
 * @classdesc 数据栅格查询服务，支持查询指定地理位置的栅格信息
 * @param url - {string} 查询服务地址。例如: http://localhost:8090/iserver/services/data-jingjin/rest/data
 * @param options - {Object} 可選参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 * @extends SuperMap.CommonServiceBase
 * @example  例如：
 * (start code)
 * var myService = new SuperMap.GetGridCellInfosService(url, {eventListeners: {
     *     "processCompleted": queryCompleted,
     *     "processFailed": queryError
     *     }
     * });
 * (end)
 *
 */
export default  class GetGridCellInfosService extends CommonServiceBase {

    /**
     * @member SuperMap.GetGridCellInfosService.prototype.datasetName -{string}
     * @description 数据集名称。
     */
    datasetName = null;

    /**
     * @member SuperMap.GetGridCellInfosService.prototype.dataSourceName -{string}
     * @description 数据源名称。
     */
    dataSourceName = null;

    /**
     * @member SuperMap.GetGridCellInfosService.prototype.datasetType -{string}
     * @description 数据集类型。
     */
    datasetType = null;

    /**
     * @member SuperMap.GetGridCellInfosService.prototype.X -{number}
     * @description 要查询的地理位置X轴
     */
    X = null;

    /**
     * @member SuperMap.GetGridCellInfosService.prototype.Y-{number}
     * @description 要查询的地理位置Y轴
     */
    Y = null;

    constructor(url, options) {
        super(url, options);
        if (!!options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        var me = this;
        me.X = null;
        me.Y = null;
        me.datasetName = null;
        me.dataSourceName = null;
        me.datasetType = null;
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.processAsync
     * @description 执行服务，查询数据集信息。
     * params - {SuperMap.GetGridCellInfosParameters} 查询参数。
     */
    processAsync(params) {
        if (params) {
            SuperMap.Util.extend(this, params);
        }
        var me = this;
        var end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? ("datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".json") :
                ("/datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".json");
        } else {
            me.url += (end == "/") ? ("datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".jsonp") :
                ("/datasources/" + me.dataSourceName + "/datasets/" + me.datasetName + ".jsonp");
        }

        me.queryRequest(me.getDatasetInfoCompleted, me.getDatasetInfoFailed);
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.queryRequest
     * @description 执行服务，查询。
     * @param successFun -{function} 成功后执行的函数
     * @param failedFunc -{function} 失败后执行的函数
     */
    queryRequest(successFun, failedFunc) {
        var me = this;
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: successFun,
            failure: failedFunc
        });
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.getDatasetInfoCompleted
     * @description  数据集查询完成，执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    getDatasetInfoCompleted(result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        me.datasetType = result.datasetInfo.type;
        me.queryGridInfos();
    }

    /**
     * @function SuperMap.GetGridCellInfosService.prototype.queryGridInfos
     * @description 执行服务，查询数据集栅格信息信息。
     */
    queryGridInfos() {
        var me = this,
            re = /\.json/,
            index = re.exec(me.url).index,
            urlBack = me.url.substring(index),
            urlFront = me.url.substring(0, me.url.length - urlBack.length);
        if (me.datasetType == "GRID") {
            me.url = urlFront + "/gridValue" + urlBack;
        } else {
            me.url = urlFront + "/imageValue" + urlBack;
        }

        if (me.X != null && me.Y != null) {
            me.url += '?x=' + me.X + '&y=' + me.Y;
        }
        me.queryRequest(me.serviceProcessCompleted, me.serviceProcessFailed);
    }


    /**
     * @function SuperMap.GetGridCellInfosService.prototype.getDatasetInfoFailed
     * @description 数据集查询失败，执行此方法。
     * @param result -  {Object} 服务器返回的结果对象。
     */
    getDatasetInfoFailed(result) {
        var me = this;
        me.serviceProcessFailed(result);
    }

    CLASS_NAME = "SuperMap.GetGridCellInfosService"
}

SuperMap.GetGridCellInfosService = GetGridCellInfosService;