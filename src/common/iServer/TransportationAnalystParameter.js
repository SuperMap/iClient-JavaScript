import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransportationAnalystResultSetting} from './TransportationAnalystResultSetting';

/**
 * @class SuperMap.TransportationAnalystParameter
 * @category  iServer NetworkAnalyst
 * @classdesc 交通网络分析通用参数类。
 * @description 该类主要用来提供交通网络分析所需的通用参数。
 * 通过本类可以设置障碍边、障碍点、权值字段信息的名称标识、转向权值字段等信息，还可以对分析结果包含的内容进行一些设置。
 * @param {Object} options - 参数。
 * @param {Array.<number>} options.barrierEdgeIDs - 网络分析中障碍弧段的 ID 数组。
 * @param {Array.<number>} options.barrierNodeIDs - 网络分析中障碍点的 ID 数组。
 * @param {Array.<(SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point)>} options.barrierPoints - 网络分析中 Point2D 类型的障碍点数组。
 * @param {string} options.weightFieldName - 阻力字段的名称。
 * @param {string} options.turnWeightField - 转向权重字段的名称。
 * @param {SuperMap.TransportationAnalystResultSetting} options.resultSetting - 分析结果返回内容。
 */
export class TransportationAnalystParameter {

    constructor(options) {

        if (!options) {
            return;
        }
        /**
         * @member {Array.<number>} SuperMap.TransportationAnalystParameter.prototype.barrierEdgeIDs
         * @description 网络分析中障碍弧段的 ID 数组。弧段设置为障碍边之后，表示双向都不通。
         */
        this.barrierEdgeIDs = null;

        /**
         * @member {Array.<number>} SuperMap.TransportationAnalystParameter.prototype.barrierNodeIDs
         * @description 网络分析中障碍点的 ID 数组。结点设置为障碍点之后，表示任何方向都不能通过此结点。
         */
        this.barrierNodeIDs = null;

        /**
         * @member {Array.<(SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point)>}  SuperMap.TransportationAnalystParameter.prototype.barrierPoints
         * @description 网络分析中 Point2D 类型的障碍点数组。障碍点表示任何方向都不能通过此点。</br>
         * 当各网络分析参数类中的 isAnalyzeById 属性设置为 false 时，该属性才生效。
         */
        this.barrierPoints = null;

        /**
         * @member {string} SuperMap.TransportationAnalystParameter.prototype.weightFieldName
         * @description 阻力字段的名称，标识了进行网络分析时所使用的阻力字段，例如表示时间、长度等的字段都可以用作阻力字段。
         * 该字段默值为服务器发布的所有耗费字段的第一个字段。
         */
        this.weightFieldName = null;

        /**
         * @member {string} SuperMap.TransportationAnalystParameter.prototype.turnWeightField
         * @description 转向权重字段的名称。
         */
        this.turnWeightField = null;

        /**
         *  @member {SuperMap.TransportationAnalystResultSetting} SuperMap.TransportationAnalystParameter.prototype.resultSetting
         *  @description 分析结果返回内容。
         */
        this.resultSetting = new TransportationAnalystResultSetting();

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TransportationAnalystParameter";
    }

    /**
     * @function SuperMap.TransportationAnalystParameter.prototype.destroy
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

SuperMap.TransportationAnalystParameter = TransportationAnalystParameter;