import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransportationAnalystParameter} from './TransportationAnalystParameter';

/**
 * @class SuperMap.FindServiceAreasParameters
 * @category  iServer NetworkAnalyst
 * @classdesc 服务区分析参数类.<br>
 *              服务区分析是以指定服务站点为中心，在一定服务范围内查找网络上服务站点能够提供服务的区域范围。<br>
 *              例如：计算某快餐店能够在30分钟内送达快餐的区域。<br>
 * @param options - {Object} 可选参数。如:<br>
 *        isAnalyzeById - {boolean} 是否通过节点 ID 指定路径分析的结点。<br>
 *        isCenterMutuallyExclusive - {boolean} 是否中心点互斥。<br>
 *        centers - {Array<Object>|Array<number>} 服务站点数组，必设字段。点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。<br>
 *        isFromCenter - {boolean} 是否从中心点开始分析。<br>
 *        weights - {Array<number>} 每个服务站点提供服务的阻力半径，超过这个阻力半径的区域不予考虑，其单位与阻力字段一致，必设字段。<br>
 *        parameter - {@link SuperMap.TransportationAnalystParameter} 交通网络分析通用参数。
 */
export class FindServiceAreasParameters {


    constructor(options) {
        /**
         * @member SuperMap.FindServiceAreasParameters.prototype.isAnalyzeById - {boolean}
         * @description 是否通过节点 ID 指定路径分析的结点，默认为 false。<br>
         *               指定路径分析经过的结点或设施点有两种方式：输入结点 ID 号或直接输入点坐标。<br>
         *               当该字段为 true 时，表示通过结点 ID 指定途经点，即 SuperMap.FindServiceAreasParameters.centers = [ID1,ID2,...]；<br>
         *               反之表示通过结点坐标指定途经点，即 SuperMap.FindServiceAreasParameters.centers = [{x1,y1},{x2,y2},...]。
         */
        this.isAnalyzeById = false;

        /**
         * @member SuperMap.FindServiceAreasParameters.prototype.isCenterMutuallyExclusive - {boolean}
         * @description 是否中心点互斥，即按照中心点的距离进行判断是否要进行互斥处理，默认为 false。<br>
         *               若分析出的服务区有重叠的部分，则通过设置该参数进行互斥处理。
         */
        this.isCenterMutuallyExclusive = false;

        /**
         * @member SuperMap.FindServiceAreasParameters.prototype.centers - {Array<Object>|Array<number>}
         * @description 服务站点数组，必设字段。点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。
         *                当该类的 iSAnalyzeById = true 时，通过结点 ID 号指定服务站点；当 iSAnalyzeById = false 时，通过点坐标指定服务站点。
         */
        this.centers = null;

        /**
         * @member SuperMap.FindServiceAreasParameters.prototype.isFromCenter - {boolean}
         * @description 是否从中心点开始分析。默认为 false。<br>
         *               从中心点开始分析和不从中心点开始分析，体现了服务中心和需要该服务的需求地的关系模式。<br>
         *               从中心点开始分析，是一个服务中心向服务需求地提供服务；<br>
         *               而不从中心点开始分析，是一个服务需求地主动到服务中心获得服务。
         */
        this.isFromCenter = false;

        /**
         * APIProperty: weights
         * @member SuperMap.FindServiceAreasParameters.prototype.weights - {Array<number>}
         * @description 每个服务站点提供服务的阻力半径，即超过这个阻力半径的区域不予考虑，其单位与阻力字段一致，必设字段。
         *               该字段为一个数组，数组长度跟服务中心个数一致，按照索引顺序与站点一一对应，每个元素表示了在对每个服务中心进行服务区分析时，所用的服务半径。
         */
        this.weights = null;

        /**
         * @member SuperMap.FindServiceAreasParameters.prototype.parameter - {SuperMap.TransportationAnalystParameter}
         * @description 交通网络分析通用参数。
         */
        this.parameter = new TransportationAnalystParameter();

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.FindServiceAreasParameters";
    }

    /**
     * @function SuperMap.FindServiceAreasParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.isAnalyzeById = null;
        me.isCenterMutuallyExclusive = null;
        me.centers = null;
        me.isFromCenter = null;
        me.weights = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    }

}

SuperMap.FindServiceAreasParameters = FindServiceAreasParameters;