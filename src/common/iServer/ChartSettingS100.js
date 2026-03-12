/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ChartSetting} from './ChartSetting';


/**
 * @class ChartSettingS100
 * @deprecatedclass SuperMap.ChartSettingS100
 * @category iServer Map Chart
 * @classdesc S101 chart map export parameters.
 * @version 12.1.0
 * @param {Object} options - Parameters.
 * @param {Object} [options.contextParameters=null] - 设置海图S100标准的图示目录参数值;格式：{S101:{k1:v1},{S102:{k1:v1}}}
 * @param {boolean} [options.s98InteroperableEnable=false] - 设置是否开启S98互操作。s98InteroperableEnable=true时，interoperabilityLevel需设置为1。s98InteroperableEnable=false时，interoperabilityLevel需设置为0.
 * @param {number} [options.interoperabilityLevel=null] - 互操作级别，支持0，1。
 * @param {boolean} [options.wlaEnable=false] - 设置是否开启WLA(Water Level Adjustment)，既使用地图中的S104分组中的数据集设置给S102数据更正水深显示。
 * @param {string} [options.wlaDatetime=null] - 设置WLA(Water Level Adjustment)显示的时刻。时间格式为：yyyymmddThhmmssZ, 如20240224T000000Z，如果不符合格式则内部不解析。
 * @extends ChartSetting
 */
export class ChartSettingS100 extends ChartSetting {
  
    constructor(options) {
        
        super(options);
        
        /**
         * @member {string} ChartSettingS100.prototype.chartType
         * @description Chart type.
         */
        this.chartType = 'S100';

        /**
         * @member {Object} ChartSettingS100.prototype.contextParameters
         * @description 设置海图S100标准的图示目录参数值;格式：{S101:{k1:v1},{S102:{k1:v1}}}
         */
        this.contextParameters = null;
        
        /**
         * @member {boolean} [ChartSettingS100.prototype.s98InteroperableEnable=false]
         * @description 设置是否开启S98互操作。s98InteroperableEnable=true时，interoperabilityLevel需设置为1。s98InteroperableEnable=false时，interoperabilityLevel需设置为0.
         */
        this.s98InteroperableEnable = false;

        /**
         * @member {number} [ChartSettingS100.prototype.interoperabilityLevel=null]
         * @description 互操作级别，支持0，1。
         */
        this.interoperabilityLevel = null;

        /**
         * @member {boolean} [ChartSettingS100.prototype.wlaEnable=false]
         * @description 设置是否开启WLA(Water Level Adjustment)，既使用地图中的S104分组中的数据集设置给S102数据更正水深显示。
         */
        this.wlaEnable = false;

        /**
         * @member {string} [ChartSettingS100.prototype.wlaDatetime=null]
         * @description 设置WLA(Water Level Adjustment)显示的时刻。时间格式为：yyyymmddThhmmssZ, 如20240224T000000Z，如果不符合格式则内部不解析。
         */
        this.wlaDatetime = null;


        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ChartSettingS100";
    }


    /**
     * @function ChartSettingS100.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        this.contextParameters = null;
        this.s98InteroperableEnable = null;
        this.interoperabilityLevel = null;
        this.wlaEnable = null;
        this.wlaDatetime = null;
    }
}
 