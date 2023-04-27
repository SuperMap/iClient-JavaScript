/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {EditType} from '../REST';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class EditFeaturesParameters
 * @deprecatedclass SuperMap.EditFeaturesParameters
 * @category iServer Data Feature
 * @classdesc 数据集添加、修改、删除参数类。
 * @param {Object} options - 参数。
 * @param {Array.<FeatureVector|GeoJSONObject|ol.Feature>} options.features - 当前需要创建或者是修改的要素集。
 * @param {boolean} [options.returnContent=false] - 是否返回要素内容。如果为true则返回创建要素的 ID 数组，否则返回 featureResult 资源的 URI。
 * @param {EditType} [options.editType=EditType.ADD] - POST 动作类型 (ADD、UPDATE、DELETE)。
 * @param {Array.<string|number>} [options.IDs] - 删除要素时的要素的 ID 数组。
 * @usage
 */
export class EditFeaturesParameters {


    constructor(options) {
        /**
         * @member {string} EditFeaturesParameters.prototype.dataSourceName
         * @description 当前需要创建或者是修改的要素的数据源。
         */
        this.dataSourceName = null;

        /**
         * @member {string} EditFeaturesParameters.prototype.dataSetName
         * @description 当前需要创建或者是修改的要素的数据集。
         */
        this.dataSetName = null;

        /**
         * @member {Array.<FeatureVector|GeoJSONObject|ol.Feature>} EditFeaturesParameters.prototype.features
         * @description 当前需要创建或者是修改的要素集。
         */
        this.features = null;

        /**
         * @member {EditType} [EditFeaturesParameters.prototype.editType=EditType.ADD]
         * @description 要素集更新类型 (add、update、delete)。
         */
        this.editType = EditType.ADD;

        /**
         * @member {Array.<string|number>} [EditFeaturesParameters.prototype.IDs]
         * @description 执行删除时要素集 ID 集合。
         */
        this.IDs = null;

        /**
         * @member {boolean} [EditFeaturesParameters.prototype.returnContent=false]
         * @description 要素添加时，isUseBatch 不传或传为 false 的情况下有效。
         *              true 表示直接返回新创建的要素的 ID 数组；false 表示返回创建的 featureResult 资源的 URI。
         */
        this.returnContent = false;

        /**
         * @member {boolean} [EditFeaturesParameters.prototype.isUseBatch=false]
         * @description 是否使用批量添加要素功能，要素添加时有效。批量添加能够提高要素编辑效率。true 表示批量添加；false 表示不使用批量添加。
         */
        this.isUseBatch = false;
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.EditFeaturesParameters";
    }


    /**
     * @function EditFeaturesParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.dataSourceName = null;
        me.dataSetName = null;
        me.features = null;
        me.editType = null;
        me.IDs = null;
        me.returnContent = null;
    }

    /**
     * @function EditFeaturesParameters.prototype.toJsonParameters
     * @description 将 EditFeaturesParameters 对象参数转换为 JSON 字符串。
     * @param {EditFeaturesParameters} params - 地物编辑参数。
     * @returns {string} JSON 字符串。
     */
    static toJsonParameters(params) {
        var feature,
            len,
            features,
            editType = params.editType;

        if (editType === EditType.DELETE) {
            if (params.IDs === null) {
                return;
            }

            features = {ids: params.IDs};
        } else {
            features = [];
            if (params.features) {
                len = params.features.length;
                for (var i = 0; i < len; i++) {
                    feature = params.features[i];
                    feature.geometry = ServerGeometry.fromGeometry(feature.geometry);
                    features.push(feature);
                }
            }
        }

        return Util.toJSON(features);
    }

}
