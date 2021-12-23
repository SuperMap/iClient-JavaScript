/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {DataReturnOption} from './DataReturnOption';
import {SurfaceAnalystMethod} from '../REST';
import {SurfaceAnalystParametersSetting} from './SurfaceAnalystParametersSetting';

/**
 * @class SuperMap.SurfaceAnalystParameters
 * @category  iServer SpatialAnalyst SurfaceAnalyst
 * @classdesc 表面分析提取操作参数类。
 * @description 通过该类可以为进行表面分析提供参数信息，包括表面分析的方法提取等值线、提取等值面和中间结果的分辨率，
 * {@link SuperMap.DatasetSurfaceAnalystParameters} 和 {@link SuperMap.GeometrySurfaceAnalystParameters} 继承自该类。
 * @param {Object} options - 参数。
 * @param {SuperMap.SurfaceAnalystParametersSetting} options.extractParameter - 获取或设置表面分析参数。
 * @param {number} options.resolution - 指定中间结果（栅格数据集）的分辨率。
 * @param {SuperMap.DataReturnOption} options.resultSetting - 结果返回设置类。
 * @param {SuperMap.SurfaceAnalystMethod} [options.surfaceAnalystMethod=SuperMap.SurfaceAnalystMethod.ISOLINE] - 获取或设置表面分析的提取方法，提取等值线和提取等值面。
 */
export class SurfaceAnalystParameters {

    constructor(options) {
        /**
         * @member {number} SuperMap.SurfaceAnalystParameters.prototype.resolution
         * @description 获取或设置指定中间结果（栅格数据集）的分辨率。
         */
        this.resolution = 0;

        /**
         * @member {SuperMap.SurfaceAnalystParametersSetting} SuperMap.SurfaceAnalystParameters.prototype.extractParameter
         * @description 获取或设置表面分析参数。
         * 在进行点数据集进行提取等值面分析时，暂时不支持 SurfaceAnalystParametersSetting 类中的 expectedZValues 字段。
         */
        this.extractParameter = new SurfaceAnalystParametersSetting();

        /**
         * @member {SuperMap.DataReturnOption} SuperMap.SurfaceAnalystParameters.prototype.resultSetting
         * @description 结果返回设置类。
         */
        this.resultSetting = new DataReturnOption();

        /**
         * @member {SuperMap.SurfaceAnalystMethod} [SuperMap.SurfaceAnalystParameters.prototype.surfaceAnalystMethod=SuperMap.SurfaceAnalystMethod.ISOLINE]
         * @description 获取或设置表面分析的提取方法，提取等值线和提取等值面。
         */
        this.surfaceAnalystMethod = SurfaceAnalystMethod.ISOLINE;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.SurfaceAnalystParameters";
    }

    /**
     * @function SuperMap.SurfaceAnalystParameters.prototype.destroy
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

SuperMap.SurfaceAnalystParameters = SurfaceAnalystParameters;