﻿import {ChartSetting} from '../../../src/common/iServer/ChartSetting';
import {Unit, DisplayModeChart, ColourModeChart} from '../../../src/common/REST';

describe('ChartSetting', () => {
    it('constructor_default', () => {
        var option = {
          displayModeChart: DisplayModeChart.STANDARD,
          colourModeChart: ColourModeChart.DAY_BRIGHT,
          displayTypeName: "S52",
          fontName: "Arial",
          simplifiedMarker: true,
          symbolizedAreaBoundary: false,
          displayTextMessage: false,
          displaySounding: false,
          minVisibleScaleEnabled: true,
          localizationDisplayText: false,
          displayMetaObject: false,
          displayCellName: false,
          displaySafetyContourLabel: true,
          displayBorder: false,
          safetyContour: 30,
          shallowContour: 2,
          deepContour: 30,
          safetyDepth: 30,
          displayOtherContourLabel: false,
          displayTwoShades: false,
          depthUnit: Unit.METER,
          fontSize: 10,
          displayableFeature: {},
          selectableFeature: {},
          textClipRegionEnabled: false,
          displayLowAccurateMarker: true,
          displayScaleFactor: 1,
          displayableAcronymClassify: {}
        }
        var chartSetting = new ChartSetting(option);
        expect(chartSetting.displayModeChart).toEqual(DisplayModeChart.STANDARD);
        expect(chartSetting.colourModeChart).toEqual(ColourModeChart.DAY_BRIGHT);
        expect(chartSetting.displayTypeName).toEqual("S52");
        expect(chartSetting.fontName).toEqual("Arial");
        expect(chartSetting.simplifiedMarker).toEqual(true);
        expect(chartSetting.symbolizedAreaBoundary).toEqual(false);
        expect(chartSetting.displayTextMessage).toEqual(false);
        expect(chartSetting.displaySounding).toEqual(false);
        expect(chartSetting.minVisibleScaleEnabled).toEqual(true);
        expect(chartSetting.localizationDisplayText).toEqual(false);
        expect(chartSetting.displayMetaObject).toEqual(false);
        expect(chartSetting.displayCellName).toEqual(false);
        expect(chartSetting.displaySafetyContourLabel).toEqual(true);
        expect(chartSetting.displayBorder).toEqual(false);
        expect(chartSetting.safetyContour).toEqual(30);
        expect(chartSetting.shallowContour).toEqual(2);
        expect(chartSetting.deepContour).toEqual(30);
        expect(chartSetting.safetyDepth).toEqual(30);
        expect(chartSetting.displayOtherContourLabel).toEqual(false);
        expect(chartSetting.displayTwoShades).toEqual(false);
        expect(chartSetting.depthUnit).toEqual(Unit.METER);
        expect(chartSetting.fontSize).toEqual(10);
        expect(chartSetting.displayableFeature).not.toBeNull()
        expect(chartSetting.selectableFeature).not.toBeNull();
        expect(chartSetting.textClipRegionEnabled).toEqual(false);
        expect(chartSetting.displayLowAccurateMarker).toEqual(true);
        expect(chartSetting.displayScaleFactor).toEqual(1);
        expect(chartSetting.displayableAcronymClassify).not.toBeNull();
        chartSetting.destroy();
        expect(chartSetting.displayModeChart).toBeNull();
        expect(chartSetting.colourModeChart).toBeNull();
        expect(chartSetting.displayTypeName).toBeNull();
        expect(chartSetting.fontName).toBeNull();
        expect(chartSetting.simplifiedMarker).toBeNull();
        expect(chartSetting.symbolizedAreaBoundary).toBeNull();
        expect(chartSetting.displayTextMessage).toBeNull();
        expect(chartSetting.displaySounding).toBeNull();
        expect(chartSetting.minVisibleScaleEnabled).toBeNull();
        expect(chartSetting.localizationDisplayText).toBeNull();
        expect(chartSetting.displayMetaObject).toBeNull();
        expect(chartSetting.displayCellName).toBeNull();
        expect(chartSetting.displaySafetyContourLabel).toBeNull();
        expect(chartSetting.displayBorder).toBeNull();
        expect(chartSetting.safetyContour).toBeNull();
        expect(chartSetting.shallowContour).toBeNull();
        expect(chartSetting.deepContour).toBeNull();
        expect(chartSetting.safetyDepth).toBeNull();
        expect(chartSetting.displayOtherContourLabel).toBeNull();
        expect(chartSetting.displayTwoShades).toBeNull();
        expect(chartSetting.depthUnit).toBeNull();
        expect(chartSetting.fontSize).toBeNull();
        expect(chartSetting.displayableFeature).toBeNull();
        expect(chartSetting.selectableFeature).toBeNull();
        expect(chartSetting.textClipRegionEnabled).toBeNull();
        expect(chartSetting.displayLowAccurateMarker).toBeNull();
        expect(chartSetting.displayScaleFactor).toBeNull();
        expect(chartSetting.displayableAcronymClassify).toBeNull();
    });
});