import {ChartQueryParameters} from '../../../src/common/iServer/ChartQueryParameters';
import {ChartQueryFilterParameter} from '../../../src/common/iServer/ChartQueryFilterParameter';
import {Bounds} from '../../../src/common/commontypes/Bounds';

describe('ChartQueryParameters', () => {
    it('constructor, destroy', () => {
        var options = {
            queryMode: "ChartAttributeQuery",
            bounds: new Bounds(-180, -90, 180, 90),
        };
        var parameter = new ChartQueryParameters(options);
        expect(parameter).not.toBeNull();
        expect(parameter.CLASS_NAME).toEqual("SuperMap.ChartQueryParameters");
        expect(parameter.bounds.bottom).toEqual(-90);
        expect(parameter.bounds.left).toEqual(-180);
        expect(parameter.bounds.right).toEqual(180);
        expect(parameter.bounds.top).toEqual(90);
        expect(parameter.queryMode).toEqual("ChartAttributeQuery");
        expect(parameter.returnContent).toBeTruthy();
        expect(parameter.startRecord).toEqual(0);
        parameter.destroy();
        expect(parameter.queryMode).toBeNull();
        expect(parameter.bounds).toBeNull();
        expect(parameter.chartQueryFilterParameters).toBeNull();
        expect(parameter.returnContent).toBeTruthy();
        expect(parameter.expectCount).toBeNull();
    });

    it('getVariablesJson', () => {
        var options = {
            queryMode: "ChartAttributeQuery",
            bounds: new Bounds(-180, -90, 180, 90),
            chartLayerNames: ["testLayer0", "testLayer1", "testLayer2"],
            chartQueryFilterParameters: [
                new ChartQueryFilterParameter({isQueryPoint: true}),
                new ChartQueryFilterParameter({isQueryPoint: false})
            ],
        };
        var parameter = new ChartQueryParameters(options);
        var json = parameter.getVariablesJson();
        expect(parameter).not.toBeNull();
        expect(json).not.toBeNull();
        expect(json).toContain("ChartAttributeQuery");
        parameter.destroy();
    });
});