import {ChartQueryFilterParameter} from '../../../src/common/iServer/ChartQueryFilterParameter';

describe('ChartQueryFilterParameter', () => {
    it('constructor, destroy', () => {
        var options = {
            isQueryPoint: true,
            isQueryLine: true,
            isQueryRegion: true,
            attributeFilter: "test",
        };
        var parameter = new ChartQueryFilterParameter(options);
        expect(parameter).not.toBeNull();
        expect(parameter.CLASS_NAME).toEqual("SuperMap.ChartQueryFilterParameter");
        expect(parameter.attributeFilter).toEqual("test");
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
            attributeFilter: "test",
        };
        var parameter = new ChartQueryFilterParameter(options);
        var json = parameter.toJson();
        expect(json).not.toBeNull();
        expect(json).toContain("\"isQueryPoint\":true");
        parameter.destroy();
    });
});