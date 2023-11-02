/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {Util} from '../commontypes/Util';
 import {Unit, DisplayModeChart, ColourModeChart } from '../REST';

 
 /**
  * @class ChartSetting
  * @deprecatedclass SuperMap.ChartSetting
  * @category iServer Map Chart
  * @classdesc 海图显示参数设置类，用于管理海图显示环境，包括海图的显示模式、显示类型名称、颜色模式、安全水深线等各种显示风格。
  * @version 11.2.0
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
  * @param {object} [options.chartAcronymClassify] - 物标分组是否可显示的对应关系。
  * @usage
  */
 export class ChartSetting {
 
     constructor(options) {
         /**
          * @member {DisplayModeChart} [options.displayModeChart]
          * @description 海图显示模式。
          */
         this.displayModeChart = DisplayModeChart.STANDARD;

         /**
          * @member {ColourModeChart} [options.colourModeChart]
          * @description 海图显示的颜色模式。
          */
         this.colourModeChart = ColourModeChart.DAY_BRIGHT;

         /**
          * @member {string} [options.displayTypeName]
          * @description 海图显示类型的名称，如 "S52"、"IENC"、"INT"。
          */
         this.displayTypeName = "S52";

         /**
          * @member {string} [options.fontName]
          * @description 海图上显示文本的字体名称。
          */
         this.fontName = "Arial";

         /**
          * @member {boolean} [options.simplifiedMarker]
          * @description 是否使用简单海图符号。
          */
         this.simplifiedMarker = true;

         /**
          * @member {boolean} [options.symbolizedAreaBoundary]
          * @description 是否使用简单海图符号。
          */
         this.symbolizedAreaBoundary = false;

         /**
          * @member {boolean} [options.displayTextMessage]
          * @description 是否在海图上显示文本信息。
          */
         this.displayTextMessage = false;

         /**
          * @member {boolean} [options.displaySounding]
          * @description 是否显示水深点。
          */
         this.displaySounding = false;

         /**
          * @member {boolean} [options.minVisibleScaleEnabled]
          * @description 物标的最小可见比例尺是否有效。
          */
         this.minVisibleScaleEnabled = true;

         /**
          * @member {boolean} [options.localizationDisplayText]
          * @description 是否对文本进行本地化显示。
          */
         this.localizationDisplayText = false;

         /**
          * @member {boolean} [options.displayMetaObject]
          * @description 是否显示元物标。
          */
         this.displayMetaObject = false;

         /**
          * @member {boolean} [options.displayCellName]
          * @description 是否显图幅编号。
          */
         this.displayCellName = false;

         /**
          * @member {boolean} [options.displaySafetyContourLabel]
          * @description 是否显示安全等深线标注。
          */
         this.displaySafetyContourLabel = false;

         /**
          * @member {boolean} [options.displayBorder]
          * @description 是否显示图幅边框
          */
         this.displayBorder = false;

         /**
          * @member {number} [options.safetyContour]
          * @description 安全等深线。
          */
         this.safetyContour = 30.0;

         /**
          * @member {number} [options.shallowContour]
          * @description 浅水等深线。
          */
         this.shallowContour = 2.0;

         /**
          * @member {number} [options.deepContour]
          * @description 深水等深线。
          */
         this.deepContour = 30.0;

         /**
          * @member {number} [options.safetyDepth]
          * @description 安全水深值
          */
         this.safetyDepth = 30.0;

         /**
          * @member {boolean} [options.displayOtherContourLabel]
          * @description 是否显示其他等深线标注，即安全水深线标注以外的标注。
          */
         this.displayOtherContourLabel = false;

         /**
          * @member {boolean} [options.displayTwoShades]
          * @description 是否以两色模式显示水深面。
          */
         this.displayTwoShades = false;

         /**
          * @member {Unit} [options.depthUnit]
          * @description 显示水深单位。
          */
         this.depthUnit = Unit.METER;

         /**
          * @member {number} [options.fontSize]
          * @description 图上文本显示字体的字号。
          */
         this.fontSize = 10.0;

         /**
          * @member {object} [options.displayableFeature]
          * @description 当前地图下所有物标类型是否可显示的对应关系。
          */
         this.displayableFeature = null;

         /**
          * @member {object} [options.selectableFeature]
          * @description 当前地图下所有物标类型是否可选择的对应关系。
          */
         this.selectableFeature = null;

         /**
          * @member {boolean} [options.textClipRegionEnabled]
          * @description 是否启用海图图层的文本显示裁剪区。
          */
         this.textClipRegionEnabled = false;

         /**
          * @member {boolean} [options.displayLowAccurateMarker=true]
          * @description 是否显示低精度符号。
          */
         this.displayLowAccurateMarker = true;

         /**
          * @member {boolean} [options.displayScaleFactor]
          * @description 比例尺缩放。
          */
         this.displayScaleFactor = 0.05;

         /**
          * @member {object} [options.chartAcronymClassify]
          * @description 物标分组是否可显示的对应关系。
          */
         this.chartAcronymClassify = null;
 
         if (options) {
             Util.extend(this, options);
         }
         this.CLASS_NAME = "SuperMap.ChartSetting";
     }
 
 
     /**
      * @function ChartSetting.prototype.destroy
      * @description 释放资源，将引用资源的属性置空。
      */
     destroy() {
      this.displayModeChart = null;
      this.colourModeChart = null;
      this.displayTypeName = null;
      this.fontName = null;
      this.simplifiedMarker = null;
      this.symbolizedAreaBoundary = null;
      this.displayTextMessage = null;
      this.displaySounding = null;
      this.minVisibleScaleEnabled = null;
      this.localizationDisplayText = null;
      this.displayMetaObject = null;
      this.displayCellName = null;
      this.displaySafetyContourLabel = null;
      this.displayBorder = null;
      this.safetyContour = null;
      this.shallowContour = null;
      this.deepContour = null;
      this.safetyDepth = null;
      this.displayOtherContourLabel = null;
      this.displayTwoShades = null;
      this.depthUnit = null;
      this.fontSize = null;
      this.displayableFeature = null;
      this.selectableFeature = null;
      this.textClipRegionEnabled = null;
      this.displayLowAccurateMarker = null;
      this.displayScaleFactor = null;
      this.chartAcronymClassify = null;
     }
 }
 