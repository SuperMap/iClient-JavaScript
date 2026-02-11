/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ChartSetting} from './ChartSetting';


/**
 * @class ChartSettingS101
 * @deprecatedclass SuperMap.ChartSettingS101
 * @category iServer Map Chart
 * @classdesc S101 chart map export parameters.
 * @version 12.1.0
 * @param {Object} options - Parameters.
 * @param {boolean} [options.fourShades=false] - Default false, show depth areas using four colours.
 * @param {boolean} [options.shallowWaterDangers=true] - Default true, show isolated dangers in shallow waters.
 * @param {boolean} [options.plainBoundaries=true] - Default true, line symbol style.
 * @param {boolean} [options.simplifiedSymbols=false] - Default false, point symbol style.
 * @param {boolean} [options.fullLightLines=false] - Default false, show full length light sector lines.
 * @param {boolean} [options.radarOverlay=false] - Default false, should be enabled whenever the RADAR sweep is displayed.
 * @param {boolean} [options.ignoreScamin=false] - Default false, features remain visible regardless of display scale.
 * @param {boolean} [options.s98InteroperableEnable=false] - Set whether to enable S98 interoperability. When s98InteroperableEnable=true, interoperabilityLevel should be set to 1. When s98InteroperableEnable=false, interoperabilityLevel should be set to 0.
 * @param {number} [options.interoperabilityLevel=null] - Interoperability level, supports 0, 1.
 * @param {boolean} [options.wlaEnable=false] - Set whether to enable WLA(Water Level Adjustment), which uses the dataset in the S104 group in the map to correct the water depth display for S102 data.
 * @param {string} [options.wlaDatetime=null] - Set the time for WLA(Water Level Adjustment) display. Time format: yyyymmddThhmmssZ, such as 20240224T000000Z, if the format is not correct, it will not be parsed internally.
 * @param {string} [options.colorScheme=null] - ColorScheme
 * @extends ChartSetting
 */
export class ChartSettingS101 extends ChartSetting {
  
    constructor(options) {
        
        super(options);
        
        /**
         * @member {string} ChartSettingS101.prototype.chartType
         * @description Chart type.
         */
        this.chartType = 'S100';
        
        /**
         * @member {boolean} [ChartSettingS101.prototype.fourShades=false]
         * @description Default false, show depth areas using four colours.
         */
        this.fourShades = false;

        /**
         * @member {boolean} [ChartSettingS101.prototype.shallowWaterDangers=true]
         * @description Default true, show isolated dangers in shallow waters.
         */
        this.shallowWaterDangers = true;

        /**
         * @member {boolean} [ChartSettingS101.prototype.plainBoundaries=true]
         * @description Default true, line symbol style.
         */
        this.plainBoundaries = true;

        /**
         * @member {boolean} [ChartSettingS101.prototype.simplifiedSymbols=false]
         * @description Default false, point symbol style.
         */
        this.simplifiedSymbols = false;

        /**
         * @member {boolean} [ChartSettingS101.prototype.fullLightLines=false]
         * @description Default false, show full length light sector lines.
         */
        this.fullLightLines = false;

        /**
         * @member {boolean} [ChartSettingS101.prototype.radarOverlay=false]
         * @description Default false, should be enabled whenever the RADAR sweep is displayed.
         */
        this.radarOverlay = false;

        /**
         * @member {boolean} [ChartSettingS101.prototype.ignoreScamin=false]
         * @description Default false, features remain visible regardless of display scale.
         */
        this.ignoreScamin = false;
        /**
         * @member {boolean} [ChartSettingS101.prototype.s98InteroperableEnable=false]
         * @description Set whether to enable S98 interoperability. When s98InteroperableEnable=true, interoperabilityLevel should be set to 1. When s98InteroperableEnable=false, interoperabilityLevel should be set to 0.
         */
        this.s98InteroperableEnable = false;

        /**
         * @member {number} [ChartSettingS101.prototype.interoperabilityLevel=null]
         * @description Interoperability level, supports 0, 1.
         */
        this.interoperabilityLevel = null;

        /**
         * @member {boolean} [ChartSettingS101.prototype.wlaEnable=false]
         * @description Set whether to enable WLA(Water Level Adjustment), which uses the dataset in the S104 group in the map to correct the water depth display for S102 data.
         */
        this.wlaEnable = false;

        /**
         * @member {string} [ChartSettingS101.prototype.wlaDatetime=null]
         * @description Set the time for WLA(Water Level Adjustment) display. Time format: yyyymmddThhmmssZ, such as 20240224T000000Z, if the format is not correct, it will not be parsed internally.
         */
        this.wlaDatetime = null;

        /**
         * @member {string} [ChartSettingS101.prototype.colorScheme=null]
         * @description ColorScheme
         */
        this.colorScheme = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ChartSettingS101";
    }


    /**
     * @function ChartSettingS101.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        this.fourShades = null;
        this.shallowWaterDangers = null;
        this.plainBoundaries = null;
        this.simplifiedSymbols = null;
        this.fullLightLines = null;
        this.radarOverlay = null;
        this.ignoreScamin = null;
        this.s98InteroperableEnable = null;
        this.interoperabilityLevel = null;
        this.wlaEnable = null;
        this.wlaDatetime = null;
        this.colorScheme = null;
    }
}
 