/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class GeoRelationAnalystParameters
 * @deprecatedclass SuperMap.GeoRelationAnalystParameters
 * @category iServer SpatialAnalyst GeoRelationAnalyst
 * @classdesc 空间关系分析服务参数类。该类可指定用于空间关系分析的源数据集和参考数据集，以及空间判断关系类型、边界处理方式等参数，
 * 还可以对分析结果进行一系列设置。支持的空间关系判断类型：包含、被包含、相交。
 * @param {Object} options - 参数。
 * @param {FilterParameter} options.sourceFilter - 空间关系分析中的源数据集查询参数。仅 name, ids, attributeFilter 和 fields 字段有效。
 * @param {FilterParameter} options.referenceFilter - 空间关系分析中的参考数据集查询参数。仅 name, ids, attributeFilter 和 fields 字段有效。
 * @param {SpatialRelationType} options.spatialRelationType - 指定的空间关系类型。
 * @param {boolean} [options.isBorderInside] - 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。
 * @param {boolean} [options.returnFeature] - 是否返回 Feature 信息。
 * @param {boolean} [options.returnGeoRelatedOnly=true] - 仅返回满足指定空间关系的空间对象。
 * @param {number} [options.startRecord=0] - 分析结果起始记录位置。
 * @param {number} [options.expectCount=500] - 空间关系分析期望返回结果记录数，如果实际不足500条结果则返回所有分析结果。
 * @usage
 */
export class GeoRelationAnalystParameters {


    constructor(options) {
        /**
         *  @member {string} GeoRelationAnalystParameters.prototype.dataset
         *  @description 源数据集名称。
         */
        this.dataset = null;

        /**
         * @member {FilterParameter} GeoRelationAnalystParameters.prototype.sourceFilter
         * @description 空间关系分析中的源数据集查询参数。仅 ids、attributeFilter 和 fields 字段有效。
         */
        this.sourceFilter = null;

        /**
         * @member {FilterParameter} GeoRelationAnalystParameters.prototype.referenceFilter
         * @description 空间关系分析中的参考数据集查询参数。仅 name，ids，attributeFilter 和 fields 字段有效。
         */
        this.referenceFilter = null;

        /**
         * @member {SpatialRelationType} GeoRelationAnalystParameters.prototype.spatialRelationType
         * @description 指定的空间关系类型。
         */
        this.spatialRelationType = null;

        /**
         * @member {boolean} [GeoRelationAnalystParameters.prototype.isBorderInside]
         * @description 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。
         */
        this.isBorderInside = null;

        /**
         * @member {boolean} [GeoRelationAnalystParameters.prototype.returnFeature]
         * @description 是否返回 Feature 信息。
         */
        this.returnFeature = null;

        /**
         * @member {boolean} [GeoRelationAnalystParameters.prototype.returnGeoRelatedOnly=true]
         * @description 是否仅返回满足指定空间关系的空间对象。
         */
        this.returnGeoRelatedOnly = null;

        /**
         * @member {number} [GeoRelationAnalystParameters.prototype.returnGeoRelatedOnly=0]
         * @description 分析结果起始记录位置。
         */
        this.startRecord = 0;

        /**
         * @member {number} [GeoRelationAnalystParameters.prototype.expectCount=500]
         * @description 空间关系分析期望返回结果记录数，如果实际不足 500 条结果则返回所有分析结果。
         */
        this.expectCount = 500;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.GeoRelationAnalystParameters";
    }

    /**
     * @function GeoRelationAnalystParameters.prototype.destroy
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
