import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {EditType} from '../REST';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.EditFeaturesParameters
 * @category  iServer Data Feature
 * @classdesc 数据服务中数据集添加、修改、删除参数类。
 * @category iServer Data
 * @param options - {Object} 可选参数。如:</br>
 *        features - {Array<Object>} 当前需要创建或者是修改的要素集。feature类型可以是：SuperMap.Feature.Vector|GeoJSON|ol.feature。</br>
 *        returnContent - {boolean} 是返回创建要素的ID数组还是返回featureResult资源的URI。</br>
 *        editType - {SuperMap.EditType} POST动作类型(ADD、UPDATE、DELETE)，默认为 SuperMap.EditType.ADD。</br>
 *        IDs - {Array<string|integer>} 删除要素时的要素的ID数组。</br>
 */
export class EditFeaturesParameters {


    constructor(options) {
        /**
         * @member SuperMap.EditFeaturesParameters.prototype.dataSourceName -{string}
         * @description 当前需要创建或者是修改的要素的数据源
         */
        this.dataSourceName = null;

        /**
         * @member SuperMap.EditFeaturesParameters.prototype.dataSetName -{string}
         * @description 当前需要创建或者是修改的要素的数据集。
         */
        this.dataSetName = null;

        /**
         * @member SuperMap.EditFeaturesParameters.prototype.features -{Array<Object>}
         * @description 当前需要创建或者是修改的要素集。</br>
         * feature类型可以是：SuperMap.Feature.Vector|GeoJSON|ol.feature。
         */
        this.features = null;

        /**
         * @member SuperMap.EditFeaturesParameters.prototype.dataSetName -{EditType}
         * @description 要素集更新类型(add、update、delete)，默认为 SuperMap.EditType.ADD.
         */
        this.editType = EditType.ADD;

        /**
         * @member SuperMap.EditFeaturesParameters.prototype.dataSetName -{Array<string>}|{Array<Integer>}
         * @description 执行删除时要素集ID集合。
         */
        this.IDs = null;

        /**
         * @member SuperMap.EditFeaturesParameters.prototype.returnContent -{boolean}
         * @description 要素添加时，isUseBatch 不传或传为 false 的情况下有效。
         *true 表示直接返回新创建的要素的 ID 数组;false 表示返回创建的 featureResult 资源的 URI。默认不传时为 false。
         */
        this.returnContent = false;

        /**
         * @member SuperMap.EditFeaturesParameters.prototype.isUseBatch -{boolean}
         * @description 是否使用批量添加要素功能，要素添加时有效。批量添加能够提高要素编辑效率。true 表示批量添加；false 表示不使用批量添加。默认不传时为 false。
         */
        this.isUseBatch = false;
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.EditFeaturesParameters";
    }


    /**
     * @function SuperMap.EditFeaturesParameters.prototype.destroy
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
     * @function SuperMap.EditFeaturesParameters.prototype.toJsonParameters
     * @description 将 <EditFeaturesParameters> 对象参数转换为 JSON 字符串。
     * @param params - {SuperMap.EditFeaturesParameters} 地物编辑参数。
     * @return {string} JSON字符串。
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

SuperMap.EditFeaturesParameters = EditFeaturesParameters;