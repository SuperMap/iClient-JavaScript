import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import '../REST';
import './FilterParameter';

/**
 * @class SuperMap.GeoRelationAnalystParameters
 * @category  iServer SpatialAnalyst
 * @classdesc
 * 空间关系分析服务参数类。使用该类可以为空间关系分析服务提供所需的参数信息。
 * @param options - {Object} 可选参数。如:</br>
 *        sourceFilter - {{@link SuperMap.FilterParameter}} 空间关系分析中的参考数据集查询参数。仅 name, ids,attributeFilter 和 fields 字段有效。</br>
 *        referenceFilter - {{@link SuperMap.FilterParameter}} 空间关系分析中的参考数据集查询参数。仅 name, ids,attributeFilter 和 fields 字段有效。</br>
 *        spatialRelationType - {{@link SuperMap.SpatialRelationType}} 指定的空间关系类型。</br>
 *        isBorderInside - {boolean} 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。</br>
 *        returnFeature - {boolean} 是否返回Feature信息。</br>
 *        returnGeoRelatedOnly - {boolean} 仅返回满足指定空间关系的空间对象，默认为 True。</br>
 *        startRecord - {integer} 分析结果起始记录位置，默认为0。</br>
 *        expectCount - {integer} 空间关系分析期望返回结果记录数，默认为500条，如果实际不足500条结果则返回所有分析结果。</br>
 */
export class GeoRelationAnalystParameters {


    constructor(options) {
        /**
         *  @member SuperMap.GeoRelationAnalystParameters.prototype.dataset - {string}
         *  @description 源数据集名称。
         */
        this.dataset = null;

        /**
         * @member SuperMap.GeoRelationAnalystParameters.prototype.sourceFilter - {SuperMap.FilterParameter}
         * @description 空间关系分析中的源数据集查询参数。仅 ids、attributeFilter 和 fields 字段有效。
         */
        this.sourceFilter = null;

        /**
         * @member SuperMap.GeoRelationAnalystParameters.prototype.referenceFilter - {SuperMap.FilterParameter}
         * @description 空间关系分析中的参考数据集查询参数。仅 name, ids, attributeFilter和 fields 字段有效。
         */
        this.referenceFilter = null;

        /**
         * @member SuperMap.GeoRelationAnalystParameters.prototype.spatialRelationType - {SuperMap.SpatialRelationType}
         * @description 指定的空间关系类型。
         */
        this.spatialRelationType = null;

        /**
         * @member SuperMap.GeoRelationAnalystParameters.prototype.isBorderInside - {boolean}
         * @description 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。
         */
        this.isBorderInside = null;

        /**
         * @member SuperMap.GeoRelationAnalystParameters.prototype.returnFeature - {boolean}
         * @description 是否返回Feature信息。
         */
        this.returnFeature = null;

        /**
         * @member SuperMap.GeoRelationAnalystParameters.prototype.returnGeoRelatedOnly - {boolean}
         * @description 是否仅返回满足指定空间关系的空间对象，默认为 True。
         */
        this.returnGeoRelatedOnly = null;

        /**
         * @member SuperMap.GeoRelationAnalystParameters.prototype.returnGeoRelatedOnly - {integer}
         * @description 分析结果起始记录位置，默认为0。
         */
        this.startRecord = 0;

        /**
         * @member SuperMap.GeoRelationAnalystParameters.prototype.expectCount - {integer}
         * @description 空间关系分析期望返回结果记录数，默认为500条，如果实际不足500条结果则返回所有分析结果。
         */
        this.expectCount = 500;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.GeoRelationAnalystParameters";
    }

    /**
     * @function SuperMap.GeoRelationAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.sourceFilter) {
            me.sourceFilter.destroy();
        }
        me.sourceFilter = null;

        if (me.referenceFilter) {
            me.referenceFilter.destroy();
        }
        me.referenceFilter = null;

        me.dataset = null;
        me.spatialRelationType = null;
        me.isBorderInside = null;
        me.returnFeature = null;
        me.returnGeoRelatedOnly = null;
        me.startRecord = null;
        me.expectCount = null;
    }

}

SuperMap.GeoRelationAnalystParameters = GeoRelationAnalystParameters;