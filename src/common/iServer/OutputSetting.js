import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DatasourceConnectionInfo} from './DatasourceConnectionInfo';
import {OutputType} from "../REST";

/**
 * @class SuperMap.OutputSetting
 * @category  iServer ProcessingService
 * @classdesc 分布式分析输出类型设置类
 * @param {Object} options - 参数。<br>
 * @param {SuperMap.OutputType} options.type - 输出类型。<br>
 * @param {string} options.datasetName - 结果数据集名称。<br>
 * @param {SuperMap.DatasourceConnectionInfo} options.datasourceInfo - 数据源连接信息。<br>
 * @param {string} options.outputPath - 分析结果输出路径 <br>
 */
export class OutputSetting {

    constructor(options) {

        /**
         * @member {SuperMap.OutputType} SuperMap.OutputSetting.prototype.type
         * @description 分布式分析的输出类型，必设字段。
         */
        this.type = OutputType.UDB;

        /**
         * @member {string} SuperMap.OutputSetting.prototype.datasetName
         * @description 分布式分析的输出结果数据集名称，必设字段。
         */
        this.datasetName = "analystResult";

        /**
         * @member {SuperMap.DatasourceConnectionInfo} SuperMap.OutputSetting.prototype.datasourceInfo
         * @description 分布式分析的输出结果数据源连接信息。
         */
        this.datasourceInfo = null;

        /**
         * @member {string} SuperMap.OutputSetting.prototype.outputPath
         * @description 分布式分析的分析结果输出路径。
         */
        this.outputPath = "";

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.OutputSetting";
    }

    /**
     * @function SuperMap.OutputSetting.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.type = null;
        me.datasetName = null;
        me.outputPath = null;
        if (me.datasourceInfo instanceof DatasourceConnectionInfo) {
            me.datasourceInfo.destroy();
            me.datasourceInfo = null;
        }
    }

}

SuperMap.OutputSetting = OutputSetting;