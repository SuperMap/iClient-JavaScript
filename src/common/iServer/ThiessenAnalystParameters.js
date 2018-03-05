import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.ThiessenAnalystParameters
 * @category  iServer SpatialAnalyst ThiessenPolygonAnalyst
 * @classdesc 泰森多边形分析参数基类。
 * @param options - {Object} 可选参数。如:</br>
 *        clipRegion - {Object} 结果数据裁剪区域，可以为null，表示不对结果进行裁剪。</br>
 *                      面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|ol.geom.Polygon。</br>
 *        createResultDataset - {boolean} 是否返回结果数据集，默认不返回。</br>
 *        resultDatasetName - {boolean} 指定结果数据集名称。</br>
 *        resultDatasourceName - {boolean} 指定结果数据集所在数据源，默认为当前数据源。</br>
 *        returnResultRegion - {boolean} 是否返回分析得到的多边形面数组，默认返回。</br>
 */
export class ThiessenAnalystParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member SuperMap.ThiessenAnalystParameters.prototype.clipRegion  -{Object}
         * @description 结果数据裁剪区域，可以为null，表示不对结果进行裁剪。</br>
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|ol.geom.Polygon。
         */
        this.clipRegion = null;

        /**
         *  @member SuperMap.ThiessenAnalystParameters.prototype.createResultDataset -{boolean}
         *  @description 是否返回结果数据集，默认值 false。如果为true，则必须设置属性resultDatasetName和resultDatasourceName。
         */
        this.createResultDataset = false;

        /**
         * @member SuperMap.ThiessenAnalystParameters.prototype.resultDatasetName -{string}
         * @description 指定结果数据集名称。
         */
        this.resultDatasetName = null;

        /**
         * @member SuperMap.ThiessenAnalystParameters.prototype.resultDatasourceName -{string}
         * @description 指定结果数据集所在数据源。
         */
        this.resultDatasourceName = null;

        /**
         * @member SuperMap.ThiessenAnalystParameters.prototype.returnResultRegion -{boolean}
         * @description 是否返回分析得到的多边形面数组，默认 true，返回。
         */
        this.returnResultRegion = true;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.ThiessenAnalystParameters";
    }

    /**
     * @function SuperMap.ThiessenAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.clipRegion) {
            me.clipRegion.destroy();
            me.clipRegion = null;
        }
        me.createResultDataset = null;
        me.resultDatasetName = null;
        me.resultDatasourceName = null;
        me.returnResultRegion = null;
    }

}

SuperMap.ThiessenAnalystParameters = ThiessenAnalystParameters;