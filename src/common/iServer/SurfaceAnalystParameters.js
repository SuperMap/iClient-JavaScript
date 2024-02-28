/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {DataReturnOption} from './DataReturnOption';
import {SurfaceAnalystMethod} from '../REST';
import {SurfaceAnalystParametersSetting} from './SurfaceAnalystParametersSetting';

/**
 * @class SurfaceAnalystParameters
 * @deprecatedclass SuperMap.SurfaceAnalystParameters
 * @category  iServer SpatialAnalyst SurfaceAnalyst
 * @classdesc 表面分析提取操作参数类。此类存储了表面分析的提取方法和中间结果分辨率等参数。表面分析的提取方法包括：提取等值线、提取等值面。
 * @param {Object} options - 参数。
 * @param {SurfaceAnalystParametersSetting} options.extractParameter - 表面分析参数设置类。
 * @param {number} options.resolution - 指定中间结果（栅格数据集）的分辨率。
 * @param {DataReturnOption} options.resultSetting - 结果返回设置类。
 * @param {SurfaceAnalystMethod} [options.surfaceAnalystMethod=SurfaceAnalystMethod.ISOLINE] - 获取或设置表面分析的提取方法，包括提取等值线和提取等值面。
 * @usage
 */
export class SurfaceAnalystParameters {

    constructor(options) {
        /**
         * @member {number} SurfaceAnalystParameters.prototype.resolution
         * @description 获取或设置中间结果（栅格数据集）的分辨率。
         */
        this.resolution = 0;

        /**
         * @member {SurfaceAnalystParametersSetting} SurfaceAnalystParameters.prototype.extractParameter
         * @description 获取或设置表面分析参数。
         * 在进行点数据集进行提取等值面分析时，暂时不支持 SurfaceAnalystParametersSetting 类中的 expectedZValues 字段。
         */
        this.extractParameter = new SurfaceAnalystParametersSetting();

        /**
         * @member {DataReturnOption} SurfaceAnalystParameters.prototype.resultSetting
         * @description 结果返回设置类。
         */
        this.resultSetting = new DataReturnOption();

        /**
         * @member {SurfaceAnalystMethod} [SurfaceAnalystParameters.prototype.surfaceAnalystMethod=SurfaceAnalystMethod.ISOLINE]
         * @description 获取或设置表面分析的提取方法，包括提取等值线和提取等值面。
         */
        this.surfaceAnalystMethod = SurfaceAnalystMethod.ISOLINE;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.SurfaceAnalystParameters";
    }

    /**
     * @function SurfaceAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.resolution = null;
        if (me.extractParameter) {
            me.extractParameter.destroy();
            me.extractParameter = null;
        }
        if (me.resultSetting) {
            me.resultSetting.destroy();
            me.resultSetting = null;
        }
        me.surfaceAnalystMethod = null;
    }

}
