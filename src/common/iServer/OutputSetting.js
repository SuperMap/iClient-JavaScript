/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {DatasourceConnectionInfo} from './DatasourceConnectionInfo';
import {OutputType} from "../REST";

/**
 * @class OutputSetting
 * @deprecatedclass SuperMap.OutputSetting
 * @category  iServer ProcessingService
 * @classdesc 分布式分析输出类型设置类。当输出分布式分析结果到数据库或文件系统时，使用此类进行设置。
 * @param {Object} options - 参数。
 * @param {DatasourceConnectionInfo} options.datasourceInfo - 分析结果数据源连接信息。
 * @param {string} [options.datasetName='analystResult'] - 分析结果数据集名称。
 * @param {OutputType} [options.type=OutputType.UDB] - 分析结果输出类型。
 * @param {string} [options.outputPath] - 分析结果输出路径。
 * @usage
 */
export class OutputSetting {

    constructor(options) {

        /**
         * @member {OutputType} OutputSetting.prototype.type
         * @description 分布式分析的输出类型。
         */
        this.type = OutputType.UDB;

        /**
         * @member {string} [OutputSetting.prototype.datasetName='analystResult']
         * @description 分布式分析的输出结果数据集名称。
         */
        this.datasetName = "analystResult";

        /**
         * @member {DatasourceConnectionInfo} OutputSetting.prototype.datasourceInfo
         * @description 分布式分析的输出结果数据源连接信息。
         */
        this.datasourceInfo = null;

        /**
         * @member {string} [OutputSetting.prototype.outputPath]
         * @description 分布式分析的分析结果输出路径。
         */
        this.outputPath = "";

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.OutputSetting";
    }

    /**
     * @function OutputSetting.prototype.destroy
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
