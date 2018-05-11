import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialQueryMode} from '../REST';
import {FilterParameter} from './FilterParameter';
import {GetFeaturesParametersBase} from './GetFeaturesParametersBase';

/**
 * @class SuperMap.GetFeaturesByBoundsParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据集范围查询参数类，该类用于设置数据集范围查询的相关参数。
 * @param {Object} options - 参数。<br>
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} options.bounds - 用于查询的范围对象。</br>
 * @param {string} options.attributeFilter - 范围查询属性过滤条件。</br>
 * @param {Array.<string>} options.fields - 设置查询结果返回字段。默认返回所有字段。</br>
 * @param {SuperMap.SpatialQueryMode} options.spatialQueryMode - 空间查询模式常量，必设参数。</br>
 * @param {SuperMap.FilterParameter} options.queryParameter - 查询过滤条件参数。</br>
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。</br>
 * @param {boolean} options.returnContent - 是否直接返回查询结果。</br>
 * @param {number} options.fromIndex - 查询结果的最小索引号。</br>
 * @param {number} options.toIndex - 查询结果的最大索引号。</br>
 * @extends {SuperMap.GetFeaturesParametersBase}
 */

export class GetFeaturesByBoundsParameters extends GetFeaturesParametersBase {

    constructor(options) {
        super(options);
        /**
         * @member {string} SuperMap.GetFeaturesByBoundsParameters.prototype.getFeatureMode
         * @description 数据集查询模式。范围查询有"BOUNDS"，"BOUNDS_ATTRIBUTEFILTER"两种，当用户设置attributeFilter时会自动切换到BOUNDS_ATTRIBUTEFILTER访问服务。
         */
        this.getFeatureMode = GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS;

        /**
         * @member {(SuperMap.Bounds|L.Bounds|ol.extent)} SuperMap.GetFeaturesByBoundsParameters.prototype.bounds
         * @description 用于查询的范围对象。
         *
         */
        this.bounds = null;

        /**
         * @member {Array.<string>} SuperMap.GetFeaturesByBoundsParameters.prototype.fields
         * @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
         */
        this.fields = null;

        /**
         * @member {string} SuperMap.GetFeaturesByBoundsParameters.prototype.attributeFilter
         * @description 范围查询属性过滤条件。
         */
        this.attributeFilter = null;

        /**
         * @member {SuperMap.SpatialQueryMode} SuperMap.GetFeaturesByBoundsParameters.prototype.spatialQueryMode
         * @description 空间查询模式常量，必设参数，默认为CONTAIN。
         */
        this.spatialQueryMode = SpatialQueryMode.CONTAIN;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.GetFeaturesByBoundsParameters";
    }

    /**
     * @function SuperMap.GetFeaturesByBoundsParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.bounds) {
            me.bounds.destroy();
            me.bounds = null;
        }
        if (me.fields) {
            while (me.fields.length > 0) {
                me.fields.pop();
            }
            me.fields = null;
        }
        me.attributeFilter = null;
        me.spatialQueryMode = null;
        me.getFeatureMode = null;
    }

    /**
     * @function SuperMap.GetFeaturesByBoundsParameters.toJsonParameters
     * @description 将SuperMap.GetFeaturesByBoundsParameters对象参数转换为JSON字符串。
     * @param {SuperMap.GetFeaturesByBoundsParameters} params - 范围查询参数。
     * @returns {string} 转化后的JSON字符串。
     *
     */
    static toJsonParameters(params) {
        var filterParameter,
            bounds,
            parasByBounds;

        bounds = {
            "leftBottom": {"x": params.bounds.left, "y": params.bounds.bottom},
            "rightTop": {"x": params.bounds.right, "y": params.bounds.top}
        };
        parasByBounds = {
            datasetNames: params.datasetNames,
            getFeatureMode: GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS,
            bounds: bounds,
            spatialQueryMode: params.spatialQueryMode
        };
        if (params.fields) {
            filterParameter = new FilterParameter();
            filterParameter.name = params.datasetNames;
            filterParameter.fields = params.fields;
            parasByBounds.queryParameter = filterParameter;
        }
        if (params.attributeFilter) {
            parasByBounds.attributeFilter = params.attributeFilter;
            parasByBounds.getFeatureMode = GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS_ATTRIBUTEFILTER;
        }
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            parasByBounds.maxFeatures = params.maxFeatures;
        }

        return Util.toJSON(parasByBounds);
    }


}

GetFeaturesByBoundsParameters.getFeatureMode = {
    "BOUNDS": "BOUNDS",
    "BOUNDS_ATTRIBUTEFILTER": "BOUNDS_ATTRIBUTEFILTER"
};

SuperMap.GetFeaturesByBoundsParameters = GetFeaturesByBoundsParameters;