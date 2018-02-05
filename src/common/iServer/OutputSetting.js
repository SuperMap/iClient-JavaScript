import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DatasourceConnectionInfo} from './DatasourceConnectionInfo';
import {OutputType} from "../REST";

/**
 * @class SuperMap.OutputSetting
 * @category  iServer ProcessingService
 * @classdesc 分布式分析输出类型设置类
 * @param options - {Object} 必填参数。<br>
 *         type -{{@link SuperMap.OutputType}} 输出类型。 <br>
 *         datasetName -{string} 结果数据集名称 <br>
 *         datasourceInfo -{DatasourceConnectionInfo} 数据源连接信息 <br>
 *         outputPath -{string} 分析结果输出路径 <br>
 */
export class OutputSetting {

    constructor(options) {

        /**
         * @member SuperMap.OutputSetting.prototype.type -{SuperMap.OutputType}
         * @description 分布式分析的输出类型，必设字段。
         */
        this.type = OutputType.UDB;

        /**
         * @member SuperMap.OutputSetting.prototype.datasetName -{string}
         * @description 分布式分析的输出结果数据集名称，必设字段。
         */
        this.datasetName = "analystResult";

        /**
         * @member SuperMap.OutputSetting.prototype.datasourceInfo -{SuperMap.DatasourceConnectionInfo}
         * @description 分布式分析的输出结果数据源连接信息。
         */
        this.datasourceInfo = null;

        /**
         * @member SuperMap.OutputSetting.prototype.outputPath -{string}
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