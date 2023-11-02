﻿import {ChartSetting} from '../../../src/common/iServer/ChartSetting';
import {DisplayModeChart, ColourModeChart} from '../../../src/common/REST';

describe('ChartSetting', () => {
    it('constructor_default', () => {
        var chartSetting = new ChartSetting();
        expect(chartSetting.displayModeChart).toEqual(DisplayModeChart.STANDARD);
        expect(chartSetting.colourModeChart).toEqual(ColourModeChart.DAY_BRIGHT);
        chartSetting.destroy();
        expect(chartSetting.displayModeChart).toBeNull();
        expect(chartSetting.colourModeChart).toBeNull();
    });
});