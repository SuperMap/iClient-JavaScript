/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {DatasetOverlayAnalystParameters} from './DatasetOverlayAnalystParameters';
import {GeometryOverlayAnalystParameters} from './GeometryOverlayAnalystParameters';
import { DataFormat } from '../REST';

/**
 * @class OverlayAnalystService
 * @deprecatedclass SuperMap.OverlayAnalystService
 * @category iServer SpatialAnalyst OverlayAnalyst
 * @classdesc 叠加分析服务类。
 * 该类负责将客户设置的叠加分析参数传递给服务端，并接收服务端返回的叠加分析结果数据。
 * 叠加分析结果通过该类支持的事件的监听函数参数获取
 * @param {string} url - 服务地址。如http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON、GeoJSON、FGB 三种格式。参数格式为 "ISERVER"，"GEOJSON"，"FGB"。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @example 例如：
 * (start code)
 * var myOverlayAnalystService = new OverlayAnalystService(url, {
 *     eventListeners: {
 *	       "processCompleted": OverlayCompleted,
 *		   "processFailed": OverlayFailed
 *		   }
 * });
 * (end)
 * @usage
 */

export class OverlayAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        /**
         * @member {string} OverlayAnalystService.prototype.mode
         * @description 叠加分析类型
         */
        this.mode = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.OverlayAnalystService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }

    /**
     * @function OverlayAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {OverlayAnalystParameters} parameter - 叠加分析参数类。
     */
    processAsync(parameter) {
        var parameterObject = {};
        var me = this;

        if (parameter instanceof DatasetOverlayAnalystParameters) {
            me.mode = "datasets";
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.sourceDataset + '/overlay');
            DatasetOverlayAnalystParameters.toObject(parameter, parameterObject);
        } else if (parameter instanceof GeometryOverlayAnalystParameters) {
            me.mode = "geometry";
            //支持传入多个几何要素进行叠加分析
            if(parameter.operateGeometries && parameter.sourceGeometries){
                me.url = Util.urlPathAppend(me.url, 'geometry/overlay/batch');
                me.url = Util.urlAppend(me.url, 'ignoreAnalystParam=true');
            }else {
                me.url = Util.urlPathAppend(me.url, 'geometry/overlay');
            }
            GeometryOverlayAnalystParameters.toObject(parameter, parameterObject);
        }
        this.returnContent = true;
        var jsonParameters = Util.toJSON(parameterObject);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    dataFormat() {
      return [DataFormat.GEOJSON, DataFormat.ISERVER, DataFormat.FGB];
    }
}
