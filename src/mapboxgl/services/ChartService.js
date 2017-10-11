import mapboxgl from 'mapbox-gl';
import SuperMap from '../../common/SuperMap';
import ServiceBase from './ServiceBase';
import Util from '../core/Util';
import ChartQueryService from '../../common/iServer/ChartQueryService';
import ChartFeatureInfoSpecsService from '../../common/iServer/ChartFeatureInfoSpecsService';

/**
 * @class mapboxgl.supermap.ChartService
 * @classdesc 海图服务。
 * @extends mapboxgl.supermap.ServiceBase
 * @example
 *      new mapboxgl.supermap.ChartService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param url - {string} 与客户端交互的海图服务地址。
 * @param options -{Object} 交互时所需可选参数。
 *
 */
export default class ChartService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.ChartService.prototype.queryChart
     * @description 查询海图服务。
     * @param params - {SuperMap.ChartQueryParameters} 海图查询所需参数类。
     * @param callback - {function} 回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果格式类型。
     * @return {mapboxgl.supermap.ChartService}
     */
    queryChart(params, callback, resultFormat) {
        var me = this,
            param = me._processParams(params),
            format = me._processFormat(resultFormat);
        var chartQueryService = new ChartQueryService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });

        chartQueryService.processAsync(param);
        return me;
    }

    /**
     * @function mapboxgl.supermap.ChartService.prototype.getChartFeatureInfo
     * @description 获取海图物标信息服务。
     * @param callback - {function} 回调函数
     * @return {mapboxgl.supermap.ChartService}
     */
    getChartFeatureInfo(callback) {
        var me = this, url = me.url.concat();
        url += "/chartFeatureInfoSpecs";
        var chartFeatureInfoSpecsService = new ChartFeatureInfoSpecsService(url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        chartFeatureInfoSpecsService.processAsync();
        return me;
    }

    _processParams(params) {

        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        if (params.filter) {
            params.chartQueryFilterParameters = Util.isArray(params.filter) ? params.filter : [params.filter];
        }

        if (params.bounds) {
            if (params.bounds instanceof Array) {
                params.bounds = new SuperMap.Bounds(
                    params.bounds[0],
                    params.bounds[1],
                    params.bounds[2],
                    params.bounds[3]
                );
            }
            if (params.bounds instanceof mapboxgl.LngLatBounds) {
                params.bounds = new SuperMap.Bounds(
                    params.bounds.getSouthWest().lng,
                    params.bounds.getSouthWest().lat,
                    params.bounds.getNorthEast().lng,
                    params.bounds.getNorthEast().lat
                );
            }

        }

    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
}

mapboxgl.supermap.ChartService = ChartService;