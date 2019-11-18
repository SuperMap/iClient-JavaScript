import { ChartQueryFilterParameter } from '../../../src/common/iServer/ChartQueryFilterParameter';

describe('ChartQueryFilterParameter', () => {
    it('constructor, destroy', () => {
        var options = {
            isQueryPoint: true,
            isQueryLine: true,
            isQueryRegion: true,
            attributeFilter: 'test'
        };
        var parameter = new ChartQueryFilterParameter(options);
        expect(parameter).not.toBeNull();
        expect(parameter.CLASS_NAME).toEqual('SuperMap.ChartQueryFilterParameter');
        expect(parameter.attributeFilter).toEqual('test');
        expect(parameter.isQueryLine).toBeTruthy();
        expect(parameter.isQueryPoint).toBeTruthy();
        expect(parameter.isQueryRegion).toBeTruthy();
        parameter.destroy();
        expect(parameter.isQueryPoint).toBeNull();
        expect(parameter.isQueryLine).toBeNull();
        expect(parameter.isQueryRegion).toBeNull();
        expect(parameter.attributeFilter).toBeNull();
    });

    it('toJson', () => {
        var options = {
            isQueryPoint: true,
            isQueryLine: true,
            isQueryRegion: true,
            attributeFilter: 'test'
        };
        var parameter = new ChartQueryFilterParameter(options);
        var json = parameter.toJson();
        expect(json).not.toBeNull();
        expect(json).toContain('"isQueryPoint":true');
        parameter.destroy();
    });

    it('isQueryPoint', () => {
        var parameter = new ChartQueryFilterParameter({ isQueryPoint: true });
        expect(parameter.isQueryPoint).toBeTruthy();
        parameter.destroy();
    });

    it('isQueryLine', () => {
        var parameter = new ChartQueryFilterParameter({ isQueryLine: true });
        expect(parameter.isQueryLine).toBeTruthy();
        parameter.destroy();
    });

    it('isQueryRegion', () => {
        var parameter = new ChartQueryFilterParameter({ isQueryRegion: true });
        expect(parameter.isQueryRegion).toBeTruthy();
        parameter.destroy();
    });

    it('attributeFilter', () => {
        var parameter = new ChartQueryFilterParameter({ attributeFilter: 'test' });
        expect(parameter.attributeFilter).toEqual('test');
        parameter.destroy();
    });

    it('chartFeatureInfoSpecCode', () => {
        var parameter = new ChartQueryFilterParameter({ chartFeatureInfoSpecCode: 11 });
        expect(parameter.chartFeatureInfoSpecCode).toEqual(11);
        parameter.destroy();
    });
});
