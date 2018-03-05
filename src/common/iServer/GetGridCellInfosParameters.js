import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.GetGridCellInfosParameters
 * @category  iServer Data Grid
 * @classdesc 数据服务栅格查询参数类。
 * @param options - {Object} 可选参数。如:</br>
 *        datasetName - {string} 数据集名称。</br>
 *        dataSourceName - {string} 数据源名称</br>
 *        X - {integer} 要查询的地理位置X轴。</br>
 *        Y - {integer} 要查询的地理位置Y轴。
 */
export class GetGridCellInfosParameters {


    constructor(options) {
        /**
         * @member SuperMap.GetGridCellInfosParameters.prototype.datasetName - {string}
         * @description 数据集名称。
         */
        this.datasetName = null;

        /**
         * @member SuperMap.GetGridCellInfosParameters.prototype.dataSourceName - {string}
         * @description  数据源名称。
         */
        this.dataSourceName = null;

        /**
         * @member SuperMap.GetGridCellInfosParameters.prototype.X - {integer}
         * @description 要查询的地理位置X轴。
         */
        this.X = null;

        /**
         * @member SuperMap.GetGridCellInfosParameters.prototype.Y - {integer}
         * @description 要查询的地理位置Y轴。
         */
        this.Y = null;
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.GetGridCellInfosParameters";
    }


    /**
     * @function SuperMap.GetGridCellInfosParameters.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy() {
        var me = this;
        me.datasetName = null;
        me.dataSourceName = null;
        me.X = null;
        me.Y = null;
    }


}

SuperMap.GetGridCellInfosParameters = GetGridCellInfosParameters;
