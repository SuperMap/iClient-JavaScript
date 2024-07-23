/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class GetLayersLegendInfoService
 * @deprecatedclass SuperMap.GetLayersLegendInfoService
 * @category iServer Map Layer
 * @classdesc 获取图例信息服务类构造函数。
 * @version 11.1.1
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。请求地图服务，URL 应为：
 *        http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 *        如 http://localhost:8090/iserver/services/map-world/rest/maps/World 。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class GetLayersLegendInfoService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.GetLayersLegendInfoService";
    }

    /**
     * @function GetLayersLegendInfoService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function GetLayersLegendInfoService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     */
    processAsync(params, callback) {
        var me = this,
          method = "GET";
        me.url = Util.urlPathAppend(me.url, "/legend");
        return me.request({
          method: method,
          params: params,
          scope: me,
          success: callback,
          failure: callback
        });
    }

}
