/* Copyright© 2000 - 2025 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ChartSetting} from './ChartSetting';
import {Unit, DisplayModeChart, ColourModeChart } from '../REST';

/**
 * @class ChartSettingS57
 * @deprecatedclass SuperMap.ChartSettingS57
 * @category iServer Map Chart
 * @classdesc S57海图显示参数设置类，继承自ChartSetting类。
 * @version 12.1.0
 * @param {Object} options - 参数。
 * @param {DisplayModeChart} [options.displayModeChart=DisplayModeChart.STANDARD] - 海图显示模式。
 * @param {ColourModeChart} [options.colourModeChart=ColourModeChart.DAY_BRIGHT] - 海图显示的颜色模式。
 * @param {string} [options.displayTypeName="S52"] - 海图显示类型的名称，如 "S52"、"IENC"、"INT"。
 * @param {string} [options.fontName="Arial"] - 海图上显示文本的字体名称。
 * @param {boolean} [options.simplifiedMarker=true] - 是否使用简单海图符号。
 * @param {boolean} [options.symbolizedAreaBoundary=false] - 是否使用符号化的区域边界。
 * @param {boolean} [options.displayTextMessage=false] - 是否在海图上显示文本信息。
 * @param {boolean} [options.displaySounding=false] - 是否显示水深点。
 * @param {boolean} [options.minVisibleScaleEnabled=true] - 物标的最小可见比例尺是否有效。
 * @param {boolean} [options.localizationDisplayText=false] - 是否对文本进行本地化显示。
 * @param {boolean} [options.displayMetaObject=false] - 是否显示元物标。
 * @param {boolean} [options.displayCellName=false] - 是否显示图幅编号。
 * @param {boolean} [options.displaySafetyContourLabel=true] - 是否显示安全等深线标注。
 * @param {boolean} [options.displayBorder=false] - 是否显示图幅边框。
 * @param {number} [options.safetyContour=30.0] - 安全等深线。单位以 depthUnit 设置的水深单位为准。
 * @param {number} [options.shallowContour=2.0] - 浅水等深线。单位以 depthUnit 设置的水深单位为准。
 * @param {number} [options.deepContour=30.0] - 深水等深线。单位以 depthUnit 设置的水深单位为准。
 * @param {number} [options.safetyDepth=30.0] - 安全水深值。单位以 depthUnit 设置的水深单位为准。
 * @param {boolean} [options.displayOtherContourLabel=false] - 是否显示其他等深线标注，即安全水深线标注以外的标注。
 * @param {boolean} [options.displayTwoShades=false] - 是否以两色模式显示水深面。
 * @param {Unit} [options.depthUnit=Unit.METER] - 显示水深单位。目前仅支持DECIMETER、METER、FOOT。
 * @param {number} [options.fontSize=10.0] - 图上文本显示字体的字号。
 * @param {object} [options.displayableFeature] - 当前地图下所有物标类型是否可显示的对应关系。
 * @param {object} [options.selectableFeature] - 当前地图下所有物标类型是否可选择的对应关系。
 * @param {boolean} [options.textClipRegionEnabled=false] - 是否启用海图图层的文本显示裁剪区。
 * @param {boolean} [options.displayLowAccurateMarker=true] - 是否显示低精度符号。
 * @param {number} [options.displayScaleFactor] - 比例尺缩放。
 * @param {object} [options.displayableAcronymClassify] - 物标分组是否可显示的对应关系。
 * @extends ChartSetting
 */
export class ChartSettingS57 extends ChartSetting {
    constructor(options) {
        super(options);
        
        this.chartType = 'S57';
        /**
         * @member {string} [ChartSettingS57.prototype.colourModeChart=ColourModeChart.DAY_BRIGHT]
         * @description 颜色模式，可选值：DAY_BRIGHT(白昼),DUSK(晨昏),NIGHT(夜晚)。
         */
        this.colourModeChart = ColourModeChart.DAY_BRIGHT;

        /**
         * @member {string} [ChartSettingS57.prototype.depthUnit=Unit.METER]
         * @description 水深单位，参考Unit类。
         */
        this.depthUnit = Unit.METER;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displayCellName=false]
         * @description 是否显示图幅编号。
         */
        this.displayCellName = false;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displayLowAccurateMarker=true]
         * @description 是否显示低精度编号。
         */
        this.displayLowAccurateMarker = true;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displayMetaObject=false]
         * @description 是否显示元物标。
         */
        this.displayMetaObject = false;

        /**
         * @member {string} [ChartSettingS57.prototype.displayModeChart=DisplayModeChart.STANDARD]
         * @description 海图显示模式，可选值：BASIC(基本显示模式),OTHER(其他显示模式),STANDARD(标准显示模式)。
         */
        this.displayModeChart = DisplayModeChart.STANDARD;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displayOtherContourLabel=false]
         * @description 是否显示其他等深线标注，即安全水深线标注以外的标注。
         */
        this.displayOtherContourLabel = false;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displaySafetyContourLabel=true]
         * @description 是否显示安全水深线标注。
         */
        this.displaySafetyContourLabel = true;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displaySounding=false]
         * @description 是否显示水深点。
         */
        this.displaySounding = false;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displayTextMessage=false]
         * @description 是否在海图上显示文本信息。
         */
        this.displayTextMessage = false;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displayTwoShades=false]
         * @description 是否以两色模式显示水深面。
         */
        this.displayTwoShades = false;

        /**
         * @member {string} [ChartSettingS57.prototype.displayTypeName="S52"]
         * @description 海图显示类型名称，如"S52","IENC","INT"。
         */
        this.displayTypeName = "S52";

        /**
         * @member {string} [ChartSettingS57.prototype.fontName="Arial"]
         * @description 海图上显示文本的字体名称。
         */
        this.fontName = "Arial";

        /**
         * @member {number} [ChartSettingS57.prototype.fontSize=10.0]
         * @description 海图上显示文本的字体字号。
         */
        this.fontSize = 10.0;

        /**
         * @member {boolean} [ChartSettingS57.prototype.localizationDisplayText=false]
         * @description 是否对文本进行本地化显示。
         */
        this.localizationDisplayText = false;

        /**
         * @member {boolean} [ChartSettingS57.prototype.minVisibleScaleEnabled=true]
         * @description 物标最先可见比例尺是否有效。
         */
        this.minVisibleScaleEnabled = true;

        /**
         * @member {boolean} [ChartSettingS57.prototype.simplifiedMarker=true]
         * @description 是否使用简单海图符号。
         */
        this.simplifiedMarker = true;

        /**
         * @member {boolean} [ChartSettingS57.prototype.symbolizedAreaBoundary=false]
         * @description 是否使用符号化的区域边界。
         */
        this.symbolizedAreaBoundary = false;

        /**
         * @member {boolean} [ChartSettingS57.prototype.textClipRegionEnabled=false]
         * @description 是否启用海图图层的文本显示裁剪区。
         */
        this.textClipRegionEnabled = false;

        /**
         * @member {object} [ChartSettingS57.prototype.displayableFeature=null]
         * @description 物标类型是否可显示的对应关系。
         */
        this.displayableFeature = null;

        /**
         * @member {object} [ChartSettingS57.prototype.selectableFeature=null]
         * @description 物标类型是否可选择的对应关系。
         */
        this.selectableFeature = null;

        /**
         * @member {boolean} [ChartSettingS57.prototype.displayBorder=false]
         * @description 是否显示边框。
         */
        this.displayBorder = false;

        /**
          * @member {boolean} [options.displayScaleFactor]
          * @description 比例尺缩放。
          */
         this.displayScaleFactor = 0.05;

        /**
         * @member {object} [ChartSettingS57.prototype.displayableAcronymClassify=null]
         * @description 物标分组是否可显示的对应关系。
         */
        this.displayableAcronymClassify = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ChartSettingS57";
    }


    /**
     * @function ChartSettingS57.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        this.colourModeChart = null;
        this.depthUnit = null;
        this.displayCellName = null;
        this.displayLowAccurateMarker = null;
        this.displayMetaObject = null;
        this.displayModeChart = null;
        this.displayOtherContourLabel = null;
        this.displaySafetyContourLabel = null;
        this.displaySounding = null;
        this.displayTextMessage = null;
        this.displayTwoShades = null;
        this.displayTypeName = null;
        this.fontName = null;
        this.fontSize = null;
        this.localizationDisplayText = null;
        this.minVisibleScaleEnabled = null;
        this.simplifiedMarker = null;
        this.symbolizedAreaBoundary = null;
        this.textClipRegionEnabled = null;
        this.displayableFeature = null;
        this.selectableFeature = null;
        this.displayBorder = null;
        this.displayScaleFactor = null;
        this.displayableAcronymClassify = null;
    }
}
 