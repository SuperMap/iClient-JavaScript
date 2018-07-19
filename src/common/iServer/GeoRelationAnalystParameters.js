import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import '../REST';
import './FilterParameter';

/**
 * @class SuperMap.GeoRelationAnalystParameters
 * @category iServer SpatialAnalyst GeoRelationAnalyst
 * @classdesc 空间关系分析服务参数类。使用该类可以为空间关系分析服务提供所需的参数信息。
 * @param {Object} options - 参数。 
 * @param {SuperMap.FilterParameter} options.sourceFilter - 空间关系分析中的源数据集查询参数。仅 name, ids, attributeFilter 和 fields 字段有效。 
 * @param {SuperMap.FilterParameter} options.referenceFilter - 空间关系分析中的参考数据集查询参数。仅 name, ids, attributeFilter 和 fields 字段有效。 
 * @param {SuperMap.SpatialRelationType} options.spatialRelationType - 指定的空间关系类型。 
 * @param {boolean} [options.isBorderInside] - 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。 
 * @param {boolean} [options.returnFeature] - 是否返回 Feature 信息。 
 * @param {boolean} [options.returnGeoRelatedOnly=true] - 仅返回满足指定空间关系的空间对象。 
 * @param {number} [options.startRecord=0] - 分析结果起始记录位置。 
 * @param {number} [options.expectCount=500] - 空间关系分析期望返回结果记录数，如果实际不足500条结果则返回所有分析结果。 
 */
export class GeoRelationAnalystParameters {


    constructor(options) {
        /**
         *  @member {string} SuperMap.GeoRelationAnalystParameters.prototype.dataset
         *  @description 源数据集名称。
         */
        this.dataset = null;

        /**
         * @member {SuperMap.FilterParameter} SuperMap.GeoRelationAnalystParameters.prototype.sourceFilter
         * @description 空间关系分析中的源数据集查询参数。仅 ids、attributeFilter 和 fields 字段有效。
         */
        this.sourceFilter = null;

        /**
         * @member {SuperMap.FilterParameter} SuperMap.GeoRelationAnalystParameters.prototype.referenceFilter
         * @description 空间关系分析中的参考数据集查询参数。仅 name，ids，attributeFilter 和 fields 字段有效。
         */
        this.referenceFilter = null;

        /**
         * @member {SuperMap.SpatialRelationType} SuperMap.GeoRelationAnalystParameters.prototype.spatialRelationType
         * @description 指定的空间关系类型。
         */
        this.spatialRelationType = null;

        /**
         * @member {boolean} [SuperMap.GeoRelationAnalystParameters.prototype.isBorderInside]
         * @description 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。
         */
        this.isBorderInside = null;

        /**
         * @member {boolean} [SuperMap.GeoRelationAnalystParameters.prototype.returnFeature]
         * @description 是否返回 Feature 信息。
         */ 
        this.returnFeature = null;

        /**
         * @member {boolean} [SuperMap.GeoRelationAnalystParameters.prototype.returnGeoRelatedOnly=true]
         * @description 是否仅返回满足指定空间关系的空间对象。
         */
        this.returnGeoRelatedOnly = null;

        /**
         * @member {number} [SuperMap.GeoRelationAnalystParameters.prototype.returnGeoRelatedOnly=0]
         * @description 分析结果起始记录位置。
         */
        this.startRecord = 0;

        /**
         * @member {number} [SuperMap.GeoRelationAnalystParameters.prototype.expectCount=500]
         * @description 空间关系分析期望返回结果记录数，如果实际不足 500 条结果则返回所有分析结果。
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