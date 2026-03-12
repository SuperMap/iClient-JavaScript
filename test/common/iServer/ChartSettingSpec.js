﻿import {ChartSettingS57} from '../../../src/common/iServer/ChartSettingS57';
import {ChartSettingS100} from '../../../src/common/iServer/ChartSettingS100';
import {Unit, DisplayModeChart, ColourModeChart} from '../../../src/common/REST';

describe('ChartSetting', () => {
    it('chartSettingS57', () => {
        var optionS57 = {
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
        var chartSetting57 = new ChartSettingS57(optionS57);
        expect(chartSetting57.displayModeChart).toEqual(DisplayModeChart.STANDARD);
        expect(chartSetting57.colourModeChart).toEqual(ColourModeChart.DAY_BRIGHT);
        expect(chartSetting57.displayTypeName).toEqual("S52");
        expect(chartSetting57.fontName).toEqual("Arial");
        expect(chartSetting57.simplifiedMarker).toEqual(true);
        expect(chartSetting57.symbolizedAreaBoundary).toEqual(false);
        expect(chartSetting57.displayTextMessage).toEqual(false);
        expect(chartSetting57.displaySounding).toEqual(false);
        expect(chartSetting57.minVisibleScaleEnabled).toEqual(true);
        expect(chartSetting57.localizationDisplayText).toEqual(false);
        expect(chartSetting57.displayMetaObject).toEqual(false);
        expect(chartSetting57.displayCellName).toEqual(false);
        expect(chartSetting57.displaySafetyContourLabel).toEqual(true);
        expect(chartSetting57.displayBorder).toEqual(false);
        expect(chartSetting57.safetyContour).toEqual(30);
        expect(chartSetting57.shallowContour).toEqual(2);
        expect(chartSetting57.deepContour).toEqual(30);
        expect(chartSetting57.safetyDepth).toEqual(30);
        expect(chartSetting57.displayOtherContourLabel).toEqual(false);
        expect(chartSetting57.displayTwoShades).toEqual(false);
        expect(chartSetting57.depthUnit).toEqual(Unit.METER);
        expect(chartSetting57.fontSize).toEqual(10);
        expect(chartSetting57.displayableFeature).not.toBeNull()
        expect(chartSetting57.selectableFeature).not.toBeNull();
        expect(chartSetting57.textClipRegionEnabled).toEqual(false);
        expect(chartSetting57.displayLowAccurateMarker).toEqual(true);
        expect(chartSetting57.displayScaleFactor).toEqual(1);
        expect(chartSetting57.displayableAcronymClassify).not.toBeNull();
        chartSetting57.destroy();
        expect(chartSetting57.displayModeChart).toBeNull();
        expect(chartSetting57.colourModeChart).toBeNull();
        expect(chartSetting57.displayTypeName).toBeNull();
        expect(chartSetting57.fontName).toBeNull();
        expect(chartSetting57.simplifiedMarker).toBeNull();
        expect(chartSetting57.symbolizedAreaBoundary).toBeNull();
        expect(chartSetting57.displayTextMessage).toBeNull();
        expect(chartSetting57.displaySounding).toBeNull();
        expect(chartSetting57.minVisibleScaleEnabled).toBeNull();
        expect(chartSetting57.localizationDisplayText).toBeNull();
        expect(chartSetting57.displayMetaObject).toBeNull();
        expect(chartSetting57.displayCellName).toBeNull();
        expect(chartSetting57.displaySafetyContourLabel).toBeNull();
        expect(chartSetting57.displayBorder).toBeNull();
        expect(chartSetting57.safetyContour).toBeNull();
        expect(chartSetting57.shallowContour).toBeNull();
        expect(chartSetting57.deepContour).toBeNull();
        expect(chartSetting57.safetyDepth).toBeNull();
        expect(chartSetting57.displayOtherContourLabel).toBeNull();
        expect(chartSetting57.displayTwoShades).toBeNull();
        expect(chartSetting57.depthUnit).toBeNull();
        expect(chartSetting57.fontSize).toBeNull();
        expect(chartSetting57.displayableFeature).toBeNull();
        expect(chartSetting57.selectableFeature).toBeNull();
        expect(chartSetting57.textClipRegionEnabled).toBeNull();
        expect(chartSetting57.displayLowAccurateMarker).toBeNull();
        expect(chartSetting57.displayScaleFactor).toBeNull();
        expect(chartSetting57.displayableAcronymClassify).toBeNull();
    });
    it('chartSettingS100', () => {
        var optionS101 = {
          contextParameters:{
            S101: {
              safetyContour: 30,
              shallowContour: 2,
              deepContour: 30,
              safetyDepth: 30,
              fourShades: true,
              shallowWaterDangers: false,
              plainBoundaries: false,
              simplifiedSymbols: true,
              fullLightLines: true,
              radarOverlay: true,
              ignoreScamin: true,
              colorScheme: 'DAY'
            }
          },
          s98InteroperableEnable: true,
          interoperabilityLevel: 1,
          wlaEnable: true,
          wlaDatetime: '20240224T000000Z',
        }
        var chartSetting101 = new ChartSettingS100(optionS101);
        expect(chartSetting101.chartType).toEqual('S100');
        expect(chartSetting101.contextParameters.S101.safetyContour).toEqual(30);
        expect(chartSetting101.contextParameters.S101.shallowContour).toEqual(2);
        expect(chartSetting101.contextParameters.S101.deepContour).toEqual(30);
        expect(chartSetting101.contextParameters.S101.safetyDepth).toEqual(30);
        expect(chartSetting101.contextParameters.S101.fourShades).toEqual(true);
        expect(chartSetting101.contextParameters.S101.shallowWaterDangers).toEqual(false);
        expect(chartSetting101.contextParameters.S101.plainBoundaries).toEqual(false);
        expect(chartSetting101.contextParameters.S101.simplifiedSymbols).toEqual(true);
        expect(chartSetting101.contextParameters.S101.fullLightLines).toEqual(true);
        expect(chartSetting101.contextParameters.S101.radarOverlay).toEqual(true);
        expect(chartSetting101.contextParameters.S101.ignoreScamin).toEqual(true);
        expect(chartSetting101.contextParameters.S101.colorScheme).toEqual('DAY');
        expect(chartSetting101.s98InteroperableEnable).toEqual(true);
        expect(chartSetting101.interoperabilityLevel).toEqual(1);
        expect(chartSetting101.wlaEnable).toEqual(true);
        expect(chartSetting101.wlaDatetime).toEqual('20240224T000000Z');
        chartSetting101.destroy();
        expect(chartSetting101.contextParameters).toBeNull();
       
        expect(chartSetting101.s98InteroperableEnable).toBeNull();
        expect(chartSetting101.interoperabilityLevel).toBeNull();
        expect(chartSetting101.wlaEnable).toBeNull();
        expect(chartSetting101.wlaDatetime).toBeNull();
    });
});