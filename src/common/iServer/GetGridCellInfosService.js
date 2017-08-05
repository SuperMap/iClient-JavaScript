import SuperMap from '../SuperMap';
import CommonServiceBase from './CommonServiceBase';
import GetGridCellInfosParameters from './GetGridCellInfosParameters';

/**
 * @class SuperMap.GetGridCellInfosService
 * @constructs SuperMap.GetGridCellInfosService
 * @classdesc
 * 数据栅格查询服务，支持查询指定地理位置的栅格信息
 * @extends {SuperMap.CommonServiceBase}
 * @api
 * @example  例如：
 * (start code)
 * var myService = new SuperMap.GetGridCellInfosService(url, {eventListeners: {
     *     "processCompleted": queryCompleted,
     *     "processFailed": queryError
     *     }
     * });
 * (end)
 *
 *
 */
export default  class GetGridCellInfosService extends CommonServiceBase {


    /**
     * APIProperty: datasetName
     * {String} 数据集名称。
     */
    datasetName = null;

    /**
     * APIProperty: dataSourceName
     * {String} 数据源名称。
     */
    dataSourceName = null;

    /**
     * Property: dataSourceName
     * {String} 数据集类型。
     */
    datasetType = null;

    /**
     * APIProperty: X
     * {Number} 要查询的地理位置X轴
     */
    X = null;

    /**
     * APIProperty: X
     * {Number} 要查询的地理位置Y轴
     */
    Y = null;

    /**
     * @method SuperMap.GetGridCellInfosService.initialize
     * @description 字段查询服务构造函数。

     * @param url - {String} 查询服务地址。例如: http://localhost:8090/iserver/services/data-jingjin/rest/data
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    constructor(url, options) {
        super(url, options);
        if (!!options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /*
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
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


    /*
     * APIMethod: processAsync
     * 执行服务，查询数据集信息。
     * Parameters:
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


    /*
     * Method: queryRequest
     * 执行服务，查询。
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
     * @method SuperMap.GetGridCellInfosService.getDatasetInfoCompleted
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
     * @method SuperMap.GetGridCellInfosService.queryGridInfos
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
     * @method SuperMap.GetGridCellInfosService.getDatasetInfoFailed
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