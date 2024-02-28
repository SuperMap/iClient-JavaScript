/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {TransportationAnalystResultSetting} from './TransportationAnalystResultSetting';

/**
 * @class TransportationAnalystParameter
 * @deprecatedclass SuperMap.TransportationAnalystParameter
 * @category  iServer NetworkAnalyst
 * @classdesc 交通网络分析通用参数类。此类提供了交通网络分析中所需的障碍边、障碍点、权值字段信息的名称标识、转向权值字段，以及有关分析结果的一系列参数。
 * @param {Object} options - 参数。
 * @param {Array.<number>} options.barrierEdgeIDs - 网络分析中障碍弧段的 ID 数组。
 * @param {Array.<number>} options.barrierNodeIDs - 网络分析中障碍点的 ID 数组。
 * @param {string} options.turnWeightField - 转向权重字段的名称。
 * @param {TransportationAnalystResultSetting} options.resultSetting - 分析结果返回内容设置。
 * @param {Array.<GeometryPoint|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>>} [options.barrierPoints] - 网络分析中 Point2D 类型的障碍点数组。
 * @param {string} [options.weightFieldName] - 阻力字段的名称。
 * @usage
 */
export class TransportationAnalystParameter {

    constructor(options) {

        if (!options) {
            return;
        }
        /**
         * @member {Array.<number>} TransportationAnalystParameter.prototype.barrierEdgeIDs
         * @description 网络分析中障碍弧段的 ID 数组。弧段设置为障碍边之后，表示双向都不通。
         */
        this.barrierEdgeIDs = null;

        /**
         * @member {Array.<number>} TransportationAnalystParameter.prototype.barrierNodeIDs
         * @description 网络分析中障碍点的 ID 数组。结点设置为障碍点之后，表示任何方向都不能通过此结点。
         */
        this.barrierNodeIDs = null;

        /**
         * @member {Array.<GeometryPoint|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>>}  TransportationAnalystParameter.prototype.barrierPoints
         * @description 网络分析中 Point2D 类型的障碍点数组。障碍点表示任何方向都不能通过此点。</br>
         * 当各网络分析参数类中的 isAnalyzeById 属性设置为 false 时，该属性才生效。
         */
        this.barrierPoints = null;

        /**
         * @member {string} [TransportationAnalystParameter.prototype.weightFieldName]
         * @description 阻力字段的名称，标识了进行网络分析时所使用的阻力字段，例如表示时间、长度等的字段都可以用作阻力字段。
         * 该字段默值为服务器发布的所有耗费字段的第一个字段。
         */
        this.weightFieldName = null;

        /**
         * @member {string} TransportationAnalystParameter.prototype.turnWeightField
         * @description 转向权重字段的名称。
         */
        this.turnWeightField = null;

        /**
         *  @member {TransportationAnalystResultSetting} TransportationAnalystParameter.prototype.resultSetting
         *  @description 分析结果返回内容设置。该设置不影响结果，但设置后将增加分析所耗时间。
         */
        this.resultSetting = new TransportationAnalystResultSetting();

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TransportationAnalystParameter";
    }

    /**
     * @function TransportationAnalystParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.barrierEdgeIDs = null;
        me.barrierNodeIDs = null;
        me.weightFieldName = null;
        me.turnWeightField = null;
        if (me.resultSetting) {
            me.resultSetting.destroy();
            me.resultSetting = null;
        }
        if (me.barrierPoints && me.barrierPoints.length) {
            for (var i in me.barrierPoints) {
                me.barrierPoints[i].destroy();
            }
        }
        me.barrierPoints = null;
    }

}
